"use client";

/**
 * State streaming: `agent.state.document` grows token by token.
 *
 * Sources:
 *   - the useAgent call: doc prose block (verbatim), except the agent id —
 *     see the labelled line.
 *   - the rest of DemoContent (reading state.document and isRunning): from
 *     Code tab (src/app/demos/shared-state-streaming/page.tsx).
 *   - layout: harness glue. The Code tab imports an unpublished
 *     `./demo-layout`; this is the smallest stand-in (DocumentView + chat).
 *   - the Code tab's nested `<CopilotKit runtimeUrl="/api/copilotkit">` is not
 *     used: the root provider serves this agent.
 */
import {
  CopilotChat,
  useAgent,
  UseAgentUpdate,
} from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";

import { DocumentView } from "../_demo/document-view";
// commented out: unpublished decorative useSharedStateStreamingSuggestions
// import { useSharedStateStreamingSuggestions } from "./suggestions";

// ── from Code tab ──
interface StreamingAgentState {
  document?: string;
}
// ── end Code tab ──

// Harness change (labelled): the doc's id is "shared-state-streaming". The
// agent (backend/demo_agents/shared_state_streaming.py) is shared with
// /generative-ui/state-rendering and mounted once, by the gen-ui group, at
// `shared_state_streaming`.
const STREAMING_AGENT_ID = "shared_state_streaming";

function DemoContent() {
  // ── doc: streaming prose block (useAgent, verbatim but for agentId) ──
  // Subscribe to BOTH state changes and run-status changes. The former
  // drives the per-token document rerender; the latter toggles the
  // "LIVE" badge when the agent starts / stops.
  const { agent } = useAgent({
    agentId: STREAMING_AGENT_ID,
    updates: [UseAgentUpdate.OnStateChanged, UseAgentUpdate.OnRunStatusChanged],
  });
  // ── end doc ──

  // commented out: unpublished decorative useSharedStateStreamingSuggestions
  // useSharedStateStreamingSuggestions();

  // ── from Code tab ──
  const agentState = agent.state as StreamingAgentState | undefined;
  const document = agentState?.document ?? "";
  const isRunning = agent.isRunning;
  // ── end Code tab ──

  // Harness glue: stands in for the unpublished <DemoLayout document isStreaming />.
  return (
    <div className="grid h-full grid-cols-1 gap-4 bg-slate-50 p-4 lg:grid-cols-[1fr_26rem] dark:bg-slate-950">
      <div className="min-h-0">
        <DocumentView content={document} isStreaming={isRunning} />
      </div>
      <div className="chat-host min-h-0 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800">
        <CopilotChat agentId={STREAMING_AGENT_ID} />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <DemoFrame parentPath="/shared-state/streaming" subtitle="agent: shared_state_streaming">
      <DemoContent />
    </DemoFrame>
  );
}
