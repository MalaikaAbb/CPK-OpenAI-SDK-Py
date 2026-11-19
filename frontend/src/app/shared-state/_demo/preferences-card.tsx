"use client";

/**
 * Harness glue — NOT from the docs.
 *
 * The Shared State page prints `handlePreferencesChange(next)` but not the
 * editor that calls it. This is the smallest form that does: one field per
 * key the agent's prompt names (name, tone, language, interests). Each edit
 * calls `onChange` with the whole new Preferences object.
 */
import type { Preferences } from "./types";

export function PreferencesCard({
  preferences,
  onChange,
}: {
  preferences: Preferences;
  onChange: (next: Preferences) => void;
}) {
  const field =
    "mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-950";
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-base font-semibold">Preferences</h2>
      <p className="text-sm text-slate-500">
        Written to agent state with <code>agent.setState</code> on every edit.
      </p>
      <div className="mt-4 space-y-3 text-sm">
        <label className="block">
          Name
          <input
            data-testid="pref-name"
            className={field}
            value={preferences.name}
            onChange={(e) => onChange({ ...preferences, name: e.target.value })}
          />
        </label>
        <label className="block">
          Tone
          <input
            data-testid="pref-tone"
            className={field}
            placeholder="e.g. formal, playful"
            value={preferences.tone}
            onChange={(e) => onChange({ ...preferences, tone: e.target.value })}
          />
        </label>
        <label className="block">
          Language
          <input
            data-testid="pref-language"
            className={field}
            placeholder="e.g. Spanish"
            value={preferences.language}
            onChange={(e) =>
              onChange({ ...preferences, language: e.target.value })
            }
          />
        </label>
        <label className="block">
          Interests (comma separated)
          <input
            data-testid="pref-interests"
            className={field}
            value={preferences.interests.join(", ")}
            onChange={(e) =>
              onChange({
                ...preferences,
                interests: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
        </label>
      </div>
    </section>
  );
}
