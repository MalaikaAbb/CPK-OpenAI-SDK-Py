/**
 * The agent ids the harness runtime registers.
 *
 * Each id is mounted by `backend/server.py` at `${AGENT_ORIGIN}/<id>`
 * (harness glue — see the `multi-agent-mounting-unpublished` doc gap). Each
 * route group lists its own ids under `lib/agent-ids/`; they must match the
 * keys of that group's `AGENTS` in `backend/demo_agents/agents_<group>.py`.
 */
import { CHAT_UI_AGENT_IDS } from "@/lib/agent-ids/chat-ui";
import { COMPONENTS_AGENT_IDS } from "@/lib/agent-ids/components";
import { GEN_UI_AGENT_IDS } from "@/lib/agent-ids/gen-ui";
import { STATE_HITL_AGENT_IDS } from "@/lib/agent-ids/state-hitl";

/**
 * The Quickstart's runtime id for its one agent, served at `/agent`. Every
 * page that needs no backend config of its own shares it.
 */
export const SHARED_AGENT_ID = "openai_agent";

export const PAGE_AGENT_IDS: readonly string[] = [
  ...CHAT_UI_AGENT_IDS,
  ...GEN_UI_AGENT_IDS,
  ...COMPONENTS_AGENT_IDS,
  ...STATE_HITL_AGENT_IDS,
];

/**
 * The Quickstart reads AGENT_URL as the full endpoint URL
 * (`http://localhost:8000/agent`). Page agents live on the same server, so
 * the harness takes its origin.
 */
export const AGENT_URL = process.env.AGENT_URL ?? "http://localhost:8000/agent";
export const AGENT_ORIGIN = new URL(AGENT_URL).origin;

/** The AG-UI endpoint for a page agent. The shared id maps to `/agent`. */
export function agentUrl(id: string): string {
  return id === SHARED_AGENT_ID ? `${AGENT_ORIGIN}/agent` : `${AGENT_ORIGIN}/${id}`;
}
