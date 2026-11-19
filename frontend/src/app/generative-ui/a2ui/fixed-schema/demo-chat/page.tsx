"use client";

// A2UI Fixed Schema — the page's provider fragment ("app/page.tsx"), verbatim
// apart from the two labelled harness changes, around a glue <Chat />.

import type { ReactNode } from "react";
import { CopilotKit } from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";
import { nestedInspectorSetting } from "@/lib/inspector";

// ── Doc bug, reproduced: the fragment passes `myCatalog`, but catalog.ts (also
// prose) exports `catalog`, and the page never imports either. The harness
// looks the printed name up on the module, so it is `undefined` here exactly
// as it would be for a reader who copies both blocks. A static
// `import { myCatalog }` would not build (missing export), so the lookup is
// dynamic. Result: the provider registers no catalog. ──
import * as catalogModule from "./a2ui/catalog";
const myCatalog = (catalogModule as Record<string, unknown>)["myCatalog"] as
  | typeof catalogModule.catalog
  | undefined;

import { Chat } from "./chat";

function Provider({ children }: { children: ReactNode }) {
  return (
    // ── doc: a2ui/fixed-schema prose block "app/page.tsx" (verbatim except runtimeUrl) ──
    // harness: runtimeUrl — the harness's /api/copilotkit is the Quickstart's
    // verbatim runtime; the page's runtime block is mounted at /api/a2ui-fixed-schema.
    <CopilotKit
      runtimeUrl="/api/a2ui-fixed-schema"
      a2ui={{ catalog: myCatalog }}
      // harness: one Inspector per page (lib/inspector.ts); not in the doc
      enableInspector={nestedInspectorSetting}
    >
      {children}
    </CopilotKit>
    // ── end doc ──
  );
}

export default function Page() {
  return (
    <DemoFrame
      parentPath="/generative-ui/a2ui/fixed-schema"
      subtitle="agent: a2ui-fixed-schema → a2ui_fixed_schema · runtime: /api/a2ui-fixed-schema"
    >
      <Provider>
        <div className="mx-auto h-full w-full max-w-4xl">
          <Chat />
        </div>
      </Provider>
    </DemoFrame>
  );
}
