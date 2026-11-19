"use client";

/**
 * useInterrupt page, block "ApprovalInterrupt" — verbatim between the markers.
 * The page prints no import for useInterrupt and no export; both are glue.
 */
import { useInterrupt } from "@copilotkit/react-core/v2"; // harness glue

// ── doc: useInterrupt prose block "ApprovalInterrupt" (verbatim) ──
function ApprovalInterrupt() {
  useInterrupt({
    render: ({ interrupt, resolve, cancel }) => (
      <div className="p-3 border rounded">
        <p>{interrupt?.message ?? "Approve this action?"}</p>
        <div className="mt-2 flex gap-2">
          <button onClick={() => resolve({ approved: true })}>Approve</button>
          <button onClick={() => cancel()}>Cancel</button>
        </div>
      </div>
    ),
  });
  return null;
}
// ── end doc ──

export { ApprovalInterrupt }; // harness glue
