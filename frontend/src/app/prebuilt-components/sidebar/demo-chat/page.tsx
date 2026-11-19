import { DemoFrame } from "@/components/demo-frame";

import PrebuiltSidebarDemo from "./prebuilt-sidebar";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/prebuilt-components/sidebar"
      subtitle="agent: openai_agent (doc: prebuilt-sidebar) · runtime: /api/copilotkit"
    >
      <PrebuiltSidebarDemo />
    </DemoFrame>
  );
}
