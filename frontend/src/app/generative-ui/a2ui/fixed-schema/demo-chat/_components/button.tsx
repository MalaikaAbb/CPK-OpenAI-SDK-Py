/**
 * Harness glue — NOT from the docs.
 *
 * renderers.tsx (Code-tab imports) uses this from `../_components/`, which
 * neither the prose nor the Code tab publishes. Minimal: just the props the
 * renderers pass.
 */
import type { ButtonHTMLAttributes } from "react";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900 ${className}`}
      {...props}
    />
  );
}
