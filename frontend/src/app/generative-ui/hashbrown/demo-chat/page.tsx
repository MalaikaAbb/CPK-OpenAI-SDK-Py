"use client";

// Harness glue: frames the doc's page component (./hashbrown-page.tsx).
import { DemoFrame } from "@/components/demo-frame";

import ByocHashbrownDemoPage from "./hashbrown-page";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/generative-ui/hashbrown"
      subtitle="agent: declarative-hashbrown-demo → byoc_hashbrown · runtime: /api/copilotkit-declarative-hashbrown"
    >
      <ByocHashbrownDemoPage />
    </DemoFrame>
  );
}
