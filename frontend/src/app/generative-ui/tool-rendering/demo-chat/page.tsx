"use client";

/**
 * Tool Rendering — per-tool renderers (the page's "app/page.tsx").
 *
 * Doc block "app/page.tsx" prints:
 *
 *   <CopilotKit runtimeUrl="/api/copilotkit" agent="tool-rendering">
 *     <ToolRenderers />
 *     <CopilotChat agentId="tool-rendering" />
 *   </CopilotKit>
 *
 * Harness changes (labelled): the harness root provider (/api/harness)
 * replaces the printed <CopilotKit> — the harness's /api/copilotkit is the
 * Quickstart's verbatim runtime and registers only `openai_agent` — and the
 * agent id is the harness's `tool_rendering`. The two children are as printed.
 */
import { CopilotChat } from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";

import { ToolRenderers } from "./tool-renderers";

const TOOL_RENDERING_AGENT_ID = "tool_rendering";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/generative-ui/tool-rendering"
      subtitle={`agent: ${TOOL_RENDERING_AGENT_ID} · per-tool renderers`}
    >
      {/* ── doc: "app/page.tsx" children (verbatim apart from agentId) ── */}
      <ToolRenderers />
      <CopilotChat agentId={TOOL_RENDERING_AGENT_ID} />
      {/* ── end doc ── */}
    </DemoFrame>
  );
}
