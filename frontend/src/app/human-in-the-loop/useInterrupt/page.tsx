import Link from "next/link";

import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, CodeBlock, Panel, TryIt } from "@/components/ui";

const DIR = "frontend/src/app/human-in-the-loop/useInterrupt";

// The page's first block: shape notes rather than code. Shown, not run.
const OUTCOME = `outcome.type === "interrupt"
outcome.interrupts  // Interrupt[]`;

export default function Page() {
  return (
    <>
      <RouteHeader path="/human-in-the-loop/useInterrupt" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A backend tool pauses the run before it executes. Because{" "}
          <code>schedule_meeting</code> has <code>needs_approval=True</code>,
          the Agents SDK stops at the call, and the adapter ends the AG-UI run
          with <code>RUN_FINISHED</code> whose <code>outcome.type</code> is{" "}
          <code>&quot;interrupt&quot;</code>. <code>useInterrupt</code> draws
          the approval UI in the chat. <code>resolve(payload)</code> starts a
          new run whose <code>resume</code> entry carries the payload, and{" "}
          <code>cancel()</code> answers with a cancellation. The adapter runs
          the tool only when the payload&apos;s <code>approved</code> is
          exactly <code>true</code>.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Book an intro call with the sales team to discuss pricing.",
            ]}
            expect={
              <>
                Demo 1 (ApprovalInterrupt): the chat shows &quot;Approve call to
                schedule_meeting?&quot; with Approve and Cancel buttons, and the
                run stops. Approve resumes the run, and the agent reports that{" "}
                <em>no time was picked, so nothing was scheduled</em>. That is
                the expected verbatim outcome, because the snippet sends no
                time. Cancel gives the same message. Demo 2 (multi): the same
                row in a list, but Approve sends <code>{"{ ok: true }"}</code>,
                which the adapter treats as a rejection (&quot;Tool execution
                was not approved.&quot;).
              </>
            }
            fail="No buttons and the agent answers directly: no interrupt reached the client (check the Inspector for RUN_FINISHED with outcome.type 'interrupt'). The buttons appear but nothing happens on click: resolve did not start a resume run."
          />
        </div>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Two demos, one <code>useInterrupt</code> each:{" "}
          <Link className="underline" target="_blank" href="/human-in-the-loop/useInterrupt/demo-chat">
            ApprovalInterrupt
          </Link>{" "}
          ·{" "}
          <Link className="underline" target="_blank" href="/human-in-the-loop/useInterrupt/demo-chat/multi">
            multiple interrupts
          </Link>
        </p>
      </Panel>

      <Panel title="The outcome shape (shown, not run)">
        <CodeBlock code={OUTCOME} language="ts" />
      </Panel>

      <Panel
        title="The snippets and their glue"
        description="Both hooks are verbatim. The page publishes no agent id, so a chat-configuration provider supplies one (glue)."
      >
        <SourceCodeGroup
          files={[
            { file: `${DIR}/_demo/approval-interrupt.tsx` },
            { file: `${DIR}/_demo/multi-interrupt.tsx` },
            { file: `${DIR}/demo-chat/page.tsx` },
          ]}
        />
      </Panel>

      <Panel
        title="The agent"
        description="Taken from the Human in the Loop page (Pattern 2) and its Code tab. This page prints no backend."
      >
        <SourceCode file="backend/demo_agents/interrupt_agent.py" />
      </Panel>

      <Callout tone="warn" title="Doc vs implementation">
        <ul className="space-y-1.5">
          <li>
            · The page has a &quot;Not available on this framework&quot;
            banner. The adapter does support standard interrupts, and both
            demos pause and resume.
          </li>
          <li>
            · The multi-interrupt snippet resolves <code>{"{ ok: true }"}</code>.{" "}
            <code>ag-ui-openai-agents</code> approves only when{" "}
            <code>payload.approved is True</code>, so its Approve is treated as
            a rejection. The interrupt agent also sets{" "}
            <code>parallel_tool_calls=False</code>, so in practice there is one
            interrupt at a time.
          </li>
          <li>
            · ApprovalInterrupt sends <code>{"{ approved: true }"}</code> with no{" "}
            <code>chosen_time</code>. <code>schedule_meeting</code> runs but
            returns &quot;User did not pick a time. Meeting NOT scheduled&quot;.
          </li>
        </ul>
      </Callout>
    </>
  );
}
