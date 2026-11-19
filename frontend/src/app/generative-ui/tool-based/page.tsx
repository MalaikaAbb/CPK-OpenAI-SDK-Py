import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, CodeBlock, Panel, TryIt } from "@/components/ui";

// Prose block "CopilotChatToolCallsView", verbatim. Shown, not run: it is a
// headless fragment and `assistantMessage` / `allMessages` are undefined.
const HEADLESS = `import { CopilotChatToolCallsView } from "@copilotkit/react-core/v2";

<CopilotChatToolCallsView message={assistantMessage} messages={allMessages} />;`;

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/tool-based" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A React component registered as a tool. <code>useComponent</code>{" "}
          turns the chart&apos;s Zod props schema into a tool definition; the
          model &quot;calls&quot; it by filling in those props, and the chat
          renders the component inline with them. The Python agent has no tools
          of its own — its prompt only tells the model when to reach for the
          chart.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Show me a bar chart of quarterly revenue",
              "Compare the populations of the five biggest US cities as a bar chart",
            ]}
            expect="A titled bar chart card with coloured bars appears inline in the chat (bars slide in), followed by a one-line note that the numbers are illustrative."
            fail="The agent writes the numbers as text or asks you for data, or the run errors. A pie-chart request is expected to fall back to text: render_pie_chart is not registered (see the gap above)."
          />
        </div>
      </Panel>

      <Panel
        title="The running demo"
        description="useComponent call verbatim from the prose; page shell and BarChart from the Code tab."
      >
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/generative-ui/tool-based/demo-chat/page.tsx" },
            { file: "frontend/src/app/generative-ui/tool-based/demo-chat/bar-chart.tsx" },
          ]}
        />
      </Panel>

      <Panel title="The agent" description="The prose file, verbatim.">
        <SourceCode file="backend/demo_agents/gen_ui_tool_based.py" />
      </Panel>

      <Panel
        title="Rendering tool calls headlessly"
        description="Shown, not run."
      >
        <CodeBlock code={HEADLESS} language="tsx" />
        <div className="mt-3">
          <Callout tone="info">
            The fragment assumes a hand-built message list that supplies{" "}
            <code>assistantMessage</code> and <code>allMessages</code>; the page
            never shows one. <code>CopilotChatToolCallsView</code> itself is
            exported by 1.87.0.
          </Callout>
        </div>
      </Panel>
    </>
  );
}
