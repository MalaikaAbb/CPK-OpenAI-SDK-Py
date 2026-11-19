"use client";

// ── doc: standard-catalog prose block "Use it" — the import (verbatim) ──
import { standardUI } from "@copilotkit/react-core/v2/generative-ui";
// ── end doc ──

import { DemoFrame } from "@/components/demo-frame";

import { GenUIDemo, SHOP_AGENT_ID } from "../../_shared/genui-demo";
import { appUI as extendedUI } from "./extend";
import { appUI as omittedUI } from "./omit";
import { appUI as overriddenUI } from "./override";

/**
 * Harness glue: one variant per catalog. The first is the page's provider line
 * `<CopilotKitProvider runtimeUrl="/api/copilotkit" generativeUI={{ ui: standardUI }}>`
 * (runtimeUrl → /api/genui). All three samples share the id `acme/app@1`, so
 * each lives in its own file and only one is mounted at a time.
 */
export default function DemoPage() {
  return (
    <DemoFrame parentPath="/generative-ui/components/standard-catalog" subtitle="agent: default (genui_components) · genui_shop for ProductCard">
      <GenUIDemo
        variants={[
          {
            id: "standard",
            label: "standardUI as is",
            note: "maplibre-gl is installed, so Map should draw a real basemap.",
            generativeUI: { ui: standardUI },
            welcome: "Try: show the Eiffel Tower and the Louvre on a map.",
          },
          {
            id: "extend",
            label: "extends + ProductCard",
            note: "ProductCard and productSchema are harness glue. Chat is the genui_shop agent (fake search_products).",
            generativeUI: { ui: extendedUI },
            agentId: SHOP_AGENT_ID,
            welcome: "Try: show a ProductCard for the Trail Runner next to a bar chart of its weekly sales.",
          },
          {
            id: "omit",
            label: "omit Map / Video / HtmlView",
            generativeUI: { ui: omittedUI },
            welcome: "Try: show the Eiffel Tower and the Louvre on a map.",
          },
          {
            id: "override",
            label: "overrides Card → MyCard",
            generativeUI: { ui: overriddenUI },
            welcome: "Try: put a short summary of our three plans in a card.",
          },
        ]}
      />
    </DemoFrame>
  );
}
