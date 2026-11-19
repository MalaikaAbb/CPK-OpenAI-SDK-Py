"use client";

/**
 * Harness glue — NOT from the docs.
 *
 * page.tsx imports `{ ACTIVITIES, DemoLayout } from "./demo-layout"`; neither
 * the prose nor the Code tab publishes that file. This is the smallest
 * version that lets the user edit the three values the page publishes with
 * useAgentContext: a name field, a timezone picker and activity checkboxes.
 * The activity strings and the timezone list are this repo's.
 */
export const ACTIVITIES: string[] = [
  "Viewed the Q3 revenue dashboard",
  "Edited the onboarding checklist",
  "Invited a teammate to the workspace",
  "Exported the customer list as CSV",
];

const TIMEZONES = [
  "America/Los_Angeles",
  "America/New_York",
  "Europe/London",
  "Asia/Tokyo",
];

export function DemoLayout({
  userName,
  userTimezone,
  recentActivity,
  onUserNameChange,
  onUserTimezoneChange,
  onToggleActivity,
}: {
  userName: string;
  userTimezone: string;
  recentActivity: string[];
  onUserNameChange: (v: string) => void;
  onUserTimezoneChange: (v: string) => void;
  onToggleActivity: (activity: string) => void;
}) {
  const field =
    "mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-950";
  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-6 dark:bg-slate-950">
      <section className="max-w-md space-y-4 rounded-xl border border-slate-200 bg-white p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h2 className="text-base font-semibold">Read-only context</h2>
          <p className="text-slate-500">
            Each value is published with <code>useAgentContext</code>. The
            agent can read them and has no way to change them.
          </p>
        </div>
        <label className="block">
          Name
          <input
            data-testid="ctx-name"
            className={field}
            value={userName}
            onChange={(e) => onUserNameChange(e.target.value)}
          />
        </label>
        <label className="block">
          Timezone
          <select
            data-testid="ctx-timezone"
            className={field}
            value={userTimezone}
            onChange={(e) => onUserTimezoneChange(e.target.value)}
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </label>
        <fieldset>
          <legend>Recent activity</legend>
          {ACTIVITIES.map((a) => (
            <label key={a} className="mt-1 flex items-center gap-2">
              <input
                type="checkbox"
                checked={recentActivity.includes(a)}
                onChange={() => onToggleActivity(a)}
              />
              {a}
            </label>
          ))}
        </fieldset>
      </section>
    </div>
  );
}
