"use client";

import { DemoFrame } from "@/components/demo-frame";
import { VariantTabs } from "@/app/_chat-ui/variant-tabs";
import RootLayout from "@/app/quickstart/demo-chat/doc-layout";

import { HeadlessCompleteChat } from "./headless-complete-chat";
import { HeadlessSimpleChat } from "./headless-simple-chat";
import "./glue.css";

/**
 * Harness glue: the two headless cells the page describes, under the
 * Quickstart's provider (the page prints no provider), both on the shared
 * agent (no backend config is printed).
 */
export default function Page() {
  return (
    <DemoFrame
      parentPath="/custom-look-and-feel/headless-ui"
      subtitle="agent: openai_agent (doc: headless-simple / headless-complete) · runtime: /api/copilotkit"
    >
      <RootLayout>
        <div className="headless-scope h-full">
          <VariantTabs
            variants={[
              {
                id: "simple",
                label: "headless-simple",
                note: "useAgent + useCopilotKit + the printed bubbles. No <CopilotChat> anywhere.",
                render: () => <HeadlessSimpleChat />,
              },
              {
                id: "complete",
                label: "headless-complete (message list)",
                note: "The printed MessageList (per-role dispatch, renderToolCall, renderActivityMessage) in a harness-glue shell. Tool/activity branches stay idle: no tools or MCP server are printed.",
                render: () => <HeadlessCompleteChat />,
              },
            ]}
          />
        </div>
      </RootLayout>
    </DemoFrame>
  );
}
