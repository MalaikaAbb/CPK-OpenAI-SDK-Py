/**
 * Runtime for /generative-ui/hashbrown — from Code tab
 * src/app/api/copilotkit-declarative-hashbrown/route.ts, reduced to what the
 * feature needs. The page's page.tsx (Markdown export) points its provider at
 * this path with agent "declarative-hashbrown-demo"; the prose never prints
 * the route. No special runtime options.
 *
 * Dropped from the Code-tab file: `extractForwardedHeaders` (from the
 * unpublished `@/lib/header-forwarding`, only used for test mocks) and the
 * try/catch JSON error wrapper. Harness: the HttpAgent URL is this repo's
 * `byoc_hashbrown` backend agent; the handler is a catch-all like the
 * harness runtime, rather than the Code tab's single-route POST.
 */
import { HttpAgent } from "@ag-ui/client";
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";

import { agentUrl } from "@/lib/agents";

const runtime = new CopilotRuntime({
  agents: {
    "declarative-hashbrown-demo": new HttpAgent({ url: agentUrl("byoc_hashbrown") }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit-declarative-hashbrown",
});

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const DELETE = handler;
