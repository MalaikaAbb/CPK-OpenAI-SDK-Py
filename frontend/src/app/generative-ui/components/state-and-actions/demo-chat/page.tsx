"use client";

import { DemoFrame } from "@/components/demo-frame";

import { GenUIDemo, SHOP_AGENT_ID } from "../../_shared/genui-demo";
import { plansUI } from "./events-catalog";
import { shopUI as functionsUI } from "./functions-catalog";
import { DeclarationsSection, FunctionsSection, StateSection } from "./sections";
import { shopUI as stateUI } from "./state-catalog";
import { shopUI as writableUI } from "./writable-catalog";

/**
 * Harness glue: one variant per catalog the page builds. The page prints two
 * different `shopUI`s titled `app/catalog.tsx` (state vs functions) plus two
 * fragments; they are kept apart, not merged.
 */
export default function DemoPage() {
  return (
    <DemoFrame parentPath="/generative-ui/components/state-and-actions" subtitle="agent: genui_shop (glue) · default for plans/checkout">
      <GenUIDemo
        variants={[
          {
            id: "state",
            label: "App state (bind)",
            note: "The page's state catalog: ProductCard only (one card per surface — the catalog has no container).",
            generativeUI: { ui: stateUI },
            agentId: SHOP_AGENT_ID,
            page: <StateSection />,
            welcome: "Try: show a product card for p1 Trail Runner.",
          },
          {
            id: "functions",
            label: "Run code on click",
            note: "The page's functions catalog: ProductCard with onAddToCart → addToCart handled in the browser.",
            generativeUI: { ui: functionsUI },
            agentId: SHOP_AGENT_ID,
            page: <FunctionsSection />,
            welcome: "Try: show a product card for p3 Track Spike.",
          },
          {
            id: "events",
            label: "Send a click to the agent",
            note: "PlanCard is harness glue; its onChoose event is the page's.",
            generativeUI: { ui: plansUI },
            welcome: "Try: show a plan card for the Team plan.",
          },
          {
            id: "writable",
            label: "Keep what the user types",
            generativeUI: { ui: writableUI },
            welcome: "Try: show a checkout form with the email set to me@example.com.",
          },
          { id: "declarations", label: "Who may call a function", noChat: true, page: <DeclarationsSection /> },
        ]}
      />
    </DemoFrame>
  );
}
