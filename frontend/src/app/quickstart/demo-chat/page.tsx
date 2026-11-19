import { DemoFrame } from "@/components/demo-frame";

import RootLayout from "./doc-layout";
import Page from "./doc-page";

/**
 * Harness glue: mounts the Quickstart's two React files the way Next would —
 * the layout around the page. Both files are the doc's, in this folder.
 */
export default function QuickstartDemo() {
  return (
    <DemoFrame
      parentPath="/quickstart"
      subtitle="agent: openai_agent · runtime: /api/copilotkit (the Quickstart's route)"
    >
      <RootLayout>
        <Page />
      </RootLayout>
    </DemoFrame>
  );
}
