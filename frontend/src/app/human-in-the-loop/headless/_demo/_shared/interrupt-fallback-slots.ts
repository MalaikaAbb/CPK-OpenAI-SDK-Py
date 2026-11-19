/**
 * Harness glue — NOT from the docs.
 *
 * The Code tab's interrupt-headless page imports `generateFallbackSlots` and
 * `TimeSlot` from "../_shared/interrupt-fallback-slots", which is not
 * published. The interrupt never carries slots (the adapter sends only the
 * tool's arguments), so these are always the slots shown. Minimal version:
 * four future slots, 10:00 and 15:00 on each of the next two days.
 */
export interface TimeSlot {
  label: string;
  iso: string;
}

export function generateFallbackSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (const dayOffset of [1, 2]) {
    for (const hour of [10, 15]) {
      const d = new Date();
      d.setDate(d.getDate() + dayOffset);
      d.setHours(hour, 0, 0, 0);
      slots.push({
        label: d.toLocaleString(undefined, {
          weekday: "short",
          hour: "numeric",
          minute: "2-digit",
        }),
        iso: d.toISOString(),
      });
    }
  }
  return slots;
}
