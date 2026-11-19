/**
 * Everything docs.copilotkit.ai/openai-agents-python does not publish, and
 * everything this repo had to supply because of it.
 *
 * Every entry is a statement about the docs, checked against the page it
 * cites. Each route group keeps its own list under `lib/gaps/`; a route's page
 * renders its gaps with `<DocGaps path="…" />` directly under the header.
 *
 * Labelling convention for supplied code (in titles and details):
 *   "harness glue"   — written by this repo, no doc source
 *   "from Code tab"  — taken from the page's demo Code tab, trimmed to what the
 *                      feature needs
 * When a doc page starts publishing the missing piece, delete the entry.
 */
import { CHAT_UI_GAPS } from "@/lib/gaps/chat-ui";
import { COMPONENTS_GAPS } from "@/lib/gaps/components";
import { GEN_UI_GAPS } from "@/lib/gaps/gen-ui";
import { SHARED_GAPS } from "@/lib/gaps/shared";
import { STATE_HITL_GAPS } from "@/lib/gaps/state-hitl";

export type GapSeverity = "blocking" | "degraded" | "note";

export interface DocGap {
  id: string;
  /** One line: what is missing or wrong. */
  title: string;
  detail: string;
  severity: GapSeverity;
  /** The doc page the claim is about. */
  docPath: string;
  /** Harness routes that show this gap. */
  routes: string[];
}

const GAP_LIST: DocGap[] = [
  ...SHARED_GAPS,
  ...CHAT_UI_GAPS,
  ...GEN_UI_GAPS,
  ...COMPONENTS_GAPS,
  ...STATE_HITL_GAPS,
];

{
  const seen = new Set<string>();
  for (const g of GAP_LIST) {
    if (seen.has(g.id)) throw new Error(`Duplicate doc gap id "${g.id}"`);
    seen.add(g.id);
  }
}

export const DOC_GAPS: Record<string, DocGap> = Object.fromEntries(
  GAP_LIST.map((g) => [g.id, g]),
);

export type GapId = string;

/** Route path → gap ids, derived from each gap's `routes`. */
export const ROUTE_GAPS: Record<string, GapId[]> = GAP_LIST.reduce<
  Record<string, GapId[]>
>((acc, g) => {
  for (const r of g.routes) (acc[r] ??= []).push(g.id);
  return acc;
}, {});

export function gapsFor(path: string): DocGap[] {
  return (ROUTE_GAPS[path] ?? []).map((id) => DOC_GAPS[id]);
}

/** Total distinct gaps, for the status page's headline. */
export const ALL_GAPS = GAP_LIST;
