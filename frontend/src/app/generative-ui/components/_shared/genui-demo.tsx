"use client";

/**
 * Harness glue — NOT from the docs. Chrome shared by the Components and
 * surfaces demos.
 *
 * Several pages publish more than one provider config (catalog, transport,
 * theme, error boundary). Each config is a variant; picking one remounts a
 * nested `<CopilotKitProvider>` under a new `key`, so chat, surfaces and
 * catalog start clean.
 *
 * Placement (labelled): the overview page puts `generativeUI` on the provider
 * in the ROOT layout. Doing that here would turn generative UI on for every
 * route, so each demo mounts its own provider instead (listed in the route's
 * `nestedProviderPaths`, so the root provider's inspector stands down).
 * `runtimeUrl` is `/api/genui` (the overview page's runtime, moved off
 * `/api/copilotkit`) unless a variant names another.
 */
import { CopilotChat, CopilotKitProvider } from "@copilotkit/react-core/v2";
import type { GenerativeUIConfig } from "@copilotkit/react-core/v2/generative-ui";
import { useState, type ReactNode } from "react";

import { nestedInspectorSetting } from "@/lib/inspector";

export const GENUI_RUNTIME_URL = "/api/genui";

/** Harness glue: the agent with the fake-data products tool (see app/api/genui). */
export const SHOP_AGENT_ID = "genui_shop";

export interface Variant {
  id: string;
  label: string;
  /** What this variant changes, shown above the demo. */
  note?: ReactNode;
  generativeUI?: GenerativeUIConfig;
  runtimeUrl?: string;
  /** Omitted = the doc's `<CopilotChat />` with no agentId ("default"). */
  agentId?: string;
  /** Page content beside the chat: surfaces, app state, … */
  page?: ReactNode;
  /** No chat at all (variants with nothing to send). */
  noChat?: boolean;
  welcome?: string;
}

export function GenUIDemo({ variants }: { variants: Variant[] }) {
  const [current, setCurrent] = useState(variants[0]);

  return (
    <div className="flex h-full flex-col">
      {variants.length > 1 && (
        <div className="flex shrink-0 flex-wrap gap-2 border-b border-slate-200 p-2 dark:border-slate-800">
          {variants.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setCurrent(v)}
              className={`rounded-md border px-3 py-1 text-xs font-medium ${
                current.id === v.id
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-slate-300 text-slate-600 dark:border-slate-600 dark:text-slate-300"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}
      {current.note && (
        <p className="shrink-0 border-b border-slate-200 px-3 py-1.5 text-xs text-slate-500 dark:border-slate-800">
          {current.note}
        </p>
      )}

      <div className="min-h-0 flex-1">
        <CopilotKitProvider
          key={current.id}
          runtimeUrl={current.runtimeUrl ?? GENUI_RUNTIME_URL}
          enableInspector={nestedInspectorSetting}
          {...(current.generativeUI ? { generativeUI: current.generativeUI } : {})}
        >
          <div className="flex h-full">
            {current.page && (
              <div className="min-w-0 flex-1 overflow-y-auto p-4">{current.page}</div>
            )}
            {!current.noChat && (
              <div
                className={`min-h-0 ${
                  current.page
                    ? "w-[28rem] shrink-0 border-l border-slate-200 dark:border-slate-800"
                    : "flex-1"
                }`}
              >
                <CopilotChat
                  {...(current.agentId ? { agentId: current.agentId } : {})}
                  labels={{ welcomeMessageText: current.welcome ?? "Ask for something visual." }}
                />
              </div>
            )}
          </div>
        </CopilotKitProvider>
      </div>
    </div>
  );
}
