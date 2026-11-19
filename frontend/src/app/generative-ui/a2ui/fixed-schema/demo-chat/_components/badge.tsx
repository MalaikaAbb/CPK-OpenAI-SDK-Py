/**
 * Harness glue — NOT from the docs.
 *
 * renderers.tsx (Code-tab imports) uses this from `../_components/`, which
 * neither the prose nor the Code tab publishes. Minimal: just the props the
 * renderers pass.
 */
import type { HTMLAttributes } from "react";

const VARIANTS: Record<string, string> = {
  outline: "border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300",
  secondary: "border-transparent bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
};

export function Badge({
  variant = "secondary",
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${VARIANTS[variant] ?? VARIANTS.secondary} ${className}`}
      {...props}
    />
  );
}
