// ── doc: catalogs prose block "Positional parameter order" (verbatim, plus marked lines) ──
import { createGenerativeUI } from "@copilotkit/react-core/v2/generative-ui"; // harness glue: not imported
import { z } from "zod"; // harness glue: not imported
import { Panel } from "../../_shared/shop-glue"; // harness glue: used, never defined

const ui = createGenerativeUI({
  id: "acme/panel@1",
  components: {
    Panel: {
      component: Panel,
      props: z.object({ title: z.string(), color: z.string().optional() }),
      slots: { children: "multiple" },
      parameterOrder: ["title", "children"],
    },
  },
});
// ── end doc ──

export { ui as panelUI }; // harness glue: the snippet's `ui` is module-local
