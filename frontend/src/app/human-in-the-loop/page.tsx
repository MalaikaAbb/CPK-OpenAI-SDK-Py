import Link from "next/link";

import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DIR = "frontend/src/app/human-in-the-loop/_demo/hitl-in-chat";

export default function Page() {
  return (
    <>
      <RouteHeader path="/human-in-the-loop" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The page covers two ways to pause for a person. Pattern 1 runs here.
          The browser registers <code>book_call</code> with{" "}
          <code>useHumanInTheLoop</code>, and the backend agent has no tools
          of its own. When the model calls <code>book_call</code>, the adapter
          ends the run. The chat shows the time-picker card, and the
          user&apos;s pick goes back as the tool result on the next run.
          Pattern 2 is a backend tool marked{" "}
          <code>needs_approval=True</code> that pauses the run as an AG-UI
          interrupt. The page prints only its backend. Its frontend runs on{" "}
          <Link className="underline" href="/human-in-the-loop/useInterrupt">
            useInterrupt
          </Link>{" "}
          and{" "}
          <Link className="underline" href="/human-in-the-loop/headless">
            headless
          </Link>
          .
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Please book an intro call with the sales team to discuss pricing.",
              "Schedule a 1:1 with Alice next week to review Q2 goals.",
            ]}
            expect="A 'Book a call' card with four slots appears in the chat. Picking one turns the card into 'Booked for …', and the agent confirms in one short sentence. 'None of these work' shows 'Cancelled' and the agent says nothing was booked. The two prompts are also offered as suggestion pills."
            fail="The agent replies in text with no card: the frontend tool did not reach the run (look for `book_call` in RunAgentInput.tools). The card appears but the buttons stay disabled: the status never reached 'executing'."
          />
        </div>
      </Panel>

      <Panel
        title="Pattern 1 — the agent"
        description="hitl.py, complete in the prose."
      >
        <SourceCode file="backend/demo_agents/hitl.py" />
      </Panel>

      <Panel
        title="Pattern 1 — the page"
        description="The prose is verbatim up to the end of useHumanInTheLoop. The tail and the time picker are from Code tab."
      >
        <SourceCodeGroup
          files={[
            { file: `${DIR}/page.tsx` },
            { file: `${DIR}/time-picker-card.tsx` },
          ]}
        />
      </Panel>

      <Panel
        title="Pattern 2 — the interrupt agent"
        description="schedule_meeting and SchedulerAgent are the doc's. _answers, the prompt, the Agent and the imports are from Code tab. It is served as gen-ui-interrupt and interrupt-headless."
      >
        <SourceCode file="backend/demo_agents/interrupt_agent.py" />
      </Panel>

      <Callout tone="warn" title="Doc gaps on this page">
        <ul className="space-y-1.5">
          <li>
            · <code>hitl-in-chat/page.tsx</code> stops before its return and
            has no <code>&quot;use client&quot;</code>. Its{" "}
            <code>./time-picker-card</code> is not shown. All three are taken
            from the Code tab.
          </li>
          <li>
            · Pattern 2 prints two fragments that cannot run alone. The{" "}
            <code>_answers</code> ContextVar, <code>interrupt_agent</code> and
            its prompt appear only on the Code tab.
          </li>
          <li>
            · Neither <code>hitl-in-chat</code> nor the interrupt agent is
            registered by any published runtime. The page&apos;s provider
            points at <code>/api/copilotkit</code> (Quickstart: only{" "}
            <code>openai_agent</code>), so the harness runtime is used instead
            (labelled).
          </li>
        </ul>
      </Callout>
    </>
  );
}
