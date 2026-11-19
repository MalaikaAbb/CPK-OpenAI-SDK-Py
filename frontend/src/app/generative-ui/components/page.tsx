import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { CodeBlock, Panel, TryIt } from "@/components/ui";

const BASE = "frontend/src/app/generative-ui/components/demo-chat";

// The page's runtime route as printed (not run: the agent is swapped).
const DOC_ROUTE = `import { chat } from "@tanstack/ai";
import { openaiText } from "@tanstack/ai-openai";
import {
  BuiltInAgent,
  convertInputToTanStackAI,
  CopilotRuntime,
  createCopilotRuntimeHandler,
  InMemoryAgentRunner,
} from "@copilotkit/runtime/v2";

const agent = new BuiltInAgent({
  type: "tanstack",
  factory: ({ input, abortController }) => {
    const { messages, systemPrompts, tools } = convertInputToTanStackAI(input);
    return chat({
      adapter: openaiText("gpt-6-luna"),
      messages,
      systemPrompts: [
        "You are a helpful assistant. When a visual answer helps, render it with generative UI.",
        ...systemPrompts,
      ],
      tools,
      abortController,
    });
  },
});

const runtime = new CopilotRuntime({
  agents: { default: agent },
  runner: new InMemoryAgentRunner(),
});

const handler = createCopilotRuntimeHandler({ runtime, basePath: "/api/copilotkit" });

export const GET = handler;
export const POST = handler;`;

const DOC_LAYOUT = `import { Providers } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}`;

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/components" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The page&apos;s &ldquo;Try it&rdquo; setup: a provider that hands the run the standard catalog, so the
          runtime gives the agent a <code>render_ui</code> tool plus a usage guide, and the answer comes back as
          real components (tables, charts, cards) inside the chat instead of text. The page&apos;s agent is a
          TanStack <code>BuiltInAgent</code>; here it is an OpenAI Agents SDK <code>Agent</code> with the same
          prompt and model, served through <code>OpenAIAgentsAgent</code>.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Compare the Starter, Team, and Enterprise plans in a table",
              "add a column for support",
            ]}
            expect="A Table component streams into the chat (not a markdown table); the follow-up changes that same table in place."
            fail="A plain-text or markdown table, or a render_ui error — the run's tools/context did not reach the OpenAI Agents SDK agent."
          />
        </div>
      </Panel>

      <Panel title="Running code" description="Frontend: the page's providers.tsx and page.tsx, mounted inside the demo. Backend: the swapped agent.">
        <SourceCodeGroup
          files={[
            { file: `${BASE}/providers.tsx` },
            { file: `${BASE}/doc-page.tsx` },
            { file: `${BASE}/page.tsx` },
            { file: "frontend/src/app/api/genui/[[...slug]]/route.ts" },
            { file: "backend/demo_agents/genui_components.py" },
            { file: "backend/demo_agents/agents_components.py" },
          ]}
        />
      </Panel>

      <Panel title="Printed by the page, not run as is" description="The runtime route's BuiltInAgent (swapped) and the root layout (moved into the demo).">
        <div className="space-y-4">
          <CodeBlock code={DOC_ROUTE} filename="app/api/copilotkit/[[...slug]]/route.ts — as published" language="ts" />
          <CodeBlock code={DOC_LAYOUT} filename="app/layout.tsx — as published" language="tsx" />
          <CodeBlock
            code="npm install @copilotkit/react-core @copilotkit/runtime @tanstack/ai @tanstack/ai-openai"
            filename="install — as published (the @tanstack packages are moot after the swap; not installed)"
            language="bash"
          />
        </div>
      </Panel>
    </>
  );
}
