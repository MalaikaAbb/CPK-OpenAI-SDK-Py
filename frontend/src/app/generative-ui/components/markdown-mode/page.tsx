import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Panel, TryIt } from "@/components/ui";

const BASE = "frontend/src/app/generative-ui/components/markdown-mode/demo-chat";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/components/markdown-mode" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          With <code>transport: &quot;markdown&quot;</code> there is no tool call: the agent writes A2UI operations
          inside <code>```a2ui</code> fences in its reply, and the chat renders them in place as the text streams.
          With <code>sendContext: false</code> the provider stops sending the catalog as context and only forwards
          it, so the backend must build its own prompt from it.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["Give me a seat-count slider that shows the monthly price at $29 per seat"]}
            expect='markdown tab: a Card with a Slider and a price Text renders inside the reply (the fence itself is not shown as code).'
            fail="A raw ```a2ui code block or JSON in the text — the fence was not parsed, or the guide never reached the agent."
          />
          <TryIt
            prompts={["(sendContext: false tab) same prompt"]}
            expect="Expected broken: plain text, no UI. The only backend the page shows for this case is a Python fragment that cannot run against OpenAIAgentsAgent."
          />
        </div>
      </Panel>

      <Panel title="Running code">
        <SourceCodeGroup files={[{ file: `${BASE}/providers.tsx` }, { file: `${BASE}/page.tsx` }]} />
      </Panel>

      <Panel title="Printed by the page, not run" description="Kept verbatim, not imported.">
        <SourceCodeGroup files={[{ file: "backend/docs_verbatim/components/markdown_mode_own_prompt.py" }]} />
      </Panel>
    </>
  );
}
