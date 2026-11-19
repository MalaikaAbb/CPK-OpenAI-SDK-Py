"use client"; // harness: not in the prose

// ── doc: Slots prose block "page.tsx" — CustomMessageView (verbatim) ──
import { CopilotChat } from "@copilotkit/react-core/v2";

// @ts-expect-error doc bug: untyped destructured params (implicit any) — fails `next build` under strict
const CustomMessageView = ({ messages, isRunning }) => (
  <div className="space-y-4 p-6">
    {/* @ts-expect-error doc bug: msg is implicitly any (untyped destructured params) */}
    {messages?.map((msg) => (
      <div key={msg.id} className={msg.role === "user" ? "text-right" : "text-left"}>
        {msg.content}
      </div>
    ))}
    {isRunning && <div className="animate-pulse">Thinking...</div>}
  </div>
);

export function Chat() {
  // @ts-expect-error doc bug: a plain component is not assignable to the messageView slot (CopilotChatMessageView requires its Cursor sub-component) in 1.87
  return <CopilotChat messageView={CustomMessageView} />;
}
// ── end doc ──
