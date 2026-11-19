// doc: hashbrown — complete file printed in the page's Markdown export (verbatim).
// The rendered HTML page shows only the example JSON; the .md carries this file.
// Kept under its own name so the harness page.tsx can frame it; the doc's
// <CopilotKit> (own runtimeUrl + agent) is mounted nested, as printed.
// src/app/demos/declarative-hashbrown/page.tsx
"use client";

import { CopilotKit } from "@copilotkit/react-core/v2";
import { HashBrownDashboard } from "./hashbrown-renderer";
import { Chat } from "./chat";
// harness glue import (for the enableInspector prop below)
import { nestedInspectorSetting } from "@/lib/inspector";

export default function ByocHashbrownDemoPage() {
  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit-declarative-hashbrown"
      agent="declarative-hashbrown-demo"
      // harness: one Inspector per page (lib/inspector.ts); not in the doc
      enableInspector={nestedInspectorSetting}
    >
      <HashBrownDashboard>
        <div className="flex h-screen flex-col gap-3 p-6">
          <header>
            <h1 className="text-lg font-semibold">Declarative UI: Hashbrown</h1>
            <p className="text-sm text-[var(--muted-foreground)]">
              Streaming structured output via <code>@hashbrownai/react</code>.
              The agent emits a catalog-constrained UI envelope that renders
              progressively as data streams.
            </p>
          </header>
          <div className="flex-1 overflow-hidden rounded-md border border-[var(--border)]">
            <Chat />
          </div>
        </div>
      </HashBrownDashboard>
    </CopilotKit>
  );
}
