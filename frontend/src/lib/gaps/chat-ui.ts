import type { DocGap } from "@/lib/doc-gaps";

const D = "/openai-agents-python";

export const CHAT_UI_GAPS: DocGap[] = [
  // ── cross-page ────────────────────────────────────────────────────────────
  {
    id: "chatui-agent-ids-unregistered",
    title: "Page agent ids are registered by no printed runtime",
    detail:
      "The only general runtime in prose is the Quickstart's app/api/copilotkit/route.ts, which registers openai_agent. Pages address agentic_chat, prebuilt-sidebar, prebuilt-popup, headless-simple, my-agent, reasoning-default/-custom. Pages that need no backend config swap to openai_agent on /api/copilotkit (each swap labelled inline); the reasoning pages use the harness agent `reasoning` on /api/harness.",
    severity: "degraded",
    docPath: `${D}/prebuilt-components/chat`,
    routes: [
      "/prebuilt-components/chat",
      "/prebuilt-components/sidebar",
      "/prebuilt-components/popup",
      "/custom-look-and-feel/headless-ui",
      "/multimodal-attachments",
      "/custom-look-and-feel/reasoning-messages",
      "/generative-ui/reasoning",
    ],
  },
  {
    id: "chatui-region-wrappers",
    title: "Prose blocks are regions/fragments without imports, \"use client\" or a component",
    detail:
      "Most chat-UI blocks are JSX fragments or file regions. Where the demo Code tab has the full page, its wrapper (imports, \"use client\", export default) is used; otherwise a minimal `export function Chat() { return (…) }` wrapper is added. Each wrapper line is labelled.",
    severity: "note",
    docPath: `${D}/custom-look-and-feel/slots`,
    routes: [
      "/prebuilt-components/chat",
      "/prebuilt-components/sidebar",
      "/prebuilt-components/popup",
      "/prebuilt-components/chat-controls",
      "/custom-look-and-feel/css",
      "/custom-look-and-feel/slots",
      "/custom-look-and-feel/markdown",
      "/custom-look-and-feel/reasoning-messages",
      "/multimodal-attachments",
    ],
  },
  {
    id: "chatui-no-provider-quickstart-layout",
    title: "Pages with no provider run under the Quickstart's layout provider",
    detail:
      "chat-controls, slots, markdown, headless-ui, multimodal and the CSS prop snippets render <CopilotChat>/<CopilotSidebar> with no provider. The demos mount the Quickstart's app/layout.tsx <CopilotKit runtimeUrl=\"/api/copilotkit\" agent=\"openai_agent\"> around them (harness glue: the doc's own file).",
    severity: "note",
    docPath: `${D}/quickstart`,
    routes: [
      "/prebuilt-components/chat-controls",
      "/custom-look-and-feel/css",
      "/custom-look-and-feel/slots",
      "/custom-look-and-feel/markdown",
      "/custom-look-and-feel/headless-ui",
      "/multimodal-attachments",
    ],
  },
  {
    id: "chatui-suggestions-unpublished",
    title: "Suggestion hooks/components are referenced but unpublished",
    detail:
      "useAgenticChatSuggestions (chat), <Suggestions /> (sidebar, popup), useReasoningDefaultSuggestions / useReasoningCustomSuggestions (reasoning). Decorative; commented out at import and call site, labelled.",
    severity: "note",
    docPath: `${D}/prebuilt-components/chat`,
    routes: [
      "/prebuilt-components/chat",
      "/prebuilt-components/sidebar",
      "/prebuilt-components/popup",
      "/custom-look-and-feel/reasoning-messages",
      "/generative-ui/reasoning",
    ],
  },
  // ── quickstart ────────────────────────────────────────────────────────────
  {
    id: "chatui-quickstart-root-layout",
    title: "The Quickstart's app/layout.tsx is a root layout; mounted inside the demo instead",
    detail:
      "The harness owns the real root layout (nav + app-wide provider). The doc's layout is mounted in /quickstart/demo-chat with <html>/<body> and the globals.css import commented out and enableInspector added — all labelled. Its <CopilotKit> is nested inside the harness provider.",
    severity: "note",
    docPath: `${D}/quickstart`,
    routes: ["/quickstart"],
  },
  // ── prebuilt ──────────────────────────────────────────────────────────────
  {
    id: "chatui-maincontent-unpublished",
    title: "MainContent / YourMainContent rendered but never defined",
    detail:
      "Sidebar and popup render <MainContent />, the threads drawer's sidebar block renders <YourMainContent />; neither prose nor Code tab defines them. Harness placeholder: a heading and one line of text.",
    severity: "note",
    docPath: `${D}/prebuilt-components/sidebar`,
    routes: ["/prebuilt-components/sidebar", "/prebuilt-components/popup", "/prebuilt-components/copilot-threads-drawer"],
  },
  {
    id: "chatui-analytics-undefined",
    title: "analytics.track is called but never defined (chat controls feedback)",
    detail:
      "The thumbs up/down handlers send to analytics.track, the sink of the feature. Harness stub (demo-chat/analytics.ts) logs to the console and to an on-screen list.",
    severity: "degraded",
    docPath: `${D}/prebuilt-components/chat-controls`,
    routes: ["/prebuilt-components/chat-controls"],
  },
  {
    id: "chatui-toggle-config-unbound",
    title: "Toggle snippet uses `config` from another block",
    detail:
      "The setModalOpen toggle block references `config` without declaring it. Harness glue: a ToggleChatButton component declares it with useCopilotChatConfiguration() and the previous block's null guard.",
    severity: "note",
    docPath: `${D}/prebuilt-components/chat-controls`,
    routes: ["/prebuilt-components/chat-controls"],
  },
  // ── css ───────────────────────────────────────────────────────────────────
  {
    id: "chatui-css-page-and-theme-from-codetab",
    title: "CSS page: the demo page and full theme.css are not in prose",
    detail:
      "Prose prints `import \"./theme.css\"` and two excerpts of a ~20 KB stylesheet. The page component and the complete theme.css are from the Code tab (agent id swapped, `h-screen`→`h-full`, attachments prop trimmed — labelled).",
    severity: "degraded",
    docPath: `${D}/custom-look-and-feel/css`,
    routes: ["/custom-look-and-feel/css"],
  },
  {
    id: "chatui-css-react-ui-v1",
    title: "CopilotKitCSSProperties is imported from v1 @copilotkit/react-ui",
    detail:
      "Not in the Quickstart's install line, not installed, and react-core v2 does not export the type; the --copilot-kit-* variables are v1 tokens. Shown as a code block, not run.",
    severity: "blocking",
    docPath: `${D}/custom-look-and-feel/css`,
    routes: ["/custom-look-and-feel/css"],
  },
  {
    id: "chatui-css-icons-prop",
    title: "`icons` is not a prop of v2 CopilotChat",
    detail:
      "Kept verbatim behind @ts-expect-error; has no effect at runtime. YourOpenIconComponent / YourCloseIconComponent are undefined — minimal glue glyphs.",
    severity: "degraded",
    docPath: `${D}/custom-look-and-feel/css`,
    routes: ["/custom-look-and-feel/css"],
  },
  {
    id: "chatui-css-font-family-quoted",
    title: "font-family: \"Arial, sans-serif\" is one quoted family name",
    detail: "The fallback never applies. Kept verbatim in prose-globals.css.",
    severity: "note",
    docPath: `${D}/custom-look-and-feel/css`,
    routes: ["/custom-look-and-feel/css"],
  },
  {
    id: "chatui-css-globals-global",
    title: "globals.css prose blocks are global selectors",
    detail:
      "Loaded only by the CSS demo route (prose-globals.css), but once loaded they apply to every tab of that demo, including the scoped theme.",
    severity: "note",
    docPath: `${D}/custom-look-and-feel/css`,
    routes: ["/custom-look-and-feel/css"],
  },
  // ── slots ─────────────────────────────────────────────────────────────────
  {
    id: "chatui-slots-extract-truncated",
    title: "Slots teaching extract is cut off and only `declare`s its components",
    detail:
      "ChatSlotsTeachingExtracts is never closed and never renders; CustomWelcomeScreen/CustomAssistantMessage/CustomDisclaimer are `declare const` (ReferenceError at runtime). Components from Code tab slot-wrappers.tsx (trimmed); the closing `return <CopilotChat welcomeScreen messageView input />` is harness glue.",
    severity: "degraded",
    docPath: `${D}/custom-look-and-feel/slots`,
    routes: ["/custom-look-and-feel/slots"],
  },
  {
    id: "chatui-slots-marker-unpublished",
    title: "slot-wrappers.tsx imports an unpublished SlotMarker",
    detail: "Code tab's ./slot-marker is not in the tab. Minimal harness SlotMarker: dashed outline + label badge.",
    severity: "note",
    docPath: `${D}/custom-look-and-feel/slots`,
    routes: ["/custom-look-and-feel/slots"],
  },
  {
    id: "chatui-slots-toolbar-copy-undefined",
    title: "CustomToolbar / CustomCopyButton are rendered but defined nowhere",
    detail:
      "Not in prose or Code tab. Harness glue wraps the default Toolbar / CopyButton in a marker. CustomUserMessage is from the Code tab.",
    severity: "note",
    docPath: `${D}/custom-look-and-feel/slots`,
    routes: ["/custom-look-and-feel/slots"],
  },
  {
    id: "chatui-slots-messageview-untyped",
    title: "CustomMessageView has untyped parameters and renders non-string content",
    detail:
      "`({ messages, isRunning }) =>` fails a strict build (kept behind @ts-expect-error); `{msg.content}` can be a content-part array.",
    severity: "degraded",
    docPath: `${D}/custom-look-and-feel/slots`,
    routes: ["/custom-look-and-feel/slots"],
  },
  {
    id: "chatui-slots-toolcalls-idle",
    title: "toolCallsView snippet needs a tool call to show anything",
    detail: "The page prints no tool; the shared agent has none, so the dashed tool-calls frame never appears.",
    severity: "note",
    docPath: `${D}/custom-look-and-feel/slots`,
    routes: ["/custom-look-and-feel/slots"],
  },
  // ── markdown ──────────────────────────────────────────────────────────────
  {
    id: "chatui-markdown-classes-undefined",
    title: "my-link / my-heading classes are never defined",
    detail: "Harness glue CSS (demo-chat/glue.css) gives them loud styles so the override is visible.",
    severity: "note",
    docPath: `${D}/custom-look-and-feel/markdown`,
    routes: ["/custom-look-and-feel/markdown"],
  },
  // ── headless ui ───────────────────────────────────────────────────────────
  {
    id: "chatui-headless-shell-unpublished",
    title: "Headless UI prints regions only: no component, composer, `visible`, or chat shell",
    detail:
      "headless-simple has no Code tab; its wrapper, `visible` filter and composer are harness glue. headless-complete's chat shell is glue reusing the minimal example's hooks + send().",
    severity: "degraded",
    docPath: `${D}/custom-look-and-feel/headless-ui`,
    routes: ["/custom-look-and-feel/headless-ui"],
  },
  {
    id: "chatui-headless-bubble-deps",
    title: "Bubbles use Avatar, AvatarFallback, cn, MultimodalPart, Attachment, AttachmentChip, ActivityWrapper without defining them",
    detail:
      "Minimal glue in demo-chat/glue-ui.tsx; shadcn theme utilities (bg-muted, bg-primary, …) given values by demo-chat/glue.css since this app has no shadcn theme.",
    severity: "note",
    docPath: `${D}/custom-look-and-feel/headless-ui`,
    routes: ["/custom-look-and-feel/headless-ui"],
  },
  {
    id: "chatui-headless-no-tools",
    title: "Tool-call and activity branches have nothing to render",
    detail:
      "Prose calls renderToolCall / renderActivityMessage, but prints no backend tools, no useRenderTool/useComponent renderers and no MCP Apps runtime. The Code tab has them (headless_complete.py, 4 tool cards, an MCP route); not added (prose first). The branches are wired and idle.",
    severity: "degraded",
    docPath: `${D}/custom-look-and-feel/headless-ui`,
    routes: ["/custom-look-and-feel/headless-ui"],
  },
  {
    id: "chatui-headless-langgraph-residue",
    title: "Headless example logs \"[langgraph-python:headless-simple]\"",
    detail: "Another framework's tag in the OpenAI Agents page; kept verbatim. The UserBubble block is also labelled message-assistant.tsx.",
    severity: "note",
    docPath: `${D}/custom-look-and-feel/headless-ui`,
    routes: ["/custom-look-and-feel/headless-ui"],
  },
  // ── reasoning ─────────────────────────────────────────────────────────────
  {
    id: "chatui-reasoning-no-backend",
    title: "No reasoning-capable agent is printed",
    detail:
      "Both reasoning pages only say models like gpt-6-luna emit reasoning tokens; the Quickstart agent sets no reasoning settings, so no REASONING_* events would arrive. reasoning.py is from the Code tab; REASONING_MODEL and reasoning_settings() (unpublished _common) are harness glue: env REASONING_MODEL (default MODEL) and ModelSettings(reasoning=Reasoning(summary=\"auto\")). Mounted as agent `reasoning` on /api/harness (runtime URL swapped from /api/copilotkit, labelled).",
    severity: "degraded",
    docPath: `${D}/generative-ui/reasoning`,
    routes: ["/custom-look-and-feel/reasoning-messages", "/generative-ui/reasoning"],
  },
  {
    id: "chatui-reasoning-block-not-on-page",
    title: "Reasoning Messages renders ReasoningBlock without printing it",
    detail: "Printed in full on Generative UI → Reasoning (and in the Code tab); the harness shares that file.",
    severity: "note",
    docPath: `${D}/custom-look-and-feel/reasoning-messages`,
    routes: ["/custom-look-and-feel/reasoning-messages"],
  },
  {
    id: "chatui-reasoning-h-screen",
    title: "Reasoning regions use h-screen",
    detail: "Changed to h-full (labelled) so the composer is not cut off under the demo bar.",
    severity: "note",
    docPath: `${D}/generative-ui/reasoning`,
    routes: ["/custom-look-and-feel/reasoning-messages", "/generative-ui/reasoning"],
  },
  // ── multimodal ────────────────────────────────────────────────────────────
  {
    id: "chatui-multimodal-helpers-undefined",
    title: "uploadToStorage, currentUser, toast and the /api/upload route are not defined",
    detail:
      "Harness stubs: uploadToStorage posts to /api/upload and returns its url; /api/upload returns the file as a data: URL (no storage); currentUser is a fixed id; toast.error logs and alerts.",
    severity: "degraded",
    docPath: `${D}/multimodal-attachments`,
    routes: ["/multimodal-attachments"],
  },
  {
    id: "chatui-multimodal-base64-overflow",
    title: "Base64 onUpload overflows the stack on large files",
    detail: "String.fromCharCode(...new Uint8Array(buffer)) passes every byte as an argument; multi-MB files throw RangeError. Kept verbatim.",
    severity: "degraded",
    docPath: `${D}/multimodal-attachments`,
    routes: ["/multimodal-attachments"],
  },
  {
    id: "chatui-multimodal-concurrency-return",
    title: "Concurrency block returns a URL string from onUpload",
    detail:
      "`onUpload: async (file) => uploadToStorage(file)` — the metadata block uses the same helper as a URL string, but onUpload must return { type, value, mimeType }. Kept behind @ts-expect-error.",
    severity: "degraded",
    docPath: `${D}/multimodal-attachments`,
    routes: ["/multimodal-attachments"],
  },
  // ── voice ─────────────────────────────────────────────────────────────────
  {
    id: "chatui-voice-voicechat-unpublished",
    title: "VoiceChat is rendered but never published",
    detail:
      "Neither prose nor Code tab has voice-chat.tsx. Harness glue follows the prose description: CopilotChat + SampleAudioButton writing into [data-testid=\"copilot-chat-textarea\"] via the native setter and an input event. The sample phrase is glue. SampleAudioButtonProps is from the Code tab.",
    severity: "degraded",
    docPath: `${D}/voice`,
    routes: ["/voice"],
  },
  {
    id: "chatui-voice-backend-path",
    title: "Voice route calls ${AGENT_URL}/voice; the printed backend serves /agent",
    detail:
      "Harness glue mounts the Quickstart's agent a second time at /voice. Separately, the route treats AGENT_URL as an origin while the Quickstart treats it as the full endpoint (…/agent): with the Quickstart value set, voice calls /agent/voice and 404s. Leave AGENT_URL unset or set it to the origin.",
    severity: "blocking",
    docPath: `${D}/voice`,
    routes: ["/voice"],
  },
  {
    id: "chatui-voice-packages",
    title: "@copilotkit/voice and openai 5.x are not in any install line",
    detail: "The page warns the openai copy must match @copilotkit/voice's ^5.9.0. Both installed (openai 5.23.2). The @ts-ignore comment points at a 'main route.ts' comment that is never printed.",
    severity: "note",
    docPath: `${D}/voice`,
    routes: ["/voice"],
  },
  // ── threads ───────────────────────────────────────────────────────────────
  {
    id: "chatui-threads-premium",
    title: "Threads need CopilotKit Intelligence (premium)",
    detail:
      "Set CPK_INTELLIGENCE_API_KEY (the variable both pages name). Without it /api/threads is built without `intelligence` (the server.ts comment's SSE fallback): the drawer shows its locked view and useThreads lists nothing; chat still works.",
    severity: "note",
    docPath: `${D}/prebuilt-components/copilot-threads-drawer`,
    routes: ["/prebuilt-components/copilot-threads-drawer", "/headless-threads"],
  },
  {
    id: "chatui-threads-runtime-unpublished",
    title: "No Threads page prints a route handler; server.ts leaves agent and verifyAppSession undefined",
    detail:
      "The drawer page only describes the server credential. Headless Threads prints the CopilotRuntime options (verbatim in lib/intelligence.ts). Harness glue: app/api/threads/[[...slug]] wraps them with createCopilotRuntimeHandler, registers ONE agent `default` = the Quickstart's agent, and verifyAppSession is a stub (fixed demo user or x-user-id header). The drawer blocks' runtimeUrl \"/api/copilotkit\" is swapped to /api/threads (labelled).",
    severity: "degraded",
    docPath: `${D}/headless-threads`,
    routes: ["/prebuilt-components/copilot-threads-drawer", "/headless-threads"],
  },
  {
    id: "chatui-drawer-use-client",
    title: "Drawer block with NewConversationButton lacks \"use client\"",
    detail: "An app/page.tsx that calls useCopilotChatConfiguration fails as a Server Component. Minimal labelled fix: \"use client\" added.",
    severity: "degraded",
    docPath: `${D}/prebuilt-components/copilot-threads-drawer`,
    routes: ["/prebuilt-components/copilot-threads-drawer"],
  },
  {
    id: "chatui-drawer-slot-children",
    title: "Drawer slot example passes children, but CopilotThreadsDrawerProps has none",
    detail: "<CopilotThreadsDrawer><span slot=\"header\">…</span></CopilotThreadsDrawer> is a type error in 1.87; kept behind @ts-expect-error.",
    severity: "degraded",
    docPath: `${D}/prebuilt-components/copilot-threads-drawer`,
    routes: ["/prebuilt-components/copilot-threads-drawer"],
  },
  {
    id: "chatui-drawer-research-agent",
    title: "agentId=\"research_agent\" example targets an unregistered agent",
    detail: "Shown as code only; the Threads runtime registers just `default`.",
    severity: "note",
    docPath: `${D}/prebuilt-components/copilot-threads-drawer`,
    routes: ["/prebuilt-components/copilot-threads-drawer"],
  },
  {
    id: "chatui-headless-threads-select",
    title: "ThreadSidebar takes no props, so App's onSelectThread never fires",
    detail:
      "Type error (behind @ts-expect-error) and a functional dead end: no thread can be selected, so the chat never switches. Also deleteThread unused and a stray `{}` after <CopilotChat />.",
    severity: "blocking",
    docPath: `${D}/headless-threads`,
    routes: ["/headless-threads"],
  },
  {
    id: "chatui-headless-threads-agent-ids",
    title: "Headless Threads uses my-agent in useThreads but registers default in server.ts",
    detail: "Swapped to `default` (labelled). The useAgent fragment's threadId is undefined; shown as code only. No provider is printed: glue <CopilotKitProvider runtimeUrl=\"/api/threads\">.",
    severity: "degraded",
    docPath: `${D}/headless-threads`,
    routes: ["/headless-threads"],
  },
];
