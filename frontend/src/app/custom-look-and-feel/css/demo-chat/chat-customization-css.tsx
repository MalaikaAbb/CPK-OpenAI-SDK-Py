// from Code tab — src/app/demos/chat-customization-css/page.tsx. The prose
// describes this page (a scoped wrapper around <CopilotChat>) but prints only
// its first line, `import "./theme.css";`. Trimmed to what the feature needs;
// every change is labelled.
"use client";

// Chat Customization (CSS) — every visual choice in this demo lives in
// theme.css and is scoped to the `.chat-css-demo-scope` wrapper. The page
// intentionally stays minimal so the contrast against the default look
// comes entirely from the stylesheet.
//
// https://docs.copilotkit.ai/custom-look-and-feel/customize-built-in-ui-components

import React from "react";
import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";
// ── doc: CSS prose block 1 (verbatim) ──
import "./theme.css";
// ── end doc ──

import { nestedInspectorSetting } from "@/lib/inspector"; // harness glue

export default function ChatCustomizationCssDemo() {
  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit"
      agent="openai_agent" // harness: Code tab prints agent="chat-customization-css"; this is the Quickstart's agent on the Quickstart's route
      enableInspector={nestedInspectorSetting} // harness glue
    >
      {/* harness: Code tab's `h-screen` → `h-full` so it fits under the demo bar */}
      <div className="flex justify-center items-center h-full w-full bg-white p-6 dark:bg-background">
        <div className="chat-css-demo-scope h-full w-full max-w-4xl">
          <CopilotChat
            agentId="openai_agent" // harness: Code tab prints agentId="chat-customization-css"
            className="h-full"
            // attachments={{ enabled: true }} // trimmed: not part of the CSS feature (Multimodal Attachments page)
          />
        </div>
      </div>
    </CopilotKit>
  );
}
