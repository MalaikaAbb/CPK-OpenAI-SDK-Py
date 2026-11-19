/**
 * Harness glue — stub. NOT from the docs.
 *
 * Both WebMCP snippets call `searchOrders(status)` and the page never defines
 * it (as published, it is a "Cannot find name" error and a ReferenceError
 * when the tool runs). These three orders are this repo's, so the tool has
 * something to return.
 */
type OrderStatus = "open" | "shipped" | "delivered";

const ORDERS: { id: string; item: string; status: OrderStatus }[] = [
  { id: "ord_1001", item: "Mechanical keyboard", status: "open" },
  { id: "ord_1002", item: "USB-C dock", status: "shipped" },
  { id: "ord_1003", item: "27-inch monitor", status: "delivered" },
];

export async function searchOrders(status: OrderStatus) {
  return ORDERS.filter((o) => o.status === status);
}
