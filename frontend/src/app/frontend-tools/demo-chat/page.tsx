// ── harness fix: the prose block has no "use client"; the Code tab's page.tsx does ──
"use client";

// ── doc: frontend-tools prose block "src/app/demos/frontend-tools/page.tsx" (verbatim) ──
import React, { useState } from "react";
import {
  CopilotKit,
  CopilotSidebar,
  useFrontendTool,
} from "@copilotkit/react-core/v2";
import { z } from "zod";
import { Background, DEFAULT_BACKGROUND } from "./background";
// commented out: unpublished decorative useFrontendToolsSuggestions
// import { useFrontendToolsSuggestions } from "./suggestions";

function Chat() {
  const [background, setBackground] = useState<string>(DEFAULT_BACKGROUND);

  useFrontendTool({
    name: "change_background",
    description:
      "Change the page background. Accepts any valid CSS background value — colors, linear or radial gradients, etc.",
    parameters: z.object({
      background: z
        .string()
        .describe("The CSS background value. Prefer gradients."),
    }),
    handler: async ({ background }) => {
      setBackground(background);
      return { status: "success" };
    },
  });
// ── end doc (the published block stops here, mid-function) ──

  // ── from Code tab: the rest of Chat() ──
  // commented out: unpublished decorative useFrontendToolsSuggestions
  // useFrontendToolsSuggestions();

  return (
    <Background background={background}>
      {/* Harness: the Code tab's agentId is "frontend_tools"; this page needs no
          backend config, so it uses the Quickstart's shared agent. */}
      <CopilotSidebar agentId={SHARED_AGENT_ID} defaultOpen />
    </Background>
  );
  // ── end Code tab ──
}

// ── harness glue: the Code tab wraps Chat in its own <CopilotKit runtimeUrl="/api/copilotkit"
// agent="frontend_tools">; the harness uses the root provider (/api/harness) instead. ──
import { DemoFrame } from "@/components/demo-frame";
import { SHARED_AGENT_ID } from "@/lib/agents";

// `CopilotKit` (imported by the doc block) goes unused: only the Code tab's
// default export used it, and the harness replaces that with the root provider.
export default function FrontendToolsDemo() {
  return (
    <DemoFrame parentPath="/frontend-tools" subtitle={`agent: ${SHARED_AGENT_ID} (shared Quickstart agent)`}>
      <Chat />
    </DemoFrame>
  );
}
