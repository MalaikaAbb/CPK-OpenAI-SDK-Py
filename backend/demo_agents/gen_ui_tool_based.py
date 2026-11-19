"""gen_ui_tool_based.py — Components as Tools page.

Doc: https://docs.copilotkit.ai/openai-agents-python/generative-ui/tool-based
The whole file is the doc prose block "gen_ui_tool_based.py", verbatim (the
Frontend Tools page prints the same file). It declares no tools: the
`render_*` components arrive from the page as frontend tools on every run.
"""

# ── doc: tool-based prose block "gen_ui_tool_based.py" (verbatim) ──
from agents import Agent

from demo_agents._common import MODEL, chat_settings

SYSTEM_PROMPT = """You are a data visualization assistant.

When the user asks for a chart, call `render_bar_chart` or `render_pie_chart`
with a concise title, short description, and a `data` array of
`{label, value}` items. Pick bar for comparisons over a small set of
categories; pick pie for composition / share-of-whole.

If the user names a chart subject but does NOT supply concrete numbers
(e.g. "show me a pie chart of website traffic by source"), do NOT ask
them for data. Invent plausible illustrative sample values yourself,
call the appropriate `render_*` tool immediately, and briefly note in
the follow-up that the values are illustrative samples. Always render
the chart on the first turn -- never reply with a clarifying question
asking for the data.

Keep chat responses brief -- let the chart do the talking."""


gen_ui_tool_based_agent = Agent(
    name="chart_assistant",
    instructions=SYSTEM_PROMPT,
    model=MODEL,
    model_settings=chat_settings(),
)
# ── end doc ──
