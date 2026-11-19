import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, CodeBlock, Panel, TryIt } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/custom-look-and-feel/css" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Re-skinning the prebuilt chat with CSS alone: a stylesheet scoped to
          a wrapper class overrides colours, type and message bubbles without
          touching any component, while global rules (theme tokens on{" "}
          <code>[data-copilotkit]</code>, the <code>copilotKit*</code> class
          names) restyle every chat on the page. Two prop-based snippets from
          the page (<code>labels</code>, <code>icons</code>) run in their own
          tabs.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["(theme.css tab) Hello — describe yourself in two sentences."]}
            expect="Warm parchment background, serif type, and your message as a mono card with a copper left rule and a → marker."
            fail="The default CopilotKit look — theme.css did not load or its selectors no longer match the v2 DOM."
          />
          <TryIt
            prompts={["(labels tab) look before typing"]}
            expect='Welcome text "Hello! How can I help you today?" and placeholder "Ask me anything!".'
            fail="Default welcome text / placeholder."
          />
        </div>
      </Panel>

      <Panel
        title="The scoped theme (from Code tab)"
        description="The prose prints the import line and two excerpts of theme.css; the full stylesheet and the page around it come from the Code tab."
      >
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/custom-look-and-feel/css/demo-chat/chat-customization-css.tsx" },
            { file: "frontend/src/app/custom-look-and-feel/css/demo-chat/theme.css" },
          ]}
        />
      </Panel>

      <Panel title="globals.css prose blocks and prop snippets (verbatim)">
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/custom-look-and-feel/css/demo-chat/prose-globals.css" },
            { file: "frontend/src/app/custom-look-and-feel/css/demo-chat/prose-props.tsx" },
            { file: "frontend/src/app/custom-look-and-feel/css/demo-chat/page.tsx" },
          ]}
        />
      </Panel>

      <Panel
        title="Shown, not run: CopilotKitCSSProperties"
        description="This prose block imports from @copilotkit/react-ui, a v1 package that is not in the Quickstart's install line and is not installed here. The --copilot-kit-* variables are v1 tokens; react-core v2 does not export the type."
      >
        <CodeBlock
          language="tsx"
          code={`import { CopilotKitCSSProperties } from "@copilotkit/react-ui";

<div
  style={
    {
      "--copilot-kit-primary-color": "#222222",
    } as CopilotKitCSSProperties
  }
>
  <CopilotSidebar />
</div>`}
        />
      </Panel>

      <Callout tone="warn" title="Doc bugs kept verbatim">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <code>icons</code> is not a prop of v2 <code>CopilotChat</code>;
            the snippet sits behind <code>@ts-expect-error</code> and has no
            effect.
          </li>
          <li>
            <code>font-family: &quot;Arial, sans-serif&quot;</code> is one
            quoted family name, so the sans-serif fallback never applies.
          </li>
        </ul>
      </Callout>
    </>
  );
}
