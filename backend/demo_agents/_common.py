"""Harness glue — NOT from the docs.

Every agent on the doc pages' demo Code tabs starts with
`from demo_agents._common import ...`, and no page publishes `_common`.
This file defines just the names those agents import, as small as possible.
Each name says which page needs it. Add a name here only when an agent copied
from a page imports it.
"""

import os

from agents import ModelSettings

# The model every page-specific agent runs on. Defaults to the literal the
# Components page prints (`openaiText("gpt-6-luna")`); override with MODEL.
MODEL = os.environ.get("MODEL", "gpt-6-luna")


def chat_settings(**kwargs) -> ModelSettings:
    """Imported by most Code-tab agents (`model_settings=chat_settings()`).
    Unpublished; SDK defaults.

    Keyword arguments go straight to ModelSettings: interrupt_agent.py
    (/human-in-the-loop) and subagents.py (/multi-agent/subagents) call
    `chat_settings(parallel_tool_calls=False)`."""
    return ModelSettings(**kwargs)


# ── Reasoning pages (/custom-look-and-feel/reasoning-messages,
#    /generative-ui/reasoning): reasoning.py from their Code tab imports these.
# Both pages say models like `gpt-6-luna` emit reasoning tokens; override
# with REASONING_MODEL.
REASONING_MODEL = os.environ.get("REASONING_MODEL", MODEL)


def reasoning_settings() -> ModelSettings:
    """Imported by reasoning.py (Code tab). Unpublished. Its docstring says it
    "asks the Responses API for a reasoning summary", so this asks for exactly
    that and nothing else; the adapter streams the summary as REASONING_*."""
    from openai.types.shared import Reasoning

    return ModelSettings(reasoning=Reasoning(summary="auto"))
