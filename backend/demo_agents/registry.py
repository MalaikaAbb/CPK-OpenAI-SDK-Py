"""Harness glue — NOT from the docs. Collects every route group's agents.

The Quickstart's own agent stays in main.py at /agent (id `openai_agent` on the
frontend) and is the SHARED agent for every page that needs no backend config.
"""

from ag_ui_openai_agents import OpenAIAgentsAgent

from demo_agents import agents_chat_ui, agents_components, agents_gen_ui, agents_state_hitl

_GROUPS = [agents_chat_ui, agents_gen_ui, agents_components, agents_state_hitl]

AGENTS: dict[str, OpenAIAgentsAgent] = {}
GAPS: dict[str, list[str]] = {}
for _g in _GROUPS:
    for _id in _g.AGENTS:
        if _id in AGENTS or _id == "agent":
            raise RuntimeError(f"duplicate agent id {_id!r}")
    AGENTS.update(_g.AGENTS)
    GAPS.update(_g.GAPS)
