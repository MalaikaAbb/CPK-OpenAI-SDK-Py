"use client"; // harness: not in the prose

// harness glue: imports the snippet uses without printing them
import { useState } from "react";
import {
  CopilotChat,
  CopilotChatConfigurationProvider,
  CopilotKitProvider,
  CopilotThreadsDrawer,
} from "@copilotkit/react-core/v2";

// ── doc: Threads Drawer prose block "ControlledChat" (verbatim) ──
function ControlledChat() {
  const [threadId, setThreadId] = useState(() => crypto.randomUUID());
  const startNew = () => setThreadId(crypto.randomUUID());

  return (
    <CopilotChatConfigurationProvider threadId={threadId}>
      <CopilotThreadsDrawer
        onThreadSelect={(id) => setThreadId(id)}
        onNewThread={startNew}
      />
      <button type="button" onClick={startNew}>
        New conversation
      </button>
      <CopilotChat />
    </CopilotChatConfigurationProvider>
  );
}
// ── end doc ──

/** Harness glue: the snippet needs a provider; this is the other blocks' one (on /api/threads). */
export default function ControlledChatDemo() {
  return (
    <CopilotKitProvider runtimeUrl="/api/threads">
      <div style={{ display: "flex", height: "100%" }}>
        <ControlledChat />
      </div>
    </CopilotKitProvider>
  );
}
