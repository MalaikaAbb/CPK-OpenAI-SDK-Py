/**
 * Harness glue — NOT from the docs.
 *
 * The sub-slot snippets render `<CopilotChat>` with no agent id, i.e. they
 * rely on the surrounding provider. The page's own provider (in the
 * reasoning-default / reasoning-custom regions) names the reasoning agent, so
 * this is the same provider, minus the page layout.
 */
"use client";

import type { ReactNode } from "react";
import { CopilotKit } from "@copilotkit/react-core/v2";

import { nestedInspectorSetting } from "@/lib/inspector";

export function ReasoningProvider({ children }: { children: ReactNode }) {
  return (
    <CopilotKit
      runtimeUrl="/api/harness"
      agent="reasoning"
      enableInspector={nestedInspectorSetting}
    >
      {children}
    </CopilotKit>
  );
}
