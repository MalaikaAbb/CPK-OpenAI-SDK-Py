"use client"; // harness: the prose blocks print no directive

import { analytics } from "./analytics"; // harness glue (stub) — see analytics.ts

// ── doc: Chat controls prose block 1 "Control the open state" (verbatim) ──
import { useState } from "react";
import { CopilotSidebar } from "@copilotkit/react-core/v2";

function Layout() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <nav>
        <button onClick={() => setChatOpen(true)}>Ask the assistant</button>
      </nav>

      <CopilotSidebar open={chatOpen} onOpenChange={setChatOpen} />
    </>
  );
}
// ── end doc ──

// ── doc: Chat controls prose block 2 "Programmatically open" (verbatim) ──
import { useCopilotChatConfiguration } from "@copilotkit/react-core/v2";

function OpenChatButton() {
  const config = useCopilotChatConfiguration();

  // setModalOpen is only present when a provider in the tree owns modal state
  // (the prebuilt CopilotPopup / CopilotSidebar create it for you).
  if (!config?.setModalOpen) return null;

  return (
    <button onClick={() => config.setModalOpen(true)}>
      Ask the assistant
    </button>
  );
}
// ── end doc ──

/** Harness glue: a component to host prose block 3, which uses `config` from block 2. */
function ToggleChatButton() {
  const config = useCopilotChatConfiguration(); // harness glue (as in block 2)
  if (!config) return null; // harness glue (block 2's guard)

  return (
    // ── doc: Chat controls prose block 3 "To toggle" (verbatim) ──
    <button onClick={() => config.setModalOpen(!config.isModalOpen)}>
      {config.isModalOpen ? "Close chat" : "Open chat"}
    </button>
    // ── end doc ──
  );
}

/** Harness glue: blocks 2–4 together — the buttons beside a sidebar that starts closed. */
function ProgrammaticLayout() {
  return (
    <>
      <nav className="flex gap-3">
        <OpenChatButton />
        <ToggleChatButton />
      </nav>
      {/* ── doc: Chat controls prose block 4 "initial open state" (verbatim) ── */}
      <CopilotSidebar defaultOpen={false} />
      {/* ── end doc ── */}
    </>
  );
}

// ── doc: Chat controls prose block 5 "thumbs up / down" (verbatim; trailing `;` dropped to return it) ──
import { CopilotChat } from "@copilotkit/react-core/v2";

function FeedbackChat() {
  return ( // harness glue: the prose prints a bare JSX expression
<CopilotChat
  messageView={{
    assistantMessage: {
      onThumbsUp: (message) => {
        analytics.track("feedback", { messageId: message.id, value: "up" });
      },
      onThumbsDown: (message) => {
        analytics.track("feedback", { messageId: message.id, value: "down" });
      },
    },
  }}
/>
  );
}
// ── end doc ──

export { Layout, ProgrammaticLayout, FeedbackChat };
