// ── doc: catalogs prose block "Combine catalogs" (verbatim, plus two marked imports) ──
import { createGenerativeUI, standardUI } from "@copilotkit/react-core/v2/generative-ui";
import { z } from "zod"; // harness glue: used, not imported
import { cartUI, Hero } from "../../_shared/shop-glue"; // harness glue: used, never defined

export const appUI = createGenerativeUI({
  id: "acme/app@1",
  extends: [standardUI, cartUI],
  components: { Hero: { component: Hero, props: z.object({ title: z.string() }) } },
});
// ── end doc ──
