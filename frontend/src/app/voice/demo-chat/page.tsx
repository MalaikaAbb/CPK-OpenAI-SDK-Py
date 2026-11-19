import { DemoFrame } from "@/components/demo-frame";

import VoiceDemoPage from "./voice-page";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/voice"
      subtitle="agent: voice-demo → backend /voice (Quickstart agent) · runtime: /api/copilotkit-voice"
    >
      <VoiceDemoPage />
    </DemoFrame>
  );
}
