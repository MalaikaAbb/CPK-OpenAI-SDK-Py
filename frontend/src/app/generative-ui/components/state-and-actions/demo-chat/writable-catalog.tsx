"use client";

// "Keep what the user types": the page prints the `CheckoutForm` entry and the
// component. The catalog around the entry and the imports are harness glue;
// it is named `shopUI` because the component's props type refers to it.
import { z } from "zod";
import {
  createGenerativeUI,
  type GenerativeUIComponentProps,
} from "@copilotkit/react-core/v2/generative-ui";

// ── doc: state-and-actions prose block "CheckoutForm" component (verbatim) ──
function CheckoutForm({ email, setEmail }: GenerativeUIComponentProps<typeof shopUI, "CheckoutForm">) {
  return <input value={email ?? ""} onChange={(event) => setEmail(event.target.value)} />;
}
// ── end doc ──

export const shopUI = createGenerativeUI({
  id: "acme/shop@1",
  components: {
    // ── doc: state-and-actions prose block "CheckoutForm" entry (verbatim) ──
    CheckoutForm: {
      component: CheckoutForm,
      props: z.object({ email: z.string().optional() }),
      writable: ["email"],
    },
    // ── end doc ──
  },
});
