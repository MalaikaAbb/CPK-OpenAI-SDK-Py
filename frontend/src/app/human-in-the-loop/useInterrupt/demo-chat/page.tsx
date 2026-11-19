"use client";

/**
 * useInterrupt — ApprovalInterrupt, as published.
 *
 * Harness glue: everything here except the imported ApprovalInterrupt. The
 * snippet's useInterrupt takes no agentId, so it follows the chat
 * configuration's agent. CopilotChatConfigurationProvider sets that to the
 * interrupt agent for both the hook and the chat. One useInterrupt per page:
 * the multi-interrupt snippet is on ./multi.
 */
import {
  CopilotChat,
  CopilotChatConfigurationProvider,
} from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";

import { ApprovalInterrupt } from "../_demo/approval-interrupt";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/human-in-the-loop/useInterrupt"
      subtitle="agent: gen-ui-interrupt · ApprovalInterrupt"
    >
      <CopilotChatConfigurationProvider agentId="gen-ui-interrupt">
        <ApprovalInterrupt />
        <div className="chat-host mx-auto max-w-4xl">
          <CopilotChat agentId="gen-ui-interrupt" />
        </div>
      </CopilotChatConfigurationProvider>
    </DemoFrame>
  );
}
