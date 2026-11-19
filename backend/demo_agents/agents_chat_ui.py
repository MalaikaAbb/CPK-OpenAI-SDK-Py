"""Agents for the chat_ui route group. See demo_agents/registry.py.

Each entry maps an agent id (the path it is mounted at, and the id the
frontend runtime registers) to an OpenAIAgentsAgent. Doc code is verbatim;
anything else is labelled as harness glue or "from Code tab".

Every other chat-UI page (prebuilt components, CSS, slots, markdown, headless
UI, multimodal, threads) needs no backend config and uses the Quickstart's own
agent at /agent (frontend id `openai_agent`).
"""

from ag_ui_openai_agents import OpenAIAgentsAgent

from demo_agents.reasoning import reasoning_agent
from main import agent as quickstart_agent

AGENTS: dict[str, OpenAIAgentsAgent] = {
    # /custom-look-and-feel/reasoning-messages and /generative-ui/reasoning
    # (both the default and the custom variant). The pages address
    # `reasoning-default` / `reasoning-custom`; one agent serves both.
    "reasoning": OpenAIAgentsAgent(reasoning_agent),
    # /voice — the page's runtime route (verbatim) posts to `${AGENT_URL}/voice`.
    # Voice needs no backend config (transcription happens in the Next runtime),
    # so this is the Quickstart's own agent instance, mounted a second time at
    # the path the route expects. Harness glue.
    "voice": quickstart_agent,
}

# Doc gaps that concern this group's backend, keyed by agent id.
GAPS: dict[str, list[str]] = {
    "reasoning": [
        "No prose on either reasoning page prints a backend agent; reasoning.py is from the Code tab.",
        "reasoning.py imports REASONING_MODEL and reasoning_settings from the unpublished demo_agents._common (harness glue: env REASONING_MODEL, default MODEL; ModelSettings(reasoning=Reasoning(summary='auto'))).",
    ],
    "voice": [
        "The voice route posts to `${AGENT_URL}/voice`, but the only printed backend (Quickstart main.py) mounts /agent. Harness glue mounts the Quickstart agent again at /voice.",
        "The voice route reads AGENT_URL as an origin; the Quickstart route reads it as the full endpoint URL (…/agent). With AGENT_URL=http://localhost:8000/agent the voice route calls /agent/voice and 404s.",
    ],
}
