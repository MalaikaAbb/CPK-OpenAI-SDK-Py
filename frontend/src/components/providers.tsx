"use client";

import { CopilotKitProvider } from "@copilotkit/react-core/v2";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { rootInspectorSetting } from "@/lib/inspector";

/**
 * Harness glue: one provider for the whole app, pointed at the harness runtime
 * (`/api/harness`), which registers the Quickstart's `openai_agent` plus every
 * page agent. No default `agent` — each demo names its agent with `agentId`.
 *
 * Demos whose doc page publishes its own `<CopilotKit>` mount it nested and
 * list the path in `nestedProviderPaths` so this provider's inspector yields.
 */
export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <CopilotKitProvider
      runtimeUrl="/api/harness"
      useSingleEndpoint={false}
      showDevConsole={rootInspectorSetting(pathname)}
      onError={(event) => {
        console.error(`[CopilotKit ${event.code}]`, event.error);
      }}
    >
      {children}
    </CopilotKitProvider>
  );
}
