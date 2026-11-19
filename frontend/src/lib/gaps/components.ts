import type { DocGap } from "@/lib/doc-gaps";

const P = "/openai-agents-python/generative-ui/components";
const R = "/generative-ui/components";
const ALL = [
  R,
  `${R}/surfaces`,
  `${R}/catalogs`,
  `${R}/standard-catalog`,
  `${R}/state-and-actions`,
  `${R}/theming`,
  `${R}/transports`,
  `${R}/markdown-mode`,
  `${R}/from-a2ui`,
];

/** Components and surfaces family (9 pages). None of these pages has a demo Code tab. */
export const COMPONENTS_GAPS: DocGap[] = [
  {
    id: "components-overview-agent-swap",
    title: "The page's agent is a TanStack BuiltInAgent; no OpenAI Agents SDK agent is printed",
    detail:
      "`app/api/copilotkit/[[...slug]]/route.ts` builds `new BuiltInAgent({ type: \"tanstack\", ... openaiText(\"gpt-6-luna\") ... })` with the prompt \"You are a helpful assistant. When a visual answer helps, render it with generative UI.\" Swapped (user instruction): `backend/demo_agents/genui_components.py` is an OpenAI Agents SDK `Agent` with that prompt, `model=MODEL` (default gpt-6-luna), no tools, wrapped in `OpenAIAgentsAgent` and registered as `default` by `app/api/genui`. The `name=\"assistant\"` is harness glue (the SDK requires one). Every page in the family runs on this agent.",
    severity: "degraded",
    docPath: P,
    routes: ALL,
  },
  {
    id: "components-agent-tools-context-unstated",
    title: "No page says how an OpenAI Agents agent passes the run's tools and context to its model",
    detail:
      "The page requires the agent to hand the run's tools (`render_ui`) and context (guide, catalog) to its model, and names only BuiltInAgent and LangGraph's CopilotKitMiddleware. The harness relies on `ag_ui_openai_agents` defaults (client tools added to the agent with non-strict schemas; `context_in_instructions=True`). That works by bridge behaviour, not by anything the page states.",
    severity: "note",
    docPath: P,
    routes: ALL,
  },
  {
    id: "components-runtime-path-collision",
    title: "The page's runtime route collides with the Quickstart's /api/copilotkit",
    detail:
      "The overview prints a multi-route catch-all at `app/api/copilotkit/[[...slug]]` (agent id `default`); the Quickstart's `app/api/copilotkit/route.ts` is single-route with `openai_agent`. Transports prints yet another `app/api/copilotkit/route.ts`. Harness: the overview's runtime is `app/api/genui/[[...slug]]` (basePath `/api/genui`, labelled), Transports' is `app/api/genui-transports/[[...slug]]`; every provider's `runtimeUrl=\"/api/copilotkit\"` becomes one of those (labelled at each site).",
    severity: "degraded",
    docPath: P,
    routes: ALL,
  },
  {
    id: "components-root-provider-placement",
    title: "The page puts generativeUI on the ROOT layout's provider",
    detail:
      "`app/layout.tsx` wraps every page in `Providers` with `generativeUI={{ ui: standardUI }}`. In the harness that would turn generative UI on for every route, so each demo mounts its own nested `CopilotKitProvider` (listed in `nestedProviderPaths`, with `enableInspector={nestedInspectorSetting}` added — harness glue). The overview demo mounts the page's own `providers.tsx` + `page.tsx` that way.",
    severity: "degraded",
    docPath: P,
    routes: ALL,
  },
  {
    id: "components-tanstack-install-moot",
    title: "Printed install line adds @tanstack/ai and @tanstack/ai-openai",
    detail: "Only the swapped-out BuiltInAgent needs them; not installed.",
    severity: "note",
    docPath: P,
    routes: [R],
  },
  {
    id: "components-products-tool-glue",
    title: "ProductCard copies values \"from a tool result\", but no page publishes a products tool",
    detail:
      "Catalogs' ProductCard description (also used by Surfaces via ./catalog) points the model at a tool result; Surfaces asks for products in the featured row. Harness glue: `backend/demo_agents/genui_shop.py` clones the overview agent and adds a fake-data `search_products` (p1–p5, placeholder images). Registered as `genui_shop` in `app/api/genui` (labelled); the shop demos pass `agentId=\"genui_shop\"`.",
    severity: "degraded",
    docPath: `${P}/catalogs`,
    routes: [`${R}/surfaces`, `${R}/catalogs`, `${R}/standard-catalog`, `${R}/state-and-actions`],
  },
  {
    id: "components-surfaces-page-export",
    title: "Surfaces' `app/page.tsx` has only a named export and no \"use client\"",
    detail:
      "As a Next page it has no default export, and as a Server Component it would call the client-only `createGenerativeUI` (through ./catalog) and pass functions in `ui`. Minimal labelled fix: the block lives in `surfaces/demo-chat/featured-products.tsx` with \"use client\" added.",
    severity: "degraded",
    docPath: `${P}/surfaces`,
    routes: [`${R}/surfaces`],
  },
  {
    id: "components-surfaces-undefined",
    title: "Surfaces uses Product, ProductRow, products, product and ./catalog without defining them",
    detail:
      "Harness glue in `_shared/shop-glue.tsx`: `Product`, `ProductRow`, `PRODUCTS`; a product picker supplies `product` for the per-item target. `./catalog` is re-exported from the Catalogs page's `app/catalog.tsx` (the only catalog with ProductGrid + ProductCard). The one-line targets and the errorBoundary provider fragment (unclosed tag, no import) are mounted inside a glue layout.",
    severity: "degraded",
    docPath: `${P}/surfaces`,
    routes: [`${R}/surfaces`],
  },
  {
    id: "components-catalogs-type-error",
    title: "Catalogs' \"Type your components\" snippet is a deliberate type error",
    detail:
      "`props.color; // type error` fails `tsc`. Kept verbatim in `catalogs/demo-chat/type-check.tsx` under `// @ts-expect-error`, with the two missing imports added (glue). Never rendered.",
    severity: "note",
    docPath: `${P}/catalogs`,
    routes: [`${R}/catalogs`],
  },
  {
    id: "components-catalogs-undefined",
    title: "Catalogs uses Hero, Panel, cartUI, z and createGenerativeUI without defining or importing them",
    detail:
      "\"Combine catalogs\" extends an undefined `cartUI` and registers an undefined `Hero`; \"Positional parameter order\" uses an undefined `Panel` and has no imports, and its `ui` is module-local. Harness glue: a one-component `cartUI` (CartBadge), a heading `Hero`, a bordered `Panel` (shop-glue.tsx); imports and an `export { ui as panelUI }` line, each marked.",
    severity: "degraded",
    docPath: `${P}/catalogs`,
    routes: [`${R}/catalogs`],
  },
  {
    id: "components-catalogs-schema-fragments",
    title: "\"Pick a schema library\" prints two `props:` lines, not a catalog, and no Valibot install",
    detail:
      "The zod and Valibot `props` values are verbatim; the catalog and the component they back (`GlueProductCard`) are harness glue. `valibot` and `@valibot/to-json-schema` are installed although no install command is printed.",
    severity: "note",
    docPath: `${P}/catalogs`,
    routes: [`${R}/catalogs`],
  },
  {
    id: "components-catalogs-export-fs",
    title: "The catalog export writes with an unimported `fs`",
    detail:
      "`fs.writeFileSync(\"acme-catalog.json\", ...)` needs Node and an import; the page does not say where the script runs. Harness: the `exportA2UICatalog` call is verbatim in `export-view.tsx` and the result is printed in the browser instead of written.",
    severity: "note",
    docPath: `${P}/catalogs`,
    routes: [`${R}/catalogs`],
  },
  {
    id: "components-three-shopui",
    title: "Three incompatible `shopUI` catalogs, all id acme/shop@1 and all titled app/catalog.tsx",
    detail:
      "Catalogs prints one (ProductGrid/ProductCard); State and actions prints two (state + bind; functions + events). The pages do not say whether to merge them. Kept per page, unmerged; only one is mounted at a time.",
    severity: "note",
    docPath: `${P}/state-and-actions`,
    routes: [`${R}/catalogs`, `${R}/state-and-actions`],
  },
  {
    id: "components-standard-undefined",
    title: "Standard catalog uses ProductCard and productSchema without defining them; \"Drop components\" has no imports",
    detail:
      "Harness glue: `GlueProductCard` and `productSchema` (name, price) in shop-glue.tsx; the missing `createGenerativeUI`/`standardUI` import is added and marked in `omit.ts`. This page exists only at the framework-neutral URL docs.copilotkit.ai/generative-ui/components/standard-catalog.",
    severity: "degraded",
    docPath: "/generative-ui/components/standard-catalog",
    routes: [`${R}/standard-catalog`],
  },
  {
    id: "components-state-undefined",
    title: "State and actions uses Cart, cart.addItem and the state catalog's ProductCard without defining them",
    detail:
      "Harness glue: a React-state `useCart()` behind the `Cart` shape, a `CartView`, and `GlueProductCard` (productId, name, inCart). The snippets' missing `z`/`createGenerativeUI` imports are added and marked; `CartState`/`CartActions` gain `export`.",
    severity: "degraded",
    docPath: `${P}/state-and-actions`,
    routes: [`${R}/state-and-actions`],
  },
  {
    id: "components-state-fragments",
    title: "\"Who may call\", \"Send a click\" and \"Keep what the user types\" are bare fragments",
    detail:
      "The `functions:`, `events: { onChoose }` and `CheckoutForm` entries have no catalog around them, and no component fires `onChoose`. Harness glue: a catalog around each fragment and a `PlanCard` that calls `onChoose`. The declarations are shown through `exportA2UICatalog` only: the page itself says the agent cannot call renderer functions in this version (`agentOnly` is unusable).",
    severity: "degraded",
    docPath: `${P}/state-and-actions`,
    routes: [`${R}/state-and-actions`],
  },
  {
    id: "components-state-single-root",
    title: "The state and functions catalogs hold only ProductCard, so a surface fits one card",
    detail:
      "A surface has one root and these catalogs have no container component, so a request for several cards has nothing to put them in. Not patched (no extra layout catalog); the demo prompts ask for one card.",
    severity: "note",
    docPath: `${P}/state-and-actions`,
    routes: [`${R}/state-and-actions`],
  },
  {
    id: "components-theming-root-layout",
    title: "Theming's dark-mode setup belongs in the root layout (`<html class=\"dark\">`, a `<head>` script)",
    detail:
      "The harness root layout is shared, so the page's script renders in the demo body instead (it runs on a full page load only) and a toggle flips the class by hand (glue). The `theme:` fragments get `ui: standardUI` around them (glue); `theming.css` loads globally once the demo is opened.",
    severity: "degraded",
    docPath: `${P}/theming`,
    routes: [`${R}/theming`],
  },
  {
    id: "components-theming-map-placeholder",
    title: "The mapStyle URLs are placeholders (tiles.example.com)",
    detail: "Kept verbatim; the Map variant draws no basemap.",
    severity: "note",
    docPath: `${P}/theming`,
    routes: [`${R}/theming`],
  },
  {
    id: "components-transports-agent-undefined",
    title: "Transports' runtime sample uses an undefined `agent`, with no imports, runner or handler",
    detail:
      "Harness glue: `agent` is the overview's (swapped) agent over HTTP; imports and handler follow the overview's shape at `app/api/genui-transports`. The `CopilotRuntime({ agents: { default: agent }, generativeUI: true })` call is verbatim.",
    severity: "degraded",
    docPath: `${P}/transports`,
    routes: [`${R}/transports`],
  },
  {
    id: "components-transports-shop-missing",
    title: "`agentIds: [\"shop\"]` names a shop agent no page defines",
    detail:
      "No shop agent is registered (not invented). Only the outside half is testable: the default agent, not in the list, gets no catalog. The inside half (an agent that does get it) is untested.",
    severity: "degraded",
    docPath: `${P}/transports`,
    routes: [`${R}/transports`],
  },
  {
    id: "components-markdown-own-prompt",
    title: "\"Build your own prompt\" (sendContext: false) has no runnable backend for OpenAI Agents",
    detail:
      "The only backend shown is a Python fragment reading `input.forwarded_props[\"copilotkit\"][\"ui\"]` with undefined `input`, `MY_PROMPT` and `json`. `OpenAIAgentsAgent` passes the run's context entries to the agent, not the RunAgentInput or forwarded_props, and no page shows the wiring. Kept verbatim at `backend/docs_verbatim/components/markdown_mode_own_prompt.py` (not imported); the sendContext: false variant renders no UI.",
    severity: "blocking",
    docPath: `${P}/markdown-mode`,
    routes: [`${R}/markdown-mode`],
  },
  {
    id: "components-markdown-providers-fragment",
    title: "Markdown mode's `app/providers.tsx` is bare JSX with an undefined `children` and no \"use client\"",
    detail:
      "Harness: the JSX is wrapped in a component (glue) and \"use client\" is added (labelled fix). The default path (sendContext true) needs only the base agent; the bridge's context-to-instructions default carries the guide.",
    severity: "note",
    docPath: `${P}/markdown-mode`,
    routes: [`${R}/markdown-mode`],
  },
  {
    id: "components-from-a2ui-undefined",
    title: "Adopt from A2UI uses Airport, Arrow and z without defining or importing them",
    detail: "Harness glue: minimal `Airport` (code + city) and `Arrow` in shop-glue.tsx; the `z` import is added and marked.",
    severity: "degraded",
    docPath: `${P}/from-a2ui`,
    routes: [`${R}/from-a2ui`],
  },
  {
    id: "components-from-a2ui-before-reference",
    title: "The \"Before\" (a2ui renderer) side cannot run: no agent emits A2UI operations for it",
    detail:
      "The Before path needs the legacy `a2ui` runtime option and an agent that writes `a2ui_operations` itself (`injectA2UITool: false`, agent `shop`); `agents` is undefined and no OpenAI Agents agent is printed. Shown as code only; the After catalog runs.",
    severity: "degraded",
    docPath: `${P}/from-a2ui`,
    routes: [`${R}/from-a2ui`],
  },
];
