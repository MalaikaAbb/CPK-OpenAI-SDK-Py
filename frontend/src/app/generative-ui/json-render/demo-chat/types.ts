// from Code tab — src/app/demos/declarative-json-render/types.ts, unchanged. Not in the page prose.
export interface JsonRenderSpec {
  root: string;
  elements: Record<
    string,
    { type: string; props: Record<string, unknown>; children?: string[] }
  >;
}
