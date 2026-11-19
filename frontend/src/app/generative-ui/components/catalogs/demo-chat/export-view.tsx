"use client";

// ── doc: catalogs prose block "Export the catalog" (import + first call verbatim) ──
import { exportA2UICatalog } from "@copilotkit/react-core/v2/generative-ui";
// ── end doc ──

import { appUI } from "./combine";
import { panelUI } from "./panel-order";

/**
 * The page's next line is `fs.writeFileSync("acme-catalog.json", ...)`: `fs`
 * is never imported, and a browser has no `fs`. Harness glue: the same object
 * is printed instead. The second block checks "Positional parameter order":
 * the page says the export lists Panel's properties as component, title,
 * children, color.
 */
export function ExportView() {
  // ── doc (verbatim) ──
  const catalog = exportA2UICatalog(appUI, { title: "Acme app" });
  // ── end doc ──

  const panel = exportA2UICatalog(panelUI);
  const panelEntry = panel.components.Panel as { properties?: Record<string, unknown> } | undefined;
  const order = Object.keys(panelEntry?.properties ?? {});

  return (
    <div className="space-y-4 text-xs">
      <div>
        <p className="font-semibold">exportA2UICatalog(panelUI) → Panel.properties order</p>
        <p className="font-mono">{order.join(", ") || "(no properties)"}</p>
        <p className="text-slate-500">Expected by the page: component, title, children, color</p>
      </div>
      <div>
        <p className="font-semibold">
          exportA2UICatalog(appUI, {"{"} title: &quot;Acme app&quot; {"}"}) — {Object.keys(catalog.components).length} components
        </p>
        <pre className="mt-1 max-h-[60vh] overflow-auto rounded bg-slate-100 p-2 dark:bg-slate-900">
          {JSON.stringify(catalog, null, 2)}
        </pre>
      </div>
    </div>
  );
}
