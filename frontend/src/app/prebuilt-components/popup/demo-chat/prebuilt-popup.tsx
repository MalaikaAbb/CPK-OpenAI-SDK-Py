// Page wrapper (`"use client"`, imports, `export default function`) from Code
// tab src/app/demos/prebuilt-popup/page.tsx — the prose prints only the
// regions marked below.
"use client";

import React from "react";
// ── doc: CopilotPopup prose block 1 (imports, verbatim) ──
import { CopilotKit, CopilotPopup } from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";
// ── end doc ──
// import { Suggestions } from "./suggestions-mount"; // commented out: unpublished decorative Suggestions

import { nestedInspectorSetting } from "@/lib/inspector"; // harness glue

/**
 * Harness glue (placeholder): `MainContent` is rendered by the page and
 * published nowhere (not in prose, not in the Code tab).
 */
function MainContent() {
  return (
    <main className="h-full overflow-y-auto p-10">
      <h1 className="text-2xl font-semibold">Your app</h1>
      <p className="mt-3 max-w-prose text-sm text-slate-600 dark:text-slate-400">
        Placeholder app body (harness glue). The popup floats over this
        content; closing it leaves a launcher bubble in the corner.
      </p>
    </main>
  );
}

export default function PrebuiltPopupDemo() {
  return (
    // ── doc: CopilotPopup prose block 2 (verbatim except labelled lines) ──
    <CopilotKit
      runtimeUrl="/api/copilotkit"
      agent="openai_agent" // harness: doc prints agent="prebuilt-popup", registered by no printed runtime
      enableInspector={nestedInspectorSetting} // harness glue
    >
      <MainContent />
      <CopilotPopup
        agentId="openai_agent" // harness: doc prints agentId="prebuilt-popup"
        defaultOpen={true}
        labels={{
          chatInputPlaceholder: "Ask the popup anything...",
        }}
      />
      {/* <Suggestions /> commented out: unpublished decorative Suggestions */}
    </CopilotKit>
    // ── end doc ──
  );
}
