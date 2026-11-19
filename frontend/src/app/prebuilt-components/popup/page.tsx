import { RouteHeader } from "@/components/route-header";
import { SourceCode } from "@/components/source-code";
import { Panel, TryIt } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/prebuilt-components/popup" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <code>&lt;CopilotPopup&gt;</code> puts the chat in a floating window
          over the app, opened from a launcher bubble. The page also sets one
          label: the composer placeholder.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={["Say hello in one sentence."]}
            expect='The popup is open on load, the composer placeholder reads "Ask the popup anything...", the reply streams, and closing it leaves the bubble in the corner.'
            fail="The default placeholder (labels not applied) or no reply."
          />
        </div>
      </Panel>

      <Panel
        title="The demo"
        description="Prose blocks verbatim inside the Code tab's page wrapper. Agent id swapped (prebuilt-popup → openai_agent); MainContent is a harness placeholder; Suggestions commented out."
      >
        <SourceCode file="frontend/src/app/prebuilt-components/popup/demo-chat/prebuilt-popup.tsx" />
      </Panel>
    </>
  );
}
