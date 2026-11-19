"use client"; // harness: not in the prose

import { CopilotChat } from "@copilotkit/react-core/v2"; // harness: the fragment uses it without importing it

import { CustomUserMessage } from "./slot-wrappers"; // from Code tab
import { CustomCopyButton, CustomToolbar } from "./toolbar-glue"; // harness glue

export function Chat() {
  return ( // harness glue: the prose prints a bare JSX fragment
    // ── doc: Slots prose block "page.tsx" — nested slots (verbatim) ──
    <CopilotChat
      messageView={{
        assistantMessage: {
          toolbar: CustomToolbar,
          copyButton: CustomCopyButton,
        },
        // @ts-expect-error doc bug: a plain component is not assignable to the userMessage slot (expects the compound CopilotChatUserMessage) in 1.87
        userMessage: CustomUserMessage,
      }}
    />
    // ── end doc ──
  );
}
