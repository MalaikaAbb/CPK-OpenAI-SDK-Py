"use client";

/**
 * Harness glue — NOT from the docs.
 *
 * The Components and surfaces sub-pages use app pieces they never define:
 * `Product`, `ProductRow`, a `products` list, `Cart` with `cart.addItem`,
 * `Hero`, `Panel`, `cartUI`, `productSchema`, a `ProductCard` for the
 * Standard catalog and State-and-actions catalogs, `Airport`, `Arrow`. None
 * of these pages has a demo Code tab, so each piece below is the smallest
 * thing that lets the published snippet run (rule: only what the feature
 * needs). Every use site imports from here, so the import line alone tells
 * doc code from harness code. Each one is also a doc gap in
 * lib/gaps/components.ts.
 */

import { useCallback, useState, type ReactNode } from "react";
import { z } from "zod";
import {
  createGenerativeUI,
  type GenerativeUIComponentProps,
} from "@copilotkit/react-core/v2/generative-ui";

/** Glue: `Product` (Surfaces) is used but not defined. */
export interface Product {
  id: string;
  name: string;
  price: number;
}

/** Glue: the page's `products` value. Ids match the backend's fake search_products. */
export const PRODUCTS: Product[] = [
  { id: "p1", name: "Trail Runner", price: 120 },
  { id: "p2", name: "City Sneaker", price: 85 },
  { id: "p3", name: "Track Spike", price: 140 },
];

/** Glue: `ProductRow` (Surfaces' fallback) is rendered but not defined. */
export function ProductRow({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {products.map((p) => (
        <div key={p.id} className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-700">
          <p className="font-medium">{p.name}</p>
          <p className="text-slate-500">${p.price}</p>
        </div>
      ))}
    </div>
  );
}

/** Glue: `Cart` (State and actions) is used but not defined. */
export interface Cart {
  items: { productId: string; quantity: number }[];
  addItem: (productId: string, quantity: number) => void;
}

/** Glue: a React-state store behind the `Cart` shape. */
export function useCart(): Cart {
  const [items, setItems] = useState<Cart["items"]>([]);
  const addItem = useCallback((productId: string, quantity: number) => {
    setItems((prev) =>
      prev.some((i) => i.productId === productId)
        ? prev.map((i) => (i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i))
        : [...prev, { productId, quantity }],
    );
  }, []);
  return { items, addItem };
}

/** Glue: shows the cart so the effect of a click is visible. */
export function CartView({ cart }: { cart: Cart }) {
  return (
    <div className="rounded-lg border border-slate-200 p-3 text-xs dark:border-slate-700">
      <p className="font-semibold">Cart (app state)</p>
      {cart.items.length === 0 ? (
        <p className="text-slate-500">Empty</p>
      ) : (
        <ul>
          {cart.items.map((i) => (
            <li key={i.productId} className="font-mono">
              {i.productId} × {i.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Glue: `Hero` (Catalogs, "Combine catalogs") is used but not defined. */
export function Hero({ title }: { title: string }) {
  return <h2 className="text-2xl font-bold">{title}</h2>;
}

/** Glue: `Panel` (Catalogs, "Positional parameter order") is used but not defined. */
export function Panel({ title, color, children }: { title: string; color?: string; children?: ReactNode }) {
  return (
    <section style={{ borderColor: color }} className="rounded-lg border p-3">
      <h3 className="font-semibold">{title}</h3>
      {children}
    </section>
  );
}

/** Glue: `productSchema` (Standard catalog) is used but not defined. */
export const productSchema = z.object({ name: z.string(), price: z.number() });

/**
 * Glue: the `ProductCard` that Standard catalog ("Add your own components")
 * and State and actions ("Show live app state") register but never print.
 */
export function GlueProductCard(props: { name?: string; price?: number; productId?: string; inCart?: number }) {
  return (
    <article className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-700">
      <h4 className="font-medium">{props.name}</h4>
      {props.productId !== undefined && <p className="font-mono text-xs text-slate-500">{props.productId}</p>}
      {props.price !== undefined && <p>${props.price}</p>}
      {props.inCart !== undefined && <p className="text-xs text-slate-500">In cart: {props.inCart}</p>}
    </article>
  );
}

/** Glue: `Airport` (Adopt from A2UI) is used but not defined. */
export function Airport({ code, city }: { code: string; city: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold">{code}</p>
      <p className="text-xs text-slate-500">{city}</p>
    </div>
  );
}

/** Glue: `Arrow` (Adopt from A2UI) is used but not defined. */
export function Arrow() {
  return <span className="text-2xl">→</span>;
}

/** Glue: `cartUI` (Catalogs, "Combine catalogs") is extended but never defined. One component, so the merge has something to merge. */
function CartBadge({ count }: GenerativeUIComponentProps<typeof cartUI, "CartBadge">) {
  return <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs text-white">Cart: {count}</span>;
}

export const cartUI = createGenerativeUI({
  id: "acme/cart@1",
  components: {
    CartBadge: {
      component: CartBadge,
      description: "A small badge with the number of items in the cart.",
      props: z.object({ count: z.number() }),
    },
  },
});
