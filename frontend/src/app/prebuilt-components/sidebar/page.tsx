import { RouteHeader } from "@/components/route-header";
import { SourceCode } from "@/components/source-code";
import { Panel, TryIt } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/prebuilt-components/sidebar" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <code>&lt;CopilotSidebar&gt;</code> docks the same chat to the edge
          of the app, next to the page content rather than inside it.{" "}
          <code>defaultOpen</code> makes it start expanded.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={["What is a sidebar copilot good for?"]}
            expect="The sidebar is open on load, the app body stays visible beside it, the reply streams, and the close button collapses it to a launcher."
            fail="The sidebar starts closed (defaultOpen ignored) or replies never arrive."
          />
        </div>
      </Panel>

      <Panel
        title="The demo"
        description="Prose blocks verbatim inside the Code tab's page wrapper. Agent id swapped (prebuilt-sidebar → openai_agent); MainContent is a harness placeholder; Suggestions commented out."
      >
        <SourceCode file="frontend/src/app/prebuilt-components/sidebar/demo-chat/prebuilt-sidebar.tsx" />
      </Panel>
    </>
  );
}
