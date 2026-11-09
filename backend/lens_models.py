import re
from typing import Union

from pydantic import BaseModel, Field, validator


def sanitize_json(raw: str) -> str:
    txt = raw.strip()
    txt = re.sub(r"^```(?:json)?\n?", "", txt)
    txt = re.sub(r"\n?```$", "", txt)
    return txt.strip()


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
        except (TypeError, ValueError):
            return v

class AnalyzeResp(BaseModel):
    make: str
    model: str
    year: str
    engine: EngineInfo
    performance: PerformanceInfo
    fun_fact: str
