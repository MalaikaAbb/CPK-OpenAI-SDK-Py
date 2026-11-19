/** Must match AGENTS in backend/demo_agents/agents_components.py. */
export const COMPONENTS_AGENT_IDS: readonly string[] = [
  // Components overview: the page's BuiltInAgent swapped for an OpenAI Agents
  // SDK Agent (genui_components.py). Registered as `default` by /api/genui.
  "genui_components",
  // Harness glue: the same agent + a fake-data search_products tool.
  "genui_shop",
];
