/**
 * Harness glue — NOT from the docs.
 *
 * renderers.tsx (Code-tab imports) uses this from `../_components/`, which
 * neither the prose nor the Code tab publishes. Minimal: just the props the
 * renderers pass.
 */
import type { ButtonHTMLAttributes } from "react";

export function Button({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 ${className}`}
      {...props}
    />
  );
}
