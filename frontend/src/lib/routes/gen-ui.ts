import type { RouteMeta } from "@/lib/nav-config";

const UNCHECKED = "Built, not yet checked in a browser.";

export const GEN_UI_ROUTES: RouteMeta[] = [
  {
    path: "/frontend-tools",
    group: "App Control",
    title: "Frontend Tools",
    docPath: "/openai-agents-python/frontend-tools",
    summary:
      "A browser-side tool (change_background) registered with useFrontendTool; the agent calls it and the page repaints.",
    status: "partial",
    statusNote: `${UNCHECKED} Runs on the shared Quickstart agent — the Python file the page prints is the chart agent from another page.`,
    hasDemo: true,
    agentId: "openai_agent",
  },
  {
    path: "/generative-ui/tool-based",
    group: "Generative UI · Controlled",
    title: "Components as Tools",
    docPath: "/openai-agents-python/generative-ui/tool-based",
    summary:
      "A React bar chart registered with useComponent; the model calls it by filling the chart's Zod props and it renders inline.",
    status: "partial",
    statusNote: `${UNCHECKED} Only render_bar_chart is registered (the page never defines the pie chart its agent prompt mentions).`,
    hasDemo: true,
    agentId: "gen_ui_tool_based",
  },
  {
    path: "/generative-ui/tool-rendering",
    group: "Generative UI · Controlled",
    title: "Tool Call Rendering",
    docPath: "/openai-agents-python/generative-ui/tool-rendering",
    summary:
      "Backend tool calls painted in the chat: per-tool renderers, the default and a custom catch-all, and grouped display modes.",
    status: "partial",
    statusNote: `${UNCHECKED} Four demos on one backend agent; three of its four tools come from the Code tab.`,
    hasDemo: true,
    agentId: "tool_rendering",
  },
  {
    path: "/generative-ui/state-rendering",
    group: "Generative UI · Controlled",
    title: "State Rendering",
    docPath: "/openai-agents-python/generative-ui/state-rendering",
    summary:
      "A document rendered from agent state, streamed token by token via STATE_DELTA events emitted from tool-call arguments.",
    status: "partial",
    statusNote: `${UNCHECKED} The Agent, prompt and imports are from the Code tab; the layout hosting chat + document is glue.`,
    hasDemo: true,
    agentId: "shared_state_streaming",
  },
  {
    path: "/generative-ui/a2ui/dynamic-schema",
    group: "Generative UI · A2UI",
    title: "A2UI · Dynamic Schema",
    docPath: "/openai-agents-python/generative-ui/a2ui/dynamic-schema",
    summary:
      "The model composes an A2UI surface from a custom catalog; the catalog alone turns A2UI on and injects the tool.",
    status: "partial",
    statusNote: `${UNCHECKED} Default (auto-inject) path on the shared agent. The opt-out path is LangGraph code and is shown only.`,
    hasDemo: true,
    agentId: "declarative-gen-ui",
    nestedProviderPaths: ["/generative-ui/a2ui/dynamic-schema/demo-chat"],
  },
  {
    path: "/generative-ui/a2ui/fixed-schema",
    group: "Generative UI · A2UI",
    title: "A2UI · Fixed Schema",
    docPath: "/openai-agents-python/generative-ui/a2ui/fixed-schema",
    summary:
      "A backend tool returns a pre-authored A2UI flight card as a2ui_operations; the runtime renders it with the page's catalog.",
    status: "broken",
    statusNote:
      "Broken as published: the provider snippet passes `myCatalog`, but the page's catalog.ts exports `catalog`, so no catalog reaches the provider. Reproduced verbatim; the backend tool and runtime still run.",
    hasDemo: true,
    agentId: "a2ui-fixed-schema",
    nestedProviderPaths: ["/generative-ui/a2ui/fixed-schema/demo-chat"],
  },
  {
    path: "/generative-ui/json-render",
    group: "Generative UI · Bring your own",
    title: "JSON Render",
    docPath: "/openai-agents-python/generative-ui/json-render",
    summary:
      "The agent answers with a { root, elements } JSON spec that @json-render/react renders through a typed registry.",
    status: "partial",
    statusNote: `${UNCHECKED} Frontend from the Markdown export's four files plus Code-tab helpers; agent from the Code tab.`,
    hasDemo: true,
    agentId: "byoc_json_render",
  },
  {
    path: "/generative-ui/hashbrown",
    group: "Generative UI · Bring your own",
    title: "Hashbrown",
    docPath: "/openai-agents-python/generative-ui/hashbrown",
    summary:
      "The agent streams a { ui: [...] } envelope that Hashbrown parses and renders progressively inside the message.",
    status: "partial",
    statusNote: `${UNCHECKED} Runs on @hashbrownai 0.7.0; the page states 0.5.0-beta.4.`,
    hasDemo: true,
    agentId: "declarative-hashbrown-demo",
    nestedProviderPaths: ["/generative-ui/hashbrown/demo-chat"],
  },
  {
    path: "/generative-ui/mcp-apps",
    group: "Generative UI · MCP Apps & Open Generative UI",
    title: "MCP Apps",
    docPath: "/openai-agents-python/generative-ui/mcp-apps",
    summary:
      "The runtime connects an MCP server (Excalidraw); its tools' UI resources render as sandboxed iframes in the chat.",
    status: "partial",
    statusNote: `${UNCHECKED} Needs network access to mcp.excalidraw.com. The Intelligence variant (BuiltInAgent + premium key) is shown, not run.`,
    hasDemo: true,
    agentId: "mcp-apps",
    nestedProviderPaths: ["/generative-ui/mcp-apps/demo-chat"],
  },
  {
    path: "/generative-ui/open-generative-ui",
    group: "Generative UI · MCP Apps & Open Generative UI",
    title: "Open Generative UI",
    docPath: "/openai-agents-python/generative-ui/open-generative-ui",
    summary:
      "The agent writes HTML/CSS through generateSandboxedUi and it renders in a sandboxed iframe; the advanced demo adds host-callable sandbox functions.",
    status: "partial",
    statusNote: `${UNCHECKED} Minimal and advanced demos on the shared agent; the design skill is commented out (unpublished).`,
    hasDemo: true,
    agentId: "open-gen-ui",
    nestedProviderPaths: [
      "/generative-ui/open-generative-ui/demo-chat",
      "/generative-ui/open-generative-ui/demo-chat/advanced",
    ],
  },
];
