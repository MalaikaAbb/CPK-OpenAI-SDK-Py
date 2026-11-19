"use client";

/**
 * Harness glue — NOT from the docs.
 *
 * The page's provider fragment wraps `{children}`; nothing on the page or in
 * the Code tab defines the chat that goes there (the Code tab imports an
 * unpublished `./chat`). The smallest chat for the doc's agent id.
 */
import { CopilotChat } from "@copilotkit/react-core/v2";

export function Chat() {
  return <CopilotChat agentId="a2ui-fixed-schema" className="h-full" />;
}
