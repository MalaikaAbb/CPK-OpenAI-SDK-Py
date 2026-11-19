// Harness: the prose prints two regions of headless-simple/chat.tsx (the
// hooks + send(), and the bubble map). There is no Code tab for this cell.
// The component around them, its imports, `visible`, and the composer are
// harness glue; the bubbles are the page's own (message-assistant.tsx).
"use client";

import { useState } from "react";
import type { AssistantMessage, Message, UserMessage } from "@ag-ui/core";
import { useAgent, useCopilotKit } from "@copilotkit/react-core/v2";

import { AssistantBubble, UserBubble } from "./message-assistant";

export function HeadlessSimpleChat() {
  // ── doc: Headless UI prose block "headless-simple/chat.tsx" — hooks + send (verbatim except the labelled id) ──
  const { agent } = useAgent({ agentId: "openai_agent" }); // harness: doc prints agentId: "headless-simple", registered by no printed runtime
  const { copilotkit } = useCopilotKit();
  const [input, setInput] = useState("");

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || agent.isRunning) return;
    agent.addMessage({
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    });
    setInput("");
    void copilotkit.runAgent({ agent }).catch((err) => {
      // The Headless Simple demo is the canonical "two hooks, your
      // design system" example users copy-paste as a starting point.
      // Silently swallowing errors here would model broken practice;
      // log so a network failure / runtime error / transport disconnect
      // surfaces in the console for the developer.
      console.error("[langgraph-python:headless-simple] runAgent failed", err);
    });
  };
  // ── end doc ──

  // harness glue: the prose maps over `visible` and never defines it
  const visible = agent.messages.filter(
    (m: Message): m is UserMessage | AssistantMessage =>
      m.role === "user" || m.role === "assistant",
  );

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
        {/* ── doc: Headless UI prose block "headless-simple/chat.tsx" — bubbles (verbatim) ── */}
                {visible.map((m) =>
                  m.role === "user" ? (
                    <UserBubble key={m.id} content={m.content} />
                  ) : (
                    <AssistantBubble key={m.id} content={m.content} />
                  ),
                )}
        {/* ── end doc ── */}
        {agent.isRunning && <p className="text-xs text-slate-500">…</p>}
      </div>
      {/* harness glue: a composer (the prose prints none) */}
      <form
        className="flex gap-2 border-t p-3"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message the agent…"
          className="flex-1 rounded-md border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={agent.isRunning}
          className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
