"use client";

/** Harness glue: mounts the Code tab's interrupt-headless page in the demo frame. */
import { DemoFrame } from "@/components/demo-frame";

import InterruptHeadlessDemo from "../_demo/interrupt-headless/page";

export default function Page() {
  return (
    <DemoFrame
      parentPath="/human-in-the-loop/headless"
      subtitle="agent: interrupt-headless · from Code tab (no prose code)"
    >
      <InterruptHeadlessDemo />
    </DemoFrame>
  );
}
