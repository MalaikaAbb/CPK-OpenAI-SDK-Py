"use client";

/**
 * Shared State: read and write agent state from the UI.
 *
 * The two doc regions are the page's `page.tsx` snippets, verbatim. The page
 * prints no component around them, no provider and no chat; that markup, the
 * reads of `agent.state` and the Clear handler are harness glue. The root
 * provider (`/api/harness`) serves the agent.
 */
import {
  CopilotChat,
  useAgent,
  UseAgentUpdate,
} from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";

import { NotesCard } from "../_demo/notes-card";
import { PreferencesCard } from "../_demo/preferences-card";
import type { Preferences, RWAgentState } from "../_demo/types";

// Harness glue: what the editor shows before anything is in state.
const EMPTY_PREFERENCES: Preferences = {
  name: "",
  tone: "",
  language: "",
  interests: [],
};

function SharedStateDemo() {
  // ── doc: shared-state prose block "src/app/demos/shared-state-read-write/page.tsx" #1 (verbatim) ──
  // Subscribe the component to agent state changes. Any time the agent
  // mutates its state (e.g. via its `set_notes` tool) this hook fires,
  // we re-render, and the sidebar panels reflect the new values.
  const { agent } = useAgent({
    agentId: "shared-state-read-write",
    updates: [UseAgentUpdate.OnStateChanged],
  });
  // ── end doc ──

  // Harness glue: the page uses `notes` and the current preferences without
  // showing where they come from.
  const state = (agent.state ?? {}) as Partial<RWAgentState>;
  const preferences = state.preferences ?? EMPTY_PREFERENCES;
  const notes = state.notes ?? [];

  // ── doc: shared-state prose block "src/app/demos/shared-state-read-write/page.tsx" #2 (verbatim) ──
  // WRITE: every edit in the sidebar goes straight into agent state.
  // On the agent's next turn, its dynamic instructions show the model this
  // state — so the UI's writes visibly steer the model.
  const handlePreferencesChange = (next: Preferences) => {
    agent.setState({
      preferences: next,
      notes, // preserve what the agent has written
    } as RWAgentState);
  };
  // ── end doc ──

  // Harness glue: NotesCard's `onClear` write-back.
  const handleClearNotes = () => {
    agent.setState({ preferences, notes: [] } as RWAgentState);
  };

  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-[24rem_1fr]">
      <div className="space-y-4 overflow-y-auto border-r border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
        <PreferencesCard
          preferences={preferences}
          onChange={handlePreferencesChange}
        />
        <NotesCard notes={notes} onClear={handleClearNotes} />
      </div>
      <div className="chat-host">
        <CopilotChat agentId="shared-state-read-write" />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <DemoFrame parentPath="/shared-state" subtitle="agent: shared-state-read-write">
      <SharedStateDemo />
    </DemoFrame>
  );
}
