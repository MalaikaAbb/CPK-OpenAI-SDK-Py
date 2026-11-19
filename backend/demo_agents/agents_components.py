"""Agents for the components route group. See demo_agents/registry.py.

Each entry maps an agent id (the path it is mounted at, and the id the
frontend runtime registers) to an OpenAIAgentsAgent. Doc code is verbatim;
anything else is labelled as harness glue or "from Code tab".
"""

from ag_ui_openai_agents import OpenAIAgentsAgent

from demo_agents import genui_components, genui_shop

AGENTS: dict[str, OpenAIAgentsAgent] = {
    # Components and surfaces overview: the page's BuiltInAgent swapped for an
    # OpenAI Agents SDK Agent (same prompt, MODEL, no tools). Served to the
    # frontend as `default` by app/api/genui and app/api/genui-transports.
    "genui_components": OpenAIAgentsAgent(genui_components.agent),
    # Harness glue: the same agent plus a fake-data `search_products` tool,
    # for the shop catalogs (Surfaces, Catalogs, Standard catalog, State and
    # actions) whose ProductCard copies values "from a tool result".
    "genui_shop": OpenAIAgentsAgent(genui_shop.agent),
}

# Doc gaps that concern this group's backend, keyed by agent id.
GAPS: dict[str, list[str]] = {
    "genui_components": [
        "components-overview-agent-swap: the page prints a TanStack BuiltInAgent; "
        "this is an OpenAI Agents SDK Agent with its prompt (user instruction).",
        "components-agent-tools-context-unstated: no page says how an OpenAI Agents "
        "agent passes the run's tools and context to its model; the bridge's defaults do it.",
    ],
    "genui_shop": [
        "components-products-tool-glue: ProductCard copies values 'from a tool result', "
        "but no page publishes a products tool; search_products is harness glue.",
    ],
}
