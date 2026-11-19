"use client";

/**
 * useInterrupt page, the multi-interrupt block — verbatim between the markers.
 * The page prints the bare `useInterrupt({...})` call with no enclosing
 * component and no import. `MultiInterrupt` and the import are harness glue.
 */
import { useInterrupt } from "@copilotkit/react-core/v2"; // harness glue

export function MultiInterrupt() {
  // ── doc: useInterrupt prose block "multiple interrupts" (verbatim) ──
  useInterrupt({
    render: ({ interrupts, resolve, cancel }) => (
      <ul>
        {interrupts.map((i) => (
          <li key={i.id}>
            {i.message}
            <button onClick={() => resolve({ ok: true }, i.id)}>Approve</button>
            <button onClick={() => cancel(i.id)}>Cancel</button>
          </li>
        ))}
      </ul>
    ),
  });
  // ── end doc ──
  return null;
}
