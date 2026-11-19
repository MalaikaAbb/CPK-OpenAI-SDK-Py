"use client";

/**
 * Harness glue — NOT from the docs.
 *
 * The page's page.tsx renders `<Chat />` from `./chat`; neither the prose nor
 * the Code tab publishes it. The smallest chat for the provider's agent.
 */
import { CopilotChat } from "@copilotkit/react-core/v2";

export function Chat() {
  return <CopilotChat agentId="declarative-gen-ui" className="h-full" />;
}
