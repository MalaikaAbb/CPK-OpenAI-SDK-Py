import Link from "next/link";

import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DEMOS = [
  {
    href: "/generative-ui/tool-rendering/demo-chat",
    label: "Per-tool renderers",
    note: "useRenderTool for get_weather and search_flights (the page's complete app).",
  },
  {
    href: "/generative-ui/tool-rendering/demo-chat/default-catchall",
    label: "Default catch-all",
    note: "useDefaultRenderTool() with no config — CopilotKit's built-in card for every tool.",
  },
  {
    href: "/generative-ui/tool-rendering/demo-chat/custom-catchall",
    label: "Custom catch-all",
    note: "useDefaultRenderTool({ render }) — one custom card for every tool.",
  },
  {
    href: "/generative-ui/tool-rendering/demo-chat/display",
    label: "Grouping & display",
    note: 'group: true rows, toolCallDisplay: "line", and a custom toolCallsView.group.',
  },
];

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/tool-rendering" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Tools that execute on the Python backend, painted in the chat by the
          frontend. The adapter streams each call&apos;s start, arguments and
          result as AG-UI events; a renderer keyed by tool name (or the{" "}
          <code>*</code> wildcard) turns them into a card that shows a loading
          state while the call runs and the parsed result once it completes.
          All four demos talk to the same backend agent.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {DEMOS.map((d) => (
            <li key={d.href}>
              <Link
                href={d.href}
                target="_blank"
                className="font-medium text-[var(--accent)] underline underline-offset-4"
              >
                {d.label} ↗
              </Link>{" "}
              <span className="text-slate-600 dark:text-slate-400">— {d.note}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <TryIt
            prompts={[
              "What's the weather in Tokyo?",
              "Find flights to JFK",
              "Roll a d20 and get the stock price of AAPL",
            ]}
            expect="Per-tool demo: a weather card (68°F, Sunny, 55%, 10 mph) and a flight list (three flights from SFO); the stock/d20 calls show no card there (no renderer). Default catch-all: CopilotKit's built-in card with a Running → Done status for every call. Custom catch-all: a violet card with the tool name, arguments and result. Grouping: consecutive calls collapse into a single line or into the blue Timeline."
            fail="Only the assistant's text summary appears with no card, cards stay in the loading state forever, or the run errors."
          />
        </div>
      </Panel>

      <Panel
        title="Per-tool renderers (the page's complete app)"
        description="All four files verbatim from the prose. page.tsx drops the printed <CopilotKit> in favour of the harness root provider."
      >
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/generative-ui/tool-rendering/demo-chat/page.tsx" },
            { file: "frontend/src/app/generative-ui/tool-rendering/demo-chat/tool-renderers.tsx" },
            { file: "frontend/src/app/generative-ui/tool-rendering/components/weather-card.tsx" },
            { file: "frontend/src/app/generative-ui/tool-rendering/components/flight-list-card.tsx" },
            { file: "frontend/src/app/generative-ui/tool-rendering/lib/parse-json-result.ts" },
          ]}
        />
      </Panel>

      <Panel title="Catch-all variants">
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/generative-ui/tool-rendering/demo-chat/default-catchall/page.tsx" },
            { file: "frontend/src/app/generative-ui/tool-rendering/demo-chat/custom-catchall/page.tsx" },
            { file: "frontend/src/app/generative-ui/tool-rendering/demo-chat/custom-catchall/custom-catchall-renderer.tsx" },
          ]}
        />
      </Panel>

      <Panel title="Grouping & display">
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/generative-ui/tool-rendering/demo-chat/display/page.tsx" },
            { file: "frontend/src/app/generative-ui/tool-rendering/demo-chat/display/glue.tsx" },
          ]}
        />
      </Panel>

      <Panel
        title="The agent"
        description="get_weather and the TOOLS / Agent lines are prose; the other three tools, the prompt and the imports are from the Code tab."
      >
        <Callout tone="info">
          The page says the catch-all catches <code>roll_dice</code>; the tool
          the backend actually defines is <code>roll_d20</code>.
        </Callout>
        <div className="mt-4">
          <SourceCode file="backend/demo_agents/tool_rendering.py" />
        </div>
      </Panel>
    </>
  );
}
