import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, CodeBlock, Panel, TryIt } from "@/components/ui";

// Prose blocks shown but not run, verbatim.
const INTELLIGENCE_ROUTE = `import {
  BuiltInAgent,
  CopilotKitIntelligence,
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";

const agent = new BuiltInAgent({
  model: "openai/gpt-6-luna",
  prompt: "You are a helpful assistant.",
});

const runtime = new CopilotRuntime({
  agents: { default: agent },
  // Intelligence stores threads and runs. Do not pass \`runner\` as well.
  intelligence: new CopilotKitIntelligence({
    apiKey: process.env.CPK_INTELLIGENCE_API_KEY!,
  }),
  // Replace this fixed user with the user from your verified session.
  identifyUser: () => ({ id: "demo-user", name: "Demo User" }),
  // Unchanged from the in-memory setup.
  mcpApps: {
    servers: [
      {
        type: "http",
        url: "https://mcp.excalidraw.com/mcp",
        serverId: "excalidraw",
      },
    ],
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit",
});

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const DELETE = handler;`;

const SAME_ORIGIN = `<CopilotKit runtimeUrl="/api/copilotkit" mcpApps={{ allowSameOriginFallback: true }}>
  {children}
</CopilotKit>`;

const HTTP_SERVER = `{
  type: "http",
  url: "http://localhost:3101/mcp",
  serverId: "my-http-server"
}`;

const SSE_SERVER = `{
  type: "sse",
  url: "https://mcp.example.com/sse",
  headers: {
    "Authorization": "Bearer token"
  },
  serverId: "my-sse-server"
}`;

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/mcp-apps" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          UI that comes from an MCP server rather than from the app. The
          runtime is given an MCP server (Excalidraw&apos;s public one by
          default); it exposes that server&apos;s tools to the agent, and when
          the agent calls one that has an attached UI resource, the runtime
          fetches it and streams an activity message. The provider&apos;s
          built-in renderer mounts it as a sandboxed iframe inside the chat —
          no renderer code in the app. The Python side is the plain shared
          agent.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Draw a simple flowchart in Excalidraw: Start → Process → End",
              "Sketch a diagram of a client, an API and a database connected by arrows",
            ]}
            expect="After an Excalidraw tool call, an embedded Excalidraw canvas appears inline in the chat showing the shapes and arrows, followed by a short reply."
            fail="The agent answers in text only (MCP tools never reached it), a tool call shows but no iframe appears, or the run errors (check that https://mcp.excalidraw.com/mcp is reachable, or set MCP_SERVER_URL)."
          />
        </div>
      </Panel>

      <Panel
        title="The running demo"
        description="Runtime block and provider fragment are prose; agent constants, handler, Chat and the function shell are labelled glue / Code tab."
      >
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/api/copilotkit-mcp-apps/[[...slug]]/route.ts" },
            { file: "frontend/src/app/generative-ui/mcp-apps/demo-chat/mcp-apps-page.tsx" },
            { file: "frontend/src/app/generative-ui/mcp-apps/demo-chat/chat.tsx" },
          ]}
        />
      </Panel>

      <Panel
        title="With CopilotKit Intelligence (shown, not run)"
        description="The page's complete Intelligence route, verbatim."
      >
        <Callout tone="premium" title="Requires an Intelligence key — and prints a BuiltInAgent">
          This variant needs <code>CPK_INTELLIGENCE_API_KEY</code> (premium) and
          registers a <code>BuiltInAgent</code> rather than an OpenAI Agents SDK
          agent. Running it here would mean swapping in an{" "}
          <code>OpenAIAgentsAgent</code> per the harness rules; the
          non-Intelligence runtime above already exercises the MCP Apps
          feature, so it is shown for reference only.
        </Callout>
        <div className="mt-4">
          <CodeBlock
            code={INTELLIGENCE_ROUTE}
            filename="app/api/copilotkit/[[...slug]]/route.ts"
            language="ts"
          />
        </div>
      </Panel>

      <Panel title="Other options on the page (shown, not run)">
        <CodeBlock code={SAME_ORIGIN} language="tsx" />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <CodeBlock code={HTTP_SERVER} filename="HTTP server" language="ts" />
          <CodeBlock code={SSE_SERVER} filename="SSE server" language="ts" />
        </div>
      </Panel>
    </>
  );
}
