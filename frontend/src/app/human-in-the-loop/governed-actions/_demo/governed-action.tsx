"use client"; // harness glue: the page prints none

/**
 * Governed Action Approval UI — the envelope type and the useInterrupt
 * approval card. Verbatim between the markers.
 *
 * Known structural bug (kept): the card reads `interrupt.metadata.action`.
 * ag-ui-openai-agents sends `metadata = { tool_name, tool_input }` for every
 * needs_approval interrupt and has no API for custom interrupt metadata, so
 * `action` is always undefined and this renders nothing.
 */

// ── doc: governed-actions prose block "GovernedAction" (verbatim) ──
type GovernedAction = {
  id: string;
  summary: string;
  tool: string;
  reference: string;
  verdict: "allow" | "deny" | "require_approval";
  arguments: Record<string, unknown>;
};
// ── end doc ──

// ── doc: governed-actions prose block "Inline approval with useInterrupt" (verbatim) ──
import { useEffect } from "react";
import { useInterrupt } from "@copilotkit/react-core/v2";

function GovernedActionApproval() {
  useInterrupt({
    // @ts-expect-error doc bug: render returns `null` (no action), but useInterrupt's render must return a ReactElement
    render: ({ interrupt, resolve, cancel }) => {
      const action = interrupt?.metadata?.action as GovernedAction | undefined;

      if (!action) {
        return null;
      }

      return (
        <GovernedActionCard
          action={action}
          onApprove={() =>
            resolve({
              approved: true,
              actionId: action.id,
              reference: action.reference,
            })
          }
          onReject={() =>
            resolve({
              approved: false,
              actionId: action.id,
              reference: action.reference,
            })
          }
          onBlock={() => cancel()}
        />
      );
    },
  });

  return null;
}

function GovernedActionCard({
  action,
  onApprove,
  onReject,
  onBlock,
}: {
  action: GovernedAction;
  onApprove: () => void;
  onReject: () => void;
  onBlock: () => void;
}) {
  useEffect(() => {
    if (action.verdict === "allow") onApprove();
    if (action.verdict === "deny") onBlock();
  }, [action.id, action.verdict]);

  const status =
    action.verdict === "allow"
      ? "Allowed by policy"
      : action.verdict === "deny"
        ? "Blocked by policy"
        : "User approval required";

  return (
    <section className="rounded-lg border p-4 shadow-sm">
      <div className="space-y-1">
        <p className="text-sm font-medium">{status}</p>
        <h3 className="text-base font-semibold">{action.summary}</h3>
        <p className="text-sm text-muted-foreground">Tool: {action.tool}</p>
        <p className="text-sm text-muted-foreground">
          Reference: {action.reference}
        </p>
      </div>

      <pre className="mt-3 overflow-auto rounded bg-muted p-3 text-xs">
        {JSON.stringify(action.arguments, null, 2)}
      </pre>

      {action.verdict === "require_approval" && (
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={onApprove}>
            Approve and run
          </button>
          <button type="button" onClick={onReject}>
            Reject
          </button>
        </div>
      )}
    </section>
  );
}
// ── end doc ──

// Harness glue: the page exports nothing; the demos and the tool block need these.
export { GovernedActionApproval, GovernedActionCard };
export type { GovernedAction };
