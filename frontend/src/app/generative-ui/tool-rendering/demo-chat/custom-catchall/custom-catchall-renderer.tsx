"use client";

/**
 * Harness glue — NOT from the docs.
 *
 * The page's custom catch-all block renders `<CustomCatchallRenderer>` and
 * casts to `CatchallToolStatus`, and neither the prose nor the Code tab
 * publishes them. This is the smallest component that takes exactly the props
 * the doc passes (name, parameters, status, result) and shows each, so the
 * wildcard renderer is visibly different from the built-in card.
 */

export type CatchallToolStatus = "inProgress" | "executing" | "complete";

export function CustomCatchallRenderer({
  name,
  parameters,
  status,
  result,
}: {
  name: string;
  parameters: unknown;
  status: CatchallToolStatus;
  result?: unknown;
}) {
  return (
    <div
      data-testid="custom-catchall"
      className="my-2 rounded-lg border border-violet-300 bg-violet-50 p-3 text-xs text-violet-950 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono font-semibold">{name}</span>
        <span className="rounded-full border border-current px-2 py-0.5">
          {status === "complete" ? "done" : status}
        </span>
      </div>
      <pre className="mt-2 whitespace-pre-wrap break-all font-mono">
        {JSON.stringify(parameters ?? {}, null, 2)}
      </pre>
      {status === "complete" && result !== undefined && (
        <pre className="mt-2 whitespace-pre-wrap break-all border-t border-violet-200 pt-2 font-mono dark:border-violet-800">
          {typeof result === "string" ? result : JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
