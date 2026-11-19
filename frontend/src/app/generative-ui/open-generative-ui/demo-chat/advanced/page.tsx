"use client";

// Harness glue: frames the doc's advanced page component.
import { DemoFrame } from "@/components/demo-frame";

import OpenGenUiAdvancedDemo from "./open-gen-ui-advanced-page";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/generative-ui/open-generative-ui"
      subtitle="agent: open-gen-ui-advanced → shared Quickstart agent · sandbox functions: evaluateExpression, notifyHost"
    >
      <OpenGenUiAdvancedDemo />
    </DemoFrame>
  );
}
