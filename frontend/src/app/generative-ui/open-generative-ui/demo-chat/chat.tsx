"use client";

/**
 * Harness glue — NOT from the docs.
 *
 * The minimal page renders `<Chat />`; neither the prose nor the Code tab
 * defines it (the Code tab imports an unpublished `./chat`). The page's own
 * comment says a plain chat is enough.
 */
import { CopilotChat } from "@copilotkit/react-core/v2";

export function Chat() {
  return <CopilotChat agentId="open-gen-ui" className="flex-1 rounded-2xl" />;
}
