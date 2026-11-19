"use client";

/**
 * Sub-Agents: a supervisor delegating to three sub-agents, logged in state.
 *
 * The prose describes this wiring and prints none of it. From Code tab
 * (src/app/demos/subagents/page.tsx), trimmed: the useAgent subscription and
 * the reads of `delegations` / `isRunning`.
 * Left out (labelled below): the three useRenderTool cards (they render the
 * unpublished ./subagent-activity-card), ./active-subagent
 * (inferActiveSubAgent, only for the unpublished banner), ./suggestions, and
 * the nested `<CopilotKit runtimeUrl="/api/copilotkit">`. The root provider
 * serves `subagents`.
 * Harness glue: the layout, standing in for the unpublished ./demo-layout.
 */
import {
  CopilotChat,
  useAgent,
  UseAgentUpdate,
} from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";

import type { Delegation } from "../_demo/delegation-log";
import { DelegationLog } from "../_demo/delegation-log";

// ── from Code tab ──
interface SubagentsAgentState {
  delegations?: Delegation[];
}

function DemoContent() {
  const { agent } = useAgent({
    agentId: "subagents",
    updates: [UseAgentUpdate.OnStateChanged, UseAgentUpdate.OnRunStatusChanged],
  });

  // commented out: unpublished decorative useSubagentsSuggestions
  // useSubagentsSuggestions();

  // omitted: three useRenderTool(...) calls (research_agent, writing_agent,
  // critique_agent). Each renders the unpublished SubAgentActivityCard inline
  // in the chat. They are not needed for the delegation log.

  const agentState = agent.state as SubagentsAgentState | undefined;
  const delegations = agentState?.delegations ?? [];
  const isRunning = agent.isRunning;
  // omitted: inferActiveSubAgent(delegations, agent.messages), from the
  // unpublished ./active-subagent. It only feeds the unpublished banner.
  // ── end Code tab ──

  // Harness glue: stands in for the unpublished <DemoLayout delegations isRunning activeSubAgent />.
  return (
    <div className="grid h-full grid-cols-1 gap-4 bg-slate-50 p-4 lg:grid-cols-[1fr_26rem] dark:bg-slate-950">
      <div className="min-h-0">
        <DelegationLog delegations={delegations} isRunning={isRunning} />
      </div>
      <div className="chat-host min-h-0 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800">
        <CopilotChat agentId="subagents" />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <DemoFrame parentPath="/multi-agent/subagents" subtitle="agent: subagents (supervisor)">
      <DemoContent />
    </DemoFrame>
  );
}
