"use client";

// Open Generative UI — minimal. Function shell and imports from the Code tab
// (src/app/demos/open-gen-ui/page.tsx); the body is the prose fragment.

import React from "react";
import { CopilotKit } from "@copilotkit/react-core/v2";

// commented out: unpublished decorative VISUALIZATION_DESIGN_SKILL (design-skill.ts
// is in neither the prose nor the Code tab; `designSkill` is optional and
// CopilotKit falls back to its default design skill without it)
// import { VISUALIZATION_DESIGN_SKILL } from "./design-skill";
import { Chat } from "./chat";

import { nestedInspectorSetting } from "@/lib/inspector";

export default function OpenGenUiDemo() {
  // ── doc: open-generative-ui prose block "src/app/demos/open-gen-ui/page.tsx" (verbatim except as marked) ──
  // Minimal Open Generative UI frontend: the built-in activity renderer is
  // registered by CopilotKitProvider, so a plain <CopilotChat /> is enough —
  // no custom tool renderers, no activity-renderer registration.
  // We DO pass `openGenerativeUI.designSkill` to swap in visualisation-tuned
  // guidance in place of the default shadcn design skill.
  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit-ogui"
      agent="open-gen-ui"
      openGenerativeUI={{
        // commented out: unpublished decorative VISUALIZATION_DESIGN_SKILL
        // designSkill: VISUALIZATION_DESIGN_SKILL
      }}
      // harness: one Inspector per page (lib/inspector.ts); not in the doc
      enableInspector={nestedInspectorSetting}
    >
      <div className="flex justify-center items-center h-screen w-full">
        <div className="h-full w-full max-w-4xl flex flex-col p-3">
          <Chat />
        </div>
      </div>
    </CopilotKit>
  );
  // ── end doc ──
}
