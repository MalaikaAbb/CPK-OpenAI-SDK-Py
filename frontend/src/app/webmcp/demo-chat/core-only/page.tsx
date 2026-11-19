"use client";

/**
 * WebMCP — webmcp.ts (core only, no React provider).
 *
 * Harness glue: this page. It loads the doc's module on the client only (the
 * module builds a CopilotKitCore when it is evaluated) and shows what that
 * core holds. With WebMCP in the browser, the core registers searchOrders
 * with navigator.modelContext. Without WebMCP there is nothing to see outside
 * this page. No in-app agent calls this core, because the snippet configures
 * no runtime.
 */
import { useEffect, useState } from "react";

import { DemoFrame } from "@/components/demo-frame";

import { ModelContextStatus } from "../../_demo/model-context-status";

export default function Page() {
  const [tools, setTools] = useState<string[] | null>(null);

  useEffect(() => {
    void import("../../_demo/webmcp").then(({ copilotkit }) => {
      setTools(copilotkit.tools.map((t) => t.name));
    });
  }, []);

  return (
    <DemoFrame parentPath="/webmcp" subtitle="CopilotKitCore({ tools }) · no provider">
      <div className="mx-auto max-w-2xl space-y-4 p-6 text-sm">
        <ModelContextStatus />
        <p>
          Tools on the doc&apos;s <code>copilotkit</code> core:{" "}
          <code data-testid="core-tools">
            {tools === null ? "loading…" : JSON.stringify(tools)}
          </code>
        </p>
        <p className="text-slate-500">
          To call the tool, open Chrome&apos;s Model Context Tool Inspector on
          this tab and run <code>searchOrders</code> with a status. The stub
          returns one matching order.
        </p>
      </div>
    </DemoFrame>
  );
}
