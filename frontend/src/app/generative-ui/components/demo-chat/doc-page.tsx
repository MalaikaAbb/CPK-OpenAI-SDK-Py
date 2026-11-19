// ── doc: components prose block "app/page.tsx" (verbatim) ──
// Lives here, not at a route's page.tsx, because the harness mounts it inside
// a nested provider (see ./page.tsx).
"use client";
import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return <CopilotChat />;
}
// ── end doc ──
