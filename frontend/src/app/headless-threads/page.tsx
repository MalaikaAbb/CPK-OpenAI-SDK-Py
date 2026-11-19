import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, CodeBlock, Panel, TryIt } from "@/components/ui";

const H = "frontend/src/app/headless-threads/demo-chat";

export default function Page() {
  return (
    <>
      <RouteHeader path="/headless-threads" />

      <Callout tone="premium" title="Requires premium — CopilotKit Intelligence">
        <p>
          <code>useThreads</code> reads threads from CopilotKit Intelligence.
          Set <code>CPK_INTELLIGENCE_API_KEY</code> in{" "}
          <code>frontend/.env.local</code>. Without it the runtime runs in SSE
          mode, the list stays empty and the demo shows a locked banner; the
          chat still answers.
        </p>
      </Callout>

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Your own thread list on top of the thread data layer:{" "}
          <code>useThreads</code> returns the agent&apos;s threads plus
          rename / archive / delete actions and cursor pagination, and{" "}
          <code>&lt;CopilotChat threadId&gt;</code> pins the chat to a thread.
          The runtime side is the Intelligence options with per-user scoping.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["Send “hello”, wait for the reply, then reload the demo"]}
            expect="A row appears in the list (auto-generated name, or “New conversation”); Rename changes it to “Renamed”, Archive removes it. The pagination column shows the count."
            fail="“Loading...” forever or no rows with a key set (check the Next server log for Intelligence errors)."
          />
          <TryIt
            prompts={["Click a thread's name"]}
            expect="Nothing happens — verbatim doc bug: the printed ThreadSidebar never selects a thread, so the chat can't switch."
          />
        </div>
      </Panel>

      <Panel title="Runtime — server.ts (verbatim, in lib/intelligence.ts) + route (harness glue)">
        <SourceCodeGroup
          files={[
            { file: "frontend/src/lib/intelligence.ts" },
            { file: "frontend/src/app/api/threads/[[...slug]]/route.ts" },
          ]}
        />
      </Panel>

      <Panel title="ThreadSidebar and App (verbatim) + provider (harness glue)">
        <SourceCodeGroup
          files={[
            { file: `${H}/thread-sidebar.tsx` },
            { file: `${H}/app.tsx` },
            { file: `${H}/headless-threads-demo.tsx` },
          ]}
        />
      </Panel>

      <Panel
        title="Shown, not run: one agent per thread"
        description="A fragment with an undefined threadId; it shows the useAgent options for pinning a local agent instance to a thread."
      >
        <CodeBlock
          language="tsx"
          code={`const { agent } = useAgent({
  agentId: \`chat-\${threadId}\`, // local id, unique per mounted thread
  runtimeAgentId: "default",   // the one runtime agent they all route to
  threadId,                    // the thread this instance is pinned to
});`}
        />
      </Panel>

      <Callout tone="warn" title="Doc bugs kept verbatim">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <code>ThreadSidebar()</code> takes no props but <code>App</code>{" "}
            passes <code>onSelectThread</code> (type error, behind{" "}
            <code>@ts-expect-error</code>); no thread can ever be selected.
          </li>
          <li>
            <code>deleteThread</code> is destructured and never used; a stray{" "}
            <code>{"{}"}</code> follows <code>&lt;CopilotChat /&gt;</code>.
          </li>
          <li>
            Agent ids disagree: <code>useThreads</code> asks for{" "}
            <code>my-agent</code>, <code>server.ts</code> registers{" "}
            <code>default</code> (swapped to <code>default</code>, labelled).
          </li>
          <li>
            <code>agent</code> and <code>verifyAppSession</code> in{" "}
            <code>server.ts</code> are never defined (supplied as glue).
          </li>
        </ul>
      </Callout>
    </>
  );
}
