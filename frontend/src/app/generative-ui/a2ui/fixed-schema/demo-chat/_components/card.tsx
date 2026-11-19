/**
 * Harness glue — NOT from the docs.
 *
 * renderers.tsx (Code-tab imports) uses this from `../_components/`, which
 * neither the prose nor the Code tab publishes. Minimal: just the props the
 * renderers pass.
 */
import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 ${className}`}
      {...props}
    />
  );
}
