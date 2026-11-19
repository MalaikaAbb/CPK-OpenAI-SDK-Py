import type { DocGap } from "@/lib/doc-gaps";

/** Gaps that cut across every route group. */
export const SHARED_GAPS: DocGap[] = [
  {
    id: "common-module-unpublished",
    title: "demo_agents._common is imported by every Code-tab agent and published nowhere",
    detail:
      "Every agent file on the demo Code tabs starts with `from demo_agents._common import MODEL, chat_settings` (some also import reasoning_settings, REASONING_MODEL, CHAT_REASONING, openai_client). No page prints that module. Harness glue: `backend/demo_agents/_common.py` defines only the names the copied agents import; MODEL defaults to `gpt-6-luna`, the model literal the Components page prints.",
    severity: "degraded",
    docPath: "/openai-agents-python/quickstart",
    routes: ["/"],
  },
  {
    id: "multi-agent-mounting-unpublished",
    title: "No page shows how to serve more than the Quickstart's one agent",
    detail:
      "The Quickstart serves one agent at `/agent`, and its runtime registers one id (`openai_agent`). Later pages address many other ids (`agentic_chat`, `prebuilt-sidebar`, `my-agent`, `default`, …), but no page publishes the server or registry that mounts them. Harness glue: `backend/server.py` takes the Quickstart's `app` and calls `add_openai_agents_fastapi_endpoint` once per agent, at `/<id>` — the approach the Quickstart's 'Already serving the agent from a FastAPI app?' callout describes. The harness runtime (`app/api/harness/[[...slug]]/route.ts`) registers the same ids. Pages that need no backend config share the Quickstart agent (`openai_agent`); the doc's own agent ids are not followed.",
    severity: "degraded",
    docPath: "/openai-agents-python/quickstart",
    routes: ["/"],
  },
];
