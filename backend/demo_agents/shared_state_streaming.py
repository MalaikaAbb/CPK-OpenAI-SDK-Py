"""shared_state_streaming.py — State Rendering page (and /shared-state/streaming).

Doc: https://docs.copilotkit.ai/openai-agents-python/generative-ui/state-rendering

Sources, block by block:
  - imports                         from Code tab (prose prints none)
  - SYSTEM_PROMPT                   from Code tab (prose never shows it)
  - write_document                  doc prose block "shared_state_streaming.py" (verbatim)
  - shared_state_streaming_agent    from Code tab (prose names it, never defines it)
  - _document_so_far +
    DocumentStreamingAgent          doc prose block "shared_state_streaming.py" (verbatim)

Owned by the gen-ui group; the state-hitl group's /shared-state/streaming
route reuses this module and its agent id (`shared_state_streaming`).
"""

# ── from Code tab: imports ──
from collections.abc import AsyncIterator
from contextlib import aclosing

from ag_ui.core import BaseEvent, EventType, RunAgentInput, StateDeltaEvent
from ag_ui_openai_agents import OpenAIAgentsAgent, shared_state
from agents import Agent, function_tool
from pydantic_core import from_json

from demo_agents._common import MODEL, chat_settings

# ── from Code tab: SYSTEM_PROMPT ──
SYSTEM_PROMPT = (
    "You are a collaborative writing assistant. Whenever the user asks you "
    "to write, draft, or revise any piece of text, ALWAYS call the "
    "`write_document` tool with the full content as a single string in the "
    "`document` argument. Never paste the document into a chat message "
    "directly — the document belongs in shared state and the UI renders it "
    "live as you type. After the tool returns, reply with one short sentence."
)


# ── doc: state-rendering prose block "shared_state_streaming.py" (verbatim) ──
@function_tool
def write_document(document: str) -> str:
    """Write a document for the user. Always call this tool when the user asks
    you to write, draft, or revise any text. The `document` argument is
    streamed into shared state under the `document` key so the UI renders
    the body live.
    """
    shared_state().update(document=document)
    return "Document written to shared state."
# ── end doc ──


# ── from Code tab: the Agent the prose names but never defines ──
shared_state_streaming_agent = Agent(
    name="writer",
    instructions=SYSTEM_PROMPT,
    model=MODEL,
    model_settings=chat_settings(),
    tools=[write_document],
)


# ── doc: state-rendering prose block "shared_state_streaming.py" (verbatim) ──
def _document_so_far(arguments: str) -> str | None:
    """The ``document`` argument as far as the model has written it."""
    try:
        # Unfinished JSON: a string cut off mid-way is kept as it stands.
        value = from_json(arguments, allow_partial="trailing-strings")
    except ValueError:
        return None
    document = value.get("document") if isinstance(value, dict) else None
    return document if isinstance(document, str) else None


class DocumentStreamingAgent(OpenAIAgentsAgent):
    """Streams ``write_document``'s ``document`` argument into the state."""

    async def run_streamed(self, input: RunAgentInput) -> AsyncIterator[BaseEvent]:
        arguments: dict[str, str] = {}  # tool call id -> arguments so far
        async with aclosing(super().run_streamed(input)) as events:
            async for event in events:
                yield event
                if (
                    event.type == EventType.TOOL_CALL_START
                    and event.tool_call_name == write_document.name
                ):
                    arguments[event.tool_call_id] = ""
                elif (
                    event.type == EventType.TOOL_CALL_ARGS
                    and event.tool_call_id in arguments
                ):
                    arguments[event.tool_call_id] += event.delta
                    document = _document_so_far(arguments[event.tool_call_id])
                    if document is not None:
                        yield StateDeltaEvent(
                            type=EventType.STATE_DELTA,
                            delta=[
                                {"op": "add", "path": "/document", "value": document}
                            ],
                        )
# ── end doc ──
