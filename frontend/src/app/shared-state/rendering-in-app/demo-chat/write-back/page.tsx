"use client";

/**
 * Render agent state in your app — "Writing back from the main view".
 *
 * Harness glue: the same layout as the doc's `app/page.tsx` (its provider,
 * Canvas and sidebar), plus `ItemToggles`, which hosts the doc's verbatim
 * `toggleItem`. The doc's page.tsx itself has no slot for it, so it is
 * recomposed here instead of edited.
 */
import { CopilotKit, CopilotSidebar } from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";
import { nestedInspectorSetting } from "@/lib/inspector";

import { Canvas } from "../../_demo/components/Canvas";
import { ItemToggles } from "../../_demo/item-toggles";
import "../../_demo/app-shell.css";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/shared-state/rendering-in-app"
      subtitle="agent: default → shared-state-read-write (own runtime) · toggleItem"
    >
      <CopilotKit
        runtimeUrl="/api/state-hitl-default"
        enableInspector={nestedInspectorSetting}
      >
        <div className="app-shell">
          <div className="flex flex-1 flex-col">
            <Canvas />
            <ItemToggles />
          </div>
          <CopilotSidebar />
        </div>
      </CopilotKit>
    </DemoFrame>
  );
}
