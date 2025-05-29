import os, re, json, base64, logging
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from openai import OpenAI, OpenAIError, Timeout
from prompts import DETAILS_PROMPT

load_dotenv()
MAX_SIZE = int(os.getenv("MAX_CONTENT_LENGTH", 5_242_880))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
app = FastAPI(title="GTO Lens API")

@app.get("/healthz", include_in_schema=False)
async def healthz():
    """
    Liveness probe.
    """
    return JSONResponse({"status": "ok"})

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("CORS_ORIGINS")],
    allow_methods=["POST"],
    allow_headers=["*"],
)

def sanitize_json(raw: str) -> str:
    txt = raw.strip()
    txt = re.sub(r"^```(?:json)?\n?", "", txt)
    txt = re.sub(r"\n?```$", "", txt)
    return txt.strip()

class ObjectInfo(BaseModel):
    label: str
    bbox: list[int]

class AnalyzeResp(BaseModel):
    objects: list[ObjectInfo]

@app.exception_handler(HTTPException)
async def http_exc_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "code": exc.headers.get("X-Error-Code")}
    )

@app.post("/api/analyze", response_model=AnalyzeResp)
async def analyze(image: UploadFile = File(...)):
    """
    Analyze an image and return the result.
    """

    if not image.content_type.startswith("image/"):
        raise HTTPException(400, "Only images allowed")
    data = await image.read()
    if len(data) > MAX_SIZE:
        raise HTTPException(413, "Image too large")
    logger.info(f"Received {len(data)} bytes")

    b64 = base64.b64encode(data).decode("utf-8")
    data_uri = f"data:{image.content_type};base64,{b64}"

    try:
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role":"system","content":DETAILS_PROMPT},
                {"role":"user","content":[
                    {"type":"text","text":"Analyze this image:"},
                    {"type":"image_url","image_url":{"url":data_uri}}
                ]}
            ]
        )
    except Timeout:
        raise HTTPException(504, "Upstream timeout, please try again.")
    except OpenAIError:
        logger.exception("OpenAI error")
        raise HTTPException(502, "AI service unavailable")

    raw = resp.choices[0].message.content
    clean = sanitize_json(raw)
    logger.info(f"AI raw response: {raw}")

    try:
        result = json.loads(clean)
    except json.JSONDecodeError:
        raise HTTPException(502, "Invalid response format from AI.")

    if not any(obj.get("label") == "car" for obj in result.get("objects", [])):
        raise HTTPException(
            422, "No car detected in image",
            headers={"X-Error-Code": "NO_CAR_DETECTED"}
        )

    return AnalyzeResp(**result)
