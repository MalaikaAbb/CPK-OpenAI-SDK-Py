"use client";

import { VariantTabs } from "@/app/_chat-ui/variant-tabs";

import ControlledChatDemo from "./controlled-chat";
import DrawerChatPage from "./drawer-chat";
import CustomizedDrawer from "./drawer-customized";
import NewConversationPage from "./drawer-new-conversation";
import DrawerSidebarPage from "./drawer-sidebar";

/** Harness glue: one tab per Threads Drawer prose block; each mounts its own provider. */
export function DrawerTabs() {
  return (
    <VariantTabs
      variants={[
        { id: "chat", label: "drawer + CopilotChat", note: "Block 1: zero-prop drawer beside the chat in a shared configuration provider.", render: () => <DrawerChatPage /> },
        { id: "sidebar", label: "drawer + CopilotSidebar", note: "Block 2: the same drawer driving a sidebar (YourMainContent is a harness placeholder).", render: () => <DrawerSidebarPage /> },
        { id: "new", label: "New conversation button", note: "Block 3: startNewThread() from your own button (the file needed \"use client\" — labelled fix).", render: () => <NewConversationPage /> },
        { id: "controlled", label: "controlled threadId", note: "Block 4: your state owns threadId; onThreadSelect / onNewThread write to it.", render: () => <ControlledChatDemo /> },
        { id: "custom", label: "::part + slot", note: "Blocks 5 & 7: hide the new-thread buttons with ::part, header text via slot=\"header\".", render: () => <CustomizedDrawer /> },
      ]}
    />
  );
}
