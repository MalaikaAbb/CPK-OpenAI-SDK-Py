import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { CodeBlock, Panel, TryIt } from "@/components/ui";

const BASE = "frontend/src/app/generative-ui/components/standard-catalog/demo-chat";

const PROVIDER = `import { standardUI } from "@copilotkit/react-core/v2/generative-ui";

<CopilotKitProvider runtimeUrl="/api/copilotkit" generativeUI={{ ui: standardUI }}>`;

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/components/standard-catalog" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <code>standardUI</code> is the built-in catalog (layout, text, inputs, charts, map, media …). The page
          shows it used as is, extended with an app component, trimmed with <code>.omit()</code>, and with one
          component (<code>Card</code>) replaced by your own. This page has no openai-agents-python URL; it is the
          framework-neutral doc.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["Show the Eiffel Tower and the Louvre on a map"]}
            expect="standardUI tab: a Map with two markers on a real basemap (maplibre-gl is installed). omit tab: no Map — the agent uses another component or explains it cannot."
            fail="On the omit tab a Map still renders: .omit() did not remove it."
          />
          <TryIt
            prompts={["Show a ProductCard for the Trail Runner next to a bar chart of its weekly sales"]}
            expect="extends tab: the glue ProductCard (name, price) next to a standard Chart."
          />
          <TryIt
            prompts={["Put a short summary of our three plans in a card"]}
            expect="overrides tab: the card has the page's MyCard look (rounded-2xl, border, p-6, shadow) instead of the standard Card."
          />
        </div>
      </Panel>

      <Panel title="The page's catalogs (running)">
        <SourceCodeGroup
          files={[{ file: `${BASE}/extend.ts` }, { file: `${BASE}/omit.ts` }, { file: `${BASE}/override.tsx` }]}
        />
      </Panel>

      <Panel title="The demo">
        <SourceCodeGroup files={[{ file: `${BASE}/page.tsx` }]} />
        <div className="mt-4">
          <CodeBlock code={PROVIDER} filename="Use it — as published (unclosed tag; runtimeUrl → /api/genui)" language="tsx" />
        </div>
      </Panel>
    </>
  );
}
