"use client";

/**
 * Harness glue — NOT from the docs.
 *
 * Says whether this browser exposes WebMCP (`navigator.modelContext`, via
 * @copilotkit/core's getWebMCPModelContext). Without it, CopilotKit skips the
 * WebMCP registration and the tool still works for the in-app agent. The page
 * points to Chrome 149+ with the origin trial or
 * chrome://flags/#enable-webmcp-testing, plus Chrome's Model Context Tool
 * Inspector extension, to see the tool from outside.
 */
import { getWebMCPModelContext } from "@copilotkit/core";
import { useEffect, useState } from "react";

export function ModelContextStatus() {
  const [available, setAvailable] = useState<boolean | null>(null);
  useEffect(() => {
    setAvailable(getWebMCPModelContext() !== null);
  }, []);
  if (available === null) return null;
  return (
    <p
      data-testid="webmcp-status"
      className={`rounded-md border px-3 py-2 text-xs ${
        available
          ? "border-emerald-300 bg-emerald-50 text-emerald-900"
          : "border-amber-300 bg-amber-50 text-amber-900"
      }`}
    >
      {available
        ? "navigator.modelContext found: searchOrders is registered with the browser. Check it with Chrome's Model Context Tool Inspector."
        : "navigator.modelContext not found: this browser has no WebMCP (Chrome 149+ with the origin trial or chrome://flags/#enable-webmcp-testing needed). The tool is still available to the in-app agent."}
    </p>
  );
}
