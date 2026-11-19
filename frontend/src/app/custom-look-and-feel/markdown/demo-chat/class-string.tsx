"use client"; // harness: not in the prose

import { CopilotChat } from "@copilotkit/react-core/v2"; // harness: the fragment uses it without importing it

export function Chat() {
  return ( // harness glue: the prose prints a bare JSX fragment
    // ── doc: Markdown prose block 3 "page.tsx" — class string (verbatim) ──
    <CopilotChat
      messageView={{
        assistantMessage: { markdownRenderer: "text-sm leading-7" },
      }}
    />
    // ── end doc ──
  );
}
