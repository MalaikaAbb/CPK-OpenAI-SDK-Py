import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/prebuilt-components/chat-controls" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Three ways to drive a prebuilt chat from outside it: owning the
          sidebar&apos;s open state yourself (<code>open</code> +{" "}
          <code>onOpenChange</code>), flipping it from anywhere under the
          provider with <code>useCopilotChatConfiguration().setModalOpen</code>,
          and receiving thumbs-up / thumbs-down clicks on assistant replies.
          Each runs in its own tab of the demo.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["(tab 1) click “Ask the assistant”, then close the sidebar with its X"]}
            expect="The sidebar opens from your button and closes from its own X; clicking the button again re-opens it (state stays in sync through onOpenChange)."
            fail="The sidebar ignores the button, or reopening fails after closing it from inside."
          />
          <TryIt
            prompts={["(tab 2) click “Ask the assistant” and “Open chat / Close chat”"]}
            expect="Both buttons open (and the toggle closes) the sidebar that starts closed."
            fail="The buttons render but nothing opens — the provider that owns modal state is not the one the sidebar uses. Record it as a doc discrepancy."
          />
          <TryIt
            prompts={["(tab 3) ask “Give me a fun fact”, then click thumbs up on the reply"]}
            expect='A line appears in the "analytics.track calls" log: feedback {"messageId":"…","value":"up"}.'
            fail="No thumbs buttons on the reply, or clicking them logs nothing."
          />
        </div>
      </Panel>

      <Panel
        title="The snippets, as run"
        description="All five prose blocks verbatim, each marked. The page prints no provider, so the demo runs them under the Quickstart's layout provider."
      >
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/prebuilt-components/chat-controls/demo-chat/doc-snippets.tsx" },
            { file: "frontend/src/app/prebuilt-components/chat-controls/demo-chat/analytics.ts" },
          ]}
        />
      </Panel>

      <Panel title="Demo shell (harness glue)">
        <SourceCode file="frontend/src/app/prebuilt-components/chat-controls/demo-chat/page.tsx" />
      </Panel>

      <Callout tone="premium" title="Automatic Learning capture — requires premium">
        <p>
          The page notes that, with CopilotKit Intelligence&apos;s Learning
          capture, ratings also land on the active trajectory. That path needs
          Intelligence and is not exercised here; the handlers above work
          without it.
        </p>
      </Callout>
    </>
  );
}
