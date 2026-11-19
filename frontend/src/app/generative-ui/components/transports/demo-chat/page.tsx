"use client";

import { DemoFrame } from "@/components/demo-frame";

import { GenUIDemo } from "../../_shared/genui-demo";
import { markdownTransport, someAgents, toolTransport } from "./configs";

/** The Transports page's runtime (`generativeUI: true`), not the overview's. */
const RUNTIME_URL = "/api/genui-transports";
const WELCOME = "Try: compare the Starter, Team, and Enterprise plans in a table.";

export default function DemoPage() {
  return (
    <DemoFrame parentPath="/generative-ui/components/transports" subtitle="agent: default (genui_components) · runtime generativeUI: true">
      <GenUIDemo
        variants={[
          {
            id: "tool",
            label: "Tool transport",
            note: "The agent calls render_ui; the table arrives as its own message.",
            runtimeUrl: RUNTIME_URL,
            generativeUI: toolTransport,
            welcome: WELCOME,
          },
          {
            id: "markdown",
            label: "Markdown transport",
            note: "The agent writes ```a2ui blocks inside its reply; the table sits in the text.",
            runtimeUrl: RUNTIME_URL,
            generativeUI: markdownTransport,
            welcome: WELCOME,
          },
          {
            id: "some-agents",
            label: 'agentIds: ["shop"] — chat as default',
            note: "No page defines a shop agent, so only the outside half is testable: default is not in agentIds, so its runs get no catalog.",
            runtimeUrl: RUNTIME_URL,
            generativeUI: someAgents,
            welcome: WELCOME,
          },
        ]}
      />
    </DemoFrame>
  );
}
