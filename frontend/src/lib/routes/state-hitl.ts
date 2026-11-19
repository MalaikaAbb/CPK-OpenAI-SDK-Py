import type { RouteMeta } from "@/lib/nav-config";

const BUILT = "Built, not yet checked in a browser.";

export const STATE_HITL_ROUTES: RouteMeta[] = [
  {
    path: "/shared-state",
    group: "Shared State",
    title: "Shared State",
    docPath: "/openai-agents-python/shared-state",
    summary:
      "Two-way state. A preferences form writes agent state with setState. The agent reads it through dynamic instructions and writes notes back with a set_notes tool.",
    status: "partial",
    statusNote: `${BUILT} The agent is the page's three shared_state.py fragments, composed. The preferences form, the card primitives and the Preferences/RWAgentState types are glue.`,
    hasDemo: true,
    agentId: "shared-state-read-write",
  },
  {
    path: "/shared-state/rendering-in-app",
    group: "Shared State",
    title: "Render state in your app",
    docPath: "/openai-agents-python/shared-state/rendering-in-app",
    summary:
      "A canvas in the main view seeds and renders agent.state through useAgent(), next to a sidebar chat on the same agent. A second demo adds the doc's toggleItem write-back.",
    status: "partial",
    statusNote: `${BUILT} The doc's Canvas.tsx and app/page.tsx are mounted as printed. They have no "use client", so the harness demo page is the client boundary (labelled). "default" is served by its own runtime (/api/state-hitl-default) and backed by the Shared State agent.`,
    hasDemo: true,
    agentId: "default",
    nestedProviderPaths: [
      "/shared-state/rendering-in-app/demo-chat",
      "/shared-state/rendering-in-app/demo-chat/write-back",
    ],
  },
  {
    path: "/shared-state/streaming",
    group: "Shared State",
    title: "State streaming",
    docPath: "/openai-agents-python/shared-state/streaming",
    summary:
      "DocumentStreamingAgent turns write_document's streaming tool arguments into STATE_DELTA events, so the document fills in token by token.",
    status: "partial",
    statusNote: `${BUILT} The agent module is shared with /generative-ui/state-rendering and mounted by the gen-ui group as shared_state_streaming. The doc's id shared-state-streaming is not used. The Agent(...) and prompt are from Code tab.`,
    hasDemo: true,
    agentId: "shared_state_streaming",
  },
  {
    path: "/shared-state/agent-readonly",
    group: "Shared State",
    title: "Agent Read-Only Context",
    docPath: "/openai-agents-python/shared-state/agent-readonly",
    summary:
      "Three useAgentContext values (name, timezone, recent activity) reach the agent's instructions. The agent can read them and has no way to write them back.",
    status: "partial",
    statusNote: `${BUILT} The prose page.tsx is cut off. The tail and "use client" are from Code tab. demo-layout (the editable fields) is glue. The page's own nested provider is kept and pointed at /api/harness.`,
    hasDemo: true,
    agentId: "readonly-state-agent-context",
    nestedProviderPaths: ["/shared-state/agent-readonly/demo-chat"],
  },
  {
    path: "/human-in-the-loop",
    group: "Human in the Loop",
    title: "Human in the Loop",
    docPath: "/openai-agents-python/human-in-the-loop/index",
    summary:
      "Pattern 1: a frontend book_call tool (useHumanInTheLoop) shows a time picker in the chat and returns the pick as the tool result. Pattern 2's needs_approval backend is shown here and runs on the useInterrupt and headless routes.",
    status: "partial",
    statusNote: `${BUILT} hitl.py is complete in the prose. The page's tail, "use client" and time-picker-card are from Code tab.`,
    hasDemo: true,
    agentId: "hitl-in-chat",
    nestedProviderPaths: ["/human-in-the-loop/demo-chat"],
  },
  {
    path: "/human-in-the-loop/useInterrupt",
    group: "Human in the Loop",
    title: "Pausing the Agent (useInterrupt)",
    docPath: "/openai-agents-python/human-in-the-loop/useInterrupt",
    summary:
      "A needs_approval backend tool pauses the run as an AG-UI interrupt. useInterrupt renders Approve/Cancel in the chat, and resolve() resumes the run. The two snippets are on two demo pages.",
    status: "partial",
    statusNote: `${BUILT} Pause and resume should work, but the verbatim snippets cannot schedule anything. ApprovalInterrupt sends no time, so the tool says 'Meeting NOT scheduled'. The multi snippet resolves {ok:true}, which the adapter treats as a rejection. The page also shows a 'Not available on this framework' banner.`,
    hasDemo: true,
    agentId: "gen-ui-interrupt",
  },
  {
    path: "/human-in-the-loop/headless",
    group: "Human in the Loop",
    title: "Headless Interrupts",
    docPath: "/openai-agents-python/human-in-the-loop/headless",
    summary:
      "useInterrupt({ renderInChat: false }) returns the picker element, and the page places it in its own panel instead of the chat.",
    status: "partial",
    statusNote: `${BUILT} The page prints no code (only prose and a 'Not available on this framework' banner). The demo is the Code tab's interrupt-headless page, trimmed. interrupt-fallback-slots is glue.`,
    hasDemo: true,
    agentId: "interrupt-headless",
  },
  {
    path: "/human-in-the-loop/governed-actions",
    group: "Human in the Loop",
    title: "Governed Action Approval UI",
    docPath: "/openai-agents-python/human-in-the-loop/governed-actions",
    summary:
      "One approval card for a GovernedAction envelope (allow / deny / require_approval), wired as a useInterrupt renderer and as a useHumanInTheLoop tool.",
    status: "partial",
    statusNote: `${BUILT} The useHumanInTheLoop path runs on the shared agent. The useInterrupt path is broken by design: adapter interrupts carry metadata {tool_name, tool_input}, never metadata.action, so the card renders null. The page publishes no backend. executeSideEffect is a stub.`,
    hasDemo: true,
    agentId: "gen-ui-interrupt",
  },
  {
    path: "/webmcp",
    group: "App Control",
    title: "WebMCP",
    docPath: "/openai-agents-python/webmcp",
    summary:
      "A frontend tool marked webmcp is offered to the in-app agent and to the browser's navigator.modelContext. One demo uses useFrontendTool, the other a bare CopilotKitCore.",
    status: "partial",
    statusNote: `${BUILT} searchOrders is never defined on the page, so a stub stands in. To test from outside the app you need Chrome 149+ with WebMCP turned on and the Model Context Tool Inspector.`,
    hasDemo: true,
    agentId: "openai_agent",
  },
  {
    path: "/multi-agent/subagents",
    group: "Multi-Agent",
    title: "Sub-Agents",
    docPath: "/openai-agents-python/multi-agent/subagents",
    summary:
      "A supervisor calls research, writing and critique sub-agents as tools. Each delegation is added to shared state and shown in a live log.",
    status: "partial",
    statusNote: `${BUILT} subagents.py is complete in the prose. delegation-log's types are from Code tab. The page wiring is from Code tab, trimmed (the per-tool chat cards are left out because their component is unpublished).`,
    hasDemo: true,
    agentId: "subagents",
  },
];
