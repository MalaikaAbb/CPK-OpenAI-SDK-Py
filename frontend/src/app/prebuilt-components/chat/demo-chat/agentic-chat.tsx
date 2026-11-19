// Page wrapper (`"use client"`, imports, `export default function`) from Code
// tab src/app/demos/agentic-chat/page.tsx — the prose prints only the regions
// marked below.
"use client";

import React from "react";
// ── doc: CopilotChat prose block 1 (imports, verbatim) ──
import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";
// ── end doc ──
// import { useAgenticChatSuggestions } from "./suggestions"; // commented out: unpublished decorative useAgenticChatSuggestions

import { nestedInspectorSetting } from "@/lib/inspector"; // harness glue

export default function AgenticChatDemo() {
  return (
    // ── doc: CopilotChat prose block 2 (verbatim except the labelled agent id) ──
    <CopilotKit
      runtimeUrl="/api/copilotkit"
      agent="openai_agent" // harness: doc prints agent="agentic_chat", which no printed runtime registers; this is the Quickstart's agent on the Quickstart's route
      enableInspector={nestedInspectorSetting} // harness glue
    >
      <Chat />
    </CopilotKit>
    // ── end doc ──
  );
}

// ── doc: CopilotChat prose block 3 (verbatim except the labelled lines) ──
function Chat() {
  // useAgenticChatSuggestions(); // commented out: unpublished decorative useAgenticChatSuggestions
  return <CopilotChat agentId="openai_agent" />; // harness: doc prints agentId="agentic_chat"
}
// ── end doc ──
