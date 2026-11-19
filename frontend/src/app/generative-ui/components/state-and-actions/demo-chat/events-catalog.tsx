"use client";

// "Send a click to the agent": the page prints an `events:` fragment only. The
// component that fires it (PlanCard) and the catalog around it are harness
// glue; the `onChoose` declaration is verbatim. No function named `choose`
// exists, so a click becomes a user message to the agent.
import { z } from "zod";
import {
  createGenerativeUI,
  type GenerativeUIComponentProps,
} from "@copilotkit/react-core/v2/generative-ui";

/** Harness glue: the page never shows a component that fires `onChoose`. */
function PlanCard({ plan, onChoose }: GenerativeUIComponentProps<typeof plansUI, "PlanCard">) {
  return (
    <article className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-700">
      <h4 className="font-medium">{plan}</h4>
      <button type="button" className="mt-2 rounded border px-2 py-1 text-xs" onClick={() => onChoose?.({ plan })}>
        Choose {plan}
      </button>
    </article>
  );
}

export const plansUI = createGenerativeUI({
  id: "harness/plans@1",
  components: {
    PlanCard: {
      component: PlanCard,
      description: "One pricing plan the user can choose.",
      props: z.object({ plan: z.string() }),
      // ── doc: state-and-actions prose block "Send a click to the agent" (verbatim) ──
      events: {
        onChoose: {
          description: "The user picked a plan",
          parameters: z.object({ plan: z.string() }),
        },
      },
      // ── end doc ──
    },
  },
});
