import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, CodeBlock, Panel, TryIt } from "@/components/ui";

// "Registering a list of tools", verbatim. Shown, not run: `reports` and
// `navigate` are never defined on the page.
const REGISTER_LIST = `useFrontendTools(
  reports.map((report) => ({
    name: \`open_\${report.id}\`,
    description: \`Open the \${report.title} report\`,
    handler: async () => navigate(\`/reports/\${report.id}\`),
  })),
  [navigate],
);`;

export default function Page() {
  return (
    <>
      <RouteHeader path="/frontend-tools" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A tool whose implementation lives in the browser tab. The page
          registers <code>change_background</code> with a Zod schema; the
          OpenAI Agents adapter forwards it to the model as a function tool,
          and when the model calls it the handler runs in React, updates state,
          and its return value goes back to the agent as the tool result. The
          backend declares nothing — it is the Quickstart&apos;s shared agent.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Change the background to a warm sunset gradient",
              "Make the background dark blue",
            ]}
            expect="The demo area repaints within a second, the 'background:' label in the corner shows the new CSS value, and the agent confirms in one line."
            fail="The agent describes a gradient in words but nothing repaints (the tool never reached the model), or the chat shows a run error."
          />
        </div>
      </Panel>

      <Panel
        title="The running demo"
        description="The doc block is verbatim up to where it stops (end of useFrontendTool). The return JSX is from the Code tab; Background is harness glue."
      >
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/frontend-tools/demo-chat/page.tsx" },
            { file: "frontend/src/app/frontend-tools/demo-chat/background.tsx" },
          ]}
        />
      </Panel>

      <Panel
        title="The agent the page prints (not used here)"
        description="The 'name the tool in the instructions' step prints the chart agent from the Components-as-Tools page."
      >
        <Callout tone="warn" title="Doc mis-embed">
          The Python block on this page is <code>gen_ui_tool_based.py</code>,
          whose prompt is about <code>render_bar_chart</code> /{" "}
          <code>render_pie_chart</code> and never mentions{" "}
          <code>change_background</code>. The demo therefore runs on the shared
          Quickstart agent; the frontend tool reaches the model either way. The
          printed file runs on the{" "}
          <a className="underline" href="/generative-ui/tool-based">
            Components as Tools
          </a>{" "}
          route.
        </Callout>
        <div className="mt-4">
          <SourceCode file="backend/demo_agents/gen_ui_tool_based.py" />
        </div>
      </Panel>

      <Panel
        title="Registering a list of tools"
        description="useFrontendTools — the snippet as published. Not wired into the demo."
      >
        <CodeBlock code={REGISTER_LIST} language="tsx" />
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          <code>useFrontendTools</code> is exported by{" "}
          <code>@copilotkit/react-core/v2</code> 1.87.0, but the snippet&apos;s{" "}
          <code>reports</code> list and <code>navigate</code> function are not
          defined anywhere on the page, so it is shown rather than run.
        </p>
      </Panel>
    </>
  );
}
