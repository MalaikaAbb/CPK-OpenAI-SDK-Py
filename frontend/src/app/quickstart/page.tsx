import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, CodeBlock, Panel, TryIt } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/quickstart" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The whole Quickstart, end to end, with nothing added to the agent: a
          FastAPI process serves one OpenAI Agents SDK <code>Agent</code> over
          AG-UI at <code>/agent</code>, a single-route Copilot Runtime in Next
          registers it as <code>openai_agent</code>, and the page puts a{" "}
          <code>&lt;CopilotSidebar&gt;</code> on screen under the
          doc&apos;s <code>&lt;CopilotKit&gt;</code> provider. The demo runs
          the four printed files below and nothing else.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={["Tell me in one sentence what this app can do."]}
            expect="The sidebar opens from the right, the reply streams in, and the Inspector (corner button) lists the agent under Agents → Agent with AG-UI events moving."
            fail="A red error banner or a sidebar that never answers: check the backend is on :8000 (`curl http://localhost:8000/agent/health`) and that OPENAI_API_KEY is set in backend/.env."
          />
        </div>
      </Panel>

      <Callout tone="info" title="Why the layout isn't the harness root layout">
        <p>
          The doc&apos;s <code>app/layout.tsx</code> is a root layout. This
          harness already has one (it hosts the app-wide provider and the nav),
          so the doc&apos;s file is mounted inside the demo route instead, with{" "}
          <code>&lt;html&gt;</code>/<code>&lt;body&gt;</code> commented out and
          the inspector setting added. Its <code>&lt;CopilotKit&gt;</code> is
          a nested provider pointing at the Quickstart&apos;s own runtime,{" "}
          <code>/api/copilotkit</code>.
        </p>
      </Callout>

      <Panel title="Backend — main.py (verbatim)">
        <SourceCode file="backend/main.py" />
        <div className="mt-4 space-y-3">
          <CodeBlock
            filename="install + run (from the page)"
            language="bash"
            code={`uv add openai-agents ag-ui-openai-agents fastapi uvicorn

uv run --env-file .env uvicorn main:app --reload --host 0.0.0.0 --port 8000
curl http://localhost:8000/agent/health`}
          />
          <p className="text-sm text-slate-600 dark:text-slate-400">
            The harness starts <code>server:app</code> instead of{" "}
            <code>main:app</code>: <code>server.py</code> imports this exact{" "}
            <code>app</code> and mounts the other pages&apos; agents next to{" "}
            <code>/agent</code>. <code>/agent</code> itself is untouched.
          </p>
        </div>
      </Panel>

      <Panel title="Runtime — app/api/copilotkit/route.ts (verbatim)">
        <SourceCode file="frontend/src/app/api/copilotkit/route.ts" />
      </Panel>

      <Panel title="Frontend — app/layout.tsx and app/page.tsx">
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/quickstart/demo-chat/doc-layout.tsx" },
            { file: "frontend/src/app/quickstart/demo-chat/doc-page.tsx" },
            { file: "frontend/src/app/quickstart/demo-chat/page.tsx" },
          ]}
          note="The last file is harness glue: it renders the layout around the page, which is what Next does with the doc's two files."
        />
      </Panel>
    </>
  );
}
