import os
import re
import sqlite3
from contextlib import closing
from datetime import datetime, timezone
from html import unescape
from typing import Annotated

import httpx
from fastapi import HTTPException
from pydantic import BaseModel, Field, StringConstraints
from starlette.concurrency import run_in_threadpool

MAX_ATTEMPTS = 500
VISION_ENDPOINT = "https://vision.googleapis.com/v1/images:annotate"
GENERIC_LABELS = {"car", "cars", "vehicle", "motor vehicle", "sports car", "supercar", "automotive design", "wheel"}
ShortText = Annotated[str, StringConstraints(min_length=1, max_length=180)]


class WebEvidence(BaseModel):
    labels: list[ShortText] = Field(default_factory=list, max_length=6)
    matching_page_titles: list[ShortText] = Field(default_factory=list, max_length=4)

    def has_clues(self):
        return bool(self.labels or self.matching_page_titles)


def reserve_lookup(db_path, month, limit=MAX_ATTEMPTS):
    # Reserve before sending, even when Google's response might never arrive.
    with closing(sqlite3.connect(db_path, timeout=3)) as db, db:
        db.execute("CREATE TABLE IF NOT EXISTS usage (month TEXT PRIMARY KEY, attempts INTEGER NOT NULL)")
        updated = db.execute(
            "INSERT INTO usage VALUES (?, 1) ON CONFLICT(month) DO UPDATE "
            "SET attempts = attempts + 1 WHERE attempts < ?", (month, limit)
        )
        return updated.rowcount == 1


def extract_evidence(web):
    def clean(items, limit):
        values = []
        for item in items:
            value = ' '.join(unescape(re.sub(r'<[^>]*>', '', item or '')).split())[:180]
            if value and value.casefold() not in GENERIC_LABELS and value not in values:
                values.append(value)
            if len(values) == limit:
                break
        return values

    labels = [item.get("label") for item in web.get("bestGuessLabels", [])]
    labels.extend(item.get("description") for item in web.get("webEntities", []))
    titles = [page.get("pageTitle") for page in web.get("pagesWithMatchingImages", [])
              if page.get("fullMatchingImages") or page.get("partialMatchingImages")]
    return WebEvidence(labels=clean(labels, 6), matching_page_titles=clean(titles, 4))


def google_configured():
    return bool(os.getenv("GOOGLE_VISION_API_KEY", "").strip())


async def web_check(encoded_photo):
    if not google_configured():
        raise HTTPException(503, "Google checking is unavailable. You can still review a rear photo.")
    path = os.getenv("GTO_LENS_USAGE_DB", "/var/lib/gto-lens/google-usage.sqlite3")
    try:
        month = datetime.now(timezone.utc).strftime("%Y-%m")
        reserved = await run_in_threadpool(reserve_lookup, path, month)
    except sqlite3.Error:
        raise HTTPException(503, "Google checking is temporarily unavailable. You can still review a rear photo.")
    if not reserved:
        raise HTTPException(429, "This month’s Google checks have been used. You can still review a rear photo.")
    payload = {"requests": [{"image": {"content": encoded_photo},
                             "features": [{"type": "WEB_DETECTION", "maxResults": 10}]}]}
    try:
        async with httpx.AsyncClient(timeout=12) as transport:
            response = await transport.post(VISION_ENDPOINT, json=payload,
                                            headers={"X-Goog-Api-Key": os.environ["GOOGLE_VISION_API_KEY"]})
        response.raise_for_status()
        annotation = response.json()["responses"][0]
        if "error" in annotation:
            raise ValueError("Vision annotation failed")
        return extract_evidence(annotation.get("webDetection", {}))
    except (httpx.HTTPError, ValueError, KeyError, IndexError, TypeError):
        raise HTTPException(502, "Google could not check this photo. Try again or add a rear photo.")
