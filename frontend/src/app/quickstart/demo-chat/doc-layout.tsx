// ── doc: Quickstart prose block "app/layout.tsx" (verbatim except where labelled) ──
//
// Harness changes, each labelled inline:
//   1. The doc's file is a ROOT layout (`<html><body>`). The harness already
//      has a root layout (app/layout.tsx, with its own app-wide provider), and
//      a root layout can't be nested, so `<html>`/`<body>` are commented out
//      and this renders inside the demo route instead.
//   2. `import "./globals.css"` is commented out: the harness root layout
//      already loads app/globals.css.
//   3. `enableInspector={nestedInspectorSetting}` added: one Inspector per
//      page (the root provider stands down on this path).
//
// Other chat-UI demos whose pages print no provider of their own reuse this
// component, i.e. they run under the Quickstart's provider exactly as an app
// built from the Quickstart would.
import { CopilotKit } from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";
// import "./globals.css"; // harness: loaded by the harness root layout

import { nestedInspectorSetting } from "@/lib/inspector"; // harness glue

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <html lang="en">   — harness: not a root layout here
    //   <body>           — harness: not a root layout here
        <CopilotKit
          runtimeUrl="/api/copilotkit"
          agent="openai_agent"
          enableInspector={nestedInspectorSetting} // harness glue
        >
          {children}
        </CopilotKit>
    //   </body>
    // </html>
  );
}
// ── end doc ──
