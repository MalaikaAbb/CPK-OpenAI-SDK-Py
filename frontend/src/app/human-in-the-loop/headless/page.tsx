import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DIR = "frontend/src/app/human-in-the-loop/headless/_demo";

export default function Page() {
  return (
    <>
      <RouteHeader path="/human-in-the-loop/headless" />

      <Callout tone="warn" title="The page prints no code">
        The doc page describes a render-less interrupt resolver, then shows a
        &quot;Not available on this framework&quot; banner. It has no code
        blocks. Its prose talks about <code>useAgent</code>,{" "}
        <code>agent.subscribe</code> and <code>copilotkit.runAgent</code>. The
        demo on its Code tab takes a different approach:{" "}
        <code>useInterrupt({"{ renderInChat: false }"})</code>, which returns
        the element for you to place yourself. This route runs that Code-tab
        demo, trimmed to the feature, against the same interrupt agent as{" "}
        <code>/human-in-the-loop/useInterrupt</code>.
      </Callout>

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The same backend pause as useInterrupt, but the UI does not appear
          in the chat transcript. With <code>renderInChat: false</code>,{" "}
          <code>useInterrupt</code> returns the rendered element, and the page
          puts it in its own &quot;Scheduling&quot; panel. Picking a slot calls{" "}
          <code>resolve</code> with <code>approved: true</code> and the chosen
          time. <code>SchedulerAgent</code> passes these to{" "}
          <code>schedule_meeting</code>, and the agent confirms in the chat.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Book an intro call with the sales team to discuss pricing.",
              "Schedule a 1:1 with Alice next week to review Q2 goals.",
            ]}
            expect="A 'Pick a time' dialog appears in the left panel, not in the chat. It shows the topic and attendee from the tool arguments, plus four slots for the next two days. Picking one shows 'Confirming your selection…', then the agent says the meeting is scheduled for that slot. Cancel makes the agent say nothing was scheduled."
            fail="The left panel stays on 'Nothing scheduled yet' while the chat stops: no interrupt reached the client, or useInterrupt is listening to the wrong agent id. The agent says no time was picked after you picked one: the resume payload did not reach SchedulerAgent."
          />
        </div>
      </Panel>

      <Panel
        title="The page (from Code tab, trimmed)"
        description="Removals are labelled in place. interrupt-fallback-slots is glue."
      >
        <SourceCodeGroup
          files={[
            { file: `${DIR}/interrupt-headless/page.tsx` },
            { file: `${DIR}/_shared/interrupt-fallback-slots.ts` },
          ]}
        />
      </Panel>

      <Panel
        title="The agent"
        description="Also served as gen-ui-interrupt. The prose fragments are from the Human in the Loop page, the rest from Code tab."
      >
        <SourceCode file="backend/demo_agents/interrupt_agent.py" />
      </Panel>
    </>
  );
}
