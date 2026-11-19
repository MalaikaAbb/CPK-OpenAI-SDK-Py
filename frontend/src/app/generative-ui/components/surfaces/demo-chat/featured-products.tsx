// Doc bug kept visible: the page titles this block `app/page.tsx`, but it has
// only a NAMED export and no "use client". As a Next page it has no default
// export, and evaluated as a Server Component it calls the client-only
// `createGenerativeUI` (via ./catalog) and passes functions in `ui` to a
// client component. Minimal labelled fix: the block lives in this
// non-route module, with the "use client" line below.
"use client"; // harness fix: missing in the doc block

// ── doc: surfaces prose block "app/page.tsx" (verbatim, plus one marked import) ──
import { GenerativeUISurface } from "@copilotkit/react-core/v2/generative-ui";
import { shopUI } from "./catalog";
import { ProductRow, type Product } from "../../_shared/shop-glue"; // harness glue: used, never defined

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <GenerativeUISurface
      id="featured"
      ui={shopUI}
      description="The Featured Products row of the home page. When the customer asks to see products here, show them as a ProductGrid with one ProductCard for each product. When they ask for the featured products again, delete this surface."
      components={["ProductGrid", "ProductCard"]}
      fallback={<ProductRow products={products} />}
    />
  );
}
// ── end doc ──
