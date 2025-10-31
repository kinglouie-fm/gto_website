import os, re, json, base64, logging, secrets
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, Field, ValidationError, validator
from openai import OpenAI, OpenAIError, APITimeoutError
from prompts import DETAILS_PROMPT
from typing import Union

load_dotenv()
MAX_SIZE = int(os.getenv("MAX_CONTENT_LENGTH", 5_242_880))
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
app = FastAPI(title="GTO Lens API")

FRONTEND_DIST = os.getenv("FRONTEND_DIST", "/var/www/html")
templates = Jinja2Templates(directory=FRONTEND_DIST)

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

# Pydantic models 
class EngineInfo(BaseModel):
    type: str
    power_hp: Union[int, str]
    torque_nm: Union[int, str]
    exact_engine: str = Field(alias="exact engine")

    @validator('power_hp', 'torque_nm', pre=True)
    def parse_hp_torque(cls, v):
        if isinstance(v, str) and v.isdigit():
            return int(v)
        return v

class PerformanceInfo(BaseModel):
    top_speed_kmh: Union[int, str]
    acceleration_0_100_kmh_sec: Union[float, str]

    @validator('top_speed_kmh', pre=True)
    def parse_speed(cls, v):
        if isinstance(v, str) and v.isdigit():
            return int(v)
        return v

    @validator('acceleration_0_100_kmh_sec', pre=True)
    def parse_accel(cls, v):
        try:
            return float(v)
        except:
            return v

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
    except APITimeoutError:
        raise HTTPException(
            status_code=504, 
            detail="Upstream timeout, please try again.",
            headers={"X-Error-Code":"TIMEOUT"}
        )
    
    except OpenAIError as e:
        logger.exception("OpenAI error")
        logger.info(f"OpenAI error: {e}")
        raise HTTPException(
            status_code=502, 
            detail="AI service unavailable",
            headers={"X-Error-Code":"AI_UNAVAILABLE"}
        )

    raw = resp.choices[0].message.content
    clean = sanitize_json(raw)
    logger.info(f"AI raw response: {raw}")

    # Parse & validate shape
    try:
        parsed = json.loads(clean)
        result = AnalyzeResp(**parsed)
        return result
    except (json.JSONDecodeError, ValidationError):
        logger.info("AI response didn’t match schema, treating as no car detected")
        raise HTTPException(
            status_code=422,
            detail="Could not detect car.",
            headers={"X-Error-Code": "NO_CAR_DETECTED"}
        )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled exception")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Unexpected server error.",
            "code": "INTERNAL_ERROR"
        },
    )

@app.middleware("http")
async def csp_nonce_middleware(request: Request, call_next):
    nonce = secrets.token_urlsafe(16)
    request.state.csp_nonce = nonce

    resp: Response = await call_next(request)

    csp = (
        "default-src 'self'; "
        "base-uri 'self'; object-src 'none'; form-action 'self'; "
        f"script-src 'self' 'nonce-{nonce}' https://www.googletagmanager.com https://www.google-analytics.com; "
        "script-src-attr 'none'; "
        "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; "
        "img-src 'self' data: https://www.google-analytics.com https://stats.g.doubleclick.net; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
        "font-src 'self' https://fonts.gstatic.com data:; "
        "frame-src 'self' https://*.typeform.com; "
        "upgrade-insecure-requests"
    )
    resp.headers["Content-Security-Policy"] = csp
    resp.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    resp.headers.setdefault("X-Content-Type-Options", "nosniff")
    resp.headers.setdefault("X-Frame-Options", "DENY")
    resp.headers.setdefault("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
    return resp

# Catch-all for SPA routes: render /var/www/html/index.html with the nonce
@app.get("/{path:path}", include_in_schema=False)
async def spa(request: Request, path: str):
    return templates.TemplateResponse("index.html", {"request": request, "csp_nonce": request.state.csp_nonce})