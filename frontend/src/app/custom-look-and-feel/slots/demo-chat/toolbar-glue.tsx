/**
 * Harness glue (minimal) — NOT from the docs.
 *
 * The nested-slots block passes `toolbar: CustomToolbar` and
 * `copyButton: CustomCopyButton` and defines neither (the Code tab doesn't
 * either). Each wraps the default sub-component in a visible marker so the
 * override is observable.
 */
"use client";

import React from "react";
import { CopilotChatAssistantMessage } from "@copilotkit/react-core/v2";

import { SlotMarker } from "./slot-marker";

export function CustomToolbar(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <SlotMarker color="orange" label="AssistantMessage.Toolbar (harness glue)" className="mt-2">
      <CopilotChatAssistantMessage.Toolbar {...props} />
    </SlotMarker>
  );
}

export function CustomCopyButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <SlotMarker color="red" label="CopyButton (harness glue)" inline>
      <CopilotChatAssistantMessage.CopyButton {...props} />
    </SlotMarker>
  );
}
