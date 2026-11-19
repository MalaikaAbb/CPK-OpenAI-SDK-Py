import Link from "next/link";

import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DIR = "frontend/src/app/shared-state";

export default function Page() {
  return (
    <>
      <RouteHeader path="/shared-state" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          One state object is shared by the page and the agent, and both
          write to it. The form on the left writes <code>preferences</code>{" "}
          with <code>agent.setState</code>. The agent sees the whole state
          because its instructions are a function (<code>with_state</code>)
          that adds <code>shared_state().value</code> as JSON before every
          model call. It writes back through the <code>set_notes</code> tool,
          which calls <code>shared_state().update(notes=…)</code>. The adapter
          then streams a <code>STATE_SNAPSHOT</code>, and the notes card
          re-renders.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "(set Name to Ada and Language to French in the form, then) Hi, who am I?",
              "Remember that I prefer short answers and I'm learning Rust.",
            ]}
            expect="The first reply calls you Ada and is in French, and you did not mention either in the chat. After the second prompt, the Agent Scratch pad fills with numbered notes while the run is still going. Clear empties it, and the next turn's notes start from an empty list."
            fail="The agent ignores the form: the dynamic instructions are not reading state, or setState never reached the run (look for `state` in the RunAgentInput in the Inspector). Notes appear only in the chat text: set_notes was not called, or its STATE_SNAPSHOT was dropped."
          />
        </div>
      </Panel>

      <Panel
        title="The agent"
        description="The three shared_state.py fragments, composed. Only the imports are glue."
      >
        <SourceCode file="backend/demo_agents/shared_state.py" />
      </Panel>

      <Panel
        title="The page"
        description="useAgent and handlePreferencesChange are the doc's. NotesCard is the doc's. The rest is labelled glue."
      >
        <SourceCodeGroup
          files={[
            { file: `${DIR}/demo-chat/page.tsx` },
            { file: `${DIR}/_demo/notes-card.tsx` },
            { file: `${DIR}/_demo/preferences-card.tsx` },
            { file: `${DIR}/_demo/types.ts` },
          ]}
        />
      </Panel>

      <Callout tone="info" title="The streaming block on this page">
        The page repeats <code>_document_so_far</code> and{" "}
        <code>DocumentStreamingAgent</code> from the State streaming page.
        That code runs on <Link className="underline" href="/shared-state/streaming">/shared-state/streaming</Link>{" "}
        and is not part of this demo.
      </Callout>
    </>
  );
}
