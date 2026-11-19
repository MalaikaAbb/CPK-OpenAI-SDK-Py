"use client";

// Tool Rendering — grouping & display options.
// Three prose fragments, each verbatim inside its marker: the grouped custom
// row (`group: true`), `toolCallDisplay: "line"`, and the `toolCallsView.group`
// slot. The mode switch, the agentId on each <CopilotChat> (the fragments
// print none, and the harness root provider has no default agent), and
// MyToolRow / ToolTimeline (./glue) are harness glue.

import { useState } from "react";
import { CopilotChat, useDefaultRenderTool } from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";

import { MyToolRow, ToolTimeline } from "./glue";

const AGENT_ID = "tool_rendering";

type Mode = "line" | "timeline";

function Rows() {
  // ── doc: tool-rendering prose block "page.tsx" (verbatim) ──
  useDefaultRenderTool({ render: MyToolRow, group: true });
  // ── end doc ──
  return null;
}

function LineChat() {
  return (
    <>
      {/* ── doc: tool-rendering prose block "page.tsx" (verbatim + harness agentId) ── */}
      {/* "grouped" (default) | "line" | "stacked" | "turn" | "separate" */}
      <CopilotChat agentId={AGENT_ID} messageView={{ toolCallDisplay: "line" }} />
      {/* ── end doc ── */}
    </>
  );
}

function TimelineChat() {
  return (
    <>
      {/* ── doc: tool-rendering prose block "page.tsx" (verbatim + harness agentId) ── */}
      {/* ToolTimeline: your component, given the group's `calls` and a `renderCall` function */}
      <CopilotChat
        agentId={AGENT_ID}
        messageView={{
          assistantMessage: { toolCallsView: { group: ToolTimeline } },
        }}
      />
      {/* ── end doc ── */}
    </>
  );
}

export default function Page() {
  const [mode, setMode] = useState<Mode>("line");
  return (
    <DemoFrame
      parentPath="/generative-ui/tool-rendering"
      subtitle={`agent: ${AGENT_ID} · grouping & display`}
    >
      <Rows />
      <div className="flex h-full flex-col">
        <div className="flex shrink-0 gap-2 border-b border-slate-200 px-4 py-2 text-xs dark:border-slate-800">
          {(["line", "timeline"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded px-2 py-1 ${mode === m ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" : "border border-slate-300 dark:border-slate-700"}`}
            >
              {m === "line" ? 'toolCallDisplay: "line"' : "toolCallsView.group: ToolTimeline"}
            </button>
          ))}
        </div>
        <div className="min-h-0 flex-1">
          {mode === "line" ? <LineChat /> : <TimelineChat />}
        </div>
      </div>
    </DemoFrame>
  );
}
