// Harness: minimal labelled fix — the prose file has no "use client" but
// calls a hook (useCopilotChatConfiguration) at module level of an app/ page,
// which fails the build as a Server Component.
"use client";

// ── doc: Threads Drawer prose block "app/page.tsx" — NewConversationButton (verbatim except the labelled URL) ──
import {
  CopilotKitProvider,
  CopilotChatConfigurationProvider,
  CopilotChat,
  CopilotThreadsDrawer,
  useCopilotChatConfiguration,
} from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";

function NewConversationButton() {
  const configuration = useCopilotChatConfiguration(); 

  return (
    <button
      type="button"
      onClick={() => configuration?.startNewThread()} 
    >
      New conversation
    </button>
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
          <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <header>
              <NewConversationButton />
            </header>
            <CopilotChat />
          </main>
        </div>
      </CopilotChatConfigurationProvider>
    </CopilotKitProvider>
  );
}
// ── end doc ──
