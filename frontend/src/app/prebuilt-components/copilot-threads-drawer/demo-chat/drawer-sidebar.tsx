"use client"; // harness: not in the prose

// ── doc: Threads Drawer prose block "app/page.tsx" — with CopilotSidebar (verbatim except labelled lines) ──
import {
  CopilotKitProvider,
  CopilotChatConfigurationProvider,
  CopilotSidebar,
  CopilotThreadsDrawer,
} from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";

/** Harness glue (placeholder): the snippet renders `<YourMainContent />` and never defines it. */
function YourMainContent() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600 }}>Your app</h1>
      <p style={{ fontSize: 14, opacity: 0.7 }}>Placeholder content (harness glue).</p>
    </div>
  );
}

export default function Page() {
  return (
    <CopilotKitProvider
      runtimeUrl="/api/threads" // harness: doc prints "/api/copilotkit"
    >
      <CopilotChatConfigurationProvider>
        <div style={{ display: "flex", height: "100dvh" }}>
          <CopilotThreadsDrawer />
          <main style={{ flex: 1 }}>
            <YourMainContent />
            <CopilotSidebar defaultOpen={true} />
          </main>
        </div>
      </CopilotChatConfigurationProvider>
    </CopilotKitProvider>
  );
}
// ── end doc ──
