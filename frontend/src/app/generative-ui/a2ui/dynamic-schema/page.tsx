import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, CodeBlock, Panel, TryIt } from "@/components/ui";

// Opt-out path, prose blocks verbatim. Shown, not run.
const MIDDLEWARE = `import { A2UIMiddleware } from "@ag-ui/a2ui-middleware";

agent.use(new A2UIMiddleware({ injectA2UITool: false }));`;

const AGENT_PY = `from ag_ui_langgraph import get_a2ui_tools
from langchain_openai import ChatOpenAI

generate_a2ui = get_a2ui_tools({
    "model": ChatOpenAI(model="gpt-6-luna", reasoning_effort="none"),
    "default_catalog_id": "copilotkit://app-dashboard-catalog",
})

tools = [my_other_tool, generate_a2ui]`;

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/a2ui/dynamic-schema" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The model designs the whole UI. The page hands the provider a catalog
          (five custom dashboard components merged with CopilotKit&apos;s basic
          primitives); because a catalog is present, the runtime switches A2UI
          on by itself, describes the catalog to the agent and gives it a
          rendering tool. The agent answers by composing a surface from those
          components, which the A2UI middleware streams into the chat. The
          backend is the shared Quickstart agent — nothing A2UI-specific runs
          in Python.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Show a KPI dashboard for an online store: revenue, orders and conversion rate",
              "Show the status of three services, one of them degraded",
            ]}
            expect="A rendered card appears in the chat built from the catalog — e.g. Metric tiles with trend colours, StatusBadge pills with icons, InfoRows — rather than a text or JSON reply."
            fail="The agent replies with plain text or raw JSON, the chat shows a tool call with no surface, or the run errors on the tool's arguments."
          />
        </div>
      </Panel>

      <Panel
        title="The running demo"
        description="definitions / renderers / catalog / page are prose. renderers.tsx's imports and helpers and the MyDefinitions type are from the Code tab; chat.tsx and _components are harness glue; the runtime route is glue (the page says it needs no a2ui block)."
      >
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/generative-ui/a2ui/dynamic-schema/demo-chat/declarative-gen-ui.tsx" },
            { file: "frontend/src/app/generative-ui/a2ui/dynamic-schema/demo-chat/a2ui/catalog.ts" },
            { file: "frontend/src/app/generative-ui/a2ui/dynamic-schema/demo-chat/a2ui/definitions.ts" },
            { file: "frontend/src/app/generative-ui/a2ui/dynamic-schema/demo-chat/a2ui/renderers.tsx" },
            { file: "frontend/src/app/generative-ui/a2ui/dynamic-schema/demo-chat/chat.tsx" },
            { file: "frontend/src/app/generative-ui/a2ui/dynamic-schema/demo-chat/_components/badge.tsx" },
            { file: "frontend/src/app/generative-ui/a2ui/dynamic-schema/demo-chat/_components/button.tsx" },
            { file: "frontend/src/app/api/copilotkit-declarative-gen-ui/[[...slug]]/route.ts" },
          ]}
        />
      </Panel>

      <Panel
        title="Opting out of auto-inject"
        description="The two prose blocks for the manual path. Shown, not run."
      >
        <CodeBlock code={MIDDLEWARE} language="ts" />
        <div className="mt-4">
          <CodeBlock code={AGENT_PY} filename="agent.py" language="python" />
        </div>
        <div className="mt-4">
          <Callout tone="warn" title="LangGraph code on the OpenAI Agents page">
            The backend half of the opt-out path is LangGraph&apos;s{" "}
            <code>get_a2ui_tools</code> with a LangChain <code>ChatOpenAI</code>{" "}
            model, and <code>my_other_tool</code> is undefined. There is no
            OpenAI Agents SDK equivalent on the page, and{" "}
            <code>@ag-ui/a2ui-middleware</code> appears in no install command, so
            this path is not run here.
          </Callout>
        </div>
      </Panel>
    </>
  );
}
