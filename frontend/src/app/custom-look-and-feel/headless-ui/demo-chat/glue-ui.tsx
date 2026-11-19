/**
 * Harness glue (minimal) — NOT from the docs.
 *
 * The bubbles block uses `Avatar`, `AvatarFallback` (shadcn), `cn`
 * (`@/lib/utils` in a shadcn app), the types `MultimodalPart` and
 * `Attachment`, and `AttachmentChip` — and imports or defines none of them.
 * These are the smallest stand-ins that let the printed bubbles render.
 */
import type { ReactNode } from "react";
import type { UserMessage } from "@ag-ui/core";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Avatar({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <span className={cn("relative flex shrink-0 overflow-hidden rounded-full", className)}>
      {children}
    </span>
  );
}

export function AvatarFallback({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <span className={cn("flex h-full w-full items-center justify-center rounded-full", className)}>
      {children}
    </span>
  );
}

/** One part of a multimodal user message, as AG-UI types it. */
export type MultimodalPart = Exclude<UserMessage["content"], string>[number];

/** What `splitContent` builds for each non-text part. */
export type Attachment = {
  id: string;
  type: Exclude<MultimodalPart["type"], "text">;
  source: Extract<MultimodalPart, { source: unknown }>["source"];
  filename?: string;
  size?: number;
  status: "uploading" | "ready";
};

export function AttachmentChip({ attachment }: { attachment: Attachment }) {
  return (
    <span className="rounded-md border px-2 py-1 text-xs">
      📎 {attachment.filename ?? attachment.type}
      {attachment.size ? ` · ${Math.round(attachment.size / 1024)} KB` : ""}
    </span>
  );
}

/** The message-list block wraps activity messages in `ActivityWrapper`, never defined. */
export function ActivityWrapper({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>;
}
