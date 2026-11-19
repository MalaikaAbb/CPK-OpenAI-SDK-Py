"use client";

/**
 * The page's three one-line targets. Each JSX element between the doc markers
 * is verbatim; the function around it, the layout, and the product picker are
 * harness glue — the page shows the elements, not where they sit.
 */
import { GenerativeUISurface } from "@copilotkit/react-core/v2/generative-ui";
import { useState } from "react";

import { PRODUCTS } from "../../_shared/shop-glue";
import { shopUI } from "./catalog";

/** "Limit the components". */
export function LimitedFeatured() {
  return (
    // ── doc: surfaces prose block "Limit the components" (verbatim) ──
    <GenerativeUISurface id="featured" ui={shopUI} components={["ProductGrid", "ProductCard"]} />
    // ── end doc ──
  );
}

/** "Scroll to the surface". */
export function SidebarNotes() {
  return (
    // ── doc: surfaces prose block "autoScroll" (verbatim) ──
    <GenerativeUISurface id="sidebar-notes" autoScroll={false} />
    // ── end doc ──
  );
}

/** "One target for each item". `product` is undefined on the page: the picker supplies it (glue). */
export function Recommendations() {
  const [product, setProduct] = useState(PRODUCTS[0]);
  return (
    <div className="space-y-2">
      <div className="flex gap-2 text-xs">
        {PRODUCTS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setProduct(p)}
            className={`rounded border px-2 py-1 ${p.id === product.id ? "border-[var(--accent)] text-[var(--accent)]" : "border-slate-300"}`}
          >
            {p.name}
          </button>
        ))}
      </div>
      {/* ── doc: surfaces prose block "one target per item" (verbatim) ── */}
      <GenerativeUISurface
        key={product.id}
        id={`recommendations-${product.id}`}
        description={`The "You might also like" row under ${product.name}. Show related products here. Never include ${product.name} itself.`}
      />
      {/* ── end doc ── */}
    </div>
  );
}
