import importlib.util
import os
from pathlib import Path
import sys
import tempfile
import unittest

from fastapi.testclient import TestClient


class FrontendRouteTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.dist = tempfile.TemporaryDirectory()
        root = Path(cls.dist.name)
        for route, title in {
            "": "Home",
            "events/known": "Known event",
            "lens/camera": "Camera",
            "lens/details": "Results",
            "404": "Page not found",
        }.items():
            directory = root / route
            directory.mkdir(parents=True, exist_ok=True)
            (directory / "index.html").write_text(
                f'<title>{title}</title><script nonce="{{{{ csp_nonce }}}}"></script>'
            )
        for name in ["robots.txt", "sitemap.xml", "llms.txt"]:
            (root / name).write_text("Crawler fixture")
        cls.old_env = {key: os.environ.get(key) for key in ["FRONTEND_DIST", "OPENAI_API_KEY"]}
        os.environ["FRONTEND_DIST"] = cls.dist.name
        os.environ["OPENAI_API_KEY"] = "test-key-never-used"
        backend = Path(__file__).resolve().parents[1] / "backend"
        sys.path.insert(0, str(backend))
        spec = importlib.util.spec_from_file_location("frontend_test_main", backend / "main.py")
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        cls.client = TestClient(module.app)

    @classmethod
    def tearDownClass(cls):
        cls.client.close()
        sys.path.pop(0)
        cls.dist.cleanup()
        for key, value in cls.old_env.items():
            if value is None:
                os.environ.pop(key, None)
            else:
                os.environ[key] = value

    def test_known_routes_keep_their_html_and_nonce(self):
        for path, title in [("/", "Home"), ("/events/known", "Known event"),
                            ("/lens/camera", "Camera"), ("/lens/details", "Results")]:
            with self.subTest(path=path):
                response = self.client.get(path)
                self.assertEqual(response.status_code, 200)
                self.assertIn(f"<title>{title}</title>", response.text)
                self.assertNotIn("{{ csp_nonce }}", response.text)
                self.assertIn("nonce-", response.headers["content-security-policy"])

    def test_missing_routes_and_event_slugs_return_404_html(self):
        for path in ["/missing", "/events/missing", "/404", "/%2e%2e/outside"]:
            with self.subTest(path=path):
                response = self.client.get(path)
                self.assertEqual(response.status_code, 404)
                self.assertIn("Page not found", response.text)
                self.assertEqual(response.headers.get("x-robots-tag"), "noindex, follow")

    def test_crawler_files_still_work(self):
        for path in ["/robots.txt", "/sitemap.xml", "/llms.txt"]:
            with self.subTest(path=path):
                self.assertEqual(self.client.get(path).status_code, 200)


if __name__ == "__main__":
    unittest.main()
