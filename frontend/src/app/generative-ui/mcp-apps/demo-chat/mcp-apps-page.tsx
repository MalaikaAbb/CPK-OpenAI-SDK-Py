"use client";

// MCP Apps page component. The function shell and imports are from the Code
// tab (src/app/demos/mcp-apps/page.tsx); the body is the prose fragment.

import React from "react";
import { CopilotKit } from "@copilotkit/react-core/v2";
import { Chat } from "./chat";

import { nestedInspectorSetting } from "@/lib/inspector";

export default function MCPAppsDemo() {
  // ── doc: mcp-apps prose block "src/app/demos/mcp-apps/page.tsx" (verbatim + harness enableInspector) ──
  // No `renderActivityMessages`, no `useRenderActivityMessage` — the
  // CopilotKitProvider auto-registers the built-in `MCPAppsActivityRenderer`
  // for the "mcp-apps" activity type. A plain <CopilotChat /> is enough.
  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit-mcp-apps"
      agent="mcp-apps"
      // harness: one Inspector per page (lib/inspector.ts); not in the doc
      enableInspector={nestedInspectorSetting}
    >
      <div className="flex justify-center items-center h-screen w-full">
        <div className="h-full w-full max-w-4xl">
          <Chat />
        </div>
      </div>
    </CopilotKit>
  );
  // ── end doc ──
}
