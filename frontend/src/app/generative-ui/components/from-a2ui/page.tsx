import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { CodeBlock, Panel, TryIt } from "@/components/ui";

const BASE = "frontend/src/app/generative-ui/components/from-a2ui/demo-chat";

const BEFORE = `import { basicCatalogV1 } from "@copilotkit/a2ui-renderer";

<CopilotKit runtimeUrl="/api/copilotkit" a2ui={{ catalog: basicCatalogV1 }}>
  {/* Your app */}
</CopilotKit>

// Before
<CopilotKit runtimeUrl="/api/copilotkit" a2ui={{ catalog: myCatalog }}>

// Runtime, before
const runtime = new CopilotRuntime({
  agents,
  a2ui: { injectA2UITool: false, agents: ["shop"] },
});

// Before (catalog)
import { createCatalog, DynamicStringSchema } from "@copilotkit/a2ui-renderer";

const definitions = {
  Airport: {
    props: z.object({ code: DynamicStringSchema, city: DynamicStringSchema }),
  },
  Arrow: { props: z.object({}) },
};
const renderers = { Airport, Arrow };
export const myCatalog = createCatalog(definitions, renderers, {
  catalogId: "acme/flights",
  includeBasicCatalog: true,
});`;

const AFTER_RUNTIME = `// After
<CopilotKitProvider runtimeUrl="/api/copilotkit" generativeUI={{ ui: appUI }}>

// Runtime, after
// Nothing: a run that carries a catalog gets the render_ui tool and the guide.
// To force or limit it: generativeUI: true, or generativeUI: { agents: ["shop"] }.
const runtime = new CopilotRuntime({ agents });`;

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/components/from-a2ui" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A migration map from the older <code>a2ui</code> provider option and <code>@copilotkit/a2ui-renderer</code>{" "}
          catalogs to the A2UI 1.0 engine: the provider takes a <code>ui</code> built with{" "}
          <code>createGenerativeUI</code> and the runtime needs no A2UI option. The demo runs the &ldquo;After&rdquo;
          flight catalog; the &ldquo;Before&rdquo; side needs an agent that emits A2UI operations itself, which no
          OpenAI Agents page prints, so it is shown as code.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={["Show a flight card from SFO (San Francisco) to JFK (New York) with a Book button"]}
            expect="Two Airport components (code + city) with an Arrow between them, plus a standard Button, inside standard layout components."
            fail="Only standard Text shows the codes — Airport/Arrow from the custom catalog were not used."
          />
        </div>
      </Panel>

      <Panel title="Running code">
        <SourceCodeGroup files={[{ file: `${BASE}/app-ui.ts` }, { file: `${BASE}/page.tsx` }]} />
      </Panel>

      <Panel title="Printed by the page, not run">
        <div className="space-y-4">
          <CodeBlock code={BEFORE} filename="Before — as published" language="tsx" />
          <CodeBlock code={AFTER_RUNTIME} filename="After provider + runtime — as published (matches app/api/genui)" language="tsx" />
        </div>
      </Panel>
    </>
  );
}
