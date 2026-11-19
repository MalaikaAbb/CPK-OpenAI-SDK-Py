"use client";

/**
 * WebMCP — OrderSearch.tsx, mounted under the app's CopilotKit provider.
 *
 * Harness glue: this page. The doc's component registers `searchOrders` as a
 * frontend tool with a `webmcp` option. CopilotKit offers it to the in-app
 * agent (the shared Quickstart agent here, no backend config) and, when the
 * browser has WebMCP, to the browser's model context.
 */
import { CopilotChat } from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";
import { SHARED_AGENT_ID } from "@/lib/agents";

import { ModelContextStatus } from "../_demo/model-context-status";
import { OrderSearch } from "../_demo/OrderSearch";

export default function Page() {
  return (
    <DemoFrame parentPath="/webmcp" subtitle={`agent: ${SHARED_AGENT_ID} · OrderSearch`}>
      <OrderSearch />
      <div className="flex h-full flex-col">
        <div className="p-3">
          <ModelContextStatus />
        </div>
        <div className="chat-host mx-auto w-full max-w-4xl min-h-0 flex-1">
          <CopilotChat agentId={SHARED_AGENT_ID} />
        </div>
      </div>
    </DemoFrame>
  );
}
