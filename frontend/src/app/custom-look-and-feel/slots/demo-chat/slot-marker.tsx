/**
 * Harness glue (minimal) — NOT from the docs.
 *
 * The Code tab's slot-wrappers.tsx imports `SlotMarker` from "./slot-marker",
 * which the tab does not publish. This is the least that makes those wrappers
 * render: a dashed outline with the slot path as a badge.
 */
import type { ReactNode } from "react";

export function SlotMarker({
  color,
  label,
  inline,
  className = "",
  children,
}: {
  color: string;
  label: string;
  inline?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      data-slot-marker={label}
      style={{ borderColor: color }}
      className={`relative rounded-md border-2 border-dashed p-1 ${inline ? "inline-flex" : "flex flex-col"} ${className}`}
    >
      <span
        style={{ backgroundColor: color }}
        className="absolute -top-2 left-2 z-10 rounded px-1 font-mono text-[9px] font-bold text-white"
      >
        {label}
      </span>
      {children}
    </div>
  );
}
