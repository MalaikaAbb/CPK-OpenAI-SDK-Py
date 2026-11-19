import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { CodeBlock, Panel, TryIt } from "@/components/ui";

const DIR = "frontend/src/app/custom-look-and-feel/markdown/demo-chat";

export default function Page() {
  return (
    <>
      <RouteHeader path="/custom-look-and-feel/markdown" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The assistant-message Markdown renderer is itself a slot: you can
          hand it per-element component overrides, a class string, or swap it
          for a component of your own that receives the raw text.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["Reply with a level-2 markdown heading “Links” and a markdown link to https://copilotkit.ai"]}
            expect="(components tab) the heading has a magenta left rule and is uppercase; the link is magenta with a wavy underline. (PlainText tab) you see the literal ## and [..](..) syntax."
            fail="Normal heading/link styling in the components tab, or rendered Markdown in the PlainText tab."
          />
        </div>
      </Panel>

      <Panel title="Prose snippets (verbatim, one file each)">
        <SourceCodeGroup
          files={[
            { file: `${DIR}/components-override.tsx` },
            { file: `${DIR}/class-string.tsx` },
            { file: `${DIR}/plain-text.tsx` },
            { file: `${DIR}/glue.css` },
            { file: `${DIR}/page.tsx` },
          ]}
        />
      </Panel>

      <Panel
        title="Shown, not run"
        description="The first prose block only marks where the renderer config goes; the last is a TypeScript error message the page quotes."
      >
        <div className="space-y-3">
          <CodeBlock
            filename="page.tsx (prose block 1)"
            language="tsx"
            code={`<CopilotChat
  messageView={{
    assistantMessage: {
      markdownRenderer: {
        /* ... */
      },
    },
  }}
/>`}
          />
          <CodeBlock
            language="text"
            code={`error TS2353: Object literal may only specify known properties,
and '"reference-chip"' does not exist in type 'Components'.`}
          />
        </div>
      </Panel>
    </>
  );
}
