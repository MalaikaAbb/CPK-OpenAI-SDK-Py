// ── doc: components prose block "app/providers.tsx" (verbatim, except the two marked lines) ──
"use client";
import { CopilotKitProvider } from "@copilotkit/react-core/v2";
import { standardUI } from "@copilotkit/react-core/v2/generative-ui";
import "@copilotkit/react-core/v2/styles.css";

import { nestedInspectorSetting } from "@/lib/inspector"; // harness glue: one inspector per page

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKitProvider
      runtimeUrl="/api/genui" /* harness: doc says "/api/copilotkit", which is the Quickstart's runtime here */
      enableInspector={nestedInspectorSetting} /* harness glue: the root provider's inspector stands down on this path */
      generativeUI={{ ui: standardUI }}
    >
      {children}
    </CopilotKitProvider>
  );
}
// ── end doc ──
