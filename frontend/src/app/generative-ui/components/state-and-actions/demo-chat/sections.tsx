"use client";

/**
 * Harness glue: the app around each published hook. The page mounts the hooks
 * with a `cart`; where that cart lives and how the app changes it are not on
 * the page.
 */
import { exportA2UICatalog } from "@copilotkit/react-core/v2/generative-ui";

import { CartView, PRODUCTS, useCart } from "../../_shared/shop-glue";
import { callersUI } from "./declarations";
import { CartActions } from "./functions-catalog";
import { CartState } from "./state-catalog";

export function StateSection() {
  const cart = useCart();
  return (
    <div className="space-y-3 text-sm">
      <CartState cart={cart} />
      <p className="text-xs text-slate-500">
        Product ids: {PRODUCTS.map((p) => `${p.id} ${p.name}`).join(", ")}. Add some, then ask for a card — its
        &ldquo;In cart&rdquo; line comes from this state through <code>bind</code>, not from the agent.
      </p>
      <div className="flex gap-2">
        {PRODUCTS.map((p) => (
          <button key={p.id} type="button" onClick={() => cart.addItem(p.id, 1)} className="rounded border px-2 py-1 text-xs">
            + {p.id}
          </button>
        ))}
      </div>
      <CartView cart={cart} />
    </div>
  );
}

export function FunctionsSection() {
  const cart = useCart();
  return (
    <div className="space-y-3 text-sm">
      <CartActions cart={cart} />
      <p className="text-xs text-slate-500">
        A card&apos;s &ldquo;Add to cart&rdquo; runs addToCart here, with no message to the agent.
      </p>
      <CartView cart={cart} />
    </div>
  );
}

export function DeclarationsSection() {
  const catalog = exportA2UICatalog(callersUI);
  return (
    <div className="text-xs">
      <p className="font-semibold">exportA2UICatalog(callersUI).functions — addToCart, track, reload</p>
      <pre className="mt-1 max-h-[70vh] overflow-auto rounded bg-slate-100 p-2 dark:bg-slate-900">
        {JSON.stringify(
          Object.fromEntries(["addToCart", "track", "reload"].map((k) => [k, catalog.functions?.[k]])),
          null,
          2,
        )}
      </pre>
    </div>
  );
}
