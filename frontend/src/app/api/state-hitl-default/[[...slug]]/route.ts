/**
 * Harness glue — NOT from the docs.
 *
 * /shared-state/rendering-in-app prints `<CopilotKit runtimeUrl="/api/copilotkit">`
 * with no `agent` prop and `useAgent()` with no id, so everything addresses the
 * agent named "default". No page publishes an agent or runtime entry for
 * "default", and this repo's `/api/copilotkit` is the Quickstart's verbatim
 * runtime (only `openai_agent`).
 *
 * This runtime registers "default" and points it at the Shared State page's
 * agent (`shared-state-read-write`): its dynamic instructions show the model
 * the shared state, so it can read the canvas the page renders. Same
 * `HttpAgent` + `createCopilotRuntimeHandler` calls as the Quickstart.
 */
import { HttpAgent } from "@ag-ui/client";
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";

import { agentUrl } from "@/lib/agents";

const runtime = new CopilotRuntime({
  agents: {
    default: new HttpAgent({ url: agentUrl("shared-state-read-write") }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/state-hitl-default",
});

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const DELETE = handler;
