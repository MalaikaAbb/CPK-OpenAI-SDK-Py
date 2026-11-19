import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Panel, TryIt } from "@/components/ui";

const BASE = "frontend/src/app/generative-ui/components/transports/demo-chat";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/components/transports" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Two ways for generated UI to reach the browser: the agent calls the runtime-provided{" "}
          <code>render_ui</code> tool, or it writes A2UI operations in <code>```a2ui</code> blocks inside its
          markdown reply. The runtime&apos;s <code>generativeUI: true</code> flag forces the tool on, and the
          provider&apos;s <code>agentIds</code> limits which agents receive the catalog.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["Compare the Starter, Team, and Enterprise plans in a table"]}
            expect="Tool tab: a Table renders from a render_ui tool call. Markdown tab: the same Table renders inline in the reply text, with no tool call."
            fail="A markdown table in plain text on either tab."
          />
          <TryIt
            prompts={['(agentIds: ["shop"] tab) same prompt']}
            expect="No generated component: the chat agent is default, which is outside agentIds, so its run carries no catalog. The in-list half (a shop agent) is not testable — no page defines one."
          />
        </div>
      </Panel>

      <Panel title="Running code">
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/api/genui-transports/[[...slug]]/route.ts" },
            { file: `${BASE}/configs.ts` },
            { file: `${BASE}/page.tsx` },
          ]}
        />
      </Panel>
    </>
  );
}
