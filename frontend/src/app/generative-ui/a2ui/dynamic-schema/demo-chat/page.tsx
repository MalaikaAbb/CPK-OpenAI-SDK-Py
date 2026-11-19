"use client";

// Harness glue: frames the doc's page component (./declarative-gen-ui.tsx).
import { DemoFrame } from "@/components/demo-frame";

import DeclarativeGenUIDemo from "./declarative-gen-ui";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/generative-ui/a2ui/dynamic-schema"
      subtitle="agent: declarative-gen-ui → shared Quickstart agent · runtime: /api/copilotkit-declarative-gen-ui"
    >
      <DeclarativeGenUIDemo />
    </DemoFrame>
  );
}
