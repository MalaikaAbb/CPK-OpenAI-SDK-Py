import Link from "next/link";

import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DIR = "frontend/src/app/webmcp";

export default function Page() {
  return (
    <>
      <RouteHeader path="/webmcp" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A frontend tool can also be offered to agents built into the browser.
          Adding <code>webmcp</code> (here with a <code>readOnlyHint</code>{" "}
          annotation) to a frontend tool asks CopilotKit to register it with
          the browser&apos;s <code>navigator.modelContext</code> as well as with
          the in-app agent. The page shows two ways to do it: a{" "}
          <code>useFrontendTool</code> call inside the React provider
          (OrderSearch), or <code>tools</code> on a bare{" "}
          <code>CopilotKitCore</code> from <code>@copilotkit/core</code> with
          no React at all.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={["Which of my orders have shipped?", "Do I have any open orders?"]}
            expect="In the OrderSearch demo, the chat agent calls searchOrders. The stub returns 'USB-C dock' for shipped and 'Mechanical keyboard' for open, and the agent repeats it. The banner shows whether this browser has WebMCP. In Chrome 149+ with WebMCP turned on, the Model Context Tool Inspector lists searchOrders (marked read-only) on both demos."
            fail="The agent says it can't look up orders: the frontend tool was not registered. A ReferenceError for searchOrders: the stub import is missing (as published, the page never defines it)."
          />
        </div>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Two demos:{" "}
          <Link className="underline" target="_blank" href="/webmcp/demo-chat">
            OrderSearch (React)
          </Link>{" "}
          ·{" "}
          <Link className="underline" target="_blank" href="/webmcp/demo-chat/core-only">
            webmcp.ts (core only)
          </Link>
        </p>
      </Panel>

      <Panel
        title="The doc's two files"
        description="Both complete and verbatim. The searchOrders import is labelled glue."
      >
        <SourceCodeGroup
          files={[
            { file: `${DIR}/_demo/OrderSearch.tsx` },
            { file: `${DIR}/_demo/webmcp.ts` },
            { file: `${DIR}/_demo/search-orders.ts` },
          ]}
        />
      </Panel>

      <Panel title="The demo pages (glue)">
        <SourceCodeGroup
          files={[
            { file: `${DIR}/demo-chat/page.tsx` },
            { file: `${DIR}/demo-chat/core-only/page.tsx` },
            { file: `${DIR}/_demo/model-context-status.tsx` },
          ]}
        />
      </Panel>

      <Callout tone="warn" title="Doc gaps">
        <ul className="space-y-1.5">
          <li>
            · Both snippets call <code>searchOrders(status)</code>, which the
            page never defines. That is a compile error, and a ReferenceError
            once the tool runs. A three-order stub stands in.
          </li>
          <li>
            · <code>webmcp.ts</code> needs <code>@copilotkit/core</code> as a
            direct dependency (installed here, 1.87.0). The page does not say
            who imports the exported <code>copilotkit</code> or how it relates
            to a <code>&lt;CopilotKit&gt;</code> provider.
          </li>
          <li>
            · Both snippets register the same tool name. They run on separate
            demo pages so they never collide.
          </li>
          <li>
            · You can only test this from outside the app in Chrome 149+, with
            the WebMCP origin trial or{" "}
            <code>chrome://flags/#enable-webmcp-testing</code>, plus Chrome&apos;s
            Model Context Tool Inspector extension.
          </li>
        </ul>
      </Callout>
    </>
  );
}
