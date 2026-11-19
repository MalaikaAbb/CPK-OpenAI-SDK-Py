"use client";

/**
 * Harness glue — NOT from the docs.
 *
 * The Code tab's page.tsx renders `<DemoLayout document isStreaming />` from
 * `./demo-layout`, which neither the prose nor the Code tab publishes. It has
 * to hold two things: the chat that drives the agent and the DocumentView that
 * shows `state.document`. This is the smallest layout that does both.
 */
import { CopilotChat } from "@copilotkit/react-core/v2";

import { DocumentView } from "./document-view";

export function DemoLayout({
  agentId,
  document,
  isStreaming,
}: {
  agentId: string;
  document: string;
  isStreaming: boolean;
}) {
  return (
    <div className="grid h-full grid-cols-1 gap-4 p-4 lg:grid-cols-[1fr_26rem]">
      <div className="min-h-0">
        <DocumentView content={document} isStreaming={isStreaming} />
      </div>
      <div className="min-h-0 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        <CopilotChat agentId={agentId} className="h-full" />
      </div>
    </div>
  );
}
