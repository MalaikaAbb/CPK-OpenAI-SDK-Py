"use client"; // harness: not in the prose

import { CopilotChat } from "@copilotkit/react-core/v2"; // harness: the fragment uses it without importing it

export function Chat() {
  return ( // harness glue: the prose prints a bare JSX fragment
    // ── doc: Slots prose block "page.tsx" — inline copyButton (verbatim) ──
    <CopilotChat
      messageView={{
        assistantMessage: {
          copyButton: ({ onClick }) => (
            <button onClick={onClick}>Copy</button>
          ),
        },
      }}
    />
    // ── end doc ──
  );
}
