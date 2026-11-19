"""Agents for the gen_ui route group. See demo_agents/registry.py.

Each entry maps an agent id (the path it is mounted at, and the id the
frontend runtime registers) to an OpenAIAgentsAgent. Doc code is verbatim;
anything else is labelled as harness glue or "from Code tab".

Routes in this group that need no backend config use the Quickstart's shared
agent (`openai_agent`, served at /agent) and have no entry here:
/frontend-tools, /generative-ui/a2ui/dynamic-schema, /generative-ui/mcp-apps,
/generative-ui/open-generative-ui. Their page-specific runtimes register the
doc's agent ids against that shared endpoint.

The wrapping below (`OpenAIAgentsAgent(<Agent>)`) is the Quickstart's pattern.
The ids are this harness's own (harness glue); the doc's ids differ per page.
"""

from ag_ui_openai_agents import OpenAIAgentsAgent

from demo_agents.a2ui_fixed import a2ui_fixed_agent
from demo_agents.byoc_hashbrown import byoc_hashbrown_agent
from demo_agents.byoc_json_render import byoc_json_render_agent
from demo_agents.gen_ui_tool_based import gen_ui_tool_based_agent
from demo_agents.shared_state_streaming import (
    DocumentStreamingAgent,
    shared_state_streaming_agent,
)
from demo_agents.tool_rendering import tool_rendering_agent

AGENTS: dict[str, OpenAIAgentsAgent] = {
    # /generative-ui/tool-based — prose file, verbatim.
    "gen_ui_tool_based": OpenAIAgentsAgent(gen_ui_tool_based_agent),
    # /generative-ui/tool-rendering (all three demos) — prose + Code tab.
    "tool_rendering": OpenAIAgentsAgent(tool_rendering_agent),
    # /generative-ui/state-rendering (and state-hitl's /shared-state/streaming).
    # The prose says to mount it as DocumentStreamingAgent(shared_state_streaming_agent).
    "shared_state_streaming": DocumentStreamingAgent(shared_state_streaming_agent),
    # /generative-ui/a2ui/fixed-schema — prose tool + Code-tab Agent.
    "a2ui_fixed_schema": OpenAIAgentsAgent(a2ui_fixed_agent),
    # /generative-ui/json-render — Code tab only (prose prints no backend).
    "byoc_json_render": OpenAIAgentsAgent(byoc_json_render_agent),
    # /generative-ui/hashbrown — Code tab only (prose prints no backend).
    "byoc_hashbrown": OpenAIAgentsAgent(byoc_hashbrown_agent),
}

# Doc gaps that concern this group's backend, keyed by agent id.
GAPS: dict[str, list[str]] = {
    "gen_ui_tool_based": [
        "Prompt names render_pie_chart, but the page registers only render_bar_chart.",
    ],
    "tool_rendering": [
        "Prose prints get_weather and the TOOLS/Agent lines only; search_flights, "
        "get_stock_price, roll_d20, SYSTEM_PROMPT and imports are from Code tab.",
    ],
    "shared_state_streaming": [
        "Prose never defines shared_state_streaming_agent, SYSTEM_PROMPT or the "
        "imports; from Code tab.",
    ],
    "a2ui_fixed_schema": [
        "Prose prints display_flight but no Agent; flight_schema.json is shown only "
        "as a tree diagram. Agent + JSON from Code tab.",
    ],
    "byoc_json_render": ["No backend in prose; whole agent from Code tab."],
    "byoc_hashbrown": ["No backend in prose; whole agent + prompt from Code tab."],
}
