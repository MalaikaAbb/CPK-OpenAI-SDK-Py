"use client";

import { DemoFrame } from "@/components/demo-frame";
import { VariantTabs } from "@/app/_chat-ui/variant-tabs";
// The two page regions are shared with /generative-ui/reasoning, which prints
// the same regions plus reasoning-block.tsx in full.
import ReasoningCustomDemo from "@/app/generative-ui/reasoning/demo-chat/reasoning-custom";
import ReasoningDefaultDemo from "@/app/generative-ui/reasoning/demo-chat/reasoning-default";

import { MyReasoningLayoutChat } from "./my-reasoning-layout";
import { ReasoningProvider } from "./reasoning-provider";
import { ContentOnlyChat, HeaderAndContentChat, HeaderOnlyChat } from "./sub-slots";

/** Harness glue: one tab per reasoning prose block. */
export default function Page() {
  return (
    <DemoFrame
      parentPath="/custom-look-and-feel/reasoning-messages"
      subtitle="agent: reasoning (doc: reasoning-default / reasoning-custom) · runtime: /api/harness"
    >
      <VariantTabs
        variants={[
          {
            id: "default",
            label: "default card",
            note: "reasoning-default region: built-in CopilotChatReasoningMessage.",
            render: () => <ReasoningDefaultDemo />,
          },
          {
            id: "header",
            label: "header slot",
            note: "CustomHeader: 🧠 while streaming, 💡 after, Show/Hide on the right.",
            render: () => (
              <ReasoningProvider>
                <HeaderOnlyChat />
              </ReasoningProvider>
            ),
          },
          {
            id: "content",
            label: "contentView slot",
            note: "CustomContent: grey monospace reasoning text with a blinking ▊ while streaming.",
            render: () => (
              <ReasoningProvider>
                <ContentOnlyChat />
              </ReasoningProvider>
            ),
          },
          {
            id: "both",
            label: "header + contentView",
            note: "Both sub-slots at once.",
            render: () => (
              <ReasoningProvider>
                <HeaderAndContentChat />
              </ReasoningProvider>
            ),
          },
          {
            id: "custom",
            label: "whole card (ReasoningBlock)",
            note: "reasoning-custom region: ReasoningBlock (not printed on this page; it's the Code-tab file, printed in full on Generative UI → Reasoning).",
            render: () => <ReasoningCustomDemo />,
          },
          {
            id: "layout",
            label: "render-prop layout",
            note: "MyReasoningLayout: the default header + toggle inside a yellow box.",
            render: () => (
              <ReasoningProvider>
                <MyReasoningLayoutChat />
              </ReasoningProvider>
            ),
          },
        ]}
      />
    </DemoFrame>
  );
}
