/**
 * Harness glue (stub) — NOT from the docs.
 *
 * The feedback snippet calls `analytics.track("feedback", {...})` and never
 * defines `analytics`. It is the sink for the feature being demonstrated, so
 * this stub records each call where the demo can show it (and logs it).
 */
export type TrackedEvent = { event: string; props: Record<string, unknown>; at: string };

const listeners = new Set<(e: TrackedEvent) => void>();

export const analytics = {
  track(event: string, props: Record<string, unknown>) {
    const e = { event, props, at: new Date().toLocaleTimeString() };
    console.info("[analytics.track stub]", event, props);
    listeners.forEach((l) => l(e));
  },
  subscribe(listener: (e: TrackedEvent) => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
