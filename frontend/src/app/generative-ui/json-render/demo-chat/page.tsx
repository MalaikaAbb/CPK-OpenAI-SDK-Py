"use client";

// json-render page — from Code tab src/app/demos/declarative-json-render/page.tsx
// (the prose never prints a page.tsx), minus its <CopilotKit
// runtimeUrl="/api/copilotkit-declarative-json-render" agent={AGENT_ID}>: that
// route has no special options, so the harness root provider (/api/harness,
// which registers AGENT_ID = "byoc_json_render") is used instead.
import { DemoFrame } from "@/components/demo-frame";

import { AGENT_ID, Chat } from "./chat";

export default function Page() {
  return (
    <DemoFrame parentPath="/generative-ui/json-render" subtitle={`agent: ${AGENT_ID}`}>
      <div className="flex justify-center items-center h-full w-full">
        <div className="h-full w-full max-w-4xl">
          <Chat />
        </div>
      </div>
    </DemoFrame>
  );
}
