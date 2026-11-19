"use client";

import { DemoFrame } from "@/components/demo-frame";
import { VariantTabs } from "@/app/_chat-ui/variant-tabs";
import RootLayout from "@/app/quickstart/demo-chat/doc-layout";

import {
  AcceptAndSize,
  Base64Upload,
  Basic,
  Concurrency,
  OnError,
  UploadFailed,
  UrlUpload,
  WithMetadata,
} from "./snippets";

/** Harness glue: one tab per Multimodal prose block, under the Quickstart's provider. */
export default function Page() {
  return (
    <DemoFrame
      parentPath="/multimodal-attachments"
      subtitle="agent: openai_agent (doc: my-agent) · runtime: /api/copilotkit (Quickstart provider)"
    >
      <RootLayout>
        <VariantTabs
          variants={[
            { id: "basic", label: "enabled", note: "attachments={{ enabled: true }} — paperclip + drag-and-drop.", render: () => <Basic /> },
            { id: "accept", label: "accept / maxSize", note: "Only images, audio, video, PDF; 10 MB cap.", render: () => <AcceptAndSize /> },
            { id: "base64", label: "onUpload: base64", note: "Inline base64. Doc bug: the spread into String.fromCharCode overflows the stack on large files (try a multi-MB image).", render: () => <Base64Upload /> },
            { id: "url", label: "onUpload: URL", note: "POSTs to /api/upload (harness stub that returns a data: URL).", render: () => <UrlUpload /> },
            { id: "meta", label: "metadata", note: "uploadToStorage + currentUser (harness stubs); metadata rides on the content part.", render: () => <WithMetadata /> },
            { id: "concurrency", label: "maxConcurrentUploads", note: "Doc bug: onUpload returns a bare URL string — expect the attachment to fail or arrive malformed.", render: () => <Concurrency /> },
            { id: "failed", label: "onUploadFailed", note: "Images only, 5 MB: drop a PDF or a big image → toast.error (harness stub = alert).", render: () => <UploadFailed /> },
            { id: "onerror", label: "onError", note: "Errors after sending (e.g. unsupported file type) are logged to the console as [code] message.", render: () => <OnError /> },
          ]}
        />
      </RootLayout>
    </DemoFrame>
  );
}
