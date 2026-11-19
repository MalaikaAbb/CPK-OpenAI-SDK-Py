"use client";

import { useEffect, useState } from "react";

import { DemoFrame } from "@/components/demo-frame";
import { VariantTabs } from "@/app/_chat-ui/variant-tabs";
import RootLayout from "@/app/quickstart/demo-chat/doc-layout";

import { analytics, type TrackedEvent } from "./analytics";
import { FeedbackChat, Layout, ProgrammaticLayout } from "./doc-snippets";

/** Harness glue: shows what the analytics stub received. */
function TrackedLog() {
  const [events, setEvents] = useState<TrackedEvent[]>([]);
  useEffect(() => analytics.subscribe((e) => setEvents((p) => [e, ...p])), []);
  return (
    <div className="border-t border-slate-200 p-3 text-xs dark:border-slate-800">
      <p className="font-semibold">analytics.track calls (stub)</p>
      {events.length === 0 ? (
        <p className="text-slate-500">None yet — rate an assistant reply.</p>
      ) : (
        <ul className="mt-1 space-y-0.5 font-mono">
          {events.map((e, i) => (
            <li key={i}>
              {e.at} {e.event} {JSON.stringify(e.props)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Harness glue: the page prints no provider, so every snippet runs under the
 * Quickstart's (app/layout.tsx → <CopilotKit runtimeUrl="/api/copilotkit"
 * agent="openai_agent">), as an app built from the Quickstart would.
 */
export default function Page() {
  return (
    <DemoFrame
      parentPath="/prebuilt-components/chat-controls"
      subtitle="agent: openai_agent · runtime: /api/copilotkit (Quickstart provider)"
    >
      <RootLayout>
        <VariantTabs
          variants={[
            {
              id: "controlled",
              label: "open / onOpenChange",
              note: "Block 1: your state owns the sidebar. Click the nav button; close it with the sidebar's own X.",
              render: () => (
                <div className="p-4">
                  <Layout />
                </div>
              ),
            },
            {
              id: "programmatic",
              label: "setModalOpen / toggle / defaultOpen",
              note: "Blocks 2–4: buttons using useCopilotChatConfiguration beside <CopilotSidebar defaultOpen={false} />.",
              render: () => (
                <div className="p-4">
                  <ProgrammaticLayout />
                </div>
              ),
            },
            {
              id: "feedback",
              label: "thumbs up / down",
              note: "Block 5: onThumbsUp / onThumbsDown → analytics.track (harness stub, logged below).",
              render: () => (
                <div className="flex h-full flex-col">
                  <div className="min-h-0 flex-1">
                    <FeedbackChat />
                  </div>
                  <TrackedLog />
                </div>
              ),
            },
          ]}
        />
      </RootLayout>
    </DemoFrame>
  );
}
