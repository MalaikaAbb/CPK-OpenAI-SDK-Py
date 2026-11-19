"use client";

/**
 * Governed actions — the useInterrupt path, as published.
 *
 * Harness glue: everything here except GovernedActionApproval. The page
 * publishes no agent for this path. The interrupt agent from the Human in the
 * Loop page (`gen-ui-interrupt`, schedule_meeting needs_approval) is the one
 * agent in this repo that pauses with an interrupt. Its interrupts carry
 * `metadata.tool_name/tool_input`, never `metadata.action`, so the card
 * renders nothing. That is the bug this demo shows.
 */
import {
  CopilotChat,
  CopilotChatConfigurationProvider,
} from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";

import { GovernedActionApproval } from "../_demo/governed-action";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/human-in-the-loop/governed-actions"
      subtitle="agent: gen-ui-interrupt · useInterrupt path (renders null by design)"
    >
      <CopilotChatConfigurationProvider agentId="gen-ui-interrupt">
        <GovernedActionApproval />
        <div className="chat-host mx-auto max-w-4xl">
          <CopilotChat agentId="gen-ui-interrupt" />
        </div>
      </CopilotChatConfigurationProvider>
    </DemoFrame>
  );
}
