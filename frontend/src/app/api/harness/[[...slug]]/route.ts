/**
 * Harness glue — NOT from the docs.
 *
 * The Quickstart's runtime (`app/api/copilotkit/route.ts`, verbatim) registers
 * exactly one agent, `openai_agent`. This runtime registers that one plus every
 * page agent in `lib/agents.ts`, with the same `HttpAgent` and
 * `createCopilotRuntimeHandler` calls the Quickstart uses. It is a catch-all so
 * the root provider can use the runtime's sub-paths (`/info`,
 * `/agent/:id/run`, ...).
 *
 * Plain SSE runtime on purpose: no Intelligence here. Intelligence makes the
 * client open a thread socket per advertised agent, so the Threads routes get
 * their own runtime that advertises one agent.
 */
import { HttpAgent } from "@ag-ui/client";
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";

import { PAGE_AGENT_IDS, SHARED_AGENT_ID, agentUrl } from "@/lib/agents";

const runtime = new CopilotRuntime({
  agents: Object.fromEntries(
    [SHARED_AGENT_ID, ...PAGE_AGENT_IDS].map((id) => [
      id,
      new HttpAgent({ url: agentUrl(id) }),
    ]),
  ),
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/harness",
});

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const DELETE = handler;
