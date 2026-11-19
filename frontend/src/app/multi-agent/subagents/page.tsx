import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DIR = "frontend/src/app/multi-agent/subagents";

export default function Page() {
  return (
    <>
      <RouteHeader path="/multi-agent/subagents" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The supervisor agent has three tools, and each one hands its task to
          a separate Agents SDK agent with <code>Runner.run</code>. Each
          delegation adds an entry (sub-agent, task, result) to{" "}
          <code>delegations</code> in shared state through{" "}
          <code>shared_state().update</code>. The adapter streams a snapshot
          after every tool, so the log grows during the run. Because of{" "}
          <code>parallel_tool_calls=False</code>, the supervisor makes one
          delegation per model call: research, then writing, then critique.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Write a short blog post about the history of the bicycle.",
              "Draft a product announcement for a solar-powered phone charger.",
            ]}
            expect="'Supervisor running' appears. Entries #1 Research, #2 Writing and #3 Critique arrive one at a time, each with its task and the sub-agent's output, and the indicator chips light up. The count reads '3 calls', and the chat ends with the final draft."
            fail="The chat answers but the log stays empty: no STATE_SNAPSHOT reached the page (look for one after each tool in the Inspector). Entries arrive all at once at the end: snapshots are being buffered. 'Agent subagents not found': the backend mount or the runtime registration is missing."
          />
        </div>
      </Panel>

      <Panel title="The agent" description="subagents.py, complete in the prose.">
        <SourceCode file="backend/demo_agents/subagents.py" />
      </Panel>

      <Panel
        title="The page"
        description="delegation-log.tsx: the second half is the prose, the first half (types, styles) is from Code tab. The page is from Code tab, trimmed. The layout is glue."
      >
        <SourceCodeGroup
          files={[
            { file: `${DIR}/demo-chat/page.tsx` },
            { file: `${DIR}/_demo/delegation-log.tsx` },
          ]}
        />
      </Panel>

      <Callout tone="warn" title="Doc gaps">
        <ul className="space-y-1.5">
          <li>
            · The <code>delegation-log.tsx</code> excerpt uses{" "}
            <code>SubAgentName</code>, <code>Delegation</code>,{" "}
            <code>DelegationLogProps</code> and <code>SUB_AGENT_STYLE</code>{" "}
            without defining them. All four are taken from the Code tab.
          </li>
          <li>
            · The prose describes the <code>useAgent</code> subscription in
            words only. The Code-tab page also imports four unpublished
            modules (<code>subagent-activity-card</code>,{" "}
            <code>demo-layout</code>, <code>active-subagent</code>,{" "}
            <code>suggestions</code>). Those are left out, and the inline
            per-tool chat cards with them.
          </li>
          <li>
            · No published runtime registers <code>subagents</code>.
          </li>
        </ul>
      </Callout>
    </>
  );
}
