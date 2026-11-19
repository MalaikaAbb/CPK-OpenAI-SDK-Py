/**
 * Governed Action Approval UI — `handleApproval`, verbatim between the markers.
 *
 * Shown, not run. The page calls it agent-side code, but it is TypeScript
 * and this framework's agents are Python. The page also publishes no backend
 * that would call it. Its `executeSideEffect` is never defined, so a labelled
 * stub stands in to keep the file compiling.
 */
import type { GovernedAction } from "./governed-action"; // harness glue

// Harness glue — stub. The page calls executeSideEffect and never defines it.
async function executeSideEffect(
  tool: string,
  args: Record<string, unknown>,
): Promise<{ executed: true; tool: string; arguments: Record<string, unknown> }> {
  return { executed: true, tool, arguments: args };
}

// ── doc: governed-actions prose block "ApprovalResponse / handleApproval" (verbatim) ──
type ApprovalResponse = {
  approved: boolean;
  actionId: string;
  reference: string;
};

async function handleApproval(action: GovernedAction, response: ApprovalResponse) {
  if (
    response.approved &&
    response.actionId === action.id &&
    response.reference === action.reference
  ) {
    return executeSideEffect(action.tool, action.arguments);
  }

  return {
    skipped: true,
    reason: "The user did not approve this action.",
  };
}
// ── end doc ──

export { handleApproval }; // harness glue
export type { ApprovalResponse }; // harness glue
