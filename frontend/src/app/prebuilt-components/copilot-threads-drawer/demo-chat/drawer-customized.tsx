"use client"; // harness: not in the prose

/**
 * Harness glue: hosts the two customization snippets (the `::part` CSS rule
 * and the `slot="header"` child) in the first block's layout. The CSS goes in
 * a <style> element rendered by this tab only, so it doesn't leak into the
 * other tabs.
 */
import {
  CopilotChat,
  CopilotChatConfigurationProvider,
  CopilotKitProvider,
  CopilotThreadsDrawer,
} from "@copilotkit/react-core/v2";

// ── doc: Threads Drawer prose block "CSS ::part" (verbatim) ──
const HIDE_NEW_THREAD_CSS = `
copilotkit-threads-drawer::part(new-thread-button),
copilotkit-threads-drawer::part(launcher-new-thread) {
  display: none;
}
`;
// ── end doc ──

export default function CustomizedDrawer() {
  return (
    <CopilotKitProvider runtimeUrl="/api/threads">
      <style>{HIDE_NEW_THREAD_CSS}</style>
      <CopilotChatConfigurationProvider>
        <div style={{ display: "flex", height: "100%" }}>
          {/* ── doc: Threads Drawer prose block "slot=header" (verbatim) ── */}
          {/* @ts-expect-error doc bug: CopilotThreadsDrawerProps (1.87) has no `children`, so slotted children are a type error */}
          <CopilotThreadsDrawer>
            <span slot="header">My conversations</span>
          </CopilotThreadsDrawer>
          {/* ── end doc ── */}
          <CopilotChat />
        </div>
      </CopilotChatConfigurationProvider>
    </CopilotKitProvider>
  );
}
