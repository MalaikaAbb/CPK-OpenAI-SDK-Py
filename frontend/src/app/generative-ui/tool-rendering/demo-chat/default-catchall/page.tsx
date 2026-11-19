"use client";

// Tool Rendering — default catch-all.
// The only doc code is the `useDefaultRenderTool();` call (prose block,
// verbatim, with its comment). The page shell is from the Code tab's
// tool-rendering-default-catchall/page.tsx, minus its <CopilotKit> (the
// harness root provider is used) and its decorative suggestions.

import React from "react";
import {
  CopilotChat,
  useDefaultRenderTool,
} from "@copilotkit/react-core/v2";
// commented out: unpublished decorative useSuggestions
// import { useSuggestions } from "./suggestions";

import { DemoFrame } from "@/components/demo-frame";

const AGENT_ID = "tool_rendering"; // harness id; Code tab: "tool-rendering-default-catchall"

function Chat() {
  // ── doc: tool-rendering prose block (verbatim) ──
  // Opt in to CopilotKit's built-in default tool-call card. Called with
  // no config so the package-provided `DefaultToolCallRenderer` is used
  // as the wildcard renderer — this is the "out-of-the-box" UI the cell
  // is meant to showcase.
  useDefaultRenderTool();
  // ── end doc ──

  // commented out: unpublished decorative useSuggestions
  // useSuggestions();

  // ── from Code tab ──
  return <CopilotChat agentId={AGENT_ID} className="h-full rounded-2xl" />;
}

export default function Page() {
  return (
    <DemoFrame
      parentPath="/generative-ui/tool-rendering"
      subtitle={`agent: ${AGENT_ID} · default catch-all`}
    >
      {/* from Code tab: layout */}
      <div className="flex justify-center items-center h-full w-full">
        <div className="h-full w-full max-w-4xl">
          <Chat />
        </div>
      </div>
    </DemoFrame>
  );
}
