/**
 * Components and surfaces (overview) — the page's
 * `app/api/copilotkit/[[...slug]]/route.ts`, with three labelled changes.
 * https://docs.copilotkit.ai/openai-agents-python/generative-ui/components
 *
 * 1. Agent swap (user instruction): the page builds a TanStack `BuiltInAgent`
 *    (`openaiText("gpt-6-luna")`, prompt "You are a helpful assistant. When a
 *    visual answer helps, render it with generative UI."). Here `agent` is an
 *    `HttpAgent` to the OpenAI Agents SDK Agent with that prompt
 *    (`backend/demo_agents/genui_components.py`). The `@tanstack/ai` imports
 *    go with it.
 * 2. basePath: `/api/copilotkit` belongs to the Quickstart's single-route
 *    runtime in this repo, so this runtime lives at `/api/genui`.
 * 3. Harness glue: a second entry, `genui_shop` (the same agent plus a
 *    fake-data search_products tool), for the shop catalogs whose ProductCard
 *    copies values "from a tool result". The page registers only `default`.
 *
 * The runtime gets no `generativeUI` option, as printed: a run whose provider
 * sends a tool-transport catalog gets `render_ui` and the guide on its own.
 */
import { HttpAgent } from "@ag-ui/client";
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
  InMemoryAgentRunner,
} from "@copilotkit/runtime/v2";

import { agentUrl } from "@/lib/agents";

// Swapped (see 1.): the page's `const agent = new BuiltInAgent({ type: "tanstack", ... })`.
const agent = new HttpAgent({ url: agentUrl("genui_components") });

// ── doc: components prose block "app/api/copilotkit/[[...slug]]/route.ts" (verbatim, except the marked lines) ──
const runtime = new CopilotRuntime({
  agents: {
    default: agent,
    genui_shop: new HttpAgent({ url: agentUrl("genui_shop") }), // harness glue (see 3.)
  },
  runner: new InMemoryAgentRunner(),
});

const handler = createCopilotRuntimeHandler({ runtime, basePath: "/api/genui" /* doc: "/api/copilotkit" */ });

export const GET = handler;
export const POST = handler;
// ── end doc ──
