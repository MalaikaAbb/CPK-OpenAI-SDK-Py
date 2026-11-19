"use client";

/** Harness glue: mounts the doc's hitl-in-chat page inside the demo frame. */
import { DemoFrame } from "@/components/demo-frame";

import HitlInChatDemo from "../_demo/hitl-in-chat/page";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/human-in-the-loop"
      subtitle="agent: hitl-in-chat (nested provider) · frontend tool book_call"
    >
      {/* Harness glue: the doc's layout is `h-screen`; inside the demo frame
          that would push the chat input below the fold, so it is overridden
          to fill the frame instead (the doc file stays verbatim). */}
      <div className="h-full [&_.h-screen]:!h-full">
        <HitlInChatDemo />
      </div>
    </DemoFrame>
  );
}
