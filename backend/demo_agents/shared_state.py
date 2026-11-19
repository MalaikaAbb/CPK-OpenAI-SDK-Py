"""shared_state.py — Shared State page.

Doc: https://docs.copilotkit.ai/openai-agents-python/shared-state

The page prints this module as three fragments (with_state, the prompt and
agent, and set_notes) and no imports. They are composed here; set_notes moves
above the agent because the agent's `tools=[set_notes]` needs it defined.

Sources, block by block:
  - imports                         harness glue (prose prints none; names
                                    taken from what the fragments use)
  - with_state                      doc prose block "shared_state.py" #1 (verbatim)
  - set_notes                       doc prose block "shared_state.py" #3 (verbatim)
  - READ_WRITE_PROMPT +
    shared_state_read_write_agent   doc prose block "shared_state.py" #2 (verbatim)

Also serves /shared-state/rendering-in-app, whose page targets the runtime id
"default" (see frontend/src/app/api/state-hitl-default).
"""

# ── harness glue: imports the fragments need ──
import json
from collections.abc import Callable
from typing import Any

from ag_ui_openai_agents import shared_state
from agents import Agent, RunContextWrapper, function_tool

from demo_agents._common import MODEL, chat_settings


# ── doc: shared-state prose block "shared_state.py" #1 (verbatim) ──
def with_state(prompt: str) -> Callable[[RunContextWrapper[Any], Agent[Any]], str]:
    """Dynamic instructions: ``prompt`` plus the run's shared state as JSON."""

    def instructions(_ctx: RunContextWrapper[Any], _agent: Agent[Any]) -> str:
        state = shared_state().value
        if not state:
            return prompt
        return (
            f"{prompt}\n\nCurrent shared application state (JSON; the user may "
            f"have edited it since your last turn):\n{json.dumps(state)}"
        )

    return instructions
# ── end doc ──


# ── doc: shared-state prose block "shared_state.py" #3 (verbatim) ──
@function_tool
def set_notes(notes: list[str]) -> str:
    """Replace the notes array in shared state with the full updated list.

    Use this tool whenever the user asks you to "remember" something, or
    when you have an observation about the user worth surfacing in the
    UI's notes panel. Always pass the FULL notes list (existing notes +
    any new ones), not a diff. Keep each note short (< 120 chars).
    """
    shared_state().update(notes=notes)
    return "Notes updated."
# ── end doc ──


# ── doc: shared-state prose block "shared_state.py" #2 (verbatim) ──
READ_WRITE_PROMPT = (
    "You are a helpful, concise assistant. The shared application state below "
    "has a `preferences` object with the user's name, preferred tone, "
    "language and interests, which the user edits in the app: always respect "
    "them, and address the user by name when you know it. Its `notes` list "
    "holds what you have remembered so far. When the user asks you to "
    "remember something, or when you observe something worth surfacing in "
    "the UI, call `set_notes` with the FULL updated list of short note "
    "strings (existing notes + new)."
)


shared_state_read_write_agent = Agent(
    name="preferences_assistant",
    instructions=with_state(READ_WRITE_PROMPT),
    model=MODEL,
    model_settings=chat_settings(),
    tools=[set_notes],
)
# ── end doc ──
