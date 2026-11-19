import type { DocGap } from "@/lib/doc-gaps";

const D = "/openai-agents-python";
const FT = `${D}/frontend-tools`;
const TB = `${D}/generative-ui/tool-based`;
const TR = `${D}/generative-ui/tool-rendering`;
const SR = `${D}/generative-ui/state-rendering`;
const AD = `${D}/generative-ui/a2ui/dynamic-schema`;
const AF = `${D}/generative-ui/a2ui/fixed-schema`;
const JR = `${D}/generative-ui/json-render`;
const HB = `${D}/generative-ui/hashbrown`;
const MA = `${D}/generative-ui/mcp-apps`;
const OG = `${D}/generative-ui/open-generative-ui`;

export const GEN_UI_GAPS: DocGap[] = [
  // ── Frontend Tools ──
  {
    id: "genui-ft-wrong-agent",
    title: "The page's Python block is the chart agent from Components as Tools",
    detail:
      "The 'name the tool in the instructions' step prints gen_ui_tool_based.py, whose prompt covers render_bar_chart / render_pie_chart and never mentions change_background. No agent for this page is printed. The demo uses the shared Quickstart agent (the frontend tool reaches the model regardless); the printed file runs on /generative-ui/tool-based.",
    severity: "degraded",
    docPath: FT,
    routes: ["/frontend-tools"],
  },
  {
    id: "genui-ft-fragment",
    title: "page.tsx is cut off after useFrontendTool — no return, export or provider",
    detail:
      "The prose block stops at the end of the useFrontendTool call, and has no \"use client\". The rest of Chat() (Background + CopilotSidebar defaultOpen) is from the Code tab; \"use client\" is a labelled fix; the Code tab's own <CopilotKit agent=\"frontend_tools\"> is replaced by the harness root provider.",
    severity: "degraded",
    docPath: FT,
    routes: ["/frontend-tools"],
  },
  {
    id: "genui-ft-background",
    title: "Background / DEFAULT_BACKGROUND are imported but never defined",
    detail:
      "The element the tool repaints comes from `./background`, which neither the prose nor the Code tab publishes. Harness glue: a minimal box painted with the CSS value (demo-chat/background.tsx).",
    severity: "degraded",
    docPath: FT,
    routes: ["/frontend-tools"],
  },
  {
    id: "genui-ft-suggestions",
    title: "useFrontendToolsSuggestions is imported from an unpublished ./suggestions",
    detail:
      "Decorative; the import and the Code tab's call are commented out, labelled.",
    severity: "note",
    docPath: FT,
    routes: ["/frontend-tools"],
  },
  {
    id: "genui-ft-tools-list",
    title: "useFrontendTools example uses undefined reports and navigate",
    detail:
      "The 'register a list of tools' snippet is shown, not run: `reports` and `navigate` are never defined. The hook itself is exported by @copilotkit/react-core/v2 1.87.0.",
    severity: "note",
    docPath: FT,
    routes: ["/frontend-tools"],
  },
  // ── Components as Tools ──
  {
    id: "genui-tb-barchart",
    title: "BarChart and barChartPropsSchema are registered but not defined",
    detail:
      "The useComponent call names both; the prose defines neither. from Code tab: bar-chart.tsx (recharts), unchanged. The page shell (CopilotChat) is also from the Code tab.",
    severity: "degraded",
    docPath: TB,
    routes: ["/generative-ui/tool-based"],
  },
  {
    id: "genui-tb-no-pie",
    title: "Agent prompt names render_pie_chart, but no pie chart is registered",
    detail:
      "The prompt tells the model to pick bar or pie. The prose registers only render_bar_chart; the Code tab imports ./pie-chart but does not publish it. Not filled (no published source): a pie-chart request has no tool to call.",
    severity: "degraded",
    docPath: TB,
    routes: ["/generative-ui/tool-based"],
  },
  {
    id: "genui-tb-headless",
    title: "Headless CopilotChatToolCallsView fragment has undefined inputs",
    detail:
      "`assistantMessage` and `allMessages` come from a hand-built message list the page never shows. Shown, not run.",
    severity: "note",
    docPath: TB,
    routes: ["/generative-ui/tool-based"],
  },
  // ── Tool Rendering ──
  {
    id: "genui-tr-backend-partial",
    title: "Only get_weather and the TOOLS/Agent lines of tool_rendering.py are printed",
    detail:
      "TOOLS names search_flights, get_stock_price and roll_d20, and the Agent uses SYSTEM_PROMPT; none are printed, so the printed lines raise NameError. from Code tab: the three tools, the prompt and the imports (labelled in backend/demo_agents/tool_rendering.py).",
    severity: "degraded",
    docPath: TR,
    routes: ["/generative-ui/tool-rendering"],
  },
  {
    id: "genui-tr-roll-dice",
    title: "Prose says the catch-all catches roll_dice; the tool is roll_d20",
    detail: "Naming drift only — the runtime behaviour is unaffected.",
    severity: "note",
    docPath: TR,
    routes: ["/generative-ui/tool-rendering"],
  },
  {
    id: "genui-tr-custom-catchall",
    title: "CustomCatchallRenderer / CatchallToolStatus are used but not published",
    detail:
      "The custom catch-all block renders them; neither the prose nor the Code tab defines them. Harness glue: a minimal card showing name, status, arguments and result. The rendered page also labels this snippet as src/app/api/copilotkit/route.ts (mislabel).",
    severity: "degraded",
    docPath: TR,
    routes: ["/generative-ui/tool-rendering"],
  },
  {
    id: "genui-tr-catchall-shells",
    title: "The catch-all snippets have no page around them",
    detail:
      "Only the hook calls are printed. from Code tab: the default-catchall and custom-catchall page shells (minus <CopilotKit> and decorative suggestions).",
    severity: "note",
    docPath: TR,
    routes: ["/generative-ui/tool-rendering"],
  },
  {
    id: "genui-tr-grouping-components",
    title: "MyToolRow and ToolTimeline are named but left to the reader",
    detail:
      "The grouping snippets render them without definitions (no Code-tab source). Harness glue: minimal components taking the documented props (DefaultRenderProps; calls + renderCall). The <CopilotChat> fragments also print no agentId; the harness adds one.",
    severity: "note",
    docPath: TR,
    routes: ["/generative-ui/tool-rendering"],
  },
  {
    id: "genui-tr-page-provider",
    title: "The complete app/page.tsx points at /api/copilotkit with agent \"tool-rendering\"",
    detail:
      "No page publishes a runtime registering that id. The harness drops the printed <CopilotKit> for the root provider and uses its own id (tool_rendering); ToolRenderers and CopilotChat are as printed.",
    severity: "note",
    docPath: TR,
    routes: ["/generative-ui/tool-rendering"],
  },
  // ── State Rendering ──
  {
    id: "genui-sr-agent-missing",
    title: "shared_state_streaming_agent, its prompt and the imports are never printed",
    detail:
      "The prose prints write_document, _document_so_far and DocumentStreamingAgent, and says to mount DocumentStreamingAgent(shared_state_streaming_agent). from Code tab: imports, SYSTEM_PROMPT and the Agent.",
    severity: "degraded",
    docPath: SR,
    routes: ["/generative-ui/state-rendering"],
  },
  {
    id: "genui-sr-frontend-fragment",
    title: "Frontend is a single useAgent call — no page, chat or document view",
    detail:
      "from Code tab: page.tsx (minus <CopilotKit> and suggestions) and document-view.tsx. Harness glue: DemoLayout (imported by the Code tab, published nowhere), which hosts the chat and the DocumentView. The useAgent agentId is the harness id (shared_state_streaming) instead of shared-state-streaming.",
    severity: "degraded",
    docPath: SR,
    routes: ["/generative-ui/state-rendering"],
  },
  // ── A2UI dynamic ──
  {
    id: "genui-ad-renderers-imports",
    title: "renderers.tsx starts at `export const myRenderers` — imports and helpers omitted",
    detail:
      "CatalogRenderers, MyDefinitions, recharts, lucide-react, Badge/Button and the helpers (c, tooltipStyle, barCursor, CHART_COLORS, CardShell) are missing, and definitions.ts omits `export type MyDefinitions`. from Code tab: those lines. Harness glue: _components/badge.tsx and button.tsx (published nowhere).",
    severity: "blocking",
    docPath: AD,
    routes: ["/generative-ui/a2ui/dynamic-schema"],
  },
  {
    id: "genui-ad-page-truncated",
    title: "page.tsx block ends at </CopilotKit> and has no \"use client\"",
    detail:
      "The function never closes, so it cannot compile. Labelled harness fix: \"use client\" and the closing `);` / `}`. Chat (./chat) is unpublished — harness glue: a plain CopilotChat.",
    severity: "blocking",
    docPath: AD,
    routes: ["/generative-ui/a2ui/dynamic-schema"],
  },
  {
    id: "genui-ad-runtime",
    title: "The /api/copilotkit-declarative-gen-ui runtime is never printed",
    detail:
      "The prose says the default path needs no a2ui block on the runtime. Harness glue: a plain runtime with no A2UI options, registering the doc's id declarative-gen-ui against the shared Quickstart agent (no backend config needed). The Code tab's injectA2UITool:false + backend generate_a2ui (ag-ui-a2ui-toolkit) architecture is not used.",
    severity: "degraded",
    docPath: AD,
    routes: ["/generative-ui/a2ui/dynamic-schema"],
  },
  {
    id: "genui-ad-langgraph-optout",
    title: "Opt-out path prints LangGraph code and an undefined `agent`",
    detail:
      "agent.py uses ag_ui_langgraph.get_a2ui_tools with langchain_openai.ChatOpenAI and an undefined my_other_tool; the middleware snippet uses an undefined `agent` and @ag-ui/a2ui-middleware, which no install command adds. The prose also says the call streams 'through LangGraph'. Shown, not run.",
    severity: "degraded",
    docPath: AD,
    routes: ["/generative-ui/a2ui/dynamic-schema"],
  },
  // ── A2UI fixed ──
  {
    id: "genui-af-mycatalog",
    title: "Provider snippet passes myCatalog; catalog.ts exports catalog",
    detail:
      "The app/page.tsx fragment uses `myCatalog`, which nothing defines (the prose catalog.ts exports `catalog`). Reproduced: the demo looks the printed name up on the catalog module, gets undefined, and the provider registers no catalog. Route marked Broken.",
    severity: "blocking",
    docPath: AF,
    routes: ["/generative-ui/a2ui/fixed-schema"],
  },
  {
    id: "genui-af-schema-json",
    title: "flight_schema.json is shown only as a tree diagram",
    detail:
      "display_flight loads a2ui_schemas/flight_schema.json; the page prints a component tree, not the JSON. from Code tab: flight_schema.json. booked_schema.json, mentioned as retained, is published nowhere.",
    severity: "degraded",
    docPath: AF,
    routes: ["/generative-ui/a2ui/fixed-schema"],
  },
  {
    id: "genui-af-agent",
    title: "No Agent wraps display_flight",
    detail: "from Code tab: SYSTEM_PROMPT and a2ui_fixed_agent (labelled in a2ui_fixed.py).",
    severity: "degraded",
    docPath: AF,
    routes: ["/generative-ui/a2ui/fixed-schema"],
  },
  {
    id: "genui-af-collapsed-blocks",
    title: "definitions.ts / renderers.tsx are collapsed or spliced on the rendered page",
    detail:
      "The rendered definitions block shows only its start and end; the rendered renderers block splices Card's comment onto Button's body (a Card that renders <UIButton>). The Markdown export has the full, correct bodies, which are used. Both still omit the imports, the `s` helper and `export type Definitions` — from Code tab. _components/{card,badge,button,separator} are harness glue.",
    severity: "degraded",
    docPath: AF,
    routes: ["/generative-ui/a2ui/fixed-schema"],
  },
  {
    id: "genui-af-route-agent",
    title: "Runtime snippet uses an undefined `agent` and has no handler",
    detail:
      "Harness glue: `agent` is an HttpAgent to the a2ui_fixed_schema backend agent; mounted at /api/a2ui-fixed-schema (the printed /api/copilotkit is the Quickstart's runtime here), and the provider's runtimeUrl is changed to match. Chat is glue.",
    severity: "degraded",
    docPath: AF,
    routes: ["/generative-ui/a2ui/fixed-schema"],
  },
  // ── JSON Render ──
  {
    id: "genui-jr-md-only",
    title: "The frontend files appear only in the Markdown export",
    detail:
      "The rendered page shows only an example JSON output; chat.tsx, json-render-renderer.tsx, catalog.ts and registry.tsx are printed complete in the .md export, which the page points to. Those are treated as prose and used verbatim.",
    severity: "note",
    docPath: JR,
    routes: ["/generative-ui/json-render"],
  },
  {
    id: "genui-jr-helpers",
    title: "MetricCard, charts/* and types are imported but not printed",
    detail:
      "from Code tab: metric-card.tsx, charts/{bar-chart,pie-chart,chart-config}, types.ts and page.tsx (its <CopilotKit> replaced by the root provider — the route has no special options). ./suggestions is commented out (decorative).",
    severity: "degraded",
    docPath: JR,
    routes: ["/generative-ui/json-render"],
  },
  {
    id: "genui-jr-no-backend",
    title: "No backend is printed — only the output contract",
    detail:
      "from Code tab: byoc_json_render.py (tool-less Agent whose prompt fixes the { root, elements } format). Packages @json-render/{core,react}@0.18.0 and the zod4 alias appear in no install command.",
    severity: "degraded",
    docPath: JR,
    routes: ["/generative-ui/json-render"],
  },
  // ── Hashbrown ──
  {
    id: "genui-hb-version",
    title: "Page states @hashbrownai 0.5.0-beta.4; harness runs 0.7.0",
    detail:
      "The renderer uses `prompt` and useUiKit({ examples }), which 0.7.0 still has and 0.8 removed. The repo pins 0.7.0 rather than the beta the page names.",
    severity: "note",
    docPath: HB,
    routes: ["/generative-ui/hashbrown"],
  },
  {
    id: "genui-hb-md-only",
    title: "page/chat/hashbrown-renderer appear only in the Markdown export",
    detail:
      "The rendered page shows only an example message; the .md prints the three files complete. Used verbatim; from Code tab: metric-card, charts/*, types and the /api/copilotkit-declarative-hashbrown runtime (header forwarding dropped). ./suggestions commented out (decorative).",
    severity: "degraded",
    docPath: HB,
    routes: ["/generative-ui/hashbrown"],
  },
  {
    id: "genui-hb-no-backend",
    title: "No backend is printed",
    detail: "from Code tab: byoc_hashbrown.py + byoc_hashbrown_prompt.py (tool-less; the prompt defines the { ui: [...] } wire format).",
    severity: "degraded",
    docPath: HB,
    routes: ["/generative-ui/hashbrown"],
  },
  // ── MCP Apps ──
  {
    id: "genui-ma-agents-undefined",
    title: "mcpAppsAgent and headlessCompleteAgent are used but never defined",
    detail:
      "The runtime block has no imports or handler around it. Harness glue: both are HttpAgents to the shared Quickstart agent (MCP tools arrive as client tools, so no backend config is needed). headless-complete belongs to another page and is kept only because the printed map names it.",
    severity: "degraded",
    docPath: MA,
    routes: ["/generative-ui/mcp-apps"],
  },
  {
    id: "genui-ma-chat",
    title: "Chat is rendered but never defined",
    detail: "Harness glue: a plain CopilotChat (the page's own comment says that is enough). Function shell and imports from the Code tab.",
    severity: "note",
    docPath: MA,
    routes: ["/generative-ui/mcp-apps"],
  },
  {
    id: "genui-ma-builtin-intelligence",
    title: "Intelligence variant prints a BuiltInAgent and needs a premium key",
    detail:
      "The complete app/api/copilotkit/[[...slug]]/route.ts uses BuiltInAgent({ model: \"openai/gpt-6-luna\" }) and CPK_INTELLIGENCE_API_KEY — not an OpenAI Agents SDK agent. Shown, not run; the non-Intelligence runtime covers the feature.",
    severity: "note",
    docPath: MA,
    routes: ["/generative-ui/mcp-apps"],
  },
  // ── Open Generative UI ──
  {
    id: "genui-og-agents-undefined",
    title: "Runtime block uses an undefined `agents` map",
    detail:
      "Printed as the inside of createCopilotRuntimeHandler({...}). Harness glue: `agents` maps open-gen-ui and open-gen-ui-advanced to the shared Quickstart agent (generateSandboxedUi is a frontend tool, so no backend config is needed). No backend agent is printed.",
    severity: "degraded",
    docPath: OG,
    routes: ["/generative-ui/open-generative-ui"],
  },
  {
    id: "genui-og-design-skill",
    title: "VISUALIZATION_DESIGN_SKILL comes from an unpublished ./design-skill",
    detail:
      "Neither the prose nor the Code tab publishes it. `designSkill` is optional (CopilotKit falls back to its default), so the import and the prop value are commented out, labelled, rather than invented.",
    severity: "note",
    docPath: OG,
    routes: ["/generative-ui/open-generative-ui"],
  },
  {
    id: "genui-og-advanced-splice",
    title: "Advanced page.tsx is cut off mid-JSX and spliced with sandbox-functions.ts",
    detail:
      "The rendered block stops after </CopilotKit> and continues straight into sandbox-functions.ts. Labelled fix: \"use client\" and the closing lines. from Code tab: the inline Chat. useConfigureSuggestions / ./suggestions commented out (decorative). Minimal page's Chat is harness glue.",
    severity: "degraded",
    docPath: OG,
    routes: ["/generative-ui/open-generative-ui"],
  },
];
