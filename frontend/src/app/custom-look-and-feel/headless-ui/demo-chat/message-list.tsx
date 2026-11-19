// Harness: the prose prints three regions of message-list.tsx (the hooks +
// tool-message index, the per-role dispatch, and a repeat of the tool-call
// loop). The enclosing `MessageList` component, its imports, and the wrapper
// <div> are harness glue; the regions are verbatim.
"use client";

import { useMemo } from "react";
import type { Message, ToolMessage } from "@ag-ui/core";
import {
  useRenderActivityMessage,
  useRenderToolCall,
} from "@copilotkit/react-core/v2";

import { ActivityWrapper } from "./glue-ui";
import { AssistantBubble, UserBubble } from "./message-assistant";

export function MessageList({ messages }: { messages: Message[] }) {
  // ── doc: Headless UI prose block "message-list.tsx" — hooks (verbatim) ──
  const renderToolCall = useRenderToolCall();
  const { renderActivityMessage } = useRenderActivityMessage();

  // Index tool results by their originating tool-call id so each tool-call
  // card can hand the matching ToolMessage to `useRenderToolCall`.
  // Without this the renderer can't see a result and the card stays in the
  // "in-progress" state forever.
  const toolMessagesByCallId = useMemo(() => {
    const map = new Map<string, ToolMessage>();
    for (const m of messages) {
      if (m.role === "tool" && "toolCallId" in m && m.toolCallId) {
        map.set(m.toolCallId, m as ToolMessage);
      }
    }
    return map;
  }, [messages]);
  // ── end doc ──

  return (
    <div className="flex flex-col gap-4">
      {/* ── doc: Headless UI prose block "message-list.tsx" — per-role dispatch (verbatim) ── */}
      {messages.map((m) => {
        if (m.role === "user") {
          // Cast through the local input shape — UserBubble accepts a
          // simplified version of the ag-ui content union.
          return (
            <UserBubble
              key={m.id}
              content={m.content as Parameters<typeof UserBubble>[0]["content"]}
            />
          );
        }

        if (m.role === "assistant") {
          const toolCalls =
            "toolCalls" in m && Array.isArray(m.toolCalls) ? m.toolCalls : [];
          return (
            <AssistantBubble
              key={m.id}
              content={typeof m.content === "string" ? m.content : undefined}
            >
              {toolCalls.map((tc) => {
                const toolMessage = toolMessagesByCallId.get(tc.id);
                const node = renderToolCall({
                  toolCall: tc,
                  toolMessage,
                });
                return node ? <div key={tc.id}>{node}</div> : null;
              })}
            </AssistantBubble>
          );
        }

        if (m.role === "activity") {
          const node = renderActivityMessage(m);
          if (!node) return null;
          return <ActivityWrapper key={m.id}>{node}</ActivityWrapper>;
        }

        return null;
      })}
      {/* ── end doc ── */}
    </div>
  );
}
