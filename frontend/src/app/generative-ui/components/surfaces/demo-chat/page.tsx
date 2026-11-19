"use client";

import type { GenerativeUIConfig } from "@copilotkit/react-core/v2/generative-ui";

import { DemoFrame } from "@/components/demo-frame";

import { GenUIDemo, SHOP_AGENT_ID } from "../../_shared/genui-demo";
import { PRODUCTS } from "../../_shared/shop-glue";
import { shopUI } from "./catalog";
import { FeaturedProducts } from "./featured-products";
import { LimitedFeatured, Recommendations, SidebarNotes } from "./targets";
import "./surfaces.css";

// ── doc: surfaces prose block "When a component fails" — the provider's generativeUI value (verbatim) ──
// The page prints it as an unclosed `<CopilotKitProvider runtimeUrl="/api/copilotkit" generativeUI={{ ... }}>`
// tag; the provider itself is in GenUIDemo (runtimeUrl → /api/genui, harness).
const generativeUI: GenerativeUIConfig = {
  ui: shopUI,
  errorBoundary: {
    onError: (info) => console.warn(info.kind, info.surfaceId, info.error.message),
    fallback: ({ retry }) => <button onClick={retry}>Try again</button>,
  },
};
// ── end doc ──

/** Harness glue: the page around the targets, and the variant switcher. */
export default function DemoPage() {
  return (
    <DemoFrame parentPath="/generative-ui/components/surfaces" subtitle="agent: genui_shop (glue: overview agent + fake search_products)">
      <GenUIDemo
        variants={[
          {
            id: "page-targets",
            label: "Page targets",
            note: "featured (description + fallback), recommendations-<id> per product, sidebar-notes (autoScroll off).",
            generativeUI,
            agentId: SHOP_AGENT_ID,
            welcome: "Try: show me cheap running shoes in the featured row.",
            page: (
              <div className="space-y-6">
                <section>
                  <h2 className="mb-2 text-sm font-semibold">Featured products</h2>
                  <FeaturedProducts products={PRODUCTS} />
                </section>
                <section>
                  <h2 className="mb-2 text-sm font-semibold">Product page — recommendations</h2>
                  <Recommendations />
                </section>
                <section>
                  <h2 className="mb-2 text-sm font-semibold">Sidebar notes</h2>
                  <SidebarNotes />
                </section>
              </div>
            ),
          },
          {
            id: "limit",
            label: "Limit the components",
            note: "The featured target with only ui + components — no description, no fallback.",
            generativeUI,
            agentId: SHOP_AGENT_ID,
            welcome: "Try: put a table of shoe sizes in the featured area.",
            page: (
              <section>
                <h2 className="mb-2 text-sm font-semibold">featured</h2>
                <LimitedFeatured />
              </section>
            ),
          },
        ]}
      />
    </DemoFrame>
  );
}
