// Catalogs, "Pick a schema library": the page prints two `props:` lines (zod
// tab, Valibot tab), not a catalog. The two `props` values and their imports
// are verbatim; the catalog and component around them are harness glue, so
// each line backs a real component.
// ── doc: catalogs prose block "zod" tab — import (verbatim) ──
import { z } from "zod";
// ── doc: catalogs prose block "valibot" tab — imports (verbatim) ──
import * as v from "valibot";
import { toStandardJsonSchema } from "@valibot/to-json-schema";
// ── end doc ──
import { createGenerativeUI } from "@copilotkit/react-core/v2/generative-ui";

import { GlueProductCard } from "../../_shared/shop-glue";

export const schemaLibrariesUI = createGenerativeUI({
  id: "harness/schema-libraries@1",
  components: {
    ZodProductCard: {
      component: GlueProductCard,
      description: "A product, with its props declared in zod.",
      props: z.object({ name: z.string(), price: z.number() }), // doc: zod tab, verbatim
    },
    ValibotProductCard: {
      component: GlueProductCard,
      description: "A product, with its props declared in Valibot.",
      props: toStandardJsonSchema(v.object({ name: v.string(), price: v.number() })), // doc: valibot tab, verbatim
    },
  },
});
