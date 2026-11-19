# CopilotKit + OpenAI Agents SDK (Python) Test Suite

A navigable, working test harness for every page of the CopilotKit **OpenAI Agents SDK (Python)** docs: one route per doc page, each running that page's code.

**Doc sync:** 2026-11-12 (from `doc-snapshot/manifest.json`; re-run on `/doc-sync`) · **CopilotKit:** `@copilotkit/*` 1.87.0, `@ag-ui/client` 1.0.2 · **Backend:** `openai-agents` 0.24, `ag-ui-openai-agents` 0.1.0 · **Status:** 2 ✅ · 43 ⚠️ · 1 ❌ · no CI.

---

## 1. Overview

CopilotKit talks to an [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/) agent over AG-UI. The adapter `ag-ui-openai-agents` wraps an SDK `Agent` in `OpenAIAgentsAgent` and serves it from FastAPI. This repo is a QA harness: every page listed in [§12](#12-references) gets a route with its status badge, its doc gaps, the code it runs (read from disk), and a full-screen live demo.

The harness tests what the docs actually print. Prose code is copied **verbatim, bugs included**. Anything the docs leave out is either taken from the page's demo **Code tab** (only what the feature needs) or written as minimal **harness glue**. Every such piece is labelled in the file and listed as a doc gap on its route.

Live docs tracked: <https://docs.copilotkit.ai/openai-agents-python>

## 2. Architecture

```
Browser (Next.js 16, React 19, @copilotkit/react-core/v2)
   │  CopilotKit provider(s)
   ▼
Copilot Runtime routes (frontend/src/app/api/*, @copilotkit/runtime/v2)
   │  HttpAgent → AG-UI over HTTP/SSE
   ▼
FastAPI agent server (backend/, Python, port 8000)
   │  OpenAIAgentsAgent(Agent(...)) per endpoint
   ▼
OpenAI (Responses API via the Agents SDK)
```

- **Backend: Python / FastAPI** (the Quickstart's choice).
  - `backend/main.py` is the Quickstart's file, unchanged. It serves the **shared agent** at `/agent`, and every page that needs no backend config uses it (frontend id `openai_agent`).
  - `backend/server.py` (harness glue) takes that same `app` and mounts each page-specific agent from `backend/demo_agents/` at `/<agent-id>`, using the same `add_openai_agents_fastapi_endpoint` call.
- **Runtimes**
  - `/api/copilotkit` is the Quickstart's single-route runtime, verbatim.
  - `/api/harness` (glue) registers every agent and is the root provider's runtime.
  - Pages that print their own runtime options (A2UI, MCP Apps, Open Generative UI, voice transcription, Intelligence threads, generative-UI components) get their own `/api/<name>` route with those options verbatim.
- **One Inspector per page.** Demos that mount their own `<CopilotKit>` list their path in `nestedProviderPaths`, and the root provider's Inspector stands down there.

## 3. Prerequisites

- Node.js 20+ (developed on 24.16, npm 12)
- Python 3.10+ and [`uv`](https://docs.astral.sh/uv/) (the Quickstart's prerequisites)
- An OpenAI API key
- Optional:
  - a CopilotKit Intelligence licence key, for the Threads routes
  - an OpenAI key for voice transcription (it can be the same key)

## 4. Setup

```bash
git clone <this repo> openai-agents-sdk-py && cd openai-agents-sdk-py

# frontend
cd frontend && npm install && cd ..
#   (npm 12 may refuse with EALLOWREMOTE; use: npm install --allow-remote=all)

# backend
cd backend && uv sync && cd ..

# env, twice: each process reads its own file
cp .env.example backend/.env
cp .env.example frontend/.env.local
```

| Variable | File | What it does |
|---|---|---|
| `OPENAI_API_KEY` | `backend/.env` | **Required.** The Agents SDK's OpenAI client reads it. |
| `OPENAI_BASE_URL` | `backend/.env` | Optional. Sends model calls to another OpenAI-compatible server (Quickstart). |
| `MODEL` | `backend/.env` | Optional. Model for every page-specific agent; defaults to `gpt-6-luna`, the literal the Components page prints. The Quickstart's own agent sets no model and uses the SDK default. |
| `REASONING_MODEL` | `backend/.env` | Optional. Model for the two reasoning pages; defaults to `MODEL`. It must stream reasoning summaries. |
| `AGENT_URL` | `frontend/.env.local` | **Leave unset.** The Quickstart route reads it as the full endpoint (`…/agent`), the Voice route as an origin. The defaults work for both. |
| `CPK_INTELLIGENCE_API_KEY` | `frontend/.env.local` | Optional. Unlocks the Threads Drawer and Headless Threads. Without it they show their locked state. |
| `OPENAI_TRANSCRIPTION_API_KEY` / `OPENAI_TRANSCRIPTION_BASE_URL` | `frontend/.env.local` | Optional. Voice transcription. Without the key the mic button is hidden. |
| `MCP_SERVER_URL` | `frontend/.env.local` | Optional. MCP Apps server; defaults to the one the page prints. |
| `NEXT_PUBLIC_COPILOTKIT_INSPECTOR` | `frontend/.env.local` | `off` disables the Inspector everywhere. |

Ports: **frontend 3000**, **backend 8000**.

## 5. Running

Two terminals:

```bash
# 1 — agent server (Quickstart command, but server.py instead of main.py to mount every agent)
cd backend
uv run --env-file .env uvicorn server:app --reload --host 0.0.0.0 --port 8000
#   → "Uvicorn running on http://0.0.0.0:8000"
curl http://localhost:8000/agent/health   # {"status":"ok","agent":{"name":"assistant"}}
curl http://localhost:8000/health         # lists all 17 mounted agent paths

# 2 — frontend
cd frontend
npm run dev
#   → "Local: http://localhost:3000"
```

Open <http://localhost:3000>. Each route has an **Open demo ↗** button that opens its live demo full-screen at `<route>/demo-chat`.

`uv run … uvicorn main:app` (the Quickstart's exact command) also works, but only `/quickstart` will have an agent behind it.

## 6. How to read a route

1. **Status badge.**
   - ✅ Working: checked end to end.
   - ⚠️ Partial: built, but not yet checked in a browser, or partly blocked.
   - ❌ Broken: the doc code fails by design, and the reason is stated.
2. **Doc gaps** (red panel). Each entry is either something the page omits or gets wrong, or a label for code this repo supplied:
   - *harness glue*: written by this repo, with no doc source.
   - *from Code tab*: taken from the page's demo Code tab.
3. **What it demonstrates / Try it.** Gives prompts to try, what success looks like, and what failure looks like.
4. **The code**, read live from disk. Verbatim doc regions are fenced by `── doc: … (verbatim) ──` comments.

## 7. What to expect — walkthrough per route

### Chat UI, Threads

#### `/quickstart` — Quickstart
- **Demonstrates:** the Quickstart's four printed files running unmodified: FastAPI agent at `/agent`, single-route runtime at `/api/copilotkit`, the layout's `<CopilotKit agent="openai_agent">` around a `<CopilotSidebar>` page (layout mounted inside the demo route, since the harness owns the root layout).
- **Try:** open the demo, type `Tell me in one sentence what this app can do.`
- **Success:** sidebar answers with a streamed sentence; Inspector → Agents lists the agent, AG-UI Events move.
- **Failure:** error banner / no reply → backend not on :8000 (`curl http://localhost:8000/agent/health`) or `OPENAI_API_KEY` missing.

#### `/prebuilt-components/chat` — CopilotChat
- **Demonstrates:** an inline `<CopilotChat>` under the page's own `<CopilotKit>` provider.
- **Try:** `Write a three-item list of tips for naming variables.`
- **Success:** chat fills the demo, reply streams and renders as a Markdown list.
- **Failure:** "Agent not found" or silent chat → agent id not registered on `/api/copilotkit`.

#### `/prebuilt-components/sidebar` — CopilotSidebar
- **Demonstrates:** the chat docked beside app content, open on load (`defaultOpen`).
- **Try:** `What is a sidebar copilot good for?`
- **Success:** sidebar open at load, placeholder app body still visible, reply streams, X collapses it to a launcher.
- **Failure:** sidebar starts closed or never replies.

#### `/prebuilt-components/popup` — CopilotPopup
- **Demonstrates:** a floating chat window with a custom composer placeholder.
- **Try:** `Say hello in one sentence.`
- **Success:** popup open on load, placeholder "Ask the popup anything...", closing leaves the bubble.
- **Failure:** default placeholder (labels ignored) or no reply.

#### `/prebuilt-components/chat-controls` — Open, close, and feedback
- **Demonstrates:** owning the sidebar's open state, opening it via `setModalOpen` from your own buttons, and thumbs up/down callbacks.
- **Try:** tab 1 click "Ask the assistant", close with X, click again; tab 2 click "Open chat"; tab 3 ask `Give me a fun fact` then thumbs-up the reply.
- **Success:** sidebar follows your button and its own X; tab 2 buttons open/close it; tab 3 log shows `feedback {"messageId":"…","value":"up"}`.
- **Failure:** buttons do nothing (tab 2 = modal state owned by a different provider — record as discrepancy), or thumbs log nothing.

#### `/custom-look-and-feel/css` — CSS Customization
- **Demonstrates:** a scoped stylesheet re-skinning the chat, global `[data-copilotkit]` tokens and `copilotKit*` class rules, plus `labels`/`icons` props.
- **Try:** theme tab: `Hello — describe yourself in two sentences.`; labels tab: look before typing.
- **Success:** parchment background, serif type, your message as a mono card with copper left rule and "→"; labels tab shows "Hello! How can I help you today?" / "Ask me anything!".
- **Failure:** default CopilotKit look (theme selectors don't match the v2 DOM) or default labels. The `icons` tab is expected to show no change (v1 prop).

#### `/custom-look-and-feel/slots` — Slots
- **Demonstrates:** replacing chat sub-parts by class string, props object or component, including nested assistant-message slots and a full custom message view.
- **Try:** "component slots" tab — look, then send `hi`; "custom messageView" tab — `Tell me a joke`.
- **Success:** dashed WelcomeScreen / Disclaimer / AssistantMessage markers; custom view shows plain left/right text and "Thinking...".
- **Failure:** default welcome screen / bubbles.

#### `/custom-look-and-feel/markdown` — Markdown Rendering
- **Demonstrates:** the Markdown renderer slot: per-element overrides, class string, plain-text replacement.
- **Try:** `Reply with a level-2 markdown heading "Links" and a markdown link to https://copilotkit.ai`
- **Success:** components tab — magenta ruled uppercase heading, magenta wavy link; PlainText tab — raw `##` and `[..](..)`.
- **Failure:** normal styling in components tab, rendered Markdown in PlainText tab.

#### `/custom-look-and-feel/headless-ui` — Headless UI
- **Demonstrates:** a chat with no CopilotKit UI (useAgent + runAgent + the page's own bubbles), and the page's full message list in a glue shell.
- **Try:** `Give me a markdown list of three fruits`
- **Success:** blue right bubble with user avatar, grey left bubble with bot avatar and a rendered list; no CopilotKit chrome.
- **Failure:** nothing after Send (console "runAgent failed"), or the reply only appears after reload. Tool/activity branches never fire (no tools printed) — expected.

#### `/custom-look-and-feel/reasoning-messages` — Reasoning Messages
- **Demonstrates:** the reasoning card customised by header / content sub-slots, a whole-card component, and a render-prop layout.
- **Try:** `A bat and a ball cost $1.10 together; the bat costs $1 more than the ball. How much is the ball?`
- **Success:** a reasoning card precedes the answer in each tab (default "Thinking…/Thought for N seconds"; 🧠→💡 header; grey mono content with ▊; tagged "Reasoning" banner; yellow box).
- **Failure:** answer only, no card → the model emitted no reasoning (set `REASONING_MODEL` to a reasoning model with summaries).

#### `/multimodal-attachments` — Multimodal Attachments
- **Demonstrates:** attachments in the composer, restrictions, custom upload (base64 / URL), metadata, concurrency, failure callbacks.
- **Try:** "enabled" tab: attach a small image and ask `What is in this image?`; "onUploadFailed" tab: attach a PDF.
- **Success:** thumbnail in your message and a description of the image; PDF refused with an alert.
- **Failure:** model says it sees no image, or RUN_ERROR (non-vision model). Base64 tab with a multi-MB file throws RangeError (doc bug); concurrency tab's upload is malformed (doc bug).

#### `/voice` — Voice
- **Demonstrates:** a runtime with a transcription service so the composer shows a mic; a sample button fills the composer without a mic.
- **Try:** click the mic and say `What is two plus two?`; or "Try a sample audio" then Send.
- **Success:** mic visible; transcript is sent and answered; sample text appears in the composer and is answered.
- **Failure:** no mic → `OPENAI_TRANSCRIPTION_API_KEY` unset; run 404 → `AGENT_URL` set to the Quickstart's `…/agent` (unset it).

#### `/generative-ui/reasoning` — Reasoning
- **Demonstrates:** live reasoning in the chat: built-in card vs the page's `ReasoningBlock` whole-card replacement.
- **Try:** `Plan a 3-stop trip from Paris to Rome to Vienna and explain the order you chose.`
- **Success:** custom tab — lilac "REASONING" pill with "Thinking…" and italic text, then "Agent reasoning"; default tab — built-in card.
- **Failure:** no card in either tab → no reasoning emitted (REASONING_MODEL).

#### `/prebuilt-components/copilot-threads-drawer` — Threads Drawer
- **Demonstrates:** the prebuilt thread list beside a chat or sidebar: switch/start/archive threads, controlled selection, CSS parts and header slot.
- **Try:** drawer+chat tab: `Remember the word pineapple`, New Conversation, `hello`, then click the first thread.
- **Success:** two threads listed; selecting the first replays the pineapple exchange. "::part + slot" tab: header "My conversations", no new-thread button.
- **Failure:** locked view with Upgrade (no/invalid `CPK_INTELLIGENCE_API_KEY` — expected without premium), or selection doesn't switch the chat.

#### `/headless-threads` — Headless Threads
- **Demonstrates:** a hand-built thread list from `useThreads` (rename, archive, pagination) beside `<CopilotChat threadId>`, on an Intelligence runtime with per-user scoping.
- **Try:** send `hello`, reload the demo, click Rename / Archive.
- **Success:** a row appears; Rename → "Renamed"; Archive removes it; the pagination column shows the count.
- **Failure:** empty list / "Loading..." forever with a key set. Clicking a thread does nothing — expected (doc bug: ThreadSidebar never selects).

---

### App Control & Generative UI

#### App Control

**`/frontend-tools`** — demo: `/frontend-tools/demo-chat`
- Demonstrates: a tool implemented in the browser (`change_background`) that the agent can call; the handler updates React state and its return value goes back to the model.
- Try: "Change the background to a warm sunset gradient".
- Success: the demo area repaints within a second, the `background:` label in the corner shows the new CSS value, and the agent confirms in one line.
- Failure: the agent describes a gradient but nothing repaints, or the run errors.

#### Generative UI · Controlled

**`/generative-ui/tool-based`** — demo: `…/demo-chat`
- Demonstrates: a React bar chart registered with `useComponent`; the model calls it by filling the chart's Zod props and the chart renders inline.
- Try: "Show me a bar chart of quarterly revenue".
- Success: a titled bar chart card with coloured bars appears in the chat, plus a one-line note that the values are illustrative.
- Failure: numbers come back as text, or the agent asks for data. Asking for a *pie* chart is expected to fall back to text, because the page never registers `render_pie_chart`.

**`/generative-ui/tool-rendering`** — four demos: `…/demo-chat` (per-tool), `…/demo-chat/default-catchall`, `…/demo-chat/custom-catchall`, `…/demo-chat/display`
- Demonstrates: Python tool calls painted in the chat by frontend renderers: one per tool name, CopilotKit's built-in wildcard card, a custom wildcard card, and grouped display modes.
- Try: "What's the weather in Tokyo?", "Find flights to JFK", "Roll a d20 and get the stock price of AAPL".
- Success: the per-tool demo shows a weather card (68°F, Sunny) and a three-flight list. The default catch-all shows the built-in card going from Running to Done. The custom catch-all shows a violet card with the name, arguments and result. In the display demo, consecutive calls collapse into one line or into the blue Timeline.
- Failure: only the text summary appears, cards stay in the loading state, or the run errors.

**`/generative-ui/state-rendering`** — demo: `…/demo-chat`
- Demonstrates: a document panel driven by agent state. A subclass of `OpenAIAgentsAgent` turns each streamed tool-argument chunk into a `STATE_DELTA`, so the text grows while the model is still writing.
- Try: "Write a short poem about autumn".
- Success: a red LIVE badge shows, the text grows a few words at a time (the character counter climbs), and then the chat gives a one-sentence reply.
- Failure: the document appears all at once at the end, stays empty, or is pasted into the chat instead.

#### Generative UI · A2UI

**`/generative-ui/a2ui/dynamic-schema`** — demo: `…/demo-chat` (own runtime `/api/copilotkit-declarative-gen-ui`)
- Demonstrates: the model composes an A2UI surface from a custom catalog (Card, StatusBadge, Metric, InfoRow, PrimaryButton, plus the basic primitives). The provider's catalog alone switches A2UI on and injects the tool. The backend is the shared agent.
- Try: "Show a KPI dashboard for an online store: revenue, orders and conversion rate".
- Success: a rendered card built from catalog components (metric tiles, status pills) appears instead of text or JSON.
- Failure: a plain-text or raw-JSON reply, a tool call with no surface, or a tool-argument parse error.

**`/generative-ui/a2ui/fixed-schema`** — demo: `…/demo-chat` (own runtime `/api/a2ui-fixed-schema`). **Broken as published.**
- Demonstrates: a backend tool (`display_flight`) that returns a pre-authored flight card as `a2ui_operations`. A2UI is enabled on the runtime with injection turned off.
- Try: "Show me a United flight from SFO to JFK for $289".
- Expected today: the agent calls `display_flight` once and replies in one sentence, but the flight card does **not** render with the custom catalog, because the provider receives `myCatalog`, which is undefined (doc bug). If the full card (SFO → JFK, UNITED badge, Total $289, Book button) renders, the doc has been fixed: update the status.
- Failure (beyond the known bug): no tool call, a run error, or raw JSON printed as text.

#### Generative UI · Bring your own

**`/generative-ui/json-render`** — demo: `…/demo-chat`
- Demonstrates: the agent replies with a `{ root, elements }` JSON spec. A custom assistant-message slot parses it and renders it through a `@json-render/react` registry (MetricCard, BarChart, PieChart).
- Try: "Show me Q3 revenue with a bar chart by month".
- Success: when the reply finishes, a metric card and/or chart replaces the assistant bubble.
- Failure: the raw JSON stays visible, or the message is blank or errors.

**`/generative-ui/hashbrown`** — demo: `…/demo-chat` (own runtime `/api/copilotkit-declarative-hashbrown`)
- Demonstrates: the same idea, but streaming. Hashbrown parses a `{ ui: [...] }` envelope while it arrives and renders the components one by one.
- Try: "Show me a sales dashboard with revenue, a pie chart by segment and the top 3 deals".
- Success: components appear progressively during the stream, and no raw JSON is left at the end.
- Failure: raw JSON stays in the bubble, or Hashbrown logs errors in the console.

#### Generative UI · MCP Apps & Open Generative UI

**`/generative-ui/mcp-apps`** — demo: `…/demo-chat` (own runtime `/api/copilotkit-mcp-apps`)
- Demonstrates: the runtime connects to an MCP server (Excalidraw). Tools with UI resources render as sandboxed iframes inside the chat. The backend is the shared agent.
- Try: "Draw a simple flowchart in Excalidraw: Start → Process → End".
- Success: an embedded Excalidraw canvas with the shapes and arrows appears inline, followed by a short reply.
- Failure: a text-only reply, a tool call with no iframe, or a run error (check that `https://mcp.excalidraw.com/mcp` is reachable, or set `MCP_SERVER_URL`).

**`/generative-ui/open-generative-ui`** — demos: `…/demo-chat` (minimal), `…/demo-chat/advanced` (own runtime `/api/copilotkit-ogui`)
- Demonstrates: the agent writes HTML/CSS through the `generateSandboxedUi` frontend tool, and the result renders in a sandboxed iframe. In the advanced demo, the iframe calls host functions (`evaluateExpression`, `notifyHost`).
- Try: "Use generateSandboxedUi to build an animated visualisation of a sine wave". In the advanced demo: "Use generateSandboxedUi to build a calculator whose = button calls evaluateExpression".
- Success: a placeholder appears while the HTML streams, then an interactive widget. In the advanced demo, pressing = shows the host's result, and the console logs `[open-gen-ui/advanced] evaluateExpression …`.
- Failure: a prose reply or HTML pasted as text (the shared agent has no prompt that forces the tool, so name it explicitly), a blank iframe, or a dead button.

### Generative UI · Components and surfaces

All demos open at `<route>/demo-chat`, mount their own nested `CopilotKitProvider` (runtime `/api/genui`, or `/api/genui-transports` for Transports) and talk to the backend agents `genui_components` (registered as `default`: the overview's swapped OpenAI Agents SDK agent) or `genui_shop` (same agent + a glue `search_products` tool with fake products).

#### `/generative-ui/components` — Components and surfaces
- **Demonstrates:** with the standard catalog on the provider, the runtime gives the agent a `render_ui` tool and the agent answers with real components in the chat.
- **Try:** "Compare the Starter, Team, and Enterprise plans in a table", then "add a column for support".
- **Success:** a Table component streams into the chat; the follow-up edits that table in place. **Failure:** a markdown/plain-text table, or a render_ui error (tools/context did not reach the agent).

#### `/generative-ui/components/surfaces` — Surfaces
- **Demonstrates:** named page areas (`GenerativeUISurface`) that the chat can fill, restrict, replace and clear.
- **Try:** "Show me cheap running shoes in the featured row", then "Show the featured products again".
- **Success:** the fallback product row is replaced by a ProductGrid of ProductCards (from search_products), then restored. **Failure:** the grid appears in the chat instead of the featured row.

#### `/generative-ui/components/catalogs` — Catalogs
- **Demonstrates:** typed catalogs (component + description + props schema), zod/Valibot props, `extends`, `parameterOrder`, and the A2UI 1.0 export.
- **Try:** (shopUI tab) "Show me three running shoes as product cards"; open the exportA2UICatalog tab.
- **Success:** ProductCards whose values match the tool result; export shows Panel order `component, title, children, color`. **Failure:** standard components appear on shopUI, or a different parameter order.

#### `/generative-ui/components/standard-catalog` — Standard catalog
- **Demonstrates:** `standardUI` as is, extended, trimmed with `.omit()`, and with `Card` overridden.
- **Try:** "Show the Eiffel Tower and the Louvre on a map" on the standardUI and omit tabs; "Put a short summary of our three plans in a card" on overrides.
- **Success:** a real map on standardUI, no Map on omit, MyCard styling on overrides. **Failure:** Map renders on the omit tab.

#### `/generative-ui/components/state-and-actions` — State and actions
- **Demonstrates:** props bound to live app state, browser-side functions on click, clicks sent to the agent, writable props.
- **Try:** click "+ p1" twice, then "show a product card for p1 Trail Runner"; on Run-code tab, add p3 via the card's button.
- **Success:** "In cart: 2" updates live as the cart changes; Add to cart updates the cart with no agent message. **Failure:** inCart stays 0 / the click sends a message.

#### `/generative-ui/components/theming` — Theming
- **Demonstrates:** `--a2ui-*` theme variables from the provider, a typed theme file, per-mode colors, map style, CSS.
- **Try:** "Show a card with a primary button, a slider, and a bar chart of three months"; toggle dark on the per-mode tab.
- **Success:** amber (#d97706) accent; dark panels when toggled. Map tab has no basemap (placeholder URLs — expected). **Failure:** default accent.

#### `/generative-ui/components/transports` — Transports
- **Demonstrates:** tool transport vs markdown transport, runtime `generativeUI: true`, provider `agentIds`.
- **Try:** "Compare the Starter, Team, and Enterprise plans in a table" on each tab.
- **Success:** Table via a render_ui call (tool), Table inline in the reply text (markdown), no component on the agentIds tab (default is not in `["shop"]`). **Failure:** plain text tables on the first two tabs.

#### `/generative-ui/components/markdown-mode` — Markdown mode
- **Demonstrates:** UI written as ```a2ui fences inside the reply; `sendContext: false` moves the prompt to the backend.
- **Try:** "Give me a seat-count slider that shows the monthly price at $29 per seat".
- **Success:** markdown tab renders a Card with a Slider and price inline. sendContext: false tab shows no UI (expected broken). **Failure:** raw a2ui JSON in the text on the markdown tab.

#### `/generative-ui/components/from-a2ui` — Adopt from A2UI
- **Demonstrates:** the A2UI-renderer → A2UI 1.0 migration; the After catalog runs, the Before code is shown.
- **Try:** "Show a flight card from SFO (San Francisco) to JFK (New York) with a Book button".
- **Success:** Airport → Arrow → Airport plus a Button. **Failure:** only standard Text for the airport codes.

### Shared State, Human in the Loop, WebMCP, Multi-Agent

#### Shared State — `/shared-state` (demo: `/shared-state/demo-chat`)
- **What it demonstrates:** The page and the agent edit one state object. A preferences form writes it with `agent.setState`. The agent sees it through `with_state` dynamic instructions and writes `notes` back with its `set_notes` tool.
- **Try:** in the form, set Name = Ada and Language = French, then ask "Hi, who am I?". Then ask "Remember that I prefer short answers and I'm learning Rust."
- **Success:** the reply uses Ada and is in French. The Agent Scratch pad fills with numbered notes while the run is still going. Clear empties it.
- **Failure:** the agent ignores the form (state is not reaching the run), or the notes appear only in the chat text (no STATE_SNAPSHOT).

#### Render state in your app — `/shared-state/rendering-in-app` (demos: `/demo-chat`, `/demo-chat/write-back`)
- **What it demonstrates:** A canvas in the main view seeds `agent.state` with a title and checklist and renders from it via `useAgent()`. A sidebar chat talks to the same "default" agent. The write-back demo adds `toggleItem`.
- **Try:** "What's on my checklist, and what is still open?". In write-back, tick "Build a prototype", then ask "What's left?".
- **Success:** "Project launch" appears with "Research user needs" struck through. The agent lists both items. Ticking strikes the item through right away, and the next answer reflects it.
- **Failure:** the canvas stays on "Untitled" with no items, or the console shows "Agent default not found" (the `/api/state-hitl-default` runtime is not reachable).

#### State streaming — `/shared-state/streaming` (demo: `/shared-state/streaming/demo-chat`)
- **What it demonstrates:** `DocumentStreamingAgent` turns `write_document`'s partial tool arguments into `STATE_DELTA` events, so the document grows token by token.
- **Try:** "Write a 300-word short story about a lighthouse keeper."
- **Success:** a LIVE badge shows, and the text and character count grow while the model writes. The chat reply is one short sentence.
- **Failure:** the whole document appears at once at the end (no STATE_DELTA), or "Agent shared_state_streaming not found" (the gen-ui group's mount is missing).

#### Agent Read-Only Context — `/shared-state/agent-readonly` (demo: `/shared-state/agent-readonly/demo-chat`)
- **What it demonstrates:** Three `useAgentContext` values (name, timezone, recent activity) reach the agent's instructions. The agent can read them and cannot write them back.
- **Try:** "What's my name and what time zone am I in?". Change the name, untick some activities, then ask "What did I do recently?".
- **Success:** the answers follow the current form values (Atai / America/Los_Angeles first).
- **Failure:** the agent doesn't know your name (no `context` in the RunAgentInput).

#### Human in the Loop — `/human-in-the-loop` (demo: `/human-in-the-loop/demo-chat`)
- **What it demonstrates:** Pattern 1. A frontend `book_call` tool registered with `useHumanInTheLoop` pauses the agent on a time-picker card in the chat, and the pick goes back as the tool result.
- **Try:** "Please book an intro call with the sales team to discuss pricing."
- **Success:** a "Book a call" card with four slots appears. Picking one shows "Booked for …" and the agent confirms. "None of these work" cancels.
- **Failure:** a text reply with no card (the frontend tool did not reach the run), or the buttons stay disabled.

#### Pausing the Agent (useInterrupt) — `/human-in-the-loop/useInterrupt` (demos: `/demo-chat`, `/demo-chat/multi`)
- **What it demonstrates:** A `needs_approval` backend tool ends the run as an AG-UI interrupt. `useInterrupt` renders Approve/Cancel in the chat, and `resolve`/`cancel` resume it.
- **Try:** "Book an intro call with the sales team to discuss pricing."
- **Success:** "Approve call to schedule_meeting?" appears with buttons and the run stops. After Approve, the run resumes and the agent says **no time was picked, so nothing was scheduled**. That is the expected verbatim result. On `/multi`, Approve sends `{ok:true}` and the agent reports the call was not approved (also expected).
- **Failure:** no buttons and a direct answer (no interrupt reached the client), or clicks do nothing (resolve did not start a resume run).

#### Headless Interrupts — `/human-in-the-loop/headless` (demo: `/human-in-the-loop/headless/demo-chat`)
- **What it demonstrates:** `useInterrupt({ renderInChat: false })` returns the picker element, and the page places it in its own panel. This is the Code tab's demo; the page prints no code.
- **Try:** "Schedule a 1:1 with Alice next week to review Q2 goals."
- **Success:** a "Pick a time" dialog appears in the left panel (not in the chat) with the topic and attendee. Picking a slot makes the agent confirm that exact time.
- **Failure:** the left panel stays on "Nothing scheduled yet" while the chat stops, or the agent says no time was picked.

#### Governed Action Approval UI — `/human-in-the-loop/governed-actions` (demos: `/demo-chat`, `/demo-chat/tool`)
- **What it demonstrates:** One approval card for a GovernedAction envelope (allow / deny / require_approval), wired as a useInterrupt renderer and as a useHumanInTheLoop tool.
- **Try (tool demo):** "Before sending a welcome email to bob@example.com, call approve_governed_action with id 'act-1', summary 'Send welcome email', tool 'send_email', reference 'policy/email-7', verdict 'require_approval' and the email as arguments." Then repeat with verdict 'deny'.
- **Success:** a "User approval required" card with the summary, reference and JSON arguments, plus Approve and run / Reject. The agent reports your decision. With `deny`, the card blocks on its own. In the interrupt demo, **no card appears** (expected: broken by design).
- **Failure:** the tool demo answers in text without a card (the frontend tool was not registered).

#### WebMCP — `/webmcp` (demos: `/demo-chat`, `/demo-chat/core-only`)
- **What it demonstrates:** A frontend tool with a `webmcp` option is offered to the in-app agent and to the browser's `navigator.modelContext`. One demo uses `useFrontendTool`, the other a bare `CopilotKitCore`.
- **Try:** "Which of my orders have shipped?"
- **Success:** the agent calls `searchOrders` and answers "USB-C dock" (stub data). The banner says whether the browser has WebMCP. In Chrome 149+ with WebMCP turned on, the Model Context Tool Inspector lists `searchOrders`.
- **Failure:** the agent can't look up orders (the tool is not registered), or a ReferenceError for `searchOrders`.

#### Sub-Agents — `/multi-agent/subagents` (demo: `/multi-agent/subagents/demo-chat`)
- **What it demonstrates:** A supervisor calls research, writing and critique sub-agents as tools, one per model call. Each delegation is added to shared `delegations` and shown in a live log.
- **Try:** "Write a short blog post about the history of the bicycle."
- **Success:** "Supervisor running" shows. Entries #1 Research, #2 Writing and #3 Critique arrive one at a time with task and output, the count reads "3 calls", and the chat ends with the final draft.
- **Failure:** the log stays empty (no STATE_SNAPSHOT), or all entries arrive at once at the end.

## 8. Testing checklist / current status

No route has been exercised in a browser yet. Every ⚠️ means "built, type-checks, not yet checked". Promote a row to ✅ once you've seen it work.

| Doc page | Route | Status | Notes |
|---|---|---|---|
| Introduction | `/` | ✅ Working | Landing page: architecture, route list, backend glue. |
| Quickstart | `/quickstart` | ⚠️ Partial | Built, not yet checked in a browser. Doc root layout mounted inside the demo route. |
| CopilotChat | `/prebuilt-components/chat` | ⚠️ Partial | Not browser-checked. agentic_chat → openai_agent. |
| CopilotSidebar | `/prebuilt-components/sidebar` | ⚠️ Partial | Not browser-checked. prebuilt-sidebar → openai_agent; MainContent placeholder. |
| CopilotPopup | `/prebuilt-components/popup` | ⚠️ Partial | Not browser-checked. prebuilt-popup → openai_agent; MainContent placeholder. |
| Open, close, and feedback | `/prebuilt-components/chat-controls` | ⚠️ Partial | Not browser-checked. analytics.track stub. |
| CSS Customization | `/custom-look-and-feel/css` | ⚠️ Partial | Not browser-checked. Page + theme.css from Code tab; CopilotKitCSSProperties (v1 react-ui) shown only; `icons` not a v2 prop. |
| Slots | `/custom-look-and-feel/slots` | ⚠️ Partial | Not browser-checked. Extract truncated in doc; components from Code tab. |
| Markdown Rendering | `/custom-look-and-feel/markdown` | ⚠️ Partial | Not browser-checked. |
| Headless UI | `/custom-look-and-feel/headless-ui` | ⚠️ Partial | Not browser-checked. Tool/activity branches idle (no tools printed). |
| Reasoning Messages | `/custom-look-and-feel/reasoning-messages` | ⚠️ Partial | Not browser-checked. Code-tab reasoning.py; needs a reasoning model. |
| Multimodal Attachments | `/multimodal-attachments` | ⚠️ Partial | Not browser-checked. my-agent → openai_agent; upload helpers stubbed. |
| Voice | `/voice` | ⚠️ Partial | Not browser-checked. Needs OPENAI_TRANSCRIPTION_API_KEY; AGENT_URL must be unset/origin. |
| Reasoning (Generative UI) | `/generative-ui/reasoning` | ⚠️ Partial | Not browser-checked. Shares the reasoning agent. |
| Threads Drawer | `/prebuilt-components/copilot-threads-drawer` | ⚠️ Partial | Requires premium (CPK_INTELLIGENCE_API_KEY); locked view without. |
| Headless Threads | `/headless-threads` | ⚠️ Partial | Requires premium. Thread selection impossible (doc bug). |
| Frontend Tools | `/frontend-tools` | ⚠️ Partial | Built, not browser-checked. Uses the shared agent: the page's Python block is the chart agent (mis-embed). Background is glue. |
| Components as Tools | `/generative-ui/tool-based` | ⚠️ Partial | Built, not browser-checked. Bar chart only; the pie chart the prompt mentions is never published. |
| Tool Call Rendering | `/generative-ui/tool-rendering` | ⚠️ Partial | Built, not browser-checked. 4 demos. 3 of the 4 backend tools come from the Code tab. CustomCatchallRenderer, MyToolRow and ToolTimeline are glue. |
| State Rendering | `/generative-ui/state-rendering` | ⚠️ Partial | Built, not browser-checked. Agent, prompt and imports come from the Code tab; DemoLayout is glue. |
| A2UI · Dynamic Schema | `/generative-ui/a2ui/dynamic-schema` | ⚠️ Partial | Built, not browser-checked. Default auto-inject path on the shared agent. The page block is truncated (labelled fix). The opt-out path is LangGraph code (shown only). |
| A2UI · Fixed Schema | `/generative-ui/a2ui/fixed-schema` | ❌ Broken | The provider passes `myCatalog`, but catalog.ts exports `catalog`. Reproduced verbatim. |
| JSON Render | `/generative-ui/json-render` | ⚠️ Partial | Built, not browser-checked. 4 files come from the .md export; helpers and the agent come from the Code tab. |
| Hashbrown | `/generative-ui/hashbrown` | ⚠️ Partial | Built, not browser-checked. Runs on @hashbrownai 0.7.0; the page states 0.5.0-beta.4. |
| MCP Apps | `/generative-ui/mcp-apps` | ⚠️ Partial | Built, not browser-checked. Needs network access to mcp.excalidraw.com. The Intelligence variant is shown only. |
| Open Generative UI | `/generative-ui/open-generative-ui` | ⚠️ Partial | Built, not browser-checked. Minimal and advanced demos. The design skill is unpublished (commented out). |
| [Components and surfaces](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components) | `/generative-ui/components` | ⚠️ Partial | Built, not browser-checked. BuiltInAgent swapped for an OpenAI Agents SDK Agent (same prompt); runtime at `/api/genui`; root-layout provider mounted in the demo. |
| [Surfaces](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/surfaces) | `/generative-ui/components/surfaces` | ⚠️ Partial | Built, not browser-checked. Product/ProductRow/products glue; products tool glue; page.tsx export bug moved + "use client". |
| [Catalogs](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/catalogs) | `/generative-ui/components/catalogs` | ⚠️ Partial | Built, not browser-checked. Hero/Panel/cartUI glue; props.color kept under @ts-expect-error; fs export printed instead. |
| [Standard catalog](https://docs.copilotkit.ai/generative-ui/components/standard-catalog) | `/generative-ui/components/standard-catalog` | ⚠️ Partial | Built, not browser-checked. Framework-neutral URL only. ProductCard/productSchema glue. |
| [State and actions](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/state-and-actions) | `/generative-ui/components/state-and-actions` | ⚠️ Partial | Built, not browser-checked. Cart, ProductCard (state), PlanCard and fragment catalogs glue; agentOnly functions not callable in this version. |
| [Theming](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/theming) | `/generative-ui/components/theming` | ⚠️ Partial | Built, not browser-checked. Dark-mode script in demo body; placeholder map URLs. |
| [Transports](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/transports) | `/generative-ui/components/transports` | ⚠️ Partial | Built, not browser-checked. Undefined `agent` = overview agent; no shop agent defined, only the outside half of agentIds testable. |
| [Markdown mode](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/markdown-mode) | `/generative-ui/components/markdown-mode` | ⚠️ Partial | Built, not browser-checked. sendContext: false variant broken by design (Python fragment not runnable on OpenAIAgentsAgent). |
| [Adopt from A2UI](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/from-a2ui) | `/generative-ui/components/from-a2ui` | ⚠️ Partial | Built, not browser-checked. After runs; Before is reference only. Airport/Arrow glue. |
| [Shared State](https://docs.copilotkit.ai/openai-agents-python/shared-state) | `/shared-state` | ⚠️ Partial | Built, not browser-checked. The agent is the prose fragments, composed. The form, card primitives and types are glue. |
| [Render state in your app](https://docs.copilotkit.ai/openai-agents-python/shared-state/rendering-in-app) | `/shared-state/rendering-in-app` | ⚠️ Partial | Doc files have no "use client" (kept; the demo page is the client boundary). "default" is served by `/api/state-hitl-default` → shared-state agent. |
| [State streaming](https://docs.copilotkit.ai/openai-agents-python/shared-state/streaming) | `/shared-state/streaming` | ⚠️ Partial | Agent from Code tab, shared with gen-ui (id `shared_state_streaming`). DocumentView from Code tab. |
| [Agent Read-Only Context](https://docs.copilotkit.ai/openai-agents-python/shared-state/agent-readonly) | `/shared-state/agent-readonly` | ⚠️ Partial | page.tsx truncated in prose (tail from Code tab). demo-layout is glue. |
| [Human in the Loop](https://docs.copilotkit.ai/openai-agents-python/human-in-the-loop) | `/human-in-the-loop` | ⚠️ Partial | Pattern 1 runs. Page tail and time picker from Code tab. Pattern 2 runs on useInterrupt/headless. |
| [useInterrupt](https://docs.copilotkit.ai/openai-agents-python/human-in-the-loop/useInterrupt) | `/human-in-the-loop/useInterrupt` | ⚠️ Partial | Pause/resume works. The verbatim snippets cannot book: no time sent, and `{ok:true}` is treated as a rejection. |
| [Headless Interrupts](https://docs.copilotkit.ai/openai-agents-python/human-in-the-loop/headless) | `/human-in-the-loop/headless` | ⚠️ Partial | No prose code. Code-tab demo, trimmed. Fallback slots are glue. |
| [Governed Action Approval UI](https://docs.copilotkit.ai/openai-agents-python/human-in-the-loop/governed-actions) | `/human-in-the-loop/governed-actions` | ⚠️ Partial | Tool path works. Interrupt path renders null by design (no `metadata.action`). No backend published. |
| [WebMCP](https://docs.copilotkit.ai/openai-agents-python/webmcp) | `/webmcp` | ⚠️ Partial | `searchOrders` stub. External test needs Chrome 149+ with WebMCP. |
| [Sub-Agents](https://docs.copilotkit.ai/openai-agents-python/multi-agent/subagents) | `/multi-agent/subagents` | ⚠️ Partial | Backend complete in prose. Log types and page wiring from Code tab, trimmed. |
| — (harness) | `/doc-sync` | ✅ Working | Doc drift detection against `doc-snapshot/`. |

## 9. Known issues / doc-vs-implementation discrepancies

### Cross-cutting

- **`demo_agents._common` is never published.** Every Code-tab agent imports it (`MODEL`, `chat_settings`, …). `backend/demo_agents/_common.py` is minimal glue defining only the names actually imported.
- **No multi-agent server or registry is published.** The Quickstart serves one agent at `/agent`, and later pages address ids nothing registers (`agentic_chat`, `my-agent`, `default`, …). The harness doesn't follow the doc's ids: no-config pages share `openai_agent`, and pages with backend setup get their own id.
- **Code-tab runtime routes import an unpublished `@/lib/header-forwarding`.** No harness route uses it.
- **Suggestion hooks and components** (`useAgenticChatSuggestions`, `<Suggestions/>`, …) are imported on many pages and never published. They are commented out as decorative.
- **json-render needs a nested zod 4.** `@json-render/*` 0.18 peers on zod 4, while A2UI needs the root zod at 3.25.76. Both are served via `overrides` in `frontend/package.json`.

### Chat UI, Threads

- **Agent ids nobody registers** — [CopilotChat](https://docs.copilotkit.ai/openai-agents-python/prebuilt-components/chat), [Sidebar](https://docs.copilotkit.ai/openai-agents-python/prebuilt-components/sidebar), [Popup](https://docs.copilotkit.ai/openai-agents-python/prebuilt-components/popup), [Headless UI](https://docs.copilotkit.ai/openai-agents-python/custom-look-and-feel/headless-ui), [Multimodal](https://docs.copilotkit.ai/openai-agents-python/multimodal-attachments), [Reasoning](https://docs.copilotkit.ai/openai-agents-python/generative-ui/reasoning): the pages use `agentic_chat`, `prebuilt-sidebar`, `prebuilt-popup`, `headless-simple`, `my-agent`, `reasoning-default/-custom` against `/api/copilotkit`, which (per the Quickstart) registers only `openai_agent`.
- **[CSS](https://docs.copilotkit.ai/openai-agents-python/custom-look-and-feel/css):** `CopilotKitCSSProperties` is imported from v1 `@copilotkit/react-ui` (not installed by the Quickstart; v2 has no such type); `<CopilotChat icons>` is not a v2 prop; `font-family: "Arial, sans-serif"` is a single quoted family.
- **[Slots](https://docs.copilotkit.ai/openai-agents-python/custom-look-and-feel/slots):** the teaching extract never closes or renders and only `declare`s its components; `CustomMessageView` has untyped params (fails strict build) and renders `msg.content` that may be an array; `CustomToolbar` / `CustomCopyButton` / `CustomUserMessage` undefined.
- **[Headless UI](https://docs.copilotkit.ai/openai-agents-python/custom-look-and-feel/headless-ui):** regions only — no component, composer, or `visible`; bubbles use undefined `Avatar`, `cn`, `AttachmentChip`, `MultimodalPart`, `Attachment`; `renderToolCall`/`renderActivityMessage` have nothing registered; log tag `[langgraph-python:headless-simple]` is another framework's.
- **[Reasoning Messages](https://docs.copilotkit.ai/openai-agents-python/custom-look-and-feel/reasoning-messages) / [Reasoning](https://docs.copilotkit.ai/openai-agents-python/generative-ui/reasoning):** no backend agent printed; the Quickstart agent emits no reasoning. Reasoning Messages renders `ReasoningBlock` without printing it.
- **[Multimodal](https://docs.copilotkit.ai/openai-agents-python/multimodal-attachments):** base64 example overflows the call stack on multi-MB files; the concurrency example returns a URL string from `onUpload` (type error); `uploadToStorage`, `currentUser`, `toast`, `/api/upload` undefined.
- **[Voice](https://docs.copilotkit.ai/openai-agents-python/voice):** route calls `${AGENT_URL}/voice`, but the Quickstart backend serves `/agent` and the Quickstart's `AGENT_URL` already ends in `/agent` (→ `/agent/voice` 404); `VoiceChat` is never published; `@ts-ignore -- see main route.ts` refers to an unprinted comment; `@copilotkit/voice` / `openai@5` not in any install line.
- **[Threads Drawer](https://docs.copilotkit.ai/openai-agents-python/prebuilt-components/copilot-threads-drawer):** the NewConversationButton `app/page.tsx` lacks `"use client"` (build error); `<CopilotThreadsDrawer>` children (slot example) are a type error in 1.87 (no `children` prop); providers point at `/api/copilotkit`, which has no Intelligence.
- **[Headless Threads](https://docs.copilotkit.ai/openai-agents-python/headless-threads):** `server.ts` uses undefined `agent` and `verifyAppSession` and no route handler is shown; `ThreadSidebar()` takes no props but `App` passes `onSelectThread` (type error, and selection can never happen); `useThreads({agentId:"my-agent"})` vs runtime `default`; stray `{}`; unused `deleteThread`.

### App Control & Generative UI

- [Frontend Tools](https://docs.copilotkit.ai/openai-agents-python/frontend-tools): the "name the tool in the instructions" step prints `gen_ui_tool_based.py`, the chart agent, whose prompt never mentions `change_background`. `page.tsx` stops after `useFrontendTool`, and `./background` is never published.
- [Components as Tools](https://docs.copilotkit.ai/openai-agents-python/generative-ui/tool-based): the agent prompt offers `render_pie_chart`, but the page registers only `render_bar_chart`, and no pie-chart component is published.
- [Tool Rendering](https://docs.copilotkit.ai/openai-agents-python/generative-ui/tool-rendering): `tool_rendering.py` prints only `get_weather` and the `TOOLS`/`Agent` lines. Run as printed, they raise NameError because `search_flights`, `get_stock_price`, `roll_d20` and `SYSTEM_PROMPT` are undefined. The prose says `roll_dice`, but the tool is `roll_d20`. The custom catch-all snippet is labelled `src/app/api/copilotkit/route.ts`. `CustomCatchallRenderer`, `MyToolRow` and `ToolTimeline` are never defined.
- [State Rendering](https://docs.copilotkit.ai/openai-agents-python/generative-ui/state-rendering): `shared_state_streaming_agent` is named in the prose but never defined. The frontend is a single `useAgent` call.
- [A2UI Dynamic Schema](https://docs.copilotkit.ai/openai-agents-python/generative-ui/a2ui/dynamic-schema): `renderers.tsx` omits all imports and helpers, and `definitions.ts` omits `export type MyDefinitions`. The `page.tsx` block is cut off before `);}`. The opt-out path prints LangGraph code (`ag_ui_langgraph.get_a2ui_tools`, `ChatOpenAI`) and says the call streams "through LangGraph".
- [A2UI Fixed Schema](https://docs.copilotkit.ai/openai-agents-python/generative-ui/a2ui/fixed-schema): the provider uses `myCatalog`, but `catalog.ts` exports `catalog`, so the route is **broken**. The rendered `renderers.tsx` block splices Card's comment onto Button's body; the .md copy is correct. `flight_schema.json` is shown only as a tree, and `booked_schema.json` is published nowhere.
- [JSON Render](https://docs.copilotkit.ai/openai-agents-python/generative-ui/json-render) and [Hashbrown](https://docs.copilotkit.ai/openai-agents-python/generative-ui/hashbrown): the frontend files appear only in the Markdown export, and no backend agent is printed. Hashbrown's stated version (`0.5.0-beta.4`) differs from the pinned `0.7.0`.
- [MCP Apps](https://docs.copilotkit.ai/openai-agents-python/generative-ui/mcp-apps): `mcpAppsAgent` and `headlessCompleteAgent` are undefined. The Intelligence variant prints a `BuiltInAgent` and needs a premium key.
- [Open Generative UI](https://docs.copilotkit.ai/openai-agents-python/generative-ui/open-generative-ui): `agents` is undefined, and `VISUALIZATION_DESIGN_SKILL` and `Chat` are unpublished. The advanced `page.tsx` is cut off mid-JSX, and the rendered page splices `sandbox-functions.ts` onto it.

### Generative UI · Components and surfaces

- [Components and surfaces](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components): the framework page prints a TanStack `BuiltInAgent` (and `@tanstack/ai*` installs) instead of an OpenAI Agents SDK agent; it says the agent must pass the run's tools and context to its model but only explains how for BuiltInAgent/LangGraph. The harness relies on `ag_ui_openai_agents` defaults.
- Same page: its runtime route `app/api/copilotkit/[[...slug]]` collides with the Quickstart's single-route `app/api/copilotkit/route.ts`; Transports prints a third `app/api/copilotkit/route.ts`. And it puts `generativeUI` on the root layout's provider.
- [Surfaces](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/surfaces): the block titled `app/page.tsx` has no default export and no `"use client"`; it cannot be a Next page as printed.
- [Catalogs](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/catalogs): ProductCard says to copy values "from a tool result" but no page publishes a products tool; the export snippet uses an unimported `fs`; `Hero`, `Panel`, `cartUI` undefined.
- [State and actions](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/state-and-actions): two different `shopUI`s titled `app/catalog.tsx` (plus a third on Catalogs), all id `acme/shop@1`; `Cart` and the state ProductCard undefined.
- [Transports](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/transports): runtime sample's `agent` undefined; `agentIds: ["shop"]` refers to an agent no page defines.
- [Markdown mode](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/markdown-mode): "Build your own prompt" is Python reading `input.forwarded_props` with undefined `input`/`MY_PROMPT`/`json`; `OpenAIAgentsAgent` does not expose forwarded_props to instructions.
- [Theming](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/theming): `mapStyle` URLs are placeholders (tiles.example.com).
- [Adopt from A2UI](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/from-a2ui): `Airport`/`Arrow` undefined; the Before path needs an agent that emits A2UI operations, which no page prints.

### Shared State, Human in the Loop, WebMCP, Multi-Agent

- [Render state in your app](https://docs.copilotkit.ai/openai-agents-python/shared-state/rendering-in-app): `Canvas.tsx` and `app/page.tsx` have no `"use client"`, so `next build` fails if they are copied as published. The page also targets agent `"default"`, which the Quickstart runtime never registers.
- [useInterrupt](https://docs.copilotkit.ai/openai-agents-python/human-in-the-loop/useInterrupt) and [Headless](https://docs.copilotkit.ai/openai-agents-python/human-in-the-loop/headless) say "Not available on this framework", but ag-ui-openai-agents does emit and resume standard AG-UI interrupts.
- [useInterrupt](https://docs.copilotkit.ai/openai-agents-python/human-in-the-loop/useInterrupt): the multi-interrupt snippet resolves `{ ok: true }`. The adapter approves only `approved is True`, so Approve rejects. ApprovalInterrupt approves without a time, so `schedule_meeting` returns "Meeting NOT scheduled".
- [Headless](https://docs.copilotkit.ai/openai-agents-python/human-in-the-loop/headless): the page prints no code. The prose describes `agent.subscribe` + `runAgent`, while its Code tab uses `useInterrupt({ renderInChat: false })`.
- [Governed actions](https://docs.copilotkit.ai/openai-agents-python/human-in-the-loop/governed-actions): `GovernedActionApproval` reads `interrupt.metadata.action`. Adapter interrupts carry only `{tool_name, tool_input}`, so the card always renders null. Its `render` returning null is also a type error (kept under `@ts-expect-error`). `executeSideEffect` is undefined, and `handleApproval` is TypeScript for a Python backend.
- [WebMCP](https://docs.copilotkit.ai/openai-agents-python/webmcp): `searchOrders` is never defined (compile error, and a ReferenceError at call time).
- [State streaming](https://docs.copilotkit.ai/openai-agents-python/shared-state/streaming): `shared_state_streaming_agent` and its prompt are referenced but never printed. Code tab only.
- [Human in the Loop](https://docs.copilotkit.ai/openai-agents-python/human-in-the-loop): the Pattern 2 fragments need `_answers`, `interrupt_agent` and a prompt that appear only on the Code tab. `hitl-in-chat/page.tsx` is truncated, has no `"use client"`, and does not show `./time-picker-card`.
- [Agent Read-Only Context](https://docs.copilotkit.ai/openai-agents-python/shared-state/agent-readonly): page.tsx is truncated and has no `"use client"`. `./demo-layout` is unpublished, even on the Code tab. `upcoming_events` is an orphan tool with a `...` body.
- [Sub-Agents](https://docs.copilotkit.ai/openai-agents-python/multi-agent/subagents): the delegation-log excerpt uses undefined types and styles. The page wiring is described only in prose.
- All pages: the agent ids they address are registered by no published runtime, and several snippets mount `<CopilotKit runtimeUrl="/api/copilotkit">` for agents the Quickstart runtime lacks.

## 10. Troubleshooting

The OpenAI Agents SDK docs carry a troubleshooting accordion at the end of the Quickstart. Here is how each item shows up in this repo.

- **The runtime can't reach the agent.** Check that the backend is running (`curl localhost:8000/health`). The Quickstart's `AGENT_URL` must include the endpoint path (`http://localhost:8000/agent`). In this repo, leave `AGENT_URL` unset (see §4).
- **Every chat turn fails with an authentication error.** `OPENAI_API_KEY` must be set in `backend/.env`, for the agent process, not just the frontend.
  - With the default `MODEL=gpt-6-luna`, page-specific agents fail at the model call if your account can't use that model; set `MODEL` to one it can.
  - The shared `/agent` (Quickstart) uses the SDK default model and is unaffected.
- **A run stops right after a tool call.** That's a frontend tool. The run ends until the browser answers, and the next request carries the result back. Expected on Frontend Tools, Tool-based UI, HITL and WebMCP.
- **A run keeps ending with the same interrupt.** A `needs_approval=True` tool is still waiting. A new message doesn't decide it; it has to be resumed with `{"approved": true}` or `{"approved": false}`. The useInterrupt page's multi-interrupt snippet resolves with `{ok: true}`, which the adapter treats as a rejection (see §9).
- **A route chats but its feature does nothing.** Read the red Doc gaps panel at the top of the route first. On ❌ routes that state is the finding.
- **The dev server dies silently.** It's usually the OOM killer and Turbopack's dev cache, not a route. Check `dmesg -T | grep -i oom` and `du -sh frontend/.next`, and `rm -rf frontend/.next` if it is large.
- **Two Inspectors / a frozen tab.** A new demo that mounts its own `<CopilotKit>` must list its path in `nestedProviderPaths` (`frontend/src/lib/routes/*.ts`).

## Doc drift detection

`/doc-sync` keeps the repo honest about the docs it mirrors. Press **Sync docs now** (on `/` or `/doc-sync`) and it re-fetches the markdown source (`<page>.md`) behind all 45 tracked pages, diffs each against `doc-snapshot/pages/`, replaces the snapshot, and reports what moved.

- **Severity comes from where the edit landed:**
  - **High:** a line inside a code fence, a changed fence count, or a page that 404s and is gone from the sitemap.
  - **Medium:** a heading, the frontmatter, or prose next to changed code.
  - **Low:** other prose.
- **`doc-snapshot/CHANGELOG.md`** is written at the moment a change is discovered, so it survives the re-sync that replaces the snapshot.
- **New upstream pages** under `/openai-agents-python` that no route covers are flagged. The 120 already-known ones are listed in `manifest.json → sitemap.knownUnmapped`.
- **One sync date:** `syncedAt` in `doc-snapshot/manifest.json`.
- **To test it:** edit a line inside a code fence in any `doc-snapshot/pages/*.md` file and press the button.
- **Commit `doc-snapshot/`.** `reports/` is derived data and is gitignored.
- **Caveat:** the sync diffs the `.md` export, which can carry default snippets. The rendered page and its demo Code tab can change without the `.md` changing.

## 11. Project structure

```
openai-agents-sdk-py/
├── CLAUDE.md, README.md, .env.example
├── backend/
│   ├── pyproject.toml            # the Quickstart's uv add line
│   ├── main.py                   # Quickstart, verbatim (shared agent at /agent)
│   ├── server.py                 # glue: mounts every page agent on main.app
│   ├── demo_agents/
│   │   ├── _common.py            # glue: MODEL, chat_settings, reasoning_settings
│   │   ├── registry.py           # glue: collects the four groups' AGENTS
│   │   ├── agents_<group>.py     # id → OpenAIAgentsAgent per route group
│   │   └── <agent>.py            # one module per doc agent (hitl.py, subagents.py, …)
│   └── docs_verbatim/            # published backend code that can't run, kept byte-exact
├── doc-snapshot/                 # doc-sync baseline (pages/, manifest.json, CHANGELOG.md)
└── frontend/src/
    ├── app/
    │   ├── <doc path>/page.tsx            # notes route: header, gaps, Try it, source
    │   ├── <doc path>/demo-chat/…         # full-screen live demo
    │   ├── api/copilotkit/route.ts        # Quickstart runtime, verbatim
    │   ├── api/harness/[[...slug]]        # glue: every agent, root provider
    │   ├── api/<page runtimes>/…          # per-page runtime options, verbatim
    │   ├── status/, doc-sync/             # QA ledger, doc drift
    ├── components/                        # route header, doc gaps, source viewer, demo frame
    └── lib/
        ├── nav-config.ts + routes/*.ts    # nav, statuses (one file per route group)
        ├── doc-gaps.ts + gaps/*.ts        # doc-gap ledger
        ├── agents.ts + agent-ids/*.ts     # agent ids ↔ backend registry
        └── doc-sync/                      # fetch, diff, snapshot store
```

## 12. References

**Getting Started**
- [Quickstart](https://docs.copilotkit.ai/openai-agents-python/quickstart)

**Chat · Prebuilt Components**
- [CopilotChat](https://docs.copilotkit.ai/openai-agents-python/prebuilt-components/chat)
- [CopilotSidebar](https://docs.copilotkit.ai/openai-agents-python/prebuilt-components/sidebar)
- [CopilotPopup](https://docs.copilotkit.ai/openai-agents-python/prebuilt-components/popup)
- [Open, close, and feedback](https://docs.copilotkit.ai/openai-agents-python/prebuilt-components/chat-controls)

**Chat · Custom Look and Feel**
- [CSS Customization](https://docs.copilotkit.ai/openai-agents-python/custom-look-and-feel/css)
- [Slots (Subcomponents)](https://docs.copilotkit.ai/openai-agents-python/custom-look-and-feel/slots)
- [Markdown Rendering](https://docs.copilotkit.ai/openai-agents-python/custom-look-and-feel/markdown)
- [Headless UI](https://docs.copilotkit.ai/openai-agents-python/custom-look-and-feel/headless-ui)
- [Reasoning Messages](https://docs.copilotkit.ai/openai-agents-python/custom-look-and-feel/reasoning-messages)

**Chat**
- [Multimodal Attachments](https://docs.copilotkit.ai/openai-agents-python/multimodal-attachments)
- [Voice](https://docs.copilotkit.ai/openai-agents-python/voice)
- [Reasoning](https://docs.copilotkit.ai/openai-agents-python/generative-ui/reasoning)

**Threads**
- [Threads Drawer](https://docs.copilotkit.ai/openai-agents-python/prebuilt-components/copilot-threads-drawer)
- [Headless Threads](https://docs.copilotkit.ai/openai-agents-python/headless-threads)

**App Control**
- [Frontend Tools](https://docs.copilotkit.ai/openai-agents-python/frontend-tools)
- [WebMCP](https://docs.copilotkit.ai/openai-agents-python/webmcp)

**Generative UI · Controlled**
- [Components as Tools](https://docs.copilotkit.ai/openai-agents-python/generative-ui/tool-based)
- [Tool Call Rendering](https://docs.copilotkit.ai/openai-agents-python/generative-ui/tool-rendering)
- [State Rendering](https://docs.copilotkit.ai/openai-agents-python/generative-ui/state-rendering)

**Generative UI · Components and surfaces**
- [Components and surfaces](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components)
- [Surfaces](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/surfaces)
- [Catalogs](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/catalogs)
- [Standard catalog](https://docs.copilotkit.ai/generative-ui/components/standard-catalog)
- [State and actions](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/state-and-actions)
- [Theming](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/theming)
- [Transports](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/transports)
- [Markdown mode](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/markdown-mode)
- [Adopt from A2UI](https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/from-a2ui)

**Generative UI · A2UI**
- [A2UI · Dynamic Schema](https://docs.copilotkit.ai/openai-agents-python/generative-ui/a2ui/dynamic-schema)
- [A2UI · Fixed Schema](https://docs.copilotkit.ai/openai-agents-python/generative-ui/a2ui/fixed-schema)

**Generative UI · Bring your own**
- [JSON Render](https://docs.copilotkit.ai/openai-agents-python/generative-ui/json-render)
- [Hashbrown](https://docs.copilotkit.ai/openai-agents-python/generative-ui/hashbrown)

**Generative UI · MCP Apps & Open Generative UI**
- [MCP Apps](https://docs.copilotkit.ai/openai-agents-python/generative-ui/mcp-apps)
- [Open Generative UI](https://docs.copilotkit.ai/openai-agents-python/generative-ui/open-generative-ui)

**Shared State**
- [Shared State](https://docs.copilotkit.ai/openai-agents-python/shared-state)
- [Render state in your app](https://docs.copilotkit.ai/openai-agents-python/shared-state/rendering-in-app)
- [State streaming](https://docs.copilotkit.ai/openai-agents-python/shared-state/streaming)
- [Agent Read-Only Context](https://docs.copilotkit.ai/openai-agents-python/shared-state/agent-readonly)

**Human in the Loop**
- [Human in the Loop](https://docs.copilotkit.ai/openai-agents-python/human-in-the-loop/index)
- [Pausing the Agent (useInterrupt)](https://docs.copilotkit.ai/openai-agents-python/human-in-the-loop/useInterrupt)
- [Headless Interrupts](https://docs.copilotkit.ai/openai-agents-python/human-in-the-loop/headless)
- [Governed Action Approval UI](https://docs.copilotkit.ai/openai-agents-python/human-in-the-loop/governed-actions)

**Multi-Agent**
- [Sub-Agents](https://docs.copilotkit.ai/openai-agents-python/multi-agent/subagents)

