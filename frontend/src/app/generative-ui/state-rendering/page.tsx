import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Panel, TryIt } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/state-rendering" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          UI driven by agent state rather than by messages. The backend tool{" "}
          <code>write_document</code> writes its argument into shared state,
          and a subclass of <code>OpenAIAgentsAgent</code> watches the
          tool-call argument stream and emits a <code>STATE_DELTA</code> after
          every chunk, so <code>state.document</code> grows while the model is
          still typing. The page subscribes with <code>useAgent</code> and
          re-renders the document panel on each state change, with a LIVE
          badge while the run is active.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Write a short poem about autumn",
              "Draft a 3-paragraph product announcement for a new coffee mug",
            ]}
            expect="The Document panel shows a red LIVE badge, and the text grows a few words at a time (the character counter climbs) before the chat replies with one short sentence."
            fail="The document appears all at once at the end (deltas are not streaming), stays empty, or the whole text is pasted into the chat instead."
          />
        </div>
      </Panel>

      <Panel
        title="The running demo"
        description="useAgent call from the prose; page and DocumentView from the Code tab; DemoLayout is harness glue."
      >
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/generative-ui/state-rendering/demo-chat/page.tsx" },
            { file: "frontend/src/app/generative-ui/state-rendering/demo-chat/demo-layout.tsx" },
            { file: "frontend/src/app/generative-ui/state-rendering/demo-chat/document-view.tsx" },
          ]}
        />
      </Panel>

      <Panel
        title="The agent"
        description="write_document, _document_so_far and DocumentStreamingAgent are prose; imports, prompt and Agent are from the Code tab. Mounted as DocumentStreamingAgent(shared_state_streaming_agent), as the page says."
      >
        <SourceCode file="backend/demo_agents/shared_state_streaming.py" />
      </Panel>
    </>
  );
}
