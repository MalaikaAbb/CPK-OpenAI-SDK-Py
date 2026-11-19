/**
 * Runtime for /generative-ui/a2ui/dynamic-schema — harness glue.
 *
 * The page's provider points at `/api/copilotkit-declarative-gen-ui` but the
 * prose never prints that route. What it does say: on the default path the
 * provider's catalog turns A2UI on and injects the tool, so the runtime needs
 * NO `a2ui` block. This route is therefore a plain runtime with no A2UI
 * options at all. (CopilotRuntime applies A2UIMiddleware when the request
 * carries a provider catalog.)
 *
 * Agent: the default path needs no backend tool, so the doc's id
 * `declarative-gen-ui` is registered against the Quickstart's shared agent.
 * (The Code tab instead uses `injectA2UITool: false` + a backend-owned
 * generate_a2ui via ag-ui-a2ui-toolkit — the opt-out path; not used here.)
 */
import { HttpAgent } from "@ag-ui/client";
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";

import { SHARED_AGENT_ID, agentUrl } from "@/lib/agents";

const runtime = new CopilotRuntime({
  agents: {
    "declarative-gen-ui": new HttpAgent({ url: agentUrl(SHARED_AGENT_ID) }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit-declarative-gen-ui",
});

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const DELETE = handler;
