"use client";

/**
 * Harness glue — the page's `app/layout.tsx` step, moved into the demo.
 *
 * The doc wraps the ROOT layout's children in its `Providers` (which carries
 * `generativeUI={{ ui: standardUI }}`). The harness's root layout is shared by
 * every route, so the page's `Providers` is mounted here, nested, around the
 * page's `app/page.tsx`. This path is in the route's `nestedProviderPaths`.
 *
 * The doc's layout, for reference:
 *   <html lang="en"><body><Providers>{children}</Providers></body></html>
 */
import { DemoFrame } from "@/components/demo-frame";

import DocPage from "./doc-page";
import { Providers } from "./providers";

export default function DemoPage() {
  return (
    <DemoFrame
      parentPath="/generative-ui/components"
      subtitle="agent: default → genui_components (OpenAI Agents SDK, swapped for the page's BuiltInAgent)"
    >
      <div className="h-full">
        <Providers>
          <DocPage />
        </Providers>
      </div>
    </DemoFrame>
  );
}
