"use client";

import { DemoFrame } from "@/components/demo-frame";
import { VariantTabs } from "@/app/_chat-ui/variant-tabs";
import RootLayout from "@/app/quickstart/demo-chat/doc-layout";

import { Chat as ClassStringChat } from "./class-string";
import { Chat as ComponentsChat } from "./components-override";
import { Chat as PlainTextChat } from "./plain-text";
import "./glue.css";

/** Harness glue: one tab per runnable Markdown prose block, under the Quickstart's provider. */
export default function Page() {
  return (
    <DemoFrame
      parentPath="/custom-look-and-feel/markdown"
      subtitle="agent: openai_agent · runtime: /api/copilotkit (Quickstart provider)"
    >
      <RootLayout>
        <VariantTabs
          variants={[
            {
              id: "components",
              label: "components override",
              note: "a → .my-link, h2 → .my-heading (classes styled by harness glue: magenta wavy links, ruled uppercase h2).",
              render: () => <ComponentsChat />,
            },
            {
              id: "class",
              label: "class string",
              note: "markdownRenderer as a class string: text-sm leading-7.",
              render: () => <ClassStringChat />,
            },
            {
              id: "plain",
              label: "PlainText",
              note: "Markdown rendering replaced by a <pre>: raw markdown syntax stays visible.",
              render: () => <PlainTextChat />,
            },
          ]}
        />
      </RootLayout>
    </DemoFrame>
  );
}
