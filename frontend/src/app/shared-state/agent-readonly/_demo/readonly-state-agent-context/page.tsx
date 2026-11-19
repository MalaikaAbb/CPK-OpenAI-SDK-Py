"use client";

/**
 * Agent Read-Only Context: the page's `page.tsx`.
 *
 * The prose prints the head of this file (imports, the provider and the
 * start of DemoContent) and, separately, the three useAgentContext calls, and
 * stops before `toggleActivity` and the return. The complete file is on the
 * Code tab (src/app/demos/readonly-state-agent-context/page.tsx). It is the
 * same text plus the missing tail and "use client", which the prose lacks.
 * Labelled changes: runtimeUrl, enableInspector, and the commented-out
 * suggestions hook.
 */

// ── doc: agent-readonly prose block (page head, verbatim) ──
import React, { useState } from "react";
import {
  CopilotKit,
  CopilotPopup,
  useAgentContext,
} from "@copilotkit/react-core/v2";

import { ACTIVITIES, DemoLayout } from "./demo-layout";
// ── end doc ──
// commented out: unpublished decorative useReadonlyStateAgentContextSuggestions
// import { useReadonlyStateAgentContextSuggestions } from "./suggestions";
// Harness change (labelled): one Inspector per page; see lib/inspector.ts.
import { nestedInspectorSetting } from "@/lib/inspector";

// ── doc: agent-readonly prose block (page head, verbatim, continued) ──
export default function ReadonlyStateAgentContextDemo() {
  return (
    // Harness change (labelled): the doc's runtimeUrl is "/api/copilotkit",
    // this repo's verbatim Quickstart runtime, which registers only
    // `openai_agent`. The harness runtime registers this page's agent.
    // enableInspector is also the harness's (the doc does not set it).
    <CopilotKit
      runtimeUrl="/api/harness"
      agent="readonly-state-agent-context"
      enableInspector={nestedInspectorSetting}
    >
      <DemoContent />
      <CopilotPopup
        agentId="readonly-state-agent-context"
        defaultOpen={true}
        labels={{ chatInputPlaceholder: "Ask about your context..." }}
      />
    </CopilotKit>
  );
}

function DemoContent() {
  const [userName, setUserName] = useState("Atai");
  const [userTimezone, setUserTimezone] = useState("America/Los_Angeles");
  const [recentActivity, setRecentActivity] = useState<string[]>([
    ACTIVITIES[0],
    ACTIVITIES[2],
  ]);
  // ── end doc ──

  // ── doc: agent-readonly prose block (useAgentContext calls, verbatim) ──
  useAgentContext({
    description: "The currently logged-in user's display name",
    value: userName,
  });
  useAgentContext({
    description: "The user's IANA timezone (used when mentioning times)",
    value: userTimezone,
  });
  useAgentContext({
    description: "The user's recent activity in the app, newest first",
    value: recentActivity,
  });
  // ── end doc ──

  // commented out: unpublished decorative useReadonlyStateAgentContextSuggestions
  // useReadonlyStateAgentContextSuggestions();

  // ── from Code tab: the tail the prose cuts off ──
  const toggleActivity = (activity: string) => {
    setRecentActivity((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity],
    );
  };

  return (
    <DemoLayout
      userName={userName}
      userTimezone={userTimezone}
      recentActivity={recentActivity}
      onUserNameChange={setUserName}
      onUserTimezoneChange={setUserTimezone}
      onToggleActivity={toggleActivity}
    />
  );
}
// ── end Code tab ──
