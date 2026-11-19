import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { CodeBlock, Panel, TryIt } from "@/components/ui";

const BASE = "frontend/src/app/generative-ui/components/theming/demo-chat";

const HTML_DARK = `<html class="dark">`;
const HEAD = `<head>
  <script dangerouslySetInnerHTML={{ __html: colorSchemeScript }} />
</head>;`;

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/components/theming" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The standard components read <code>--a2ui-*</code> CSS variables. The provider&apos;s <code>theme</code>{" "}
          sets them (accent, font, radius), a <code>dark</code> block overrides them when an ancestor has the{" "}
          <code>dark</code> class, <code>mapStyle</code> swaps the Map basemap, and plain CSS on{" "}
          <code>.a2ui-surface</code> works too.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["Show a card with a primary button, a slider, and a bar chart of three months"]}
            expect="Provider/file/CSS tabs: the button, slider and chart use amber #d97706; the provider tab also uses Inter and 10px corners."
            fail="Default accent colour — the theme never reached the surface."
          />
          <TryIt
            prompts={["(Colors per mode tab) same prompt, then press Toggle <html class=\"dark\">"]}
            expect="Panels and surfaces turn #1f2937 / #111827 in dark mode and back when toggled off."
          />
          <TryIt
            prompts={["(Map style tab) Show the Eiffel Tower on a map"]}
            expect="Map renders markers but no basemap: the page's tiles.example.com style URLs are placeholders (expected)."
          />
        </div>
      </Panel>

      <Panel title="The page's code (running)">
        <SourceCodeGroup
          files={[
            { file: `${BASE}/themes.tsx` },
            { file: `${BASE}/theme.ts` },
            { file: `${BASE}/dark-mode.tsx` },
            { file: `${BASE}/theming.css` },
            { file: `${BASE}/page.tsx` },
          ]}
        />
      </Panel>

      <Panel title="Printed by the page for the root layout (not applied)">
        <div className="space-y-4">
          <CodeBlock code={HTML_DARK} filename="Dark mode — as published" language="html" />
          <CodeBlock code={HEAD} filename="Dark mode script placement — as published (the demo renders the script in its body instead)" language="tsx" />
        </div>
      </Panel>
    </>
  );
}
