import Link from "next/link";

import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DIR = "frontend/src/app/human-in-the-loop/governed-actions";

export default function Page() {
  return (
    <>
      <RouteHeader path="/human-in-the-loop/governed-actions" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A small envelope (<code>GovernedAction</code>) describes an action
          with side effects and a policy verdict. One card renders it for both
          pause mechanisms. With <code>allow</code> the card approves itself
          on mount, with <code>deny</code> it blocks itself, and only{" "}
          <code>require_approval</code> shows buttons. The page wires the card
          two ways: as a <code>useInterrupt</code> renderer that reads the
          envelope from <code>interrupt.metadata.action</code>, and as a{" "}
          <code>useHumanInTheLoop</code> tool (<code>approve_governed_action</code>)
          whose arguments are the envelope.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Tool demo: Before sending a welcome email to bob@example.com, call approve_governed_action with id 'act-1', summary 'Send welcome email', tool 'send_email', reference 'policy/email-7', verdict 'require_approval' and the email as arguments.",
              "Tool demo: same, but with verdict 'deny'.",
              "Interrupt demo: Book an intro call with the sales team.",
            ]}
            expect={
              <>
                Tool demo: a card reads &quot;User approval required&quot; and
                shows the summary, tool, reference and JSON arguments, with
                &quot;Approve and run&quot; and &quot;Reject&quot;. The agent
                then reports the <code>approved</code> value you chose. With{" "}
                <code>deny</code>, the card answers <code>approved: false</code>{" "}
                on its own, with no buttons. Interrupt demo:{" "}
                <em>no card appears</em> and the run stays paused. That is the
                expected, documented failure (see below).
              </>
            }
            fail="Tool demo: the model answers in text without the card. The frontend tool did not reach the run (look for approve_governed_action in RunAgentInput.tools)."
          />
        </div>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Two demos:{" "}
          <Link className="underline" target="_blank" href="/human-in-the-loop/governed-actions/demo-chat">
            useInterrupt path
          </Link>{" "}
          ·{" "}
          <Link className="underline" target="_blank" href="/human-in-the-loop/governed-actions/demo-chat/tool">
            useHumanInTheLoop path
          </Link>
        </p>
      </Panel>

      <Panel
        title="The snippets"
        description="All four blocks are verbatim. Imports, exports and the executeSideEffect stub are labelled glue."
      >
        <SourceCodeGroup
          files={[
            { file: `${DIR}/_demo/governed-action.tsx` },
            { file: `${DIR}/_demo/governed-action-tool.tsx` },
            { file: `${DIR}/_demo/handle-approval.ts` },
          ]}
        />
      </Panel>

      <Panel title="The demo pages (glue)">
        <SourceCodeGroup
          files={[
            { file: `${DIR}/demo-chat/page.tsx` },
            { file: `${DIR}/demo-chat/tool/page.tsx` },
          ]}
        />
      </Panel>

      <Callout tone="warn" title="Broken by design, and what is missing">
        <ul className="space-y-1.5">
          <li>
            · <strong>The useInterrupt path cannot render.</strong>{" "}
            <code>ag-ui-openai-agents</code> builds every approval interrupt
            with <code>metadata = {"{ tool_name, tool_input }"}</code> and has
            no API for custom metadata. <code>metadata.action</code> is always
            undefined, so <code>GovernedActionApproval</code> returns{" "}
            <code>null</code> and the paused run has no UI. Its{" "}
            <code>return null</code> also breaks the render type, so it is kept
            under <code>@ts-expect-error</code>.
          </li>
          <li>
            · The page publishes no backend: no agent, no policy engine, no
            agent id. The interrupt demo borrows <code>gen-ui-interrupt</code>,
            and the tool demo uses the shared Quickstart agent.
          </li>
          <li>
            · <code>handleApproval</code> is TypeScript &quot;agent-side&quot;
            code for a Python backend. Nothing calls it, and its{" "}
            <code>executeSideEffect</code> is a labelled stub.
          </li>
          <li>
            · The <code>allow</code>/<code>deny</code> verdicts resolve inside
            a <code>useEffect</code> as soon as the card mounts. Even in the
            tool path, the verdict comes from the model, not from a policy
            check on the server.
          </li>
        </ul>
      </Callout>
    </>
  );
}
