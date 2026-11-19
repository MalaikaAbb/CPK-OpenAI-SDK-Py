"use client";

import { DemoFrame } from "@/components/demo-frame";
import { VariantTabs } from "@/app/_chat-ui/variant-tabs";
import RootLayout from "@/app/quickstart/demo-chat/doc-layout";

import { Chat as CopyButtonChat } from "./copy-button";
import { Chat as CustomMessageViewChat } from "./custom-message-view";
import { Chat as LabelsChat } from "./labels";
import { Chat as NestedSlotsChat } from "./nested-slots";
import { Chat as PropsObjectChat } from "./props-object";
import { Chat as TailwindChat } from "./tailwind-strings";
import { ChatSlotsTeachingExtracts } from "./teaching-extract";
import { Chat as ToolCallsViewChat } from "./tool-calls-view";

/**
 * Harness glue: one tab per Slots prose block, each under the Quickstart's
 * provider (the page prints none), each in its own file so the doc's
 * component names (`Chat`) stay as printed.
 */
export default function Page() {
  return (
    <DemoFrame
      parentPath="/custom-look-and-feel/slots"
      subtitle="agent: openai_agent · runtime: /api/copilotkit (Quickstart provider)"
    >
      <RootLayout>
        <VariantTabs
          variants={[
            {
              id: "extract",
              label: "component slots",
              note: "Teaching extract: welcomeScreen / assistantMessage / disclaimer → Code-tab components (dashed markers). Completion of the extract is harness glue.",
              render: () => <ChatSlotsTeachingExtracts />,
            },
            {
              id: "tailwind",
              label: "Tailwind strings",
              note: "messageView / input as class strings: grey message area, blue rounded input border.",
              render: () => <TailwindChat />,
            },
            {
              id: "props",
              label: "props objects",
              note: "messageView gets className + data-testid; input autofocuses.",
              render: () => <PropsObjectChat />,
            },
            {
              id: "message-view",
              label: "custom messageView",
              note: "Whole message list replaced: plain left/right text and “Thinking...” while running.",
              render: () => <CustomMessageViewChat />,
            },
            {
              id: "nested",
              label: "nested slots",
              note: "assistantMessage.toolbar / copyButton (harness glue markers) and userMessage (Code tab marker).",
              render: () => <NestedSlotsChat />,
            },
            {
              id: "copy",
              label: "inline copyButton",
              note: "The copy icon on assistant replies becomes a plain “Copy” button.",
              render: () => <CopyButtonChat />,
            },
            {
              id: "toolcalls",
              label: "toolCallsView",
              note: "Tool calls get a dashed frame — the shared agent has no tools, so nothing renders here unless a tool is called.",
              render: () => <ToolCallsViewChat />,
            },
            {
              id: "labels",
              label: "labels",
              note: "Placeholder, welcome text and disclaimer change.",
              render: () => <LabelsChat />,
            },
          ]}
        />
      </RootLayout>
    </DemoFrame>
  );
}
