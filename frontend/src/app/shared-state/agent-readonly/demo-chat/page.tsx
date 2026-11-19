"use client";

/** Harness glue: mounts the doc's page.tsx inside the demo frame. */
import { DemoFrame } from "@/components/demo-frame";

import ReadonlyStateAgentContextDemo from "../_demo/readonly-state-agent-context/page";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/shared-state/agent-readonly"
      subtitle="agent: readonly-state-agent-context (nested provider)"
    >
      <ReadonlyStateAgentContextDemo />
    </DemoFrame>
  );
}
