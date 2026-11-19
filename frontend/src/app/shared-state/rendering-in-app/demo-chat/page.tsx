"use client";

/**
 * Render agent state in your app: the doc's `app/page.tsx` and
 * `components/Canvas.tsx`, mounted as published.
 *
 * Harness glue: this wrapper. Its "use client" is the labelled minimal fix
 * for the doc files having none: everything they import becomes client code.
 */
import { DemoFrame } from "@/components/demo-frame";

import DocPage from "../_demo/app/page";
import "../_demo/app-shell.css";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/shared-state/rendering-in-app"
      subtitle="agent: default → shared-state-read-write (own runtime)"
    >
      <DocPage />
    </DemoFrame>
  );
}
