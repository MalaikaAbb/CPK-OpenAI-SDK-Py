"""a2ui_fixed.py — A2UI Fixed Schema page.

Doc: https://docs.copilotkit.ai/openai-agents-python/generative-ui/a2ui/fixed-schema

Sources:
  - everything down to `display_flight`  doc prose block "src/demo_agents/a2ui_fixed.py"
    (verbatim, from the page's Markdown export; the rendered page shows the
    same code)
  - SYSTEM_PROMPT + a2ui_fixed_agent       from Code tab (prose never prints
    the Agent)
  - a2ui_schemas/flight_schema.json        from Code tab (prose shows only a
    component tree diagram, not the JSON)
"""

# ── doc: fixed-schema prose block "src/demo_agents/a2ui_fixed.py" (verbatim) ──
# src/demo_agents/a2ui_fixed.py
import json
from pathlib import Path
from typing import Any

from agents import Agent, function_tool

from demo_agents._common import MODEL, chat_settings

CATALOG_ID = "copilotkit://flight-fixed-catalog"
SURFACE_ID = "flight-fixed-schema"

_SCHEMAS_DIR = Path(__file__).parent / "a2ui_schemas"

with open(_SCHEMAS_DIR / "flight_schema.json", encoding="utf-8") as _f:
    FLIGHT_SCHEMA: list[dict[str, Any]] = json.load(_f)


@function_tool
def display_flight(origin: str, destination: str, airline: str, price: str) -> dict:
    """Show a flight card for the given trip.

    Use short airport codes (e.g. "SFO", "JFK") for origin/destination and a
    price string like "$289".

    After this tool returns, the flight card is already rendered to the user
    via the A2UI surface — the JSON returned here is the surface descriptor
    the renderer consumes, NOT a status code. Do NOT call this tool again
    for the same flight (the user already sees the card). Reply with one
    short confirmation sentence and stop.
    """
    return {
        "a2ui_operations": [
            {
                "version": "v0.9",
                "createSurface": {"surfaceId": SURFACE_ID, "catalogId": CATALOG_ID},
            },
            {
                "version": "v0.9",
                "updateComponents": {
                    "surfaceId": SURFACE_ID,
                    "components": FLIGHT_SCHEMA,
                },
            },
            {
                "version": "v0.9",
                "updateDataModel": {
                    "surfaceId": SURFACE_ID,
                    "path": "/",
                    "value": {
                        "origin": origin,
                        "destination": destination,
                        "airline": airline,
                        "price": price,
                    },
                },
            },
        ]
    }


# ── end doc ──


# ── from Code tab: the Agent the prose never prints ──
SYSTEM_PROMPT = (
    "You help users find flights. When asked about a flight, call "
    "`display_flight` exactly ONCE with origin, destination, airline, "
    "and price. The tool's JSON return value is an A2UI surface "
    "descriptor — the flight card is already rendered to the user; do "
    "NOT call `display_flight` again for the same trip. After the tool "
    "returns, reply with one short confirmation sentence and stop."
)


a2ui_fixed_agent = Agent(
    name="flight_assistant",
    instructions=SYSTEM_PROMPT,
    model=MODEL,
    model_settings=chat_settings(),
    tools=[display_flight],
)
