/**
 * Runtime for /generative-ui/a2ui/fixed-schema.
 *
 * The `new CopilotRuntime({...})` call is the page's prose block
 * "app/api/copilotkit/route.ts", verbatim. Mounted here rather than at
 * /api/copilotkit (that path is the Quickstart's verbatim runtime).
 * Harness glue: the imports, `agent` (the prose never defines it — it is an
 * HttpAgent to this repo's a2ui_fixed_schema backend agent) and the handler.
 */
import { HttpAgent } from "@ag-ui/client";
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";

import { agentUrl } from "@/lib/agents";

const agent = new HttpAgent({ url: agentUrl("a2ui_fixed_schema") });

// ── doc: a2ui/fixed-schema prose block "app/api/copilotkit/route.ts" (verbatim) ──
const runtime = new CopilotRuntime({
  agents: { "a2ui-fixed-schema": agent },
  a2ui: { injectA2UITool: false, agents: ["a2ui-fixed-schema"] },
});
// ── end doc ──

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/a2ui-fixed-schema",
});

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const DELETE = handler;
