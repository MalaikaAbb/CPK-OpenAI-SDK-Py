"use client";

// Tool Rendering — custom catch-all.
// The `useDefaultRenderTool({ render: … }, [])` call is the doc's prose
// block, verbatim. The page shell is from the Code tab's
// tool-rendering-custom-catchall/page.tsx, minus its <CopilotKit> (the harness
// root provider is used) and its decorative suggestions.
// CustomCatchallRenderer / CatchallToolStatus are harness glue (unpublished).

import React from "react";
import {
  CopilotChat,
  useDefaultRenderTool,
} from "@copilotkit/react-core/v2";
import { CustomCatchallRenderer } from "./custom-catchall-renderer";
import type { CatchallToolStatus } from "./custom-catchall-renderer";
// commented out: unpublished decorative useSuggestions
// import { useSuggestions } from "./suggestions";

import { DemoFrame } from "@/components/demo-frame";

const AGENT_ID = "tool_rendering"; // harness id; Code tab: "tool-rendering-custom-catchall"

function Chat() {
  // ── doc: tool-rendering prose block (verbatim) ──
  // Wildcard catch-all for anything that doesn't match a per-tool
  // renderer above.
  useDefaultRenderTool(
    {
      render: ({ name, parameters, status, result }) => (
        <CustomCatchallRenderer
          name={name}
          parameters={parameters}
          status={status as CatchallToolStatus}
          result={result}
        />
      ),
    },
    [],
  );
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
      subtitle={`agent: ${AGENT_ID} · custom catch-all`}
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
