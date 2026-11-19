import { RouteHeader } from "@/components/route-header";
import { SourceCode } from "@/components/source-code";
import { Panel, TryIt } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/prebuilt-components/chat" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The embedded chat: <code>&lt;CopilotChat&gt;</code> placed inline in
          the page layout, inside a <code>&lt;CopilotKit&gt;</code> provider
          that names the agent. Message list, composer and streaming all come
          from the component with no props beyond the agent id.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={["Hi! What can you help me with?", "Write a three-item list of tips for naming variables."]}
            expect="The chat fills the demo area, the reply streams token by token, and the list renders as Markdown."
            fail='"Agent not found" or an empty chat after sending: the provider and the chat must name an agent the runtime registers (openai_agent on /api/copilotkit).'
          />
        </div>
      </Panel>

      <Panel
        title="The demo"
        description="Prose blocks 1–3 verbatim, inside the Code tab's page wrapper. The doc's agent id (agentic_chat) is swapped for the Quickstart's; the suggestions hook is unpublished and commented out."
      >
        <SourceCode file="frontend/src/app/prebuilt-components/chat/demo-chat/agentic-chat.tsx" />
      </Panel>
    </>
  );
}
