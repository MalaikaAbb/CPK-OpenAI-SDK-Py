// ── harness fix: the prose block has no "use client"; the Code tab's page.tsx does ──
"use client";

// ── doc: open-generative-ui prose block "src/app/demos/open-gen-ui-advanced/page.tsx" (verbatim except as marked) ──
import React from "react";
import {
  CopilotKit,
  CopilotChat,
  // commented out: unpublished decorative useConfigureSuggestions (only used for suggestions)
  // useConfigureSuggestions,
} from "@copilotkit/react-core/v2";
import { openGenUiSandboxFunctions } from "./sandbox-functions";
// commented out: unpublished decorative openGenUiSuggestions
// import { openGenUiSuggestions } from "./suggestions";

export default function OpenGenUiAdvancedDemo() {
  return (
    // Pass the sandbox-function array on the `openGenerativeUI` provider prop.
    // The built-in `OpenGenerativeUIActivityRenderer` wires these as callable
    // remotes inside the agent-authored iframe.
    <CopilotKit
      runtimeUrl="/api/copilotkit-ogui"
      agent="open-gen-ui-advanced"
      openGenerativeUI={{ sandboxFunctions: openGenUiSandboxFunctions }}
      // harness: one Inspector per page (lib/inspector.ts); not in the doc
      enableInspector={nestedInspectorSetting}
    >
      <div className="flex justify-center items-center h-screen w-full">
        <div className="h-full w-full max-w-4xl">
          <Chat />
        </div>
      </div>
    </CopilotKit>
// ── end doc — the published block stops here (mid-function, and the rendered page
// splices sandbox-functions.ts onto it). Harness fix closes the function: ──
  );
}

// ── from Code tab: Chat (the prose renders it but never defines it) ──
function Chat() {
  // commented out: unpublished decorative suggestions
  // useConfigureSuggestions({
  //   suggestions: openGenUiSuggestions,
  //   available: "always",
  // });

  return (
    <div className="flex h-full w-full flex-col p-3">
      <CopilotChat
        agentId="open-gen-ui-advanced"
        className="flex-1 rounded-2xl"
      />
    </div>
  );
}
// ── end Code tab ──

import { nestedInspectorSetting } from "@/lib/inspector";
