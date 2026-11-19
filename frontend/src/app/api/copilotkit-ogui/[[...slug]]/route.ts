/**
 * Runtime for /generative-ui/open-generative-ui (minimal + advanced).
 *
 * The `runtime: new CopilotRuntime({...})` property (with its comments) is the
 * page's prose block, verbatim — the page prints it as the inside of a
 * `createCopilotRuntimeHandler({...})` call, which is how it is used here.
 * Harness glue: imports, `agents` (the prose never defines it), basePath and
 * the exports.
 *
 * Agents: `generateSandboxedUi` is a frontend tool the provider registers, and
 * the adapter forwards frontend tools, so neither cell needs backend config.
 * Both ids point at the Quickstart's shared agent (not the Code tab's
 * open_gen_ui*.py, whose prompts force the tool call every turn).
 */
import { HttpAgent } from "@ag-ui/client";
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";

import { SHARED_AGENT_ID, agentUrl } from "@/lib/agents";

const agents = {
  "open-gen-ui": new HttpAgent({ url: agentUrl(SHARED_AGENT_ID) }),
  "open-gen-ui-advanced": new HttpAgent({ url: agentUrl(SHARED_AGENT_ID) }),
};

const handler = createCopilotRuntimeHandler({
  // ── doc: open-generative-ui prose block "src/app/api/copilotkit-ogui/route.ts" (verbatim) ──
      // Server-side config is identical for the minimal and advanced cells —
      // the advanced behaviour (sandbox -> host function calls) is wired
      // entirely on the frontend via `openGenerativeUI.sandboxFunctions` on
      // the provider. The single `openGenerativeUI` flag below turns on
      // Open Generative UI for the listed agent(s); the runtime middleware
      // converts each agent's `generateSandboxedUi` tool call into
      // `open-generative-ui` activity events.
      runtime: new CopilotRuntime({
        agents,
        openGenerativeUI: {
          agents: ["open-gen-ui", "open-gen-ui-advanced"],
        },
      }),
  // ── end doc ──
  basePath: "/api/copilotkit-ogui",
});

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const DELETE = handler;
