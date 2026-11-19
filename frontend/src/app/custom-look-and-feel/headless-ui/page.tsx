import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DIR = "frontend/src/app/custom-look-and-feel/headless-ui/demo-chat";

export default function Page() {
  return (
    <>
      <RouteHeader path="/custom-look-and-feel/headless-ui" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A chat with no CopilotKit UI at all: <code>useAgent</code> exposes
          the conversation, <code>useCopilotKit().runAgent</code> starts a
          run, and plain components draw the messages. The second tab uses the
          page&apos;s fuller message list, which also routes tool calls through{" "}
          <code>useRenderToolCall</code> and activity messages through{" "}
          <code>useRenderActivityMessage</code>, as{" "}
          <code>&lt;CopilotChatMessageView&gt;</code> does internally.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["Give me a markdown list of three fruits", "What's 12 * 7?"]}
            expect="Your message as a blue right-aligned bubble with a user avatar; the reply as a grey left bubble with a bot avatar, the list rendered as Markdown. No CopilotKit chat chrome anywhere."
            fail="Nothing appears after Send (check the console for “runAgent failed”), or the reply only shows after a reload (messages not re-rendering)."
          />
        </div>
      </Panel>

      <Panel
        title="Prose regions (verbatim) and the glue around them"
        description="Each file marks the doc regions; everything outside them is labelled harness glue."
      >
        <SourceCodeGroup
          files={[
            { file: `${DIR}/headless-simple-chat.tsx` },
            { file: `${DIR}/message-list.tsx` },
            { file: `${DIR}/message-assistant.tsx` },
          ]}
        />
      </Panel>

      <Panel title="Harness glue">
        <SourceCodeGroup
          files={[
            { file: `${DIR}/glue-ui.tsx` },
            { file: `${DIR}/headless-complete-chat.tsx` },
            { file: `${DIR}/glue.css` },
            { file: `${DIR}/page.tsx` },
          ]}
        />
      </Panel>

      <Callout tone="warn" title="What stays untested here">
        <p>
          The complete example&apos;s tool-call and activity branches are
          wired, but the prose prints no tools, no tool renderers and no MCP
          Apps server, and the shared agent has none — so those branches never
          fire. The demo&apos;s Code tab has a tool agent, four tool cards and
          an MCP route; they were left out on purpose (prose first).
        </p>
      </Callout>
    </>
  );
}
