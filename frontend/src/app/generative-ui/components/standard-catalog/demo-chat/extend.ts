// ── doc: standard-catalog prose block "Add your own components" (verbatim, plus one marked import) ──
import { createGenerativeUI, standardUI } from "@copilotkit/react-core/v2/generative-ui";
import { GlueProductCard as ProductCard, productSchema } from "../../_shared/shop-glue"; // harness glue: used, never defined

export const appUI = createGenerativeUI({
  id: "acme/app@1",
  extends: [standardUI],
  components: {
    ProductCard: { component: ProductCard, props: productSchema },
  },
});
// ── end doc ──
