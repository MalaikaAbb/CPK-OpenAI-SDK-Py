/**
 * Harness glue — NOT from the docs.
 *
 * The page renders `<VoiceChat />` from "./voice-chat" and never prints it
 * (not in prose, not in the Code tab). The prose describes it: a
 * `<CopilotChat />` (which shows the mic by itself when the runtime
 * advertises transcription) plus the sample-audio button, whose text is put
 * into the composer textarea — found by `data-testid="copilot-chat-textarea"`
 * — through the native value setter and a synthetic `input` event, so React's
 * controlled state picks it up. This is exactly that, nothing more.
 */
"use client";

import { useCallback } from "react";
import { CopilotChat } from "@copilotkit/react-core/v2";

import { SampleAudioButton } from "./sample-audio-button";

// harness glue: the page prints no sample phrase
const SAMPLE_TEXT = "Hello! Can you hear me? Reply in one short sentence.";

export function VoiceChat() {
  const insertIntoComposer = useCallback((text: string) => {
    const textarea = document.querySelector<HTMLTextAreaElement>(
      '[data-testid="copilot-chat-textarea"]',
    );
    if (!textarea) return;
    const setter = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      "value",
    )?.set;
    setter?.call(textarea, text);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    textarea.focus();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 border-b px-4 py-2">
        <SampleAudioButton onTranscribed={insertIntoComposer} sampleText={SAMPLE_TEXT} />
      </div>
      <div className="min-h-0 flex-1">
        <CopilotChat className="h-full" />
      </div>
    </div>
  );
}
