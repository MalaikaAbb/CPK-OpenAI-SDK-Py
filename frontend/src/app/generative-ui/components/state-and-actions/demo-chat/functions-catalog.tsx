"use client";

// "Run your code on a click": the page's catalog, CartActions and ProductCard
// blocks. They print partial imports; `z`, `createGenerativeUI` and `Cart` come
// from the marked lines. The three blocks share one module here because the
// catalog and the component refer to each other.
import { z } from "zod"; // harness glue: not imported
import { createGenerativeUI } from "@copilotkit/react-core/v2/generative-ui"; // harness glue: not imported
import type { Cart } from "../../_shared/shop-glue"; // harness glue: used, never defined

// ── doc: state-and-actions prose block "ProductCard" with onAddToCart (verbatim) ──
import { useState } from "react";
import type { GenerativeUIComponentProps } from "@copilotkit/react-core/v2/generative-ui";

function ProductCard({ productId, name, onAddToCart }: GenerativeUIComponentProps<typeof shopUI, "ProductCard">) {
  const [error, setError] = useState<string>();
  return (
    <article>
      <h4>{name}</h4>
      <button
        onClick={async () => {
          const result = await onAddToCart?.({ productId });
          if (result) setError(result.ok ? undefined : result.error.message);
        }}
      >
        Add to cart
      </button>
      {error ? <p role="alert">{error}</p> : null}
    </article>
  );
}
// ── end doc ──

// ── doc: state-and-actions prose block "app/catalog.tsx" (functions + events, verbatim) ──
export const shopUI = createGenerativeUI({
  id: "acme/shop@1",
  functions: {
    addToCart: {
      description: "Add a product to the cart",
      parameters: z.object({ productId: z.string(), quantity: z.number().default(1) }),
    },
  },
  components: {
    ProductCard: {
      component: ProductCard,
      props: z.object({ productId: z.string(), name: z.string() }),
      events: { onAddToCart: {} },
    },
  },
});
// ── end doc ──

// ── doc: state-and-actions prose block "CartActions" (verbatim) ──
import { useGenerativeUIFunction } from "@copilotkit/react-core/v2/generative-ui";

export function CartActions({ cart }: { cart: Cart }) {
  useGenerativeUIFunction(shopUI, "addToCart", ({ productId, quantity }) => {
    cart.addItem(productId, quantity);
    return { added: productId };
  });
  return null;
}
// ── end doc ── (`export` added: harness glue)
