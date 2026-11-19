// ── harness fix: the prose page.tsx has no "use client" (the Code tab's has) ──
"use client";

// ── doc: a2ui/dynamic-schema prose block "page.tsx" (verbatim) ──
import React from "react";
import { CopilotKit } from "@copilotkit/react-core/v2";

import { myCatalog } from "./a2ui/catalog";
import { Chat } from "./chat";

export default function DeclarativeGenUIDemo() {
  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit-declarative-gen-ui"
      agent="declarative-gen-ui"
      a2ui={{ catalog: myCatalog }}
      // harness: one Inspector per page (lib/inspector.ts); not in the doc
      enableInspector={nestedInspectorSetting}
    >
      <div className="flex justify-center items-center h-screen w-full">
        <div className="h-full w-full max-w-4xl">
          <Chat />
        </div>
      </div>
    </CopilotKit>
// ── end doc — the published block stops here; harness fix closes it: ──
  );
}

import { nestedInspectorSetting } from "@/lib/inspector";
