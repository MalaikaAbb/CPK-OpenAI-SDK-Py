import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DIR = "frontend/src/app/custom-look-and-feel/slots/demo-chat";

export default function Page() {
  return (
    <>
      <RouteHeader path="/custom-look-and-feel/slots" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Every visible part of <code>&lt;CopilotChat&gt;</code> is a slot
          that takes either a class string, a props object, or a replacement
          component — and slots nest (an assistant message&apos;s toolbar and
          copy button are slots of the assistant-message slot). Each prose
          snippet runs in its own tab.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["(component slots tab) look before typing, then send “hi”"]}
            expect="A dashed WelcomeScreen marker around the empty chat, a dashed Input.Disclaimer under the composer, and each assistant reply inside a MessageView.AssistantMessage marker."
            fail="Default welcome screen / no markers — the slot override was ignored."
          />
          <TryIt
            prompts={["(custom messageView tab) Tell me a joke"]}
            expect="No bubbles: your text right-aligned, the reply left-aligned as plain text, “Thinking...” while running."
            fail="The default bubbles — the messageView component was not used."
          />
          <TryIt
            prompts={["(nested slots / inline copyButton tabs) Say hi"]}
            expect="Orange/red markers around the reply toolbar and copy icon (nested), or a plain “Copy” button (inline)."
            fail="Default toolbar and copy icon."
          />
        </div>
      </Panel>

      <Panel
        title="Prose snippets (verbatim, one file each)"
        description="Fragments that the page prints as bare JSX get a minimal `export function Chat()` wrapper, labelled."
      >
        <SourceCodeGroup
          files={[
            { file: `${DIR}/teaching-extract.tsx` },
            { file: `${DIR}/tailwind-strings.tsx` },
            { file: `${DIR}/props-object.tsx` },
            { file: `${DIR}/custom-message-view.tsx` },
            { file: `${DIR}/nested-slots.tsx` },
            { file: `${DIR}/copy-button.tsx` },
            { file: `${DIR}/tool-calls-view.tsx` },
            { file: `${DIR}/labels.tsx` },
          ]}
        />
      </Panel>

      <Panel
        title="Components the prose names but never defines"
        description="From the Code tab where it has them (slot-wrappers.tsx, trimmed to the five needed); harness glue for the rest."
      >
        <SourceCodeGroup
          files={[
            { file: `${DIR}/slot-wrappers.tsx` },
            { file: `${DIR}/slot-marker.tsx` },
            { file: `${DIR}/toolbar-glue.tsx` },
            { file: `${DIR}/page.tsx` },
          ]}
        />
      </Panel>

      <Callout tone="warn" title="Doc bugs kept verbatim">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            The teaching extract is cut off: <code>ChatSlotsTeachingExtracts</code>{" "}
            is never closed and never renders anything, and its three
            components exist only as <code>declare const</code>.
          </li>
          <li>
            <code>CustomMessageView = (&#123; messages, isRunning &#125;) =&gt;</code>{" "}
            has untyped parameters (fails a strict build — kept behind{" "}
            <code>@ts-expect-error</code>), and it renders{" "}
            <code>msg.content</code>, which is not always a string.
          </li>
        </ul>
      </Callout>
    </>
  );
}
