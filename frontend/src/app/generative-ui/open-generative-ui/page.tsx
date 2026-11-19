import Link from "next/link";

import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { CodeBlock, Panel, TryIt } from "@/components/ui";

// Prose block (illustrative HTML a generated UI may include), verbatim.
const CDN_HTML = `<head>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <canvas id="myChart"></canvas>
</body>`;

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/open-generative-ui" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The agent writes the UI itself, as HTML and CSS. Turning on{" "}
          <code>openGenerativeUI</code> for an agent in the runtime makes the
          provider register a <code>generateSandboxedUi</code> tool; the
          adapter forwards it to the model like any frontend tool, and the
          runtime middleware turns the streaming call into an activity that the
          built-in renderer mounts in a sandboxed iframe. The advanced demo
          additionally passes host-side <em>sandbox functions</em> that code
          inside the iframe can call back into.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link
              href="/generative-ui/open-generative-ui/demo-chat"
              target="_blank"
              className="font-medium text-[var(--accent)] underline underline-offset-4"
            >
              Minimal ↗
            </Link>
          </li>
          <li>
            <Link
              href="/generative-ui/open-generative-ui/demo-chat/advanced"
              target="_blank"
              className="font-medium text-[var(--accent)] underline underline-offset-4"
            >
              Advanced (sandbox functions) ↗
            </Link>
          </li>
        </ul>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Use generateSandboxedUi to build an animated visualisation of a sine wave",
              "(advanced) Use generateSandboxedUi to build a calculator whose = button calls evaluateExpression",
            ]}
            expect="A placeholder shows while the HTML streams, then an interactive widget renders in an iframe inside the chat. In the advanced demo, pressing = shows the result returned by the host (and the browser console logs '[open-gen-ui/advanced] evaluateExpression …')."
            fail="The agent replies in prose or pastes HTML as text (the tool was not called — the shared agent has no prompt forcing it, so name the tool explicitly), the iframe stays blank, or the advanced widget's button does nothing."
          />
        </div>
      </Panel>

      <Panel
        title="Runtime"
        description="CopilotRuntime block verbatim; agents map and handler are glue."
      >
        <SourceCodeGroup
          files={[{ file: "frontend/src/app/api/copilotkit-ogui/[[...slug]]/route.ts" }]}
        />
      </Panel>

      <Panel
        title="Minimal demo"
        description="Prose body in a Code-tab shell; the design skill is commented out (unpublished, optional); Chat is glue."
      >
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/generative-ui/open-generative-ui/demo-chat/open-gen-ui-page.tsx" },
            { file: "frontend/src/app/generative-ui/open-generative-ui/demo-chat/chat.tsx" },
          ]}
        />
      </Panel>

      <Panel
        title="Advanced demo"
        description="Page fragment and sandbox-functions.ts from the prose; the closing lines are a labelled fix and Chat is from the Code tab."
      >
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/generative-ui/open-generative-ui/demo-chat/advanced/open-gen-ui-advanced-page.tsx" },
            { file: "frontend/src/app/generative-ui/open-generative-ui/demo-chat/advanced/sandbox-functions.ts" },
          ]}
        />
      </Panel>

      <Panel title="Loading libraries inside the sandbox (shown, not run)">
        <CodeBlock code={CDN_HTML} language="html" />
      </Panel>
    </>
  );
}
