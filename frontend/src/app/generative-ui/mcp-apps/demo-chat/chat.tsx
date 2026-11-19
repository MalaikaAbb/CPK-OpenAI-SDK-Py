"use client";

/**
 * Harness glue — NOT from the docs.
 *
 * The page renders `<Chat />` and neither the prose nor the Code tab defines
 * it (the Code tab imports an unpublished `./chat`). The page's own comment
 * says a plain chat is enough, so that is all this is.
 */
import { CopilotChat } from "@copilotkit/react-core/v2";

export function Chat() {
  return <CopilotChat agentId="mcp-apps" className="h-full" />;
}
