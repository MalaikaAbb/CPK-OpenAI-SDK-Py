"use client";

/**
 * Harness glue: the page prints no provider. This is the drawer page's
 * `<CopilotKitProvider>`, pointed at the Threads runtime (/api/threads), plus
 * a layout so the printed components have room. A second column runs the
 * pagination fragment.
 */
import { CopilotKitProvider } from "@copilotkit/react-core/v2";

import App from "./app";
import { ThreadSidebarPagination } from "./thread-sidebar";

export function HeadlessThreadsDemo() {
  return (
    <CopilotKitProvider runtimeUrl="/api/threads">
      <div className="headless-threads-demo grid h-full grid-cols-[1fr_14rem] gap-0">
        <div className="min-h-0 overflow-auto p-3 [&>div]:h-full [&>div>*:last-child]:flex-1">
          <App />
        </div>
        <aside className="border-l p-3 text-xs">
          <p className="mb-2 font-semibold">Pagination fragment</p>
          <ThreadSidebarPagination />
        </aside>
      </div>
    </CopilotKitProvider>
  );
}
