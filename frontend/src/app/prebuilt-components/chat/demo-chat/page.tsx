import { DemoFrame } from "@/components/demo-frame";

import AgenticChatDemo from "./agentic-chat";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/prebuilt-components/chat"
      subtitle="agent: openai_agent (doc: agentic_chat) · runtime: /api/copilotkit"
    >
      {/* harness glue: give the chat a height to fill */}
      <div className="h-full">
        <AgenticChatDemo />
      </div>
    </DemoFrame>
  );
}
