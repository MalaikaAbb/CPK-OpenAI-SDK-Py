"""Agents for the state_hitl route group. See demo_agents/registry.py.

Each entry maps an agent id (the path it is mounted at, and the id the
frontend runtime registers) to an OpenAIAgentsAgent. Doc code is verbatim;
anything else is labelled as harness glue or "from Code tab".

Harness glue: no page publishes how its agent is mounted at its id. The ids
are the ones the pages' own `agentId` props use.

Not here, on purpose:
  - /shared-state/streaming reuses the gen-ui group's `shared_state_streaming`
    (demo_agents/shared_state_streaming.py, mounted in agents_gen_ui.py).
  - /shared-state/rendering-in-app's "default" id is a runtime alias for
    `shared-state-read-write` (frontend/src/app/api/state-hitl-default).
  - /human-in-the-loop/governed-actions publishes no backend: its useInterrupt
    demo addresses `gen-ui-interrupt`, its useHumanInTheLoop demo the
    Quickstart agent.
  - /webmcp needs no backend.
"""

from ag_ui_openai_agents import OpenAIAgentsAgent

from demo_agents.app_context import app_context_agent
from demo_agents.hitl import hitl_in_chat_agent
from demo_agents.interrupt_agent import SchedulerAgent, interrupt_agent
from demo_agents.shared_state import shared_state_read_write_agent
from demo_agents.subagents import subagents_agent

AGENTS: dict[str, OpenAIAgentsAgent] = {
    # /shared-state and /shared-state/rendering-in-app
    "shared-state-read-write": OpenAIAgentsAgent(shared_state_read_write_agent),
    # /shared-state/agent-readonly
    "readonly-state-agent-context": OpenAIAgentsAgent(app_context_agent),
    # /human-in-the-loop (Pattern 1: frontend book_call tool)
    "hitl-in-chat": OpenAIAgentsAgent(hitl_in_chat_agent),
    # /human-in-the-loop/useInterrupt, /headless, /governed-actions (interrupt demo).
    # The page prints `SchedulerAgent(...)` as the wrapper to use.
    "gen-ui-interrupt": SchedulerAgent(interrupt_agent),
    # /human-in-the-loop/headless: the Code tab's page addresses this id; same agent.
    "interrupt-headless": SchedulerAgent(interrupt_agent),
    # /multi-agent/subagents
    "subagents": OpenAIAgentsAgent(subagents_agent),
}

# Doc gaps that concern this group's backend, keyed by agent id.
GAPS: dict[str, list[str]] = {
    "shared-state-read-write": [
        "shared_state.py is printed as three fragments with no imports; composed, imports are harness glue.",
        "MODEL / chat_settings come from the unpublished demo_agents._common.",
        "Also serves rendering-in-app's 'default' id (that page publishes no agent).",
    ],
    "readonly-state-agent-context": [
        "Imports from Code tab. upcoming_events is attached to no agent and its body is `...`; kept unimported in docs_verbatim/state_hitl/.",
    ],
    "hitl-in-chat": [
        "hitl.py is complete in the prose except demo_agents._common.",
    ],
    "gen-ui-interrupt": [
        "interrupt_agent.py: only schedule_meeting and SchedulerAgent are in the prose; imports, SYSTEM_PROMPT, _answers and interrupt_agent are from Code tab.",
        "The adapter approves a resume only when payload.approved is True; the useInterrupt page's multi-interrupt snippet resolves {ok: true}, which is treated as a rejection.",
        "The useInterrupt page's ApprovalInterrupt resolves {approved: true} with no chosen time, so schedule_meeting answers 'User did not pick a time. Meeting NOT scheduled'.",
        "Interrupt metadata is {tool_name, tool_input}; governed-actions reads metadata.action, which never exists, so its card renders nothing.",
    ],
    "subagents": [
        "subagents.py is complete in the prose except demo_agents._common (chat_settings must accept parallel_tool_calls).",
    ],
}
