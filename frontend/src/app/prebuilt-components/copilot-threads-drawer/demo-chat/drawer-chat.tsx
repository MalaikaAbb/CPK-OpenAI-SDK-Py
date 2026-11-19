"use client"; // harness: not in the prose (the variant is mounted from a client tab strip)

// ── doc: Threads Drawer prose block "app/page.tsx" — with CopilotChat (verbatim except the labelled URL) ──
import {
  CopilotKitProvider,
  CopilotChatConfigurationProvider,
  CopilotChat,
  CopilotThreadsDrawer,
} from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";

export default function Page() {
  return (
    <CopilotKitProvider
      runtimeUrl="/api/threads" // harness: doc prints "/api/copilotkit" — that's the Quickstart's route (no Intelligence); /api/threads is the harness's Intelligence runtime
    >
      <CopilotChatConfigurationProvider>
        <div style={{ display: "flex", height: "100dvh" }}>
          <CopilotThreadsDrawer />
          <CopilotChat />
        </div>
      </CopilotChatConfigurationProvider>
    </CopilotKitProvider>
  );
}
// ── end doc ──
