"use client"; // harness: not in the prose

import { CopilotChat } from "@copilotkit/react-core/v2"; // harness: the prose uses it without importing it

import { ThreadSidebar } from "./thread-sidebar";

// ── doc: Headless Threads prose block "App.tsx" (verbatim) ──
import { useState } from "react";

function App() {
const [activeThreadId, setActiveThreadId] = useState<string | undefined>();

  return (
    <div className="flex">
      {/* @ts-expect-error doc bug: ThreadSidebar takes no props, so onSelectThread is a type error — and nothing in it ever calls it */}
      <ThreadSidebar onSelectThread={setActiveThreadId} />
      <CopilotChat threadId={activeThreadId} /> {}
    </div>
  );
}
// ── end doc ──

export default App;
