import os, re, json, base64, logging
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, ValidationError
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

# Pydantic models matching your details JSON
class EngineInfo(BaseModel):
    type: str
    power_hp: int
    torque_nm: int
    exact_engine: str = Field(alias="exact engine")

class PerformanceInfo(BaseModel):
    top_speed_kmh: int
    acceleration_0_100_kmh_sec: float

class AnalyzeResp(BaseModel):
    make: str
    model: str
    year: str
    engine: EngineInfo
    performance: PerformanceInfo
    fun_fact: str

@app.exception_handler(HTTPException)
async def http_exc_handler(request: Request, exc: HTTPException):
    headers = exc.headers or {}
    code = headers.get("X-Error-Code")
    payload = {"error": exc.detail}
    if code:
        payload["code"] = code
    return JSONResponse(status_code=exc.status_code, content=payload)

@app.post("/api/analyze", response_model=AnalyzeResp)
async def analyze(image: UploadFile = File(...)):
    if not image.content_type.startswith("image/"):
        raise HTTPException(400, "Only images allowed")
    data = await image.read()
    if len(data) > MAX_SIZE:
        raise HTTPException(413, "Image too large")
    logger.info(f"Received {len(data)} bytes")

    # Call OpenAI
    b64 = base64.b64encode(data).decode()
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
    except OpenAIError as e:
        logger.exception("OpenAI error")
        raise HTTPException(502, f"AI service unavailable: {e}")

    raw = resp.choices[0].message.content
    clean = sanitize_json(raw)
    logger.info(f"AI raw response: {raw}")

    # Parse & validate shape
    try:
        parsed = json.loads(clean)
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse AI JSON: {clean}")
        raise HTTPException(
            status_code=502,
            detail="Invalid response format from AI.",
            headers={"X-Error-Code":"INVALID_RESPONSE"}
            )

    try:
        result = AnalyzeResp(**parsed)
    except ValidationError:
        raise HTTPException(
            status_code=422,
            detail="No car details found in image",
            headers={"X-Error-Code":"NO_CAR_DETECTED"}
        )

    return result

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled exception")
    return JSONResponse(
        status_code=500,
        content={"error": str(exc)}
    )
