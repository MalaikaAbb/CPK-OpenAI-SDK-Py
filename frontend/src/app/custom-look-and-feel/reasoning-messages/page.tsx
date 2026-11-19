import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const R = "frontend/src/app/custom-look-and-feel/reasoning-messages/demo-chat";
const G = "frontend/src/app/generative-ui/reasoning/demo-chat";

export default function Page() {
  return (
    <>
      <RouteHeader path="/custom-look-and-feel/reasoning-messages" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Reasoning tokens arrive as their own message type and get their own
          card in the chat. This page restyles that card at three depths:
          replacing just its header or just its content area, replacing the
          whole card, or keeping the default parts but laying them out
          yourself with a render prop. Each runs against an agent configured
          to stream reasoning summaries.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["A bat and a ball cost $1.10 together; the bat costs $1 more than the ball. How much is the ball?"]}
            expect="Before the answer, a reasoning card: (default) “Thinking…” then “Thought for N seconds”; (header) 🧠 → 💡 with Show/Hide; (contentView) grey monospace text with ▊; (whole card) the tagged “Reasoning” banner; (render prop) the default header in a yellow box."
            fail="Only the answer, no card at all — the model sent no reasoning (check REASONING_MODEL is a reasoning model and supports reasoning summaries; the backend log shows the model call)."
          />
        </div>
      </Panel>

      <Panel title="Sub-slots and render-prop layout (verbatim prose blocks)">
        <SourceCodeGroup files={[{ file: `${R}/sub-slots.tsx` }, { file: `${R}/my-reasoning-layout.tsx` }]} />
      </Panel>

      <Panel
        title="The page regions (shared with Generative UI → Reasoning)"
        description="reasoning-default and reasoning-custom regions verbatim, with the Code tab's imports; agent id and runtime URL swapped (labelled). ReasoningBlock is not printed on this page."
      >
        <SourceCodeGroup
          files={[
            { file: `${G}/reasoning-default.tsx` },
            { file: `${G}/reasoning-custom.tsx` },
            { file: `${G}/reasoning-block.tsx` },
          ]}
        />
      </Panel>

      <Panel
        title="Backend — reasoning agent (from Code tab)"
        description="Neither reasoning page prints a backend. This is the Code tab's reasoning.py; its two _common imports are harness glue."
      >
        <SourceCodeGroup
          files={[{ file: "backend/demo_agents/reasoning.py" }, { file: "backend/demo_agents/_common.py" }]}
        />
      </Panel>

      <Panel title="Harness glue">
        <SourceCodeGroup files={[{ file: `${R}/reasoning-provider.tsx` }, { file: `${R}/page.tsx` }]} />
      </Panel>

      <Callout tone="info" title="Model">
        <p>
          The page names <code>gpt-6-luna</code> as a model that emits
          reasoning tokens; <code>REASONING_MODEL</code> defaults to{" "}
          <code>MODEL</code> (itself <code>gpt-6-luna</code>). Set it in{" "}
          <code>backend/.env</code> to any reasoning model your key can use.
        </p>
      </Callout>
    </>
  );
}
