import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DIR = "frontend/src/app/shared-state/streaming";

export default function Page() {
  return (
    <>
      <RouteHeader path="/shared-state/streaming" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Without help, a tool&apos;s result reaches state only when the tool
          has finished. Here the document shows up in state while the model is
          still writing the tool call. <code>DocumentStreamingAgent</code>{" "}
          subclasses the adapter&apos;s agent and watches the{" "}
          <code>TOOL_CALL_ARGS</code> deltas of <code>write_document</code>. It
          parses the half-written JSON with{" "}
          <code>pydantic_core.from_json(..., allow_partial=&quot;trailing-strings&quot;)</code>{" "}
          and sends each longer <code>document</code> as a{" "}
          <code>STATE_DELTA</code>. The page subscribes to state and run status,
          so the text grows and a LIVE badge shows while the run is going.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Write a 300-word short story about a lighthouse keeper.",
              "Revise it so the ending is happier.",
            ]}
            expect="The Document panel shows LIVE, and the text and the character count grow a few words at a time while the model writes. The chat ends with one short sentence and the story is not in it. The badge goes away when the run finishes."
            fail="The whole document appears in one jump at the end: the STATE_DELTA events are missing (look in the Inspector's events for STATE_DELTA between TOOL_CALL_ARGS). 'Agent shared_state_streaming not found': the gen-ui group has not mounted the agent."
          />
        </div>
      </Panel>

      <Panel
        title="The agent"
        description="write_document, _document_so_far and DocumentStreamingAgent are the doc's. The prompt, the Agent(...) and the imports are from Code tab. Shared with /generative-ui/state-rendering."
      >
        <SourceCode file="backend/demo_agents/shared_state_streaming.py" />
      </Panel>

      <Panel
        title="The page"
        description="useAgent is the doc's. The state read is from Code tab. DocumentView is from Code tab. The layout is glue."
      >
        <SourceCodeGroup
          files={[
            { file: `${DIR}/demo-chat/page.tsx` },
            { file: `${DIR}/_demo/document-view.tsx` },
          ]}
        />
      </Panel>

      <Callout tone="warn" title="Supplied, renamed or left out">
        <ul className="space-y-1.5">
          <li>
            · The prose names <code>shared_state_streaming_agent</code> and
            never defines it. The writer prompt is not in the prose either.
            Both are from Code tab.
          </li>
          <li>
            · The doc&apos;s agent id <code>shared-state-streaming</code> is not
            registered by any published runtime. Here the id is{" "}
            <code>shared_state_streaming</code>, the id under which the gen-ui
            group mounts the same module.
          </li>
          <li>
            · The Code tab&apos;s <code>./demo-layout</code> is unpublished, so
            the layout is a small glue grid. Its{" "}
            <code>./suggestions</code> is unpublished and decorative, so it is
            commented out.
          </li>
        </ul>
      </Callout>
    </>
  );
}
