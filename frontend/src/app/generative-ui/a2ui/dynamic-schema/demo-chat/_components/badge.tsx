/**
 * Harness glue — NOT from the docs.
 *
 * renderers.tsx (Code-tab imports) uses this from `../_components/`, which
 * neither the prose nor the Code tab publishes. Minimal: just the props the
 * renderers pass.
 */
import type { HTMLAttributes } from "react";

const VARIANTS: Record<string, string> = {
  error: "border-rose-300 bg-rose-50 text-rose-800",
  warning: "border-amber-300 bg-amber-50 text-amber-800",
  success: "border-emerald-300 bg-emerald-50 text-emerald-800",
  info: "border-sky-300 bg-sky-50 text-sky-800",
};

export function Badge({
  variant = "info",
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${VARIANTS[variant] ?? VARIANTS.info} ${className}`}
      {...props}
    />
  );
}
