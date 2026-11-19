"""app_context.py — Agent Read-Only Context page.

Doc: https://docs.copilotkit.ai/openai-agents-python/shared-state/agent-readonly

Sources:
  - imports                 from Code tab (src/demo_agents/app_context.py)
  - SYSTEM_PROMPT +
    app_context_agent       doc prose block "app_context.py" (verbatim)

The agent has no tools. The page's useAgentContext values arrive as
RunAgentInput.context and the adapter appends them to the instructions
(`context_in_instructions` defaults to True), so nothing else is needed.

The page's other Python snippet, `upcoming_events`, is attached to no agent and
its body is `...`; it is kept verbatim, unimported, in
backend/docs_verbatim/state_hitl/upcoming_events.py.
"""

# ── from Code tab: imports ──
from agents import Agent

from demo_agents._common import MODEL, chat_settings

# ── doc: agent-readonly prose block "app_context.py" (verbatim) ──
SYSTEM_PROMPT = (
    "You are a helpful, concise assistant. The frontend may provide "
    "read-only context about the user (e.g. name, timezone, recent "
    "activity) via the `useAgentContext` hook. Always consult that "
    "context when it is relevant — address the user by name if known, "
    "respect their timezone when mentioning times, and reference "
    "recent activity when it helps you answer. Keep responses short."
)


app_context_agent = Agent(
    name="context_assistant",
    instructions=SYSTEM_PROMPT,
    model=MODEL,
    model_settings=chat_settings(),
)
# ── end doc ──
