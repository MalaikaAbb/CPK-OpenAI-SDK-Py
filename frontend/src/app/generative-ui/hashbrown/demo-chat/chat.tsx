// doc: hashbrown — complete file printed in the page's Markdown export (verbatim).
// The rendered HTML page shows only the example JSON; the .md carries this file.
// src/app/demos/declarative-hashbrown/chat.tsx
"use client";

import { CopilotChat } from "@copilotkit/react-core/v2";
import type { CopilotChatAssistantMessage } from "@copilotkit/react-core/v2";
import { HashBrownRenderMessage } from "./hashbrown-renderer";
// commented out: unpublished decorative useByocHashbrownSuggestions
// import { useByocHashbrownSuggestions } from "./suggestions";

export function Chat() {
  // commented out: unpublished decorative useByocHashbrownSuggestions
  // useByocHashbrownSuggestions();

  return (
    <CopilotChat
      className="h-full"
      messageView={{
        // The renderer reads only `message` from the slot props; cast to the
        // wider CopilotChatAssistantMessage signature to satisfy the slot type.
        assistantMessage:
          HashBrownRenderMessage as unknown as typeof CopilotChatAssistantMessage,
      }}
    />
  );
}
