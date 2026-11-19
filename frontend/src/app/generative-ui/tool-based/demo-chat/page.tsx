"use client";

// ── doc: tool-based prose block "import { useComponent } …" (verbatim) ──
import { useComponent } from "@copilotkit/react-core/v2";
import { z } from "zod";
// ── end doc ──

// ── from Code tab: imports the prose fragment relies on ──
import React from "react";
import { CopilotChat } from "@copilotkit/react-core/v2";
import { BarChart, barChartPropsSchema } from "./bar-chart";
// Not imported: `./pie-chart` (the Code tab imports it, but neither the prose
// nor the Code tab publishes it — see the doc gap) and `./suggestions`.
// commented out: unpublished decorative useSuggestions
// import { useSuggestions } from "./suggestions";
// ── end Code tab ──

import { DemoFrame } from "@/components/demo-frame";

// `z` (imported by the doc block) is unused here: the schema lives in bar-chart.tsx.


const AGENT_ID = "gen_ui_tool_based"; // harness id; the Code tab uses "gen-ui-tool-based"

function Chat() {
  // ── doc: tool-based prose block "src/app/demos/gen-ui-tool-based/page.tsx" (verbatim) ──
  useComponent({
    name: "render_bar_chart",
    description: "Display a bar chart with labeled numeric values.",
    parameters: barChartPropsSchema,
    render: BarChart,
  });
  // ── end doc ──

  // commented out: unpublished decorative useSuggestions
  // useSuggestions();

  // ── from Code tab: the chat surface ──
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="h-full w-full max-w-4xl">
        <CopilotChat agentId={AGENT_ID} className="h-full rounded-2xl" />
      </div>
    </div>
  );
  // ── end Code tab ──
}

// Harness glue: the Code tab's default export wraps Chat in
// <CopilotKit runtimeUrl="/api/copilotkit" agent="gen-ui-tool-based">; the
// harness uses the root provider (/api/harness), which registers AGENT_ID.
export default function Page() {
  return (
    <DemoFrame parentPath="/generative-ui/tool-based" subtitle={`agent: ${AGENT_ID}`}>
      <Chat />
    </DemoFrame>
  );
}
