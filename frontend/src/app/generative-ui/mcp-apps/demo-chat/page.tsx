"use client";

// Harness glue: frames the doc's page component (./mcp-apps-page.tsx).
import { DemoFrame } from "@/components/demo-frame";

import MCPAppsDemo from "./mcp-apps-page";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/generative-ui/mcp-apps"
      subtitle="agent: mcp-apps → shared Quickstart agent · runtime: /api/copilotkit-mcp-apps · MCP: Excalidraw"
    >
      <MCPAppsDemo />
    </DemoFrame>
  );
}
