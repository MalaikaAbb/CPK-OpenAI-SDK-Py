/**
 * Harness glue: says up front whether the Threads runtime has Intelligence,
 * so a locked drawer / empty thread list reads as "no key", not "broken".
 */
export function IntelligenceBanner({ enabled }: { enabled: boolean }) {
  if (enabled) return null;
  return (
    <div className="shrink-0 border-b border-violet-300 bg-violet-50 px-4 py-2 text-xs text-violet-900 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-100">
      <strong>Requires premium — CopilotKit Intelligence.</strong>{" "}
      CPK_INTELLIGENCE_API_KEY is not set for the Next server, so /api/threads
      runs without Intelligence: expect the drawer&apos;s locked view and no
      threads. Chat still works.
    </div>
  );
}
