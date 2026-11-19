"use client"; // harness: not in the prose

// ── doc: Slots prose block 3 — slot-overrides.snippet.tsx (the most complete of
//    the three progressive extracts; verbatim except where labelled) ──
import type {
  CopilotChatAssistantMessage,
  CopilotChatInput,
  CopilotChatView,
} from "@copilotkit/react-core/v2";

// harness: the prose `declare`s these three and never defines them; a
// `declare const` is erased at compile time, so at runtime they'd be
// ReferenceErrors. They are imported from the Code tab's slot-wrappers.tsx.
// declare const CustomWelcomeScreen: React.ComponentType;
// declare const CustomAssistantMessage: React.ComponentType;
// declare const CustomDisclaimer: React.ComponentType;
import {
  CustomWelcomeScreen,
  CustomAssistantMessage,
  CustomDisclaimer,
} from "./slot-wrappers"; // from Code tab
import { CopilotChat } from "@copilotkit/react-core/v2"; // harness: needed for the completion below

export function ChatSlotsTeachingExtracts() {
  const welcomeScreen =
    CustomWelcomeScreen as unknown as typeof CopilotChatView.WelcomeScreen;

  const messageView = {
    assistantMessage:
      CustomAssistantMessage as unknown as typeof CopilotChatAssistantMessage,
  };

  const input = {
    disclaimer:
      CustomDisclaimer as unknown as typeof CopilotChatInput.Disclaimer,
  };
// ── end doc ── (the prose ends here: the function is never closed and never renders)

  // harness glue: completes the extract by passing the three slots to CopilotChat
  return (
    <CopilotChat
      welcomeScreen={welcomeScreen}
      messageView={messageView}
      input={input}
    />
  );
}
