import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Panel, TryIt } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/json-render" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Bring-your-own rendering with no tools involved. The agent&apos;s
          prompt makes it answer with a flat <code>{"{ root, elements }"}</code>{" "}
          JSON spec; the chat&apos;s assistant-message slot is replaced with a
          component that parses that text, checks the element types against an
          allow-list, and hands it to <code>@json-render/react</code>, which
          renders each element through a registry bound to a Zod catalog
          (MetricCard, BarChart, PieChart). Until the text parses, the normal
          assistant bubble is shown.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Show me Q3 revenue with a bar chart by month",
              "Give me a pie chart of deals by stage",
            ]}
            expect="Once the reply finishes, a metric card and/or chart renders in place of the assistant message (no raw JSON left visible)."
            fail="The raw JSON stays on screen as text, the message is blank, or the chat shows a parse/render error."
          />
        </div>
      </Panel>

      <Panel
        title="The running demo"
        description="chat / json-render-renderer / catalog / registry are the four complete files the page's Markdown export prints. page.tsx, metric-card, charts/* and types are from the Code tab."
      >
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/generative-ui/json-render/demo-chat/page.tsx" },
            { file: "frontend/src/app/generative-ui/json-render/demo-chat/chat.tsx" },
            { file: "frontend/src/app/generative-ui/json-render/demo-chat/json-render-renderer.tsx" },
            { file: "frontend/src/app/generative-ui/json-render/demo-chat/catalog.ts" },
            { file: "frontend/src/app/generative-ui/json-render/demo-chat/registry.tsx" },
            { file: "frontend/src/app/generative-ui/json-render/demo-chat/metric-card.tsx" },
            { file: "frontend/src/app/generative-ui/json-render/demo-chat/types.ts" },
            { file: "frontend/src/app/generative-ui/json-render/demo-chat/charts/chart-config.ts" },
            { file: "frontend/src/app/generative-ui/json-render/demo-chat/charts/bar-chart.tsx" },
            { file: "frontend/src/app/generative-ui/json-render/demo-chat/charts/pie-chart.tsx" },
          ]}
        />
      </Panel>

      <Panel
        title="The agent"
        description="The page prints no backend, only the output contract. The whole file is from the Code tab."
      >
        <SourceCode file="backend/demo_agents/byoc_json_render.py" />
      </Panel>
    </>
  );
}
