import Link from "next/link";

import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DIR = "frontend/src/app/shared-state/rendering-in-app";

export default function Page() {
  return (
    <>
      <RouteHeader path="/shared-state/rendering-in-app" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The main view, not the chat, is the one that reads agent state.{" "}
          <code>Canvas</code> calls <code>useAgent()</code> with no id. Once
          the agent is ready it seeds a title and two checklist items into{" "}
          <code>agent.state</code>, then renders straight from that state. The
          sidebar chat talks to the same agent, so what the model sees and
          what the canvas shows are one object. The write-back demo adds the
          doc&apos;s <code>toggleItem</code>, which changes an item from the
          main view through <code>agent.setState</code>.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "What's on my checklist, and what is still open?",
              "(write-back demo: tick 'Build a prototype', then) What's left to do now?",
            ]}
            expect="'Project launch' appears with 'Research user needs' struck through. The agent lists both items and says the prototype is still open. In the write-back demo, ticking the checkbox strikes the item through right away, and the next answer reflects the change."
            fail="The canvas stays on 'Untitled' with no items: the agent never became ready (look for 'Agent default not found' in the console; the runtime at /api/state-hitl-default must register 'default'). The agent cannot see the items: state is not reaching the run."
          />
        </div>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Two demos:{" "}
          <Link className="underline" href="/shared-state/rendering-in-app/demo-chat" target="_blank">
            the doc&apos;s page as published
          </Link>{" "}
          and{" "}
          <Link className="underline" href="/shared-state/rendering-in-app/demo-chat/write-back" target="_blank">
            the same layout plus toggleItem
          </Link>
          .
        </p>
      </Panel>

      <Panel
        title="The doc's two files"
        description="Both complete in the prose. The labelled changes are the runtime URL and enableInspector."
      >
        <SourceCodeGroup
          files={[
            { file: `${DIR}/_demo/components/Canvas.tsx` },
            { file: `${DIR}/_demo/app/page.tsx` },
            { file: `${DIR}/demo-chat/page.tsx` },
          ]}
        />
      </Panel>

      <Panel
        title="Writing back from the main view"
        description="toggleItem is verbatim. The component around it and the write-back page are glue."
      >
        <SourceCodeGroup
          files={[
            { file: `${DIR}/_demo/item-toggles.tsx` },
            { file: `${DIR}/demo-chat/write-back/page.tsx` },
          ]}
        />
      </Panel>

      <Panel
        title="Where &quot;default&quot; comes from"
        description="Harness glue: no page publishes an agent for this id."
      >
        <SourceCode file="frontend/src/app/api/state-hitl-default/[[...slug]]/route.ts" />
      </Panel>

      <Callout tone="warn" title="Doc bugs kept">
        <ul className="space-y-1.5">
          <li>
            · Neither <code>Canvas.tsx</code> nor <code>app/page.tsx</code> has{" "}
            <code>&quot;use client&quot;</code>. Copied into a real Next app, the
            page is a server component that renders hook code, and the build
            fails. Here the harness demo page is the client boundary.
          </li>
          <li>
            · The page talks to <code>&quot;default&quot;</code>, which the
            Quickstart runtime never registers (its only agent is{" "}
            <code>openai_agent</code>).
          </li>
          <li>
            · <code>toggleItem</code> uses an <code>agent</code> it never
            declares, and nothing on the page calls it.
          </li>
        </ul>
      </Callout>
    </>
  );
}
