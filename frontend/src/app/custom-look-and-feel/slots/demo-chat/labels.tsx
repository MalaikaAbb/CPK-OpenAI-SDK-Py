"use client"; // harness: not in the prose

import { CopilotChat } from "@copilotkit/react-core/v2"; // harness: the fragment uses it without importing it

export function Chat() {
  return ( // harness glue: the prose prints a bare JSX fragment
    // ── doc: Slots prose block "page.tsx" — labels (verbatim) ──
    <CopilotChat
      labels={{
        chatInputPlaceholder: "Ask your agent anything...",
        welcomeMessageText: "How can I help you today?",
        chatDisclaimerText: "AI responses may be inaccurate.",
      }}
    />
    // ── end doc ──
  );
}
