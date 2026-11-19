"use client"; // harness fix: the doc block is titled app/providers.tsx but has no "use client"

import { nestedInspectorSetting } from "@/lib/inspector"; // harness glue: one inspector per page

// ── doc: markdown-mode prose block "app/providers.tsx" — imports (verbatim) ──
import { CopilotKitProvider } from "@copilotkit/react-core/v2";
import { standardUI } from "@copilotkit/react-core/v2/generative-ui";
// ── end doc ──

// The page prints both providers as bare JSX around an undefined `{children}`;
// each function around them is harness glue. Two marked changes in both:
// `runtimeUrl` (doc: "/api/copilotkit", the Quickstart's runtime here) and
// `enableInspector`.

/** "Turn it on". */
export function MarkdownProviders({ children }: { children: React.ReactNode }) {
  return (
    // ── doc: markdown-mode prose block "app/providers.tsx" (verbatim, except marked props) ──
    <CopilotKitProvider
      runtimeUrl="/api/genui" /* harness: doc "/api/copilotkit" */
      enableInspector={nestedInspectorSetting} /* harness glue */
      generativeUI={{ ui: standardUI, transport: "markdown" }}
    >
      {children}
    </CopilotKitProvider>
    // ── end doc ──
  );
}

/** "Build your own prompt". */
export function OwnPromptProviders({ children }: { children: React.ReactNode }) {
  return (
    // ── doc: markdown-mode prose block "sendContext: false" (verbatim, except marked props) ──
    <CopilotKitProvider
      runtimeUrl="/api/genui" /* harness: doc "/api/copilotkit" */
      enableInspector={nestedInspectorSetting} /* harness glue */
      generativeUI={{ ui: standardUI, transport: "markdown", sendContext: false }}
    >
      {children}
    </CopilotKitProvider>
    // ── end doc ──
  );
}
