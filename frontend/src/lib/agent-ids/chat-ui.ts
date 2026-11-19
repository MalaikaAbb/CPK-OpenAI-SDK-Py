/** Must match AGENTS in backend/demo_agents/agents_chat_ui.py. */
export const CHAT_UI_AGENT_IDS: readonly string[] = [
  // /custom-look-and-feel/reasoning-messages + /generative-ui/reasoning:
  // reasoning.py from the pages' Code tab (one agent serves both variants).
  "reasoning",
  // /voice: the Quickstart's agent mounted again at /voice, the path the
  // page's verbatim runtime route calls. Harness glue.
  "voice",
];
