"use client";

// State Rendering — from Code tab src/app/demos/shared-state-streaming/page.tsx,
// minus its <CopilotKit> (the harness root provider is used) and its
// decorative suggestions. The useAgent call is the doc's prose block.

import React from "react";
import { useAgent, UseAgentUpdate } from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";

import { DemoLayout } from "./demo-layout";
// commented out: unpublished decorative useSharedStateStreamingSuggestions
// import { useSharedStateStreamingSuggestions } from "./suggestions";

interface StreamingAgentState {
  document?: string;
}

function DemoContent() {
  // ── doc: state-rendering prose block (verbatim except the agentId value) ──
  // Subscribe to BOTH state changes and run-status changes. The former
  // drives the per-token document rerender; the latter toggles the
  // "LIVE" badge when the agent starts / stops.
  const { agent } = useAgent({
    agentId: "shared_state_streaming", // harness id; doc prints "shared-state-streaming"
    updates: [UseAgentUpdate.OnStateChanged, UseAgentUpdate.OnRunStatusChanged],
  });
  // ── end doc ──

  // commented out: unpublished decorative useSharedStateStreamingSuggestions
  // useSharedStateStreamingSuggestions();

  const agentState = agent.state as StreamingAgentState | undefined;
  const document = agentState?.document ?? "";
  const isRunning = agent.isRunning;

  // Harness: DemoLayout is glue and takes the agent id for its chat.
  return (
    <DemoLayout
      agentId="shared_state_streaming"
      document={document}
      isStreaming={isRunning}
    />
  );
}

export default function Page() {
  return (
    <DemoFrame
      parentPath="/generative-ui/state-rendering"
      subtitle="agent: shared_state_streaming (DocumentStreamingAgent)"
    >
      <DemoContent />
    </DemoFrame>
  );
}
