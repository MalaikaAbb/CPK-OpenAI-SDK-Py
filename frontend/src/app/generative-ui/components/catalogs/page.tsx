import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { CodeBlock, Panel, TryIt } from "@/components/ui";

const EXPORT = `import { exportA2UICatalog } from "@copilotkit/react-core/v2/generative-ui";

const catalog = exportA2UICatalog(appUI, { title: "Acme app" });
fs.writeFileSync("acme-catalog.json", JSON.stringify(catalog, null, 2));`;

const PROVIDER = `<CopilotKitProvider runtimeUrl="/api/copilotkit" generativeUI={{ ui: shopUI }}>`;

const BASE = "frontend/src/app/generative-ui/components/catalogs/demo-chat";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/components/catalogs" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A catalog is the allow-list of components the agent may render: each entry pairs a React component with a
          description and a props schema. The schema both tells the model what to send and types the component, so
          they cannot drift. The demo runs each catalog the page builds (a two-component shop, a merged catalog, zod
          vs Valibot props) and prints the A2UI 1.0 export.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["Show me three running shoes as product cards"]}
            expect="shopUI tab: the agent calls search_products, then renders a ProductGrid with three ProductCards whose name, price and image match the tool result."
            fail="Standard components (Table, Card) appear — they are not in this catalog — or values that are not in the tool result."
          />
          <TryIt
            prompts={["Show a hero titled 'Spring sale' and a cart badge with 3 items"]}
            expect="appUI tab: the Hero heading and the CartBadge render (inside standard layout components) — extends merged the three catalogs."
          />
          <TryIt
            prompts={["(exportA2UICatalog tab — no prompt)"]}
            expect="The Panel order line reads component, title, children, color, and the JSON lists the standard components plus CartBadge and Hero."
            fail="Any other order: parameterOrder is not applied to the export."
          />
        </div>
      </Panel>

      <Panel title="The catalogs (running)">
        <SourceCodeGroup
          files={[
            { file: `${BASE}/catalog.tsx` },
            { file: `${BASE}/combine.tsx` },
            { file: `${BASE}/schema-libraries.tsx` },
            { file: `${BASE}/panel-order.tsx` },
            { file: `${BASE}/type-check.tsx` },
          ]}
          note="type-check.tsx is compiled, never rendered: the deliberate props.color error is kept verbatim under @ts-expect-error."
        />
      </Panel>

      <Panel title="The demo">
        <SourceCodeGroup files={[{ file: `${BASE}/page.tsx` }, { file: `${BASE}/export-view.tsx` }]} />
      </Panel>

      <Panel title="Printed by the page, not run as is">
        <div className="space-y-4">
          <CodeBlock code={PROVIDER} filename="Provider line — as published (unclosed tag; runtimeUrl → /api/genui in the demo)" language="tsx" />
          <CodeBlock code={EXPORT} filename="Export the catalog — as published (fs is never imported; a browser has no fs)" language="ts" />
        </div>
      </Panel>
    </>
  );
}
