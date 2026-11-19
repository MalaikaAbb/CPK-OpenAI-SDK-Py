"""Harness glue — NOT from the docs.

`main.py` is the Quickstart's file, byte-for-byte, and serves one agent at
`/agent`. The doc pages after the Quickstart need more agents (their own tools,
state, A2UI, ...), but no page publishes how a multi-agent server mounts them.

The Quickstart's callout ("Already serving the agent from a FastAPI app?")
says to call `add_openai_agents_fastapi_endpoint` on the FastAPI instance you
already have, with a path of your choice. That is all this file does: it takes
the Quickstart's `app` and mounts every agent in `demo_agents.registry.AGENTS`
at `/<agent-id>`.

Run with:  uv run --env-file .env uvicorn server:app --reload --port 8000
"""

from ag_ui_openai_agents import add_openai_agents_fastapi_endpoint

from demo_agents.registry import AGENTS, GAPS
from main import app

for agent_id, wrapped in AGENTS.items():
    add_openai_agents_fastapi_endpoint(app, wrapped, f"/{agent_id}")


@app.get("/health")
def health() -> dict:
    """Harness glue: the agent ids this server mounts, for the /copilot-runtime check."""
    return {"status": "ok", "agents": ["agent", *AGENTS.keys()]}


@app.get("/gaps")
def gaps() -> dict:
    """Harness glue: per-agent doc gaps, mirrored from frontend/src/lib/gaps/*."""
    return GAPS
