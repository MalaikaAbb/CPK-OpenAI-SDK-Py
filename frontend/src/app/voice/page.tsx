import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const V = "frontend/src/app/voice/demo-chat";

export default function Page() {
  return (
    <>
      <RouteHeader path="/voice" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Speech input for the chat. The page gives the Copilot Runtime a
          transcription service; the runtime then advertises the capability,
          the chat composer grows a mic button on its own, recorded audio goes
          to the runtime&apos;s <code>/transcribe</code> endpoint, and the
          transcript is sent like a typed message. A second, mic-free path
          drops a canned phrase into the composer for scripted testing.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["Click the mic, say “What is two plus two?”, stop recording"]}
            expect="A mic button in the composer; after stopping, the transcript appears and is sent, and the agent answers."
            fail="No mic button — the runtime reported transcription as disabled: OPENAI_TRANSCRIPTION_API_KEY is not set in frontend/.env.local (the service is only built when it is)."
          />
          <TryIt
            prompts={["Click “Try a sample audio”, then Send"]}
            expect="The sample sentence appears in the composer; sending it gets an answer."
            fail="Text appears but the run fails with a 404 / agent error: the route called the wrong backend URL — see the AGENT_URL note below."
          />
        </div>
      </Panel>

      <Callout tone="warn" title="AGENT_URL means two different things">
        <p>
          The voice route builds <code>{"`${AGENT_URL}/voice`"}</code>, so it
          expects an origin (<code>http://localhost:8000</code>). The
          Quickstart&apos;s route uses the same variable as the full endpoint
          (<code>http://localhost:8000/agent</code>). With the Quickstart value
          set, voice calls <code>/agent/voice</code> and 404s. Leave{" "}
          <code>AGENT_URL</code> unset (both routes fall back to the right
          default) or point it at the origin. Also, the only printed backend
          serves <code>/agent</code>; the harness mounts the Quickstart agent
          again at <code>/voice</code> (glue).
        </p>
      </Callout>

      <Panel title="Runtime route and transcription service (verbatim)">
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/api/copilotkit-voice/[[...slug]]/route.ts" },
            { file: "frontend/src/lib/transcription-service.ts" },
          ]}
        />
      </Panel>

      <Panel title="Page and sample button (verbatim) + VoiceChat (harness glue)">
        <SourceCodeGroup
          files={[
            { file: `${V}/voice-page.tsx` },
            { file: `${V}/sample-audio-button.tsx` },
            { file: `${V}/voice-chat.tsx` },
            { file: "backend/demo_agents/agents_chat_ui.py" },
          ]}
        />
      </Panel>
    </>
  );
}
