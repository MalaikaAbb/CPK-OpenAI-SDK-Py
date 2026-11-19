"use client";

import { DemoFrame } from "@/components/demo-frame";
import { VariantTabs } from "@/app/_chat-ui/variant-tabs";

import ReasoningCustomDemo from "./reasoning-custom";
import ReasoningDefaultDemo from "./reasoning-default";

/** Harness glue: the page's two cells, one tab each (each mounts its own provider). */
export default function Page() {
  return (
    <DemoFrame
      parentPath="/generative-ui/reasoning"
      subtitle="agent: reasoning (doc: reasoning-default / reasoning-custom) · runtime: /api/harness"
    >
      <VariantTabs
        variants={[
          {
            id: "custom",
            label: "custom (ReasoningBlock)",
            note: "reasoningMessage slot → the page's ReasoningBlock: a tagged “Reasoning” banner with the thinking text in italics.",
            render: () => <ReasoningCustomDemo />,
          },
          {
            id: "default",
            label: "default card",
            note: "No override: the built-in card — “Thinking…”, then “Thought for X seconds” with a chevron.",
            render: () => <ReasoningDefaultDemo />,
          },
        ]}
      />
    </DemoFrame>
  );
}
