/**
 * Runtime for /generative-ui/mcp-apps.
 *
 * The `new CopilotRuntime({...})` call (with its comments) is the page's prose
 * block, verbatim. Harness glue: imports, the two agent constants (the prose
 * uses them but never defines them) and the handler.
 *
 * Agents: the page needs no backend config — the MCP server's tools reach the
 * agent as client tools — so `mcp-apps` is the Quickstart's shared agent
 * (not the Code tab's Excalidraw-prompted mcp_apps.py). `headless-complete`
 * belongs to another doc page; it is kept because the printed map names it,
 * and it also points at the shared agent.
 */
import { HttpAgent } from "@ag-ui/client";
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";

import { SHARED_AGENT_ID, agentUrl } from "@/lib/agents";

const mcpAppsAgent = new HttpAgent({ url: agentUrl(SHARED_AGENT_ID) });
const headlessCompleteAgent = new HttpAgent({ url: agentUrl(SHARED_AGENT_ID) });

// ── doc: mcp-apps prose block "src/app/api/copilotkit-mcp-apps/route.ts" (verbatim) ──
    // The `mcpApps.servers` config is all you need server-side. The runtime
    // auto-applies the MCP Apps middleware to every registered agent: on each
    // MCP tool call it fetches the associated UI resource and emits an
    // `activity` event that the built-in `MCPAppsActivityRenderer` renders
    // inline in the chat.
    const runtime = new CopilotRuntime({
      agents: {
        "mcp-apps": mcpAppsAgent,
        "headless-complete": headlessCompleteAgent,
      },
      mcpApps: {
        servers: [
          {
            type: "http",
            url: process.env.MCP_SERVER_URL || "https://mcp.excalidraw.com/mcp",
            // Always pin a stable `serverId`. Without it CopilotKit hashes the
            // URL, and a URL change silently breaks restoration of persisted
            // MCP Apps in prior conversation threads.
            serverId: "excalidraw",
          },
        ],
      },
    });
// ── end doc ──

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit-mcp-apps",
});

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const DELETE = handler;
