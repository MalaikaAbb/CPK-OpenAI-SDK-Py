"use client"; // harness: the prose blocks print no directive

import { CopilotChat } from "@copilotkit/react-core/v2"; // prose block 1 prints this import

import { currentUser, toast, uploadToStorage } from "./helpers"; // harness glue (stubs)

// Each export wraps one prose block; the wrappers (`export function …`,
// `return (`) are harness glue because the page prints bare JSX.

export function Basic() {
  return (
    // ── doc: Multimodal prose block "page.tsx" (verbatim except the labelled id) ──
<CopilotChat
  agentId="openai_agent" // harness: doc prints agentId="my-agent", registered by no printed runtime
  attachments={{ enabled: true }} 
/>
    // ── end doc ──
  );
}

export function AcceptAndSize() {
  return (
    // ── doc: Multimodal prose block "accept / maxSize" (verbatim) ──
<CopilotChat
  attachments={{
    enabled: true,
    // Omit `accept` to allow all file types (default: "*/*").
    // Restrict with a MIME filter if needed:
    accept: "image/*,audio/*,video/*,application/pdf",
    maxSize: 10 * 1024 * 1024,      // 10MB limit (default: 20MB)
  }}
/>
    // ── end doc ──
  );
}

export function Base64Upload() {
  return (
    // ── doc: Multimodal prose tab "Base64 (inline)" (verbatim) ──
<CopilotChat
  attachments={{
    enabled: true,
    onUpload: async (file) => {
      const buffer = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
      return {
        type: "data",
        value: base64,
        mimeType: file.type,
      };
    },
  }}
/>
    // ── end doc ──
  );
}

export function UrlUpload() {
  return (
    // ── doc: Multimodal prose tab "URL (hosted)" (verbatim; /api/upload is a harness stub) ──
<CopilotChat
  attachments={{
    enabled: true,
    onUpload: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const { url } = await res.json();
      return {
        type: "url",
        value: url,
        mimeType: file.type,
      };
    },
  }}
/>
    // ── end doc ──
  );
}

export function WithMetadata() {
  return (
    <CopilotChat // harness glue: the prose prints only the onUpload property
      attachments={{
        enabled: true, // harness glue
// ── doc: Multimodal prose block "metadata" (verbatim) ──
onUpload: async (file) => {
  const url = await uploadToStorage(file);
  return {
    type: "url",
    value: url,
    mimeType: file.type,
    metadata: {
      uploadedBy: currentUser.id,
      category: "support-ticket",
    },
  };
},
// ── end doc ──
      }}
    />
  );
}

export function Concurrency() {
  return (
    // ── doc: Multimodal prose block "maxConcurrentUploads" (verbatim) ──
<CopilotChat
  attachments={{
    enabled: true,
    maxConcurrentUploads: 3, // three files at a time
    // @ts-expect-error doc bug: uploadToStorage resolves to a URL string (as the metadata block uses it), but onUpload must return an AttachmentUploadResult
    onUpload: async (file) => uploadToStorage(file),
  }}
/>
    // ── end doc ──
  );
}

export function UploadFailed() {
  return (
    // ── doc: Multimodal prose block "onUploadFailed" (verbatim) ──
<CopilotChat
  attachments={{
    enabled: true,
    accept: "image/*",
    maxSize: 5 * 1024 * 1024, // 5MB
    onUploadFailed: (error) => {
      // error.reason: "file-too-large" | "invalid-type" | "upload-failed"
      // error.file: the original File object
      // error.message: human-readable description
      toast.error(error.message);
    },
  }}
/>
    // ── end doc ──
  );
}

export function OnError() {
  return (
    // ── doc: Multimodal prose block "onError" (verbatim) ──
<CopilotChat
  attachments={{ enabled: true }}
  onError={(event) => {
    // @ts-expect-error doc bug: CopilotChat onError is typed as a union with React SyntheticEvent in 1.87, so event.code/event.error do not type-check
    console.error(`[${event.code}]`, event.error.message);
  }}
/>
    // ── end doc ──
  );
}
