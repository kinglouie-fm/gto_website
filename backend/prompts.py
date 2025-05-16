DETAILS_PROMPT = """
You are an automotive AI expert. Analyze the attached image and identify the make and model of the car shown. Provide detailed and structured information about it. Include technical specs and one fun fact. Follow the JSON structure exactly.

Output format:
{
  "make": "BrandName",
  "model": "ModelName",
  "year": "EstimatedYearOrRange",
  "engine": {
    "type": "Gasoline | Diesel | Electric | Hybrid",
    "power_hp": "number",
    "torque_nm": "number",
    "exact engine": "String"
  },
  "performance": {
    "top_speed_kmh": "number",
    "acceleration_0_100_kmh_sec": "number"
  },
  "fun_fact": "Interesting fact or historical note.",
}
"""