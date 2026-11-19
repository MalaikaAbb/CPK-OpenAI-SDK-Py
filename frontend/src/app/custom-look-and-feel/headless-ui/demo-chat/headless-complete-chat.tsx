/**
 * Harness glue — NOT from the docs.
 *
 * The page's "complete example" prints only the message list and the bubbles;
 * the chat shell around them (agent hook, composer, scroll area) is not in
 * the prose. This is the minimum shell: the same two hooks and send() the
 * minimal example prints, feeding `agent.messages` into the printed
 * `MessageList`.
 *
 * Deliberately NOT added (the Code tab has them, the prose doesn't): backend
 * tools (get_weather, get_stock_price, get_revenue_chart), the per-tool
 * renderers that would paint them, and an MCP Apps runtime. So the tool-call
 * and activity branches of the list are wired but stay idle with the shared
 * agent — see the route's doc gaps.
 */
"use client";

import { useState } from "react";
import { useAgent, useCopilotKit } from "@copilotkit/react-core/v2";

import { MessageList } from "./message-list";

export function HeadlessCompleteChat() {
  const { agent } = useAgent({ agentId: "openai_agent" });
  const { copilotkit } = useCopilotKit();
  const [input, setInput] = useState("");

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || agent.isRunning) return;
    agent.addMessage({ id: crypto.randomUUID(), role: "user", content: trimmed });
    setInput("");
    void copilotkit.runAgent({ agent }).catch((err) => {
      console.error("[headless-complete] runAgent failed", err);
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <MessageList messages={agent.messages} />
        {agent.isRunning && <p className="mt-2 text-xs text-slate-500">…</p>}
      </div>
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
