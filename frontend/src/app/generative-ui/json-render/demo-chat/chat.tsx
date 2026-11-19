// doc: json-render — complete file printed in the page's Markdown export (verbatim).
// The rendered HTML page shows only the example JSON; the .md carries this file.
// src/app/demos/declarative-json-render/chat.tsx
"use client";

import { CopilotChat } from "@copilotkit/react-core/v2";
import type { CopilotChatAssistantMessage } from "@copilotkit/react-core/v2";
import { JsonRenderAssistantMessage } from "./json-render-renderer";
// commented out: unpublished decorative useByocJsonRenderSuggestions
// import { useByocJsonRenderSuggestions } from "./suggestions";

export const AGENT_ID = "byoc_json_render";

export function Chat() {
  // commented out: unpublished decorative useByocJsonRenderSuggestions
  // useByocJsonRenderSuggestions();

  return (
    <CopilotChat
      agentId={AGENT_ID}
      className="h-full rounded-2xl"
      messageView={{
        assistantMessage:
          JsonRenderAssistantMessage as unknown as typeof CopilotChatAssistantMessage,
      }}
    />
  );
}
