"use client"; // harness: not in the prose

import { CopilotChat } from "@copilotkit/react-core/v2"; // harness: the fragment uses it without importing it

export function Chat() {
  return ( // harness glue: the prose prints a bare JSX fragment
    // ── doc: Slots prose block "page.tsx" — props objects (verbatim) ──
    <CopilotChat
      messageView={{
        className: "my-custom-messages",
        // @ts-expect-error doc bug: "data-testid" is not a known messageView prop in 1.87
        "data-testid": "message-view",
      }}
      input={{ autoFocus: true }}
    />
    // ── end doc ──
  );
}
