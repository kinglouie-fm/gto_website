import json
import os
import sys
import tempfile
import unittest
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from unittest.mock import MagicMock, patch

import httpx
from fastapi import FastAPI
from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'backend'))
from lens_review import review_router
from lens_web import reserve_lookup

CAR = {"make": "Porsche", "model": "911", "year": "2018–2019",
       "engine": {"type": "Gasoline", "power_hp": 500, "torque_nm": 460, "exact engine": "4.0 L"},
       "performance": {"top_speed_kmh": 320, "acceleration_0_100_kmh_sec": 3.4},
       "fun_fact": "The 911 is rear-engined."}
PHOTO = ("car.jpg", b"\xff\xd8\xffsample", "image/jpeg")


class LensReviewTests(unittest.TestCase):
    def setUp(self):
        self.ai = MagicMock()
        self.completion = self.ai.with_options.return_value.chat.completions.create
        app = FastAPI()
        app.include_router(review_router(self.ai, 100))
        self.client = TestClient(app)
        self.addCleanup(self.client.close)
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.db = str(Path(self.directory.name) / 'usage.sqlite3')
        env = patch.dict(os.environ, GOOGLE_VISION_API_KEY='', GTO_LENS_USAGE_DB=self.db)
        env.start()
        self.addCleanup(env.stop)

    def review(self, status, rear=False, clues=None, details=CAR):
        self.completion.return_value.choices[0].message.content = json.dumps({"status": status, "details": details})
        files = {"image": PHOTO}
        if rear:
            files["rear"] = PHOTO
        fields = {"candidate": "Porsche 911 GT3 RS", "evidence": json.dumps(clues or {})}
        return self.client.post('/api/lens/review', files=files, data=fields)

    def test_default_and_rear_only(self):
        self.assertFalse(self.client.get('/api/lens/options').json()['googleAvailable'])
        self.assertEqual(self.client.post('/api/lens/web-check', files={'image': PHOTO}).status_code, 503)
        self.assertEqual(self.review('trim_supported', rear=True).json()['details'], CAR)
        content = self.completion.call_args.kwargs['messages'][1]['content']
        self.assertEqual([part['type'] for part in content], ['text', 'image_url', 'image_url'])

    def test_google_can_correct_trim_and_regenerate_specs(self):
        corrected = dict(CAR, model='911 GT3')
        response = self.review('trim_supported', rear=True, clues={'labels': ['911 GT3']}, details=corrected)
        self.assertEqual(response.json()['details'], corrected)
        content = self.completion.call_args.kwargs['messages'][1]['content']
        self.assertEqual(len(content), 3)
        self.assertEqual(json.loads(content[0]['text'])['web_clues']['labels'], ['911 GT3'])

    def test_family_only_hides_trim_dependent_specs(self):
        result = self.review('trim_uncertain', clues={'labels': ['Porsche 911']}).json()
        self.assertEqual(result['details']['model'], '911')
        self.assertEqual(result['details']['engine']['power_hp'], 'Unconfirmed')
        self.assertEqual(result['details']['performance']['top_speed_kmh'], 'Unconfirmed')

    def test_unusable_or_conflicting_evidence(self):
        self.assertEqual(self.review('trim_supported').status_code, 400)
        self.completion.assert_not_called()
        for status in ['different_vehicle', 'inconclusive']:
            self.assertEqual(self.review(status, rear=True).json(), {'status': status, 'details': None})
        self.assertEqual(self.review('trim_supported', rear=True, details=None).status_code, 502)

    def test_google_response_and_multipart_limits(self):
        os.environ['GOOGLE_VISION_API_KEY'] = 'test'
        payload = {'responses': [{'webDetection': {'bestGuessLabels': [{'label': 'car'}],
                   'webEntities': [{'description': 'Porsche 911'}], 'pagesWithMatchingImages': [
                   {'pageTitle': '<b>911 GT3</b>', 'fullMatchingImages': [{}]}]}}]}
        transport = httpx.AsyncClient(transport=httpx.MockTransport(lambda request: httpx.Response(200, json=payload)))
        with patch('lens_web.httpx.AsyncClient', return_value=transport):
            res = self.client.post('/api/lens/web-check', files={'image': PHOTO})
            self.assertEqual(res.json(), {'labels': ['Porsche 911'], 'matching_page_titles': ['911 GT3']})
        for data, status in [(b'bad', 400), (b'!' * 101, 413)]:
            self.assertEqual(self.client.post('/api/lens/web-check', files={'image': ('x', data)}).status_code, status)

    def test_google_stops_before_sending_at_cap_or_if_counter_unavailable(self):
        os.environ['GOOGLE_VISION_API_KEY'] = 'test'
        with patch('lens_web.httpx.AsyncClient') as network:
            with patch('lens_web.reserve_lookup', return_value=False):
                self.assertEqual(self.client.post('/api/lens/web-check', files={'image': PHOTO}).status_code, 429)
            os.environ['GTO_LENS_USAGE_DB'] = self.directory.name
            self.assertEqual(self.client.post('/api/lens/web-check', files={'image': PHOTO}).status_code, 503)
            network.assert_not_called()

    def test_google_annotation_error_preserves_rear_review(self):
        os.environ['GOOGLE_VISION_API_KEY'] = 'test'
        transport = httpx.AsyncClient(transport=httpx.MockTransport(
            lambda request: httpx.Response(200, json={'responses': [{'error': {'code': 7}}]})))
        with patch('lens_web.httpx.AsyncClient', return_value=transport):
            self.assertEqual(self.client.post('/api/lens/web-check', files={'image': PHOTO}).status_code, 502)
        self.assertEqual(self.review('trim_supported', rear=True).status_code, 200)

    def test_cap_survives_concurrency_and_resets_next_month(self):
        with ThreadPoolExecutor(max_workers=6) as pool:
            outcomes = list(pool.map(lambda _: reserve_lookup(self.db, '2026-11', limit=3), range(15)))
        self.assertEqual(sum(outcomes), 3)
        self.assertFalse(reserve_lookup(self.db, '2026-11', limit=3))
        self.assertTrue(reserve_lookup(self.db, '2026-12', limit=3))
