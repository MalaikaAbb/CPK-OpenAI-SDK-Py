import { createGenerativeUI, standardUI } from "@copilotkit/react-core/v2/generative-ui"; // harness glue: the snippet prints no imports

// ── doc: standard-catalog prose block "Drop components" (verbatim) ──
export const appUI = createGenerativeUI({
  id: "acme/app@1",
  extends: [standardUI.omit(["Map", "Video", "HtmlView"])],
  components: {},
});
// ── end doc ──
