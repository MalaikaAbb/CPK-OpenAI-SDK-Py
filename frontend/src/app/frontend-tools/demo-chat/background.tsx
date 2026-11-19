"use client";

/**
 * Harness glue — NOT from the docs.
 *
 * The Frontend Tools page imports `Background` and `DEFAULT_BACKGROUND` from
 * `./background` and never defines them (the Code tab does not include the
 * file either). This is the smallest version that lets the doc's
 * `change_background` handler have a visible effect: a full-size box painted
 * with whatever CSS background value the tool sets.
 */
import type { ReactNode } from "react";

export const DEFAULT_BACKGROUND = "#f8fafc";

export function Background({
  background,
  children,
}: {
  background: string;
  children: ReactNode;
}) {
  return (
    <div
      data-testid="frontend-tools-background"
      className="relative h-full w-full transition-[background] duration-700"
      style={{ background }}
    >
      <p className="absolute left-4 top-4 max-w-[60%] break-all rounded bg-white/70 px-2 py-1 font-mono text-[11px] text-slate-700">
        background: {background}
      </p>
      {children}
    </div>
  );
}
