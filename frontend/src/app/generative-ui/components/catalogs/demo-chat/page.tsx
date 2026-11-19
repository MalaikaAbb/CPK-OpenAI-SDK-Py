"use client";

import { DemoFrame } from "@/components/demo-frame";

import { GenUIDemo, SHOP_AGENT_ID } from "../../_shared/genui-demo";
import { shopUI } from "./catalog";
import { appUI } from "./combine";
import { ExportView } from "./export-view";
import { schemaLibrariesUI } from "./schema-libraries";

/**
 * Harness glue: one variant per catalog the page builds. Each mounts the
 * provider with `generativeUI={{ ui }}`, the page's provider line
 * (`<CopilotKitProvider runtimeUrl="/api/copilotkit" generativeUI={{ ui: shopUI }}>`),
 * pointed at /api/genui.
 */
export default function DemoPage() {
  return (
    <DemoFrame parentPath="/generative-ui/components/catalogs" subtitle="agent: genui_shop (glue: overview agent + fake search_products)">
      <GenUIDemo
        variants={[
          {
            id: "shop",
            label: "shopUI (Create a catalog)",
            note: "Only ProductGrid and ProductCard exist in this catalog — no standard components.",
            generativeUI: { ui: shopUI },
            agentId: SHOP_AGENT_ID,
            welcome: "Try: show me three running shoes as product cards.",
          },
          {
            id: "combined",
            label: "appUI (Combine catalogs)",
            note: "standardUI + cartUI (glue) + Hero (glue), merged with extends.",
            generativeUI: { ui: appUI },
            agentId: SHOP_AGENT_ID,
            welcome: "Try: show a hero titled 'Spring sale' and a cart badge with 3 items.",
          },
          {
            id: "schemas",
            label: "zod vs Valibot props",
            note: "Two glue components whose props come from the page's zod and Valibot lines.",
            generativeUI: { ui: schemaLibrariesUI },
            agentId: SHOP_AGENT_ID,
            welcome: "Try: show a ValibotProductCard for a $40 mug.",
          },
          { id: "export", label: "exportA2UICatalog", noChat: true, page: <ExportView /> },
        ]}
      />
    </DemoFrame>
  );
}
