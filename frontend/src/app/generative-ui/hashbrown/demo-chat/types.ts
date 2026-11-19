// from Code tab — src/app/demos/declarative-hashbrown/types.ts, unchanged. Not in the page prose.
export const SALES_STAGES = [
  "prospect",
  "qualified",
  "proposal",
  "negotiation",
  "closed-won",
  "closed-lost",
] as const;

export type SalesStage = (typeof SALES_STAGES)[number];
