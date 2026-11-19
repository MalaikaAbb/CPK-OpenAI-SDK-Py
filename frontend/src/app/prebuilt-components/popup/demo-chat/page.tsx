import { DemoFrame } from "@/components/demo-frame";

import PrebuiltPopupDemo from "./prebuilt-popup";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/prebuilt-components/popup"
      subtitle="agent: openai_agent (doc: prebuilt-popup) · runtime: /api/copilotkit"
    >
      <PrebuiltPopupDemo />
    </DemoFrame>
  );
}
