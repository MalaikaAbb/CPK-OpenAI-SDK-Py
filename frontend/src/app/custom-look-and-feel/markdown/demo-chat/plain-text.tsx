"use client"; // harness: not in the prose

import { CopilotChat } from "@copilotkit/react-core/v2"; // harness: the fragment uses it without importing it

// ── doc: Markdown prose block 4 "page.tsx" — PlainText replacement (verbatim) ──
const PlainText = ({ content }: { content: string }) => (
  <pre className="whitespace-pre-wrap">{content}</pre>
);

// harness glue: the prose prints the element as a bare expression statement
export function Chat() {
  return (
<CopilotChat
  messageView={{ assistantMessage: { markdownRenderer: PlainText } }}
/>
  );
}
// ── end doc ──
