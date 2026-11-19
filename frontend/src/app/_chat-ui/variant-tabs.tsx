"use client";

/**
 * Harness glue — NOT from the docs.
 *
 * Several chat-UI pages print a handful of independent snippets (one prop
 * each). A demo route runs every snippet, one at a time: the tab strip picks
 * which one is mounted, and only that one is mounted, so each snippet gets a
 * fresh chat (and at most one nested <CopilotKit> exists on the page).
 */
import { useState, type ReactNode } from "react";

export interface Variant {
  id: string;
  label: string;
  /** One line under the tabs: which doc block this is, and any labelled glue. */
  note?: ReactNode;
  render: () => ReactNode;
}

export function VariantTabs({ variants }: { variants: Variant[] }) {
  const [active, setActive] = useState(variants[0]?.id);
  const current = variants.find((v) => v.id === active) ?? variants[0];

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 flex-wrap gap-1 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
        {variants.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActive(v.id)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium ${
              v.id === current?.id
                ? "bg-[var(--accent)] text-white"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
      {current?.note && (
        <p className="shrink-0 border-b border-slate-200 px-4 py-1.5 text-xs text-slate-500 dark:border-slate-800">
          {current.note}
        </p>
      )}
      <div key={current?.id} className="relative min-h-0 flex-1 overflow-auto">
        {current?.render()}
      </div>
    </div>
  );
}
