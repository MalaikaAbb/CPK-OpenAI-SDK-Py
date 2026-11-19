import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Panel, TryIt } from "@/components/ui";

const G = "frontend/src/app/generative-ui/reasoning/demo-chat";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/reasoning" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The agent&apos;s chain of thought shown live in the chat, two ways:
          the built-in reasoning card with no configuration, and a whole-card
          replacement passed to the <code>reasoningMessage</code> slot, which
          receives the reasoning message, the message list and the running
          flag.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={["Plan a 3-stop trip from Paris to Rome to Vienna and explain the order you chose."]}
            expect="(custom tab) a lilac “REASONING” pill with “Thinking…” and italic reasoning text, then “Agent reasoning” once done, followed by the answer; (default tab) the built-in Thinking… / Thought for N seconds card."
            fail="No reasoning card in either tab — the model emitted no reasoning (see REASONING_MODEL)."
          />
        </div>
      </Panel>

      <Panel
        title="The demo (prose, verbatim)"
        description="The two page regions with the Code tab's imports, and reasoning-block.tsx in full. Agent id (reasoning-default/-custom → reasoning) and runtime URL (/api/copilotkit → /api/harness) are swapped and labelled; the suggestion hooks are commented out."
      >
        <SourceCodeGroup
          files={[
            { file: `${G}/reasoning-custom.tsx` },
            { file: `${G}/reasoning-block.tsx` },
            { file: `${G}/reasoning-default.tsx` },
          ]}
        />
      </Panel>

      <Panel title="Backend — reasoning agent (from Code tab) + demo shell">
        <SourceCodeGroup
          files={[
            { file: "backend/demo_agents/reasoning.py" },
            { file: `${G}/page.tsx` },
          ]}
        />
      </Panel>
    </>
  );
}
