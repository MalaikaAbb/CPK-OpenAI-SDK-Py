"use client";

/**
 * Governed actions — the useHumanInTheLoop path, as published.
 *
 * Harness glue: everything here except GovernedActionTool. The tool is
 * registered in the browser, so it needs no backend config, and the
 * Quickstart's shared agent (`openai_agent`) receives it with every run. The
 * page publishes no agent, prompt or policy engine. The model fills in the
 * whole envelope, verdict included, from what the user asks.
 */
import { CopilotChat } from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";
import { SHARED_AGENT_ID } from "@/lib/agents";

import { GovernedActionTool } from "../../_demo/governed-action-tool";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/human-in-the-loop/governed-actions"
      subtitle={`agent: ${SHARED_AGENT_ID} · useHumanInTheLoop path`}
    >
      <GovernedActionTool />
      <div className="chat-host mx-auto max-w-4xl">
        <CopilotChat agentId={SHARED_AGENT_ID} />
      </div>
    </DemoFrame>
  );
}
