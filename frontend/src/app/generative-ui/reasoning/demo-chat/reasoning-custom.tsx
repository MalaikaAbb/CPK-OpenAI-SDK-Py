// Imports and `"use client"` from Code tab src/app/demos/reasoning-custom/page.tsx
// (the prose prints only the region marked below).
"use client";

import type { CopilotChatReasoningMessage } from "@copilotkit/react-core/v2";
import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";
import { ReasoningBlock } from "./reasoning-block";
// import { useReasoningCustomSuggestions } from "./suggestions"; // commented out: unpublished decorative useReasoningCustomSuggestions

import { nestedInspectorSetting } from "@/lib/inspector"; // harness glue

// ── doc: prose block "src/app/demos/reasoning-custom/page.tsx" (verbatim except labelled lines) ──
const AGENT_ID = "reasoning"; // harness: doc prints "reasoning-custom"; one reasoning agent serves both variants

export default function ReasoningCustomDemo() {
  return (
    <CopilotKit
      runtimeUrl="/api/harness" // harness: doc prints "/api/copilotkit" (the Quickstart's route registers only openai_agent)
      agent={AGENT_ID}
      enableInspector={nestedInspectorSetting} // harness glue
    >
      {/* harness: doc's `h-screen` → `h-full` */}
      <div className="flex justify-center items-center h-full w-full">
        <div className="h-full w-full max-w-4xl">
          <Chat />
        </div>
      </div>
    </CopilotKit>
  );
}

function Chat() {
  // useReasoningCustomSuggestions(); // commented out: unpublished decorative useReasoningCustomSuggestions
  return (
    <CopilotChat
      agentId={AGENT_ID}
      className="h-full rounded-2xl"
      messageView={{
        reasoningMessage:
          ReasoningBlock as unknown as typeof CopilotChatReasoningMessage,
      }}
    />
  );
}
// ── end doc ──
