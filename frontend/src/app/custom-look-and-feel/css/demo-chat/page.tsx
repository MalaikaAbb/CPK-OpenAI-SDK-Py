"use client";

import { DemoFrame } from "@/components/demo-frame";
import { VariantTabs } from "@/app/_chat-ui/variant-tabs";
import RootLayout from "@/app/quickstart/demo-chat/doc-layout";

import ChatCustomizationCssDemo from "./chat-customization-css";
import { IconsChat, LabelsChat } from "./prose-props";
import "./prose-globals.css";

/**
 * Harness glue: one tab per runnable piece of the CSS page. The Halcyon tab
 * is the page's own demo (Code tab page + theme.css, with its own provider);
 * the prose-prop tabs run under the Quickstart's provider, since the page
 * prints none for them. The globals.css prose blocks are loaded for the
 * whole demo (see prose-globals.css).
 */
export default function Page() {
  return (
    <DemoFrame
      parentPath="/custom-look-and-feel/css"
      subtitle="agent: openai_agent · runtime: /api/copilotkit"
    >
      <VariantTabs
        variants={[
          {
            id: "halcyon",
            label: "theme.css (scoped)",
            note: "Code-tab page + full theme.css, scoped to .chat-css-demo-scope. The globals.css prose blocks also apply (global selectors).",
            render: () => <ChatCustomizationCssDemo />,
          },
          {
            id: "labels",
            label: "labels",
            note: "Prose block “labels”: welcome text and placeholder should change.",
            render: () => (
              <RootLayout>
                <LabelsChat />
              </RootLayout>
            ),
          },
          {
            id: "icons",
            label: "icons (v1 prop)",
            note: "Prose block “icons”: not a v2 prop — expect no visible change (kept verbatim behind @ts-expect-error).",
            render: () => (
              <RootLayout>
                <IconsChat />
              </RootLayout>
            ),
          },
        ]}
      />
    </DemoFrame>
  );
}
