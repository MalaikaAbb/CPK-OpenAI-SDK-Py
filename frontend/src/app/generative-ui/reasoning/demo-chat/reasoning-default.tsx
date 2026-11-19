// Imports and `"use client"` from Code tab src/app/demos/reasoning-default/page.tsx
// (the prose prints only the region marked below).
"use client";

import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";
// import { useReasoningDefaultSuggestions } from "./suggestions"; // commented out: unpublished decorative useReasoningDefaultSuggestions

import { nestedInspectorSetting } from "@/lib/inspector"; // harness glue

// ── doc: prose block "src/app/demos/reasoning-default/page.tsx" (verbatim except labelled lines) ──
const AGENT_ID = "reasoning"; // harness: doc prints "reasoning-default"; the harness's reasoning agent (reasoning.py, from Code tab) serves both variants

export default function ReasoningDefaultDemo() {
  return (
    <CopilotKit
      runtimeUrl="/api/harness" // harness: doc prints "/api/copilotkit" — that is the Quickstart's route, which registers only openai_agent
      agent={AGENT_ID}
      enableInspector={nestedInspectorSetting} // harness glue
    >
      {/* harness: doc's `h-screen` → `h-full` so the composer isn't cut off under the demo bar */}
      <div className="flex justify-center items-center h-full w-full">
        <div className="h-full w-full max-w-4xl">
          <Chat />
        </div>
      </div>
    </CopilotKit>
  );
}

function Chat() {
  // useReasoningDefaultSuggestions(); // commented out: unpublished decorative useReasoningDefaultSuggestions
  return <CopilotChat agentId={AGENT_ID} className="h-full rounded-2xl" />;
}
// ── end doc ──
