import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const M = "frontend/src/app/multimodal-attachments/demo-chat";

export default function Page() {
  return (
    <>
      <RouteHeader path="/multimodal-attachments" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Files in the chat composer: one prop turns on a paperclip and
          drag-and-drop, the files travel to the agent as AG-UI content parts
          next to the text, and further options restrict types and size,
          take over the upload (inline base64 or your own hosting), attach
          metadata, cap concurrent uploads, and report failures before and
          after sending. The OpenAI Agents adapter turns image and file parts
          into Responses <code>input_image</code> / <code>input_file</code>{" "}
          items.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["(enabled tab) attach a small PNG/JPG and ask “What is in this image?”"]}
            expect="A thumbnail chip in your message, and a reply that describes the picture."
            fail="The reply says it can't see an image (content part dropped), or a RUN_ERROR — the model in use isn't vision-capable."
          />
          <TryIt
            prompts={["(onUploadFailed tab) attach a PDF"]}
            expect="The file is refused and the toast stub shows an alert with the reason (invalid type)."
            fail="The PDF is accepted, or nothing tells you it was refused."
          />
        </div>
      </Panel>

      <Panel title="Prose snippets (verbatim, one component each)">
        <SourceCodeGroup files={[{ file: `${M}/snippets.tsx` }]} />
      </Panel>

      <Panel
        title="Harness glue"
        description="Stubs for the helpers the snippets call without defining, and the upload route the URL tab posts to."
      >
        <SourceCodeGroup
          files={[
            { file: `${M}/helpers.ts` },
            { file: "frontend/src/app/api/upload/route.ts" },
            { file: `${M}/page.tsx` },
          ]}
        />
      </Panel>

      <Callout tone="warn" title="Doc bugs kept verbatim">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <code>agentId=&quot;my-agent&quot;</code> is registered by no
            printed runtime (swapped for <code>openai_agent</code>, labelled).
          </li>
          <li>
            Base64 tab: <code>String.fromCharCode(...new Uint8Array(buffer))</code>{" "}
            spreads every byte as an argument and throws{" "}
            <code>RangeError: Maximum call stack size exceeded</code> on files
            of a few MB.
          </li>
          <li>
            Concurrency block: <code>onUpload: async (file) =&gt; uploadToStorage(file)</code>{" "}
            returns whatever the helper returns, but the metadata block shows
            the same helper resolving to a URL string; <code>onUpload</code>{" "}
            must return <code>{"{ type, value, mimeType }"}</code>. Kept behind{" "}
            <code>@ts-expect-error</code>.
          </li>
        </ul>
      </Callout>
    </>
  );
}
