/** Must match AGENTS in backend/demo_agents/agents_gen_ui.py. */
export const GEN_UI_AGENT_IDS: readonly string[] = [
  "gen_ui_tool_based",
  "tool_rendering",
  // Also used by state-hitl's /shared-state/streaming (same doc agent).
  "shared_state_streaming",
  "a2ui_fixed_schema",
  "byoc_json_render",
  "byoc_hashbrown",
];
