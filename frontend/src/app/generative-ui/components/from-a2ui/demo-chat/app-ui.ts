// ── doc: from-a2ui prose block "After" catalog (verbatim, plus two marked imports) ──
import {
  createGenerativeUI,
  standardUI,
} from "@copilotkit/react-core/v2/generative-ui";
import { z } from "zod"; // harness glue: used, not imported
import { Airport, Arrow } from "../../_shared/shop-glue"; // harness glue: used, never defined

export const appUI = createGenerativeUI({
  id: "acme/flights@1",
  extends: [standardUI],
  components: {
    Airport: {
      component: Airport,
      description: "An airport by IATA code, with its city under it.",
      props: z.object({ code: z.string(), city: z.string() }),
    },
    Arrow: { component: Arrow, description: "An arrow between two airports." },
  },
});
// ── end doc ──
