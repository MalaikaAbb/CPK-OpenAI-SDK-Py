"use client";

/**
 * useInterrupt — the multi-interrupt snippet, as published.
 *
 * Harness glue: the same frame as ../page.tsx, with MultiInterrupt in place of
 * ApprovalInterrupt (one useInterrupt slot per page).
 */
import {
  CopilotChat,
  CopilotChatConfigurationProvider,
} from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";

import { MultiInterrupt } from "../../_demo/multi-interrupt";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/human-in-the-loop/useInterrupt"
      subtitle="agent: gen-ui-interrupt · multiple interrupts"
    >
      <CopilotChatConfigurationProvider agentId="gen-ui-interrupt">
        <MultiInterrupt />
        <div className="chat-host mx-auto max-w-4xl">
          <CopilotChat agentId="gen-ui-interrupt" />
        </div>
      </CopilotChatConfigurationProvider>
    </DemoFrame>
  );
}
