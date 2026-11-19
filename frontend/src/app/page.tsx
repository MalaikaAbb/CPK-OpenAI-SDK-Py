import Link from "next/link";

import { RouteHeader, StatusBadge } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Panel } from "@/components/ui";
import { NAV } from "@/lib/nav-config";

export default function Page() {
  return (
    <>
      <RouteHeader path="/" />

      <Panel title="How this harness is put together">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <li>
            <strong>Backend</strong> (<code>backend/</code>, Python): the
            Quickstart&apos;s <code>main.py</code>, unchanged, serves the shared
            agent at <code>/agent</code>. <code>server.py</code> (harness glue)
            mounts each page-specific agent from{" "}
            <code>demo_agents/</code> at <code>/&lt;agent-id&gt;</code> with the
            same <code>add_openai_agents_fastapi_endpoint</code> call.
          </li>
          <li>
            <strong>Runtimes</strong> (<code>frontend/src/app/api/</code>): the
            Quickstart&apos;s single-route runtime at{" "}
            <code>/api/copilotkit</code>, verbatim; the harness runtime at{" "}
            <code>/api/harness</code> that registers every agent; and a runtime
            for each page that publishes its own runtime config.
          </li>
          <li>
            <strong>Each route</strong> shows its doc gaps first, then what it
            demonstrates, the code it runs (read from disk), and an{" "}
            <em>Open demo</em> link to a full-screen live demo.
          </li>
          <li>
            <strong>Labels</strong>: code from the doc page&apos;s prose is
            verbatim. Anything else is labelled <em>from Code tab</em> (taken
            from the page&apos;s demo Code tab, trimmed to what the feature
            needs) or <em>harness glue</em> (written here, no doc source).
          </li>
        </ul>
      </Panel>

      <Panel title="Routes">
        <div className="space-y-5">
          {NAV.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {group.title}
              </h3>
              <ul className="mt-2 space-y-1.5">
                {group.routes.map((r) => (
                  <li key={r.path} className="flex items-center gap-3 text-sm">
                    <StatusBadge status={r.status} />
                    <Link href={r.path} className="underline underline-offset-4">
                      {r.title}
                    </Link>
                    {r.agentId && (
                      <code className="text-xs text-slate-500">{r.agentId}</code>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="The backend glue">
        <SourceCodeGroup
          files={[
            { file: "backend/main.py" },
            { file: "backend/server.py" },
            { file: "backend/demo_agents/_common.py" },
          ]}
        />
      </Panel>
    </>
  );
}
