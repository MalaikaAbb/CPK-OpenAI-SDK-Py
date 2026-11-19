/**
 * The nav, the route headers, the status page and the README status table all
 * read from here, so a doc page and its implementation status are described
 * exactly once.
 *
 * Route paths mirror the doc URLs under docs.copilotkit.ai/openai-agents-python.
 * Groups follow the live doc sidebar (synced 2026-11-12). Each route group's
 * entries live in their own file under `lib/routes/`.
 *
 * The one doc-sync date in this repo is `syncedAt` in
 * `doc-snapshot/manifest.json`, written by the sync button on `/doc-sync`.
 */
import { CHAT_UI_ROUTES } from "@/lib/routes/chat-ui";
import { COMPONENTS_ROUTES } from "@/lib/routes/components";
import { GEN_UI_ROUTES } from "@/lib/routes/gen-ui";
import { STATE_HITL_ROUTES } from "@/lib/routes/state-hitl";

export const DOCS_ROOT = "https://docs.copilotkit.ai/openai-agents-python";

export type RouteStatus = "working" | "partial" | "reference" | "broken" | "not-started";

export interface RouteMeta {
  path: string;
  title: string;
  docPath: string;
  summary: string;
  status: RouteStatus;
  statusNote?: string;
  /** Doc sidebar heading this route sits under. */
  group: string;
  /** Reachable by URL but absent from the doc sidebar. */
  offNav?: boolean;
  /** Owns a live surface at `<path>/demo-chat`. */
  hasDemo?: boolean;
  /** Agent id the demo addresses (frontend runtime id). */
  agentId?: string;
  /**
   * Demo paths under this route that mount their own `<CopilotKit>`. The root
   * provider disables its inspector there (one inspector per page).
   */
  nestedProviderPaths?: string[];
}

export function demoPath(route: RouteMeta): string | undefined {
  if (!route.hasDemo) return undefined;
  return route.path === "/" ? "/demo-chat" : `${route.path}/demo-chat`;
}

export interface NavGroup {
  title: string;
  routes: RouteMeta[];
}

const HARNESS_ROUTES: RouteMeta[] = [
  {
    path: "/",
    group: "Getting Started",
    title: "Introduction",
    docPath: "/openai-agents-python",
    summary: "What this harness covers and how the pieces fit together.",
    status: "reference",
  },
];

const TAIL_ROUTES: RouteMeta[] = [
  {
    path: "/doc-sync",
    group: "Doc Sync",
    title: "Doc drift",
    docPath: "/openai-agents-python",
    summary:
      "Re-fetches the markdown behind every tracked doc page and diffs it against the stored snapshot, flagging changes inside code blocks.",
    status: "reference",
  },
];

/** Sidebar order (live docs, 2026-11-12). */
const GROUP_ORDER = [
  "Getting Started",
  "Chat · Prebuilt Components",
  "Chat · Custom Look and Feel",
  "Chat",
  "Threads",
  "App Control",
  "Generative UI · Controlled",
  "Generative UI · Components and surfaces",
  "Generative UI · A2UI",
  "Generative UI · Bring your own",
  "Generative UI · MCP Apps & Open Generative UI",
  "Shared State",
  "Human in the Loop",
  "Multi-Agent",
  "Doc Sync",
];

const ROUTES: RouteMeta[] = [
  ...HARNESS_ROUTES,
  ...CHAT_UI_ROUTES,
  ...GEN_UI_ROUTES,
  ...COMPONENTS_ROUTES,
  ...STATE_HITL_ROUTES,
  ...TAIL_ROUTES,
];

export const NAV: NavGroup[] = [
  ...GROUP_ORDER.map((title) => ({
    title,
    routes: ROUTES.filter((r) => r.group === title),
  })),
  // Any group a route file names that is not in GROUP_ORDER still shows up.
  ...[...new Set(ROUTES.map((r) => r.group))]
    .filter((g) => !GROUP_ORDER.includes(g))
    .map((title) => ({ title, routes: ROUTES.filter((r) => r.group === title) })),
].filter((g) => g.routes.length > 0);

export const ALL_ROUTES: RouteMeta[] = NAV.flatMap((g) => g.routes);

export function findRoute(path: string): RouteMeta | undefined {
  return ALL_ROUTES.find((r) => r.path === path);
}

export function docUrl(route: RouteMeta): string {
  return `https://docs.copilotkit.ai${route.docPath}`;
}

export const STATUS_LABEL: Record<RouteStatus, string> = {
  working: "Working",
  partial: "Partial",
  reference: "Reference",
  broken: "Broken",
  "not-started": "Not started",
};
