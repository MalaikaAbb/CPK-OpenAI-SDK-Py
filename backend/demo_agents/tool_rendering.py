"""tool_rendering.py — Tool Call Rendering page (all three demos).

Doc: https://docs.copilotkit.ai/openai-agents-python/generative-ui/tool-rendering

The prose prints only `get_weather` and the last lines of the file (`TOOLS`
plus the `Agent(...)`). `TOOLS` names three more tools and the Agent uses a
`SYSTEM_PROMPT`, none of which the prose defines, so those (and the imports)
come from the page's demo Code tab. Without them the printed lines raise
NameError. Labelled block by block below.
"""

# ── from Code tab: imports ──
from random import choice, randint

from agents import Agent, function_tool

from demo_agents._common import MODEL, chat_settings

# ── from Code tab: SYSTEM_PROMPT ──
SYSTEM_PROMPT = (
    "You are a travel & lifestyle concierge. Use the mock tools for "
    "weather, flights, stock prices, or d20 rolls when the user asks; "
    "otherwise reply in plain text. For flights, default origin to 'SFO' "
    "if the user only names a destination. Call multiple tools in one "
    "turn if asked. After tools return, summarize in one short sentence. "
    "Never fabricate data a tool could provide."
)


# ── doc: tool-rendering prose block "@function_tool get_weather" (verbatim) ──
@function_tool
def get_weather(location: str) -> dict:
    """Get the current weather for a given location."""
    return {
        "city": location,
        "temperature": 68,
        "humidity": 55,
        "wind_speed": 10,
        "conditions": "Sunny",
    }
# ── end doc ──


# ── from Code tab: the three tools `TOOLS` names but the prose never prints ──
@function_tool
def search_flights(origin: str, destination: str) -> dict:
    """Search mock flights from an origin airport to a destination airport."""
    return {
        "origin": origin,
        "destination": destination,
        "flights": [
            {
                "airline": "United",
                "flight": "UA231",
                "depart": "08:15",
                "arrive": "16:45",
                "price_usd": 348,
            },
            {
                "airline": "Delta",
                "flight": "DL412",
                "depart": "11:20",
                "arrive": "19:55",
                "price_usd": 312,
            },
            {
                "airline": "JetBlue",
                "flight": "B6722",
                "depart": "17:05",
                "arrive": "01:30",
                "price_usd": 289,
            },
        ],
    }


@function_tool
def get_stock_price(
    ticker: str, price_usd: float | None = None, change_pct: float | None = None
) -> dict:
    """Get a mock current price for a stock ticker. Optional price_usd and change_pct are echoed back when given."""
    return {
        "ticker": ticker.upper(),
        "price_usd": round(float(price_usd), 2)
        if price_usd is not None
        else round(100 + randint(0, 400) + randint(0, 99) / 100, 2),
        "change_pct": round(float(change_pct), 2)
        if change_pct is not None
        else round(choice([-1, 1]) * (randint(0, 300) / 100), 2),
    }


@function_tool
def roll_d20(value: int = 0) -> dict:
    """Roll a 20-sided die. A value between 1 and 20 is echoed back as the roll."""
    rolled = value if isinstance(value, int) and 1 <= value <= 20 else randint(1, 20)
    return {"sides": 20, "value": rolled, "result": rolled}


# ── end Code tab ──


# ── doc: tool-rendering prose block "tool_rendering.py" (verbatim) ──
TOOLS = [get_weather, search_flights, get_stock_price, roll_d20]


tool_rendering_agent = Agent(
    name="concierge",
    instructions=SYSTEM_PROMPT,
    model=MODEL,
    model_settings=chat_settings(),
    tools=TOOLS,
)
# ── end doc ──
