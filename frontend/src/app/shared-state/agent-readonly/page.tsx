import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DIR = "frontend/src/app/shared-state/agent-readonly/_demo/readonly-state-agent-context";

export default function Page() {
  return (
    <>
      <RouteHeader path="/shared-state/agent-readonly" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Data flows one way, from the UI to the agent. The page publishes the
          user&apos;s name, timezone and recent activity with three{" "}
          <code>useAgentContext</code> calls. They reach the backend as{" "}
          <code>RunAgentInput.context</code>, and the adapter adds them to the
          instructions before each model call. The agent has no tools and no
          state, so it can read these values but never write them back. When
          the component unmounts, the values are gone.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "What's my name and what time zone am I in?",
              "(change Name to Priya, untick everything but 'Exported the customer list as CSV', then) What did I do recently?",
            ]}
            expect="The first answer says Atai and America/Los_Angeles. After the edits, the next answer says Priya and mentions only the CSV export. The chat never offers to change these values."
            fail="The agent says it doesn't know your name: the context is not in the request (check the RunAgentInput's `context` array in the Inspector), or the adapter's context_in_instructions is off."
          />
        </div>
      </Panel>

      <Panel
        title="The agent"
        description="SYSTEM_PROMPT and app_context_agent are the doc's. The imports are from Code tab."
      >
        <SourceCode file="backend/demo_agents/app_context.py" />
      </Panel>

      <Panel
        title="The page"
        description="The prose head and the useAgentContext calls are verbatim. The truncated tail is from Code tab. demo-layout is glue."
      >
        <SourceCodeGroup
          files={[
            { file: `${DIR}/page.tsx` },
            { file: `${DIR}/demo-layout.tsx` },
          ]}
        />
      </Panel>

      <Panel
        title="Reading context from a tool — shown, not run"
        description="Verbatim. Attached to no agent, and its body is `...`."
      >
        <SourceCode file="backend/docs_verbatim/state_hitl/upcoming_events.py" />
      </Panel>

      <Callout tone="warn" title="Doc gaps on this page">
        <ul className="space-y-1.5">
          <li>
            · The prose cuts <code>page.tsx</code> off before{" "}
            <code>toggleActivity</code> and the return. It also leaves out{" "}
            <code>&quot;use client&quot;</code>. Both are taken from the Code tab.
          </li>
          <li>
            · <code>./demo-layout</code> (<code>ACTIVITIES</code>,{" "}
            <code>DemoLayout</code>) is unpublished. Without it the three
            setters are unused and there is nothing to edit. A minimal glue
            version is supplied.
          </li>
          <li>
            · The page&apos;s provider points at <code>/api/copilotkit</code>.
            The Quickstart runtime there does not register{" "}
            <code>readonly-state-agent-context</code>, so the harness runtime
            is used instead (labelled).
          </li>
        </ul>
      </Callout>
    </>
  );
}
