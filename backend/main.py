import os, re, json, base64, logging
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from prompts import DETAILS_PROMPT

load_dotenv()
MAX_SIZE = int(os.getenv("MAX_CONTENT_LENGTH", 5_242_880))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI(title="GTO Lens API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ os.getenv("CORS_ORIGINS") ],
    allow_methods=["POST"],
    allow_headers=["*"],
)

# — helper to strip ``` fences —
def sanitize_json(raw: str) -> str:
    txt = raw.strip()
    txt = re.sub(r"^```(?:json)?\n?", "", txt)
    txt = re.sub(r"\n?```$", "", txt)
    return txt.strip()

@app.post("/api/analyze")
async def analyze(image: UploadFile = File(...)):
    # Validate file type
    if image.content_type not in ("image/jpeg","image/png"):
        raise HTTPException(400, "Only JPEG/PNG allowed")

    # Read & size-check
    data = await image.read()
    if len(data) > MAX_SIZE:
        raise HTTPException(413, "Image too large")
    logger.info(f"Received {len(data)} bytes")

    # Base64-encode
    b64 = base64.b64encode(data).decode("utf-8")
    user_content = f"data:image/png;base64,{b64}"

    # Call OpenAI API
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
          {"role":"system", "content": DETAILS_PROMPT},
          {"role":"user",
       "content": [{
                    "type": "image_url",
                    "image_url": {
                        "url": user_content
                    },
                },]}
        ]
    )
    raw = resp.choices[0].message.content
    clean = sanitize_json(raw)
    logger.info(f"AI raw response: {raw}")

    # Parse JSON
    try:
        result = json.loads(clean)
    except json.JSONDecodeError:
        raise HTTPException(502, f"Invalid JSON from AI: {clean}")

    return result
