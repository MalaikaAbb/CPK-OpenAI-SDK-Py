/**
 * Harness glue — NOT from the docs.
 *
 * The Shared State page's snippets use `Preferences` and `RWAgentState` and
 * never define them. Shapes taken from what the snippets and the agent's
 * prompt describe: `preferences` holds name, tone, language and interests;
 * `notes` is the string list `set_notes` writes.
 */
export type Preferences = {
  name: string;
  tone: string;
  language: string;
  interests: string[];
};

export type RWAgentState = {
  preferences: Preferences;
  notes: string[];
};
