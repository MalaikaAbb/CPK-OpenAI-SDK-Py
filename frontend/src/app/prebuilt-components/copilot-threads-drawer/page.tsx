import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, CodeBlock, Panel, TryIt } from "@/components/ui";

const T = "frontend/src/app/prebuilt-components/copilot-threads-drawer/demo-chat";

export default function Page() {
  return (
    <>
      <RouteHeader path="/prebuilt-components/copilot-threads-drawer" />

      <Callout tone="premium" title="Requires premium — CopilotKit Intelligence">
        <p>
          Threads are stored and synced by CopilotKit Intelligence. Set{" "}
          <code>CPK_INTELLIGENCE_API_KEY</code> (the variable the Threads
          pages name) in <code>frontend/.env.local</code>. Without it the
          drawer shows its locked view with an Upgrade link and makes no
          thread requests; the chat beside it still works.
        </p>
      </Callout>

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A ready-made conversation list. Put it next to a chat inside one
          shared chat-configuration provider and it lists the agent&apos;s
          threads, switches the chat to the one you pick (replaying its
          history), starts new ones, archives and deletes — with no callbacks.
          Further blocks take over selection yourself, add your own
          “New conversation” button, and restyle it through CSS parts and
          slots.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["(drawer + CopilotChat) say “Remember the word pineapple”, then New Conversation, say “hello”, then click the first thread"]}
            expect="Two threads in the drawer (auto-named); clicking the first replays the pineapple exchange in the chat."
            fail="Locked view with an Upgrade link (no/invalid key), or threads listed but selecting one leaves the chat unchanged."
          />
          <TryIt
            prompts={["(::part + slot) look at the drawer header"]}
            expect='Header reads "My conversations" and there is no new-thread button.'
            fail="Default header / new-thread button still visible."
          />
        </div>
      </Panel>

      <Panel
        title="Prose blocks (verbatim, one file each)"
        description='Every block points its provider at "/api/copilotkit"; that is the Quickstart route (no Intelligence), so the URL is swapped for /api/threads (labelled).'
      >
        <SourceCodeGroup
          files={[
            { file: `${T}/drawer-chat.tsx` },
            { file: `${T}/drawer-sidebar.tsx` },
            { file: `${T}/drawer-new-conversation.tsx` },
            { file: `${T}/controlled-chat.tsx` },
            { file: `${T}/drawer-customized.tsx` },
          ]}
        />
      </Panel>

      <Panel
        title="Shown, not run: another agent's threads"
        description="research_agent is registered nowhere (the Threads runtime registers one agent, default)."
      >
        <CodeBlock language="tsx" code={`<CopilotThreadsDrawer agentId="research_agent" />`} />
      </Panel>

      <Panel
        title="Runtime (harness glue around Headless Threads' server.ts)"
        description="This page prints no runtime code. The runtime options come from the Headless Threads page; the route registers one agent, default (the Quickstart's)."
      >
        <SourceCodeGroup
          files={[
            { file: "frontend/src/lib/intelligence.ts" },
            { file: "frontend/src/app/api/threads/[[...slug]]/route.ts" },
            { file: `${T}/drawer-tabs.tsx` },
          ]}
        />
      </Panel>
    </>
  );
}
