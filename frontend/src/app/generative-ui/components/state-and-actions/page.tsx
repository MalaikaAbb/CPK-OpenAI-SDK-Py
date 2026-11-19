import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Panel, TryIt } from "@/components/ui";

const BASE = "frontend/src/app/generative-ui/components/state-and-actions/demo-chat";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/components/state-and-actions" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Generated components wired into the app: props filled from live app state (<code>state</code> +{" "}
          <code>bind</code>), events that run browser-side functions with no agent round trip, events that turn a
          click into a message to the agent, and writable props that keep what the user typed.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["(App state tab) click + p1 twice, then: show a product card for p1 Trail Runner"]}
            expect="The card shows “In cart: 2”; clicking + p1 again updates it to 3 without a new agent turn."
            fail="In cart stays 0 or only changes after another message — bind/useGenerativeUIState is not wired."
          />
          <TryIt
            prompts={["(Run code on click tab) show a product card for p3 Track Spike → click Add to cart"]}
            expect="The cart panel shows p3 × 1 immediately and no message is sent to the agent."
          />
          <TryIt
            prompts={["(Send a click tab) show a plan card for the Team plan → click Choose Team"]}
            expect="A visible user message appears and the agent answers it."
          />
          <TryIt
            prompts={["(Keep what the user types tab) show a checkout form with the email set to me@example.com → edit it"]}
            expect="The input starts with me@example.com and keeps your edits."
          />
        </div>
      </Panel>

      <Panel title="The page's code (running)">
        <SourceCodeGroup
          files={[
            { file: `${BASE}/state-catalog.tsx` },
            { file: `${BASE}/functions-catalog.tsx` },
            { file: `${BASE}/events-catalog.tsx` },
            { file: `${BASE}/writable-catalog.tsx` },
            { file: `${BASE}/declarations.ts` },
          ]}
        />
      </Panel>

      <Panel title="The demo">
        <SourceCodeGroup files={[{ file: `${BASE}/page.tsx` }, { file: `${BASE}/sections.tsx` }]} />
      </Panel>
    </>
  );
}
