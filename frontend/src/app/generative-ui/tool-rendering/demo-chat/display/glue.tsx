"use client";

/**
 * Harness glue — NOT from the docs.
 *
 * The grouping snippets name two components the reader is meant to write
 * (`MyToolRow`, `ToolTimeline`); neither the prose nor the Code tab defines
 * them. These are the smallest versions that take the props the page says
 * they receive, so the two options can be seen working.
 */
import type {
  CopilotChatToolCallGroupProps,
  useDefaultRenderTool,
} from "@copilotkit/react-core/v2";

type RenderProps = Parameters<
  NonNullable<NonNullable<Parameters<typeof useDefaultRenderTool>[0]>["render"]>
>[0];

/** One compact line per call; `group: true` lets the chat collapse these. */
export function MyToolRow({ name, status }: RenderProps) {
  return (
    <div data-testid="my-tool-row" className="flex items-center gap-2 py-0.5 text-xs">
      <span className={status === "complete" ? "text-emerald-600" : "text-amber-600"}>
        {status === "complete" ? "✓" : "…"}
      </span>
      <span className="font-mono">{name}</span>
    </div>
  );
}

/** Group slot: the page says it gets the group's `calls` and a `renderCall`. */
export function ToolTimeline({ calls, renderCall }: CopilotChatToolCallGroupProps) {
  return (
    <ol
      data-testid="tool-timeline"
      className="my-2 border-l-2 border-sky-400 pl-3 text-xs"
    >
      <li className="mb-1 font-semibold text-sky-700 dark:text-sky-300">
        Timeline · {calls.length} call{calls.length === 1 ? "" : "s"}
      </li>
      {calls.map((call) => (
        <li key={call.toolCall.id}>{renderCall(call)}</li>
      ))}
    </ol>
  );
}
