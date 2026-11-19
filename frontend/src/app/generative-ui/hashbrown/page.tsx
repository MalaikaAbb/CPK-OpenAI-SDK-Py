import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/hashbrown" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The same bring-your-own idea as JSON Render, but streaming. The agent
          answers with a <code>{"{ ui: [...] }"}</code> envelope, and the
          assistant-message slot feeds the growing text to Hashbrown&apos;s
          streaming JSON parser and UI kit, so metrics, charts and deal cards
          appear one by one while the reply is still arriving. The kit
          constrains which components (and props) the output may use.
        </p>
        <div className="mt-4">
          <Callout tone="info" title="Package pin">
            The page states <code>@hashbrownai/*</code>{" "}
            <code>0.5.0-beta.4</code>. This repo runs the page&apos;s files on{" "}
            <code>0.7.0</code> (the last line that still has <code>prompt</code>{" "}
            and <code>useUiKit({"{ examples }"})</code>, both of which the
            renderer uses; 0.8 removed them).
          </Callout>
        </div>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Show me a sales dashboard with revenue, a pie chart by segment and the top 3 deals",
              "Bar chart of monthly signups for the last 6 months",
            ]}
            expect="Components render progressively inside the assistant message while it streams (a metric first, then charts/cards), with no raw JSON visible at the end."
            fail="Raw JSON text stays in the bubble, nothing renders until the very end and then fails, or a Hashbrown error appears in the console."
          />
        </div>
      </Panel>

      <Panel
        title="The running demo"
        description="hashbrown-page / chat / hashbrown-renderer are the complete files the page's Markdown export prints. metric-card, charts/*, types and the runtime route are from the Code tab."
      >
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/generative-ui/hashbrown/demo-chat/hashbrown-page.tsx" },
            { file: "frontend/src/app/generative-ui/hashbrown/demo-chat/chat.tsx" },
            { file: "frontend/src/app/generative-ui/hashbrown/demo-chat/hashbrown-renderer.tsx" },
            { file: "frontend/src/app/api/copilotkit-declarative-hashbrown/[[...slug]]/route.ts" },
            { file: "frontend/src/app/generative-ui/hashbrown/demo-chat/metric-card.tsx" },
            { file: "frontend/src/app/generative-ui/hashbrown/demo-chat/types.ts" },
            { file: "frontend/src/app/generative-ui/hashbrown/demo-chat/charts/chart-config.ts" },
            { file: "frontend/src/app/generative-ui/hashbrown/demo-chat/charts/bar-chart.tsx" },
            { file: "frontend/src/app/generative-ui/hashbrown/demo-chat/charts/pie-chart.tsx" },
          ]}
        />
      </Panel>

      <Panel
        title="The agent"
        description="The page prints no backend. Both files are from the Code tab; the prompt defines the wire format the renderer parses."
      >
        <SourceCodeGroup
          files={[
            { file: "backend/demo_agents/byoc_hashbrown.py" },
            { file: "backend/demo_agents/byoc_hashbrown_prompt.py" },
          ]}
        />
      </Panel>
    </>
  );
}
