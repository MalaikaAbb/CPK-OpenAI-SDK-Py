import type { DocGap } from "@/lib/doc-gaps";

const P = "/openai-agents-python";

export const STATE_HITL_GAPS: DocGap[] = [
  // ── /shared-state ──
  {
    id: "statehitl-shared-state-fragments",
    title: "shared_state.py is printed as three fragments with no imports",
    detail:
      "with_state, the prompt + agent, and set_notes are separate blocks. None of them shows json, Callable, Any, RunContextWrapper, Agent, function_tool or shared_state imports, and set_notes is printed after the agent that uses it. Harness glue: backend/demo_agents/shared_state.py composes them (set_notes first) and adds the imports. The fragments are otherwise verbatim.",
    severity: "degraded",
    docPath: `${P}/shared-state`,
    routes: ["/shared-state"],
  },
  {
    id: "statehitl-shared-state-page-missing",
    title: "Shared State prints the hooks but no page, types or preferences editor",
    detail:
      "The useAgent call and handlePreferencesChange are fragments of a page.tsx that is never shown. Preferences, RWAgentState, the free variable `notes`, and the editor that would call handlePreferencesChange are all missing, and this page has no Code tab. Harness glue: demo-chat/page.tsx (layout, the state reads, the Clear handler), _demo/types.ts and _demo/preferences-card.tsx.",
    severity: "degraded",
    docPath: `${P}/shared-state`,
    routes: ["/shared-state"],
  },
  {
    id: "statehitl-notes-card-primitives",
    title: "NotesCard renders Card*/Button primitives and a NotesCardProps type it never defines",
    detail:
      "The NotesCard block uses Card, CardHeader, CardTitle, CardDescription, CardContent and Button (variant/size), and NotesCardProps. None of them is published. Harness glue: minimal stand-ins in app/shared-state/_demo/_components and a two-field props type.",
    severity: "note",
    docPath: `${P}/shared-state`,
    routes: ["/shared-state"],
  },
  {
    id: "statehitl-agent-ids-unregistered",
    title: "The pages' agent ids are registered by no published runtime",
    detail:
      "shared-state-read-write, shared-state-streaming, readonly-state-agent-context, hitl-in-chat, gen-ui-interrupt, interrupt-headless and subagents are addressed by page code. The Quickstart runtime registers only openai_agent, and no page shows another registration. Harness glue: backend/demo_agents/agents_state_hitl.py mounts them and the harness runtime registers them.",
    severity: "degraded",
    docPath: `${P}/shared-state`,
    routes: [
      "/shared-state",
      "/shared-state/agent-readonly",
      "/human-in-the-loop",
      "/human-in-the-loop/useInterrupt",
      "/human-in-the-loop/headless",
      "/multi-agent/subagents",
    ],
  },
  {
    id: "statehitl-nested-provider-runtime-url",
    title: "Page snippets mount <CopilotKit runtimeUrl=\"/api/copilotkit\"> for agents that runtime does not have",
    detail:
      "agent-readonly, the HITL index page and rendering-in-app wrap their demo in <CopilotKit runtimeUrl=\"/api/copilotkit\" …>. Here that path is the Quickstart's verbatim runtime (only openai_agent). The nested providers are kept, with runtimeUrl pointed at /api/harness (or /api/state-hitl-default for \"default\") and enableInspector from lib/inspector. Each change is labelled in place.",
    severity: "note",
    docPath: `${P}/shared-state/agent-readonly`,
    routes: [
      "/shared-state/agent-readonly",
      "/human-in-the-loop",
      "/shared-state/rendering-in-app",
    ],
  },

  // ── /shared-state/rendering-in-app ──
  {
    id: "statehitl-rendering-default-agent",
    title: "rendering-in-app talks to an agent named \"default\" that no page defines",
    detail:
      "useAgent() with no id and <CopilotKit> with no agent prop both resolve to \"default\". The page prints no backend, and the Quickstart runtime has no \"default\". Harness glue: app/api/state-hitl-default registers \"default\" → the Shared State agent (shared-state-read-write), whose with_state instructions let the model see the canvas.",
    severity: "degraded",
    docPath: `${P}/shared-state/rendering-in-app`,
    routes: ["/shared-state/rendering-in-app"],
  },
  {
    id: "statehitl-rendering-no-use-client",
    title: "Canvas.tsx and app/page.tsx have no \"use client\" (doc bug, kept)",
    detail:
      "Canvas calls useEffect and useAgent. app/page.tsx is a server component in a real Next app, and it renders Canvas and the client-only CopilotKit components, so the build fails. Both files are kept without the directive. The labelled minimal fix is that the harness demo page importing them is \"use client\".",
    severity: "degraded",
    docPath: `${P}/shared-state/rendering-in-app`,
    routes: ["/shared-state/rendering-in-app"],
  },
  {
    id: "statehitl-rendering-toggle-unwired",
    title: "toggleItem uses an undeclared `agent` and nothing calls it",
    detail:
      "The write-back block is a free function. Harness glue: _demo/item-toggles.tsx declares `agent` with useAgent() and renders one checkbox per item. The second demo (demo-chat/write-back) recomposes the doc's layout around it, because the doc's page.tsx has no slot for it.",
    severity: "note",
    docPath: `${P}/shared-state/rendering-in-app`,
    routes: ["/shared-state/rendering-in-app"],
  },
  {
    id: "statehitl-rendering-css",
    title: "app-shell and canvas CSS classes are unpublished",
    detail: "Harness glue: _demo/app-shell.css, the smallest layout that puts the canvas beside the sidebar.",
    severity: "note",
    docPath: `${P}/shared-state/rendering-in-app`,
    routes: ["/shared-state/rendering-in-app"],
  },

  // ── /shared-state/streaming ──
  {
    id: "statehitl-streaming-agent-missing",
    title: "shared_state_streaming_agent and its prompt are not in the prose",
    detail:
      "The prose prints write_document and DocumentStreamingAgent and says to wrap shared_state_streaming_agent, which it never defines. From Code tab: SYSTEM_PROMPT, the Agent(...) and the imports (backend/demo_agents/shared_state_streaming.py, shared with /generative-ui/state-rendering).",
    severity: "degraded",
    docPath: `${P}/shared-state/streaming`,
    routes: ["/shared-state/streaming", "/shared-state"],
  },
  {
    id: "statehitl-streaming-id",
    title: "Streaming demo uses agent id shared_state_streaming, not the doc's shared-state-streaming",
    detail:
      "The same module serves /generative-ui/state-rendering and is mounted once, by the gen-ui group, as shared_state_streaming. The useAgent call is otherwise verbatim. The changed id is labelled.",
    severity: "note",
    docPath: `${P}/shared-state/streaming`,
    routes: ["/shared-state/streaming"],
  },
  {
    id: "statehitl-streaming-view",
    title: "The document panel and page wiring are prose-only; demo-layout and suggestions are unpublished",
    detail:
      "The prose describes rendering agent.state.document and isRunning in words. From Code tab: document-view.tsx and the state reads in page.tsx. The Code tab's ./demo-layout is unpublished, so glue puts DocumentView next to the chat. ./suggestions is decorative and commented out.",
    severity: "degraded",
    docPath: `${P}/shared-state/streaming`,
    routes: ["/shared-state/streaming"],
  },

  // ── /shared-state/agent-readonly ──
  {
    id: "statehitl-readonly-truncated",
    title: "Read-only context page.tsx is cut off and has no \"use client\"",
    detail:
      "The prose stops after the useState calls, before toggleActivity, the DemoLayout render and the closing braces. From Code tab: the tail and \"use client\".",
    severity: "degraded",
    docPath: `${P}/shared-state/agent-readonly`,
    routes: ["/shared-state/agent-readonly"],
  },
  {
    id: "statehitl-readonly-demo-layout",
    title: "./demo-layout (ACTIVITIES, DemoLayout) is unpublished",
    detail:
      "It is the UI that edits the three context values. Neither the prose nor the Code tab prints it. Harness glue: a name input, a timezone select and activity checkboxes. The activity strings and timezones are this repo's. ./suggestions is decorative and commented out.",
    severity: "degraded",
    docPath: `${P}/shared-state/agent-readonly`,
    routes: ["/shared-state/agent-readonly"],
  },
  {
    id: "statehitl-readonly-upcoming-events",
    title: "upcoming_events is an orphan tool with a `...` body",
    detail:
      "It is attached to no agent and returns None despite `-> list[dict]`. It is kept verbatim and not imported in backend/docs_verbatim/state_hitl/upcoming_events.py.",
    severity: "note",
    docPath: `${P}/shared-state/agent-readonly`,
    routes: ["/shared-state/agent-readonly"],
  },

  // ── /human-in-the-loop ──
  {
    id: "statehitl-hitl-page-truncated",
    title: "hitl-in-chat/page.tsx stops before its return; time-picker-card is not shown",
    detail:
      "The prose ends right after useHumanInTheLoop and has no \"use client\". From Code tab: `return <CopilotChat agentId=\"hitl-in-chat\" …/>`, the closing braces, the directive, and time-picker-card.tsx (TimePickerCard, TimeSlot).",
    severity: "degraded",
    docPath: `${P}/human-in-the-loop/index`,
    routes: ["/human-in-the-loop"],
  },
  {
    id: "statehitl-interrupt-agent-fragments",
    title: "Pattern 2 prints schedule_meeting and SchedulerAgent only",
    detail:
      "Neither fragment runs alone. The _answers ContextVar, interrupt_agent = Agent(...), its SYSTEM_PROMPT and the imports are from Code tab (backend/demo_agents/interrupt_agent.py). The page prints no frontend for Pattern 2; it runs on /human-in-the-loop/useInterrupt and /headless.",
    severity: "degraded",
    docPath: `${P}/human-in-the-loop/index`,
    routes: ["/human-in-the-loop", "/human-in-the-loop/useInterrupt", "/human-in-the-loop/headless"],
  },
  {
    id: "statehitl-chat-settings-kwargs",
    title: "chat_settings(parallel_tool_calls=False) needs an unpublished signature",
    detail:
      "interrupt_agent.py and subagents.py call chat_settings with keyword arguments. Harness glue: demo_agents._common.chat_settings passes **kwargs to ModelSettings.",
    severity: "note",
    docPath: `${P}/multi-agent/subagents`,
    routes: ["/human-in-the-loop", "/multi-agent/subagents"],
  },

  // ── /human-in-the-loop/useInterrupt ──
  {
    id: "statehitl-useinterrupt-banner",
    title: "useInterrupt and headless pages say 'Not available on this framework'",
    detail:
      "Both pages carry the banner, yet ag-ui-openai-agents emits standard AG-UI interrupts for needs_approval tools and resumes from resume entries. The pages' own Code-tab demos use them.",
    severity: "note",
    docPath: `${P}/human-in-the-loop/useInterrupt`,
    routes: ["/human-in-the-loop/useInterrupt", "/human-in-the-loop/headless"],
  },
  {
    id: "statehitl-useinterrupt-ok-true",
    title: "Multi-interrupt snippet resolves { ok: true }, which the adapter treats as a rejection",
    detail:
      "ag-ui-openai-agents runs an approved call only when payload.approved is True. { ok: true } yields 'Tool execution was not approved.'. The snippet is kept verbatim on demo-chat/multi. The interrupt agent also sets parallel_tool_calls=False, so more than one open interrupt does not happen in practice.",
    severity: "degraded",
    docPath: `${P}/human-in-the-loop/useInterrupt`,
    routes: ["/human-in-the-loop/useInterrupt"],
  },
  {
    id: "statehitl-useinterrupt-no-time",
    title: "ApprovalInterrupt approves with no chosen time, so nothing gets scheduled",
    detail:
      "resolve({ approved: true }) runs schedule_meeting, which finds no chosen_label/chosen_time in the resume payload and returns 'User did not pick a time. Meeting NOT scheduled'.",
    severity: "degraded",
    docPath: `${P}/human-in-the-loop/useInterrupt`,
    routes: ["/human-in-the-loop/useInterrupt"],
  },
  {
    id: "statehitl-useinterrupt-no-agent",
    title: "useInterrupt snippets take no agent id, and the page prints no backend, host page or import",
    detail:
      "Harness glue: the useInterrupt import and an enclosing component for the bare multi-interrupt call. CopilotChatConfigurationProvider agentId=\"gen-ui-interrupt\" makes the snippets' hook follow the interrupt agent. One useInterrupt per page, so the two snippets are on two demo pages.",
    severity: "note",
    docPath: `${P}/human-in-the-loop/useInterrupt`,
    routes: ["/human-in-the-loop/useInterrupt"],
  },

  // ── /human-in-the-loop/headless ──
  {
    id: "statehitl-headless-no-code",
    title: "Headless Interrupts prints no code at all",
    detail:
      "The prose promises a resolver built from useAgent + agent.subscribe + copilotkit.runAgent and prints none of it. The route runs the Code tab's interrupt-headless page instead, which uses useInterrupt({ renderInChat: false }), trimmed to the feature: the nested provider, suggestion pills and a decorative icon are removed. The Code tab also imports an unpublished ../_shared/interrupt-fallback-slots; a glue version generates four future slots.",
    severity: "blocking",
    docPath: `${P}/human-in-the-loop/headless`,
    routes: ["/human-in-the-loop/headless"],
  },

  // ── /human-in-the-loop/governed-actions ──
  {
    id: "statehitl-governed-metadata-action",
    title: "GovernedActionApproval reads interrupt.metadata.action, which this adapter never sends",
    detail:
      "ag-ui-openai-agents builds every approval interrupt with metadata = { tool_name, tool_input } and has no API for custom interrupt metadata. `action` is always undefined, so the card returns null and the paused run has no UI. Kept verbatim on demo-chat, against the gen-ui-interrupt agent.",
    severity: "blocking",
    docPath: `${P}/human-in-the-loop/governed-actions`,
    routes: ["/human-in-the-loop/governed-actions"],
  },
  {
    id: "statehitl-governed-render-null-type",
    title: "GovernedActionApproval's render returns null where useInterrupt requires a ReactElement",
    detail:
      "Type error under strict TypeScript. Kept verbatim with a localized @ts-expect-error.",
    severity: "note",
    docPath: `${P}/human-in-the-loop/governed-actions`,
    routes: ["/human-in-the-loop/governed-actions"],
  },
  {
    id: "statehitl-governed-no-backend",
    title: "Governed actions publishes no backend, policy engine or agent id",
    detail:
      "Neither path says which agent raises the interrupt or calls approve_governed_action, or where the verdict comes from. The interrupt demo borrows gen-ui-interrupt. The tool demo uses the shared Quickstart agent (frontend tool only, no backend config). There, the model invents the whole envelope, verdict included.",
    severity: "degraded",
    docPath: `${P}/human-in-the-loop/governed-actions`,
    routes: ["/human-in-the-loop/governed-actions"],
  },
  {
    id: "statehitl-governed-execute-side-effect",
    title: "handleApproval calls an undefined executeSideEffect, as TypeScript for a Python backend",
    detail:
      "Labelled stub in _demo/handle-approval.ts so the file compiles. Nothing calls handleApproval: the page calls it agent-side, and this framework's agents are Python.",
    severity: "note",
    docPath: `${P}/human-in-the-loop/governed-actions`,
    routes: ["/human-in-the-loop/governed-actions"],
  },
  {
    id: "statehitl-governed-snippet-glue",
    title: "Governed-actions snippets have no exports or \"use client\"",
    detail:
      "GovernedActionTool renders GovernedActionCard from the other block. Harness glue: \"use client\", export lines and one import, all labelled.",
    severity: "note",
    docPath: `${P}/human-in-the-loop/governed-actions`,
    routes: ["/human-in-the-loop/governed-actions"],
  },

  // ── /webmcp ──
  {
    id: "statehitl-webmcp-search-orders",
    title: "searchOrders is called by both WebMCP snippets and defined nowhere",
    detail:
      "As published, this is a 'Cannot find name' compile error and a ReferenceError when the tool runs. Harness glue: a labelled stub (_demo/search-orders.ts) returning three hard-coded orders, imported by both files.",
    severity: "degraded",
    docPath: `${P}/webmcp`,
    routes: ["/webmcp"],
  },
  {
    id: "statehitl-webmcp-core-mount",
    title: "webmcp.ts exports a CopilotKitCore that nothing on the page uses",
    detail:
      "The page does not say who imports `copilotkit` or how it relates to a <CopilotKit> provider. The snippet registers the same tool name as OrderSearch. Harness glue: demo-chat/core-only loads it on the client and lists its tools. Seeing the tool from outside needs Chrome 149+ with WebMCP turned on.",
    severity: "note",
    docPath: `${P}/webmcp`,
    routes: ["/webmcp"],
  },

  // ── /multi-agent/subagents ──
  {
    id: "statehitl-subagents-log-types",
    title: "delegation-log excerpt uses types and styles it never defines",
    detail:
      "SubAgentName, Delegation, DelegationLogProps, SUB_AGENT_STYLE and the \"use client\"/React header are from Code tab (the full delegation-log.tsx).",
    severity: "degraded",
    docPath: `${P}/multi-agent/subagents`,
    routes: ["/multi-agent/subagents"],
  },
  {
    id: "statehitl-subagents-page-wiring",
    title: "Sub-Agents prints no page: the useAgent wiring is described in prose only",
    detail:
      "From Code tab, trimmed: useAgent({ agentId: 'subagents', updates: [OnStateChanged, OnRunStatusChanged] }) and the reads of delegations/isRunning. Left out: the Code tab's imports of unpublished ./subagent-activity-card (inline useRenderTool cards), ./demo-layout, ./active-subagent and ./suggestions. A glue layout puts DelegationLog beside the chat.",
    severity: "degraded",
    docPath: `${P}/multi-agent/subagents`,
    routes: ["/multi-agent/subagents"],
  },
];
