// ── doc: rendering-in-app prose block "app/page.tsx" (verbatim, complete file) ──
// Doc bug kept: no "use client". In a Next app this file is a server component
// that renders hooks-based client code (Canvas). Here the harness demo page
// that imports it (../../demo-chat/page.tsx) is a client module, which is
// the labelled minimal fix.
import { CopilotKit, CopilotSidebar } from "@copilotkit/react-core/v2";
import { Canvas } from "../components/Canvas";
// Harness change (labelled): one Inspector per page; see lib/inspector.ts.
import { nestedInspectorSetting } from "@/lib/inspector";

export default function Page() {
  return (
    // Harness change (labelled): the doc's runtimeUrl is "/api/copilotkit".
    // In this repo that is the Quickstart's verbatim runtime, which registers
    // only `openai_agent`, so "default" would not be found. This runtime
    // registers "default" (see app/api/state-hitl-default).
    // Harness change (labelled): enableInspector, which the doc does not set.
    <CopilotKit
      runtimeUrl="/api/state-hitl-default"
      enableInspector={nestedInspectorSetting}
    >
      <div className="app-shell">
        {/* Your app UI, driven by agent.state */}
        <Canvas />
        {/* Chat is just another consumer of the same agent */}
        <CopilotSidebar />
      </div>
    </CopilotKit>
  );
}
// ── end doc ──
