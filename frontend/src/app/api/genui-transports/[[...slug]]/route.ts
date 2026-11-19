/**
 * Transports — the page's `app/api/copilotkit/route.ts` sample.
 * https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/transports
 *
 * The page prints only the `new CopilotRuntime({ ... })` call. Its `agent` is
 * never defined, and there are no imports, runner or handler.
 *
 * Harness glue, labelled:
 * - `agent`: the overview page's agent (swapped to the OpenAI Agents SDK, see
 *   app/api/genui), over HTTP.
 * - the imports and the handler, in the overview page's shape.
 * - the path: a catch-all at `/api/genui-transports` (the page's file is
 *   `app/api/copilotkit/route.ts`, which is the Quickstart's in this repo, and
 *   the provider needs the runtime's sub-paths).
 *
 * No `shop` agent: the page's "Only some agents" sample names `agentIds:
 * ["shop"]`, but no page defines a shop agent, so none is registered. The demo
 * shows the half that can be tested: `default` is outside that list.
 */
import { HttpAgent } from "@ag-ui/client";
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";

import { agentUrl } from "@/lib/agents";

const agent = new HttpAgent({ url: agentUrl("genui_components") }); // harness glue

// ── doc: transports prose block "app/api/copilotkit/route.ts" (verbatim) ──
const runtime = new CopilotRuntime({
  agents: { default: agent },
  generativeUI: true,
});
// ── end doc ──

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/genui-transports",
}); // harness glue

export const GET = handler;
export const POST = handler;
