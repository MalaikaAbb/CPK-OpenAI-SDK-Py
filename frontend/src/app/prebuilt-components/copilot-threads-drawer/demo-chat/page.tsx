import { DemoFrame } from "@/components/demo-frame";
import { IntelligenceBanner } from "@/app/_chat-ui/intelligence-banner";
import { INTELLIGENCE_ENABLED } from "@/lib/intelligence";

import { DrawerTabs } from "./drawer-tabs";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/prebuilt-components/copilot-threads-drawer"
      subtitle="agent: default → Quickstart agent · runtime: /api/threads (Intelligence)"
    >
      <div className="flex h-full flex-col">
        <IntelligenceBanner enabled={INTELLIGENCE_ENABLED} />
        <div className="min-h-0 flex-1">
          <DrawerTabs />
        </div>
      </div>
    </DemoFrame>
  );
}
