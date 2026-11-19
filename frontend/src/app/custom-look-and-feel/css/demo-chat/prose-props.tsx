"use client"; // harness: the prose blocks print no directive

import { CopilotChat } from "@copilotkit/react-core/v2"; // harness: the prose blocks use it without importing it

/**
 * Harness glue (minimal): the icons snippet renders `<YourOpenIconComponent />`
 * and `<YourCloseIconComponent />` and defines neither.
 */
function YourOpenIconComponent() {
  return <span aria-hidden>▲</span>;
}
function YourCloseIconComponent() {
  return <span aria-hidden>▼</span>;
}

export function IconsChat() {
  return (
    // ── doc: CSS prose block "icons" (verbatim) ──
    <CopilotChat
      // @ts-expect-error doc bug: v2 CopilotChat has no `icons` prop (a v1 react-ui prop); kept verbatim, ignored at runtime
      icons={{
        openIcon: <YourOpenIconComponent />,
        closeIcon: <YourCloseIconComponent />,
      }}
    />
    // ── end doc ──
  );
}

export function LabelsChat() {
  return (
    // ── doc: CSS prose block "labels" (verbatim) ──
    <CopilotChat
      labels={{
        welcomeMessageText: "Hello! How can I help you today?",
        modalHeaderTitle: "My Copilot",
        chatInputPlaceholder: "Ask me anything!",
      }}
    />
    // ── end doc ──
  );
}
