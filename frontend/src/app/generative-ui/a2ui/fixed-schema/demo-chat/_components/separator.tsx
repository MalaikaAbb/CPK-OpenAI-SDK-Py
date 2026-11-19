/**
 * Harness glue — NOT from the docs.
 *
 * renderers.tsx (Code-tab imports) uses this from `../_components/`, which
 * neither the prose nor the Code tab publishes. Minimal: just the props the
 * renderers pass.
 */
export function Separator({ className = "" }: { className?: string }) {
  return <div role="separator" className={`h-px ${className}`} />;
}
