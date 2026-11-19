"use client";

// "Show live app state": the page's `app/catalog.tsx` block and its CartState
// block. Neither prints its imports, `ProductCard` or `Cart`; the marked lines
// supply them.
import { z } from "zod"; // harness glue: not imported
import { createGenerativeUI } from "@copilotkit/react-core/v2/generative-ui"; // harness glue: not imported
import { GlueProductCard as ProductCard, type Cart } from "../../_shared/shop-glue"; // harness glue: used, never defined

// ── doc: state-and-actions prose block "app/catalog.tsx" (state + bind, verbatim) ──
const cartSchema = z.object({
  items: z.array(z.object({ productId: z.string(), quantity: z.number() })),
});

export const shopUI = createGenerativeUI({
  id: "acme/shop@1",
  state: { cart: cartSchema },
  components: {
    ProductCard: {
      component: ProductCard,
      props: z.object({ productId: z.string(), name: z.string(), inCart: z.number() }),
      bind: {
        inCart: (state, { productId }) =>
          state.cart.items.find((item) => item.productId === productId)?.quantity ?? 0,
      },
    },
  },
});
// ── end doc ──

// ── doc: state-and-actions prose block "CartState" (verbatim) ──
import { useGenerativeUIState } from "@copilotkit/react-core/v2/generative-ui";

export function CartState({ cart }: { cart: Cart }) {
  useGenerativeUIState(shopUI, "cart", { items: cart.items });
  return null;
}
// ── end doc ── (`export` added: harness glue, so the demo can mount it)
