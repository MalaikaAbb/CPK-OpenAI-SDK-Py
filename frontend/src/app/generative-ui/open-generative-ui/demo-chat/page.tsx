"use client";

// Harness glue: frames the doc's minimal page component.
import { DemoFrame } from "@/components/demo-frame";

import OpenGenUiDemo from "./open-gen-ui-page";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/generative-ui/open-generative-ui"
      subtitle="agent: open-gen-ui → shared Quickstart agent · runtime: /api/copilotkit-ogui"
    >
      <OpenGenUiDemo />
    </DemoFrame>
  );
}
