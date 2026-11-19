// Harness glue: the Surfaces page imports `shopUI` from "./catalog" without
// printing it. The Catalogs page's `app/catalog.tsx` is the only catalog with
// ProductGrid + ProductCard, so it is re-exported from there unchanged.
export { shopUI } from "../../catalogs/demo-chat/catalog";
