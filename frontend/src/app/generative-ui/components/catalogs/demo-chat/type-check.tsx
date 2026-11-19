/* eslint-disable @typescript-eslint/no-unused-expressions -- harness: the doc's snippet is bare expressions */
// Catalogs, "Type your components": a compile-time illustration. Never
// rendered. The two imports are harness glue (the snippet prints none).
import type { GenerativeUIComponentProps } from "@copilotkit/react-core/v2/generative-ui";
import { shopUI } from "./catalog";

// ── doc: catalogs prose block "Type your components" (verbatim) ──
export function ProductCard(props: GenerativeUIComponentProps<typeof shopUI, "ProductCard">) {
  props.price; // number
  // @ts-expect-error doc: deliberate type error — `color` is not a prop of ProductCard (the page's point)
  props.color; // type error: not a prop of ProductCard
}
// ── end doc ──
