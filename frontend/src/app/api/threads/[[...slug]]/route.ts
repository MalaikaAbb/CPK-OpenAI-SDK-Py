/**
 * Harness glue — the Threads routes' runtime.
 *
 * Neither Threads page prints a Next route handler; Headless Threads prints
 * only the `CopilotRuntime` options (server.ts, verbatim in lib/intelligence.ts).
 * This wraps them with the same `createCopilotRuntimeHandler` call the
 * Quickstart uses, as a catch-all so the client can reach the thread
 * endpoints. It registers exactly ONE agent, `default` (server.ts's id): the
 * Intelligence client opens a thread socket per advertised agent, and the
 * drawer resolves `"default"` when nothing names an agent.
 *
 * `default` is the Quickstart's agent (backend /agent) — threads need no
 * backend config of their own.
 */
import { HttpAgent } from "@ag-ui/client";
import { createCopilotRuntimeHandler } from "@copilotkit/runtime/v2";

import { SHARED_AGENT_ID, agentUrl } from "@/lib/agents";
import { createThreadsRuntime } from "@/lib/intelligence";

const runtime = createThreadsRuntime(
  new HttpAgent({ url: agentUrl(SHARED_AGENT_ID) }),
);

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/threads",
});

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const DELETE = handler;
