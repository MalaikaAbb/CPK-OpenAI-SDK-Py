import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Panel, TryIt } from "@/components/ui";

const BASE = "frontend/src/app/generative-ui/components/surfaces/demo-chat";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/components/surfaces" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Generated UI is not limited to the chat. A <code>GenerativeUISurface</code> turns an area of the page
          into a named target the agent can see (id plus a description), so a chat request can fill, replace or
          clear that area. Targets can restrict the components allowed in them, opt out of auto-scroll, exist once
          per item, and fall back to a retry button when a component throws.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["Show me cheap running shoes in the featured row", "Show the featured products again"]}
            expect="The first prompt calls search_products and replaces the three-product fallback row with a ProductGrid of ProductCards (with images); the second deletes the surface and the fallback row returns."
            fail="The grid lands in the chat instead of the featured row — the target's description never reached the agent."
          />
          <TryIt
            prompts={["Recommend two related products under the Trail Runner"]}
            expect="With Trail Runner selected, the recommendations target for p1 fills (without the Trail Runner itself). Switch product: that target is empty; switch back: it is still there."
          />
          <TryIt
            prompts={["(Limit tab) Put a table of shoe sizes in the featured area"]}
            expect="Table is not allowed there (not in shopUI nor in the target's components list): the agent uses ProductCards or says it cannot."
          />
        </div>
      </Panel>

      <Panel title="The page's code (running)">
        <SourceCodeGroup
          files={[
            { file: `${BASE}/featured-products.tsx` },
            { file: `${BASE}/targets.tsx` },
            { file: `${BASE}/surfaces.css` },
            { file: `${BASE}/catalog.ts` },
          ]}
        />
      </Panel>

      <Panel title="The demo" description="The provider config is the page's “When a component fails” sample.">
        <SourceCodeGroup
          files={[
            { file: `${BASE}/page.tsx` },
            { file: "frontend/src/app/generative-ui/components/_shared/genui-demo.tsx" },
            { file: "frontend/src/app/generative-ui/components/_shared/shop-glue.tsx" },
            { file: "backend/demo_agents/genui_shop.py" },
          ]}
        />
      </Panel>
    </>
  );
}
