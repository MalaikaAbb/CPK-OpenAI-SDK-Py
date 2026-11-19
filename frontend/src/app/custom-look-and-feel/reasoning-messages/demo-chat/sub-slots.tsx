"use client"; // harness: not in the prose

// ── doc: Reasoning Messages prose block "Custom header" (verbatim) ──
import { CopilotChat } from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";

function CustomHeader({
  isOpen,
  label,
  hasContent,
  isStreaming,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isOpen?: boolean;
  label?: string;
  hasContent?: boolean;
  isStreaming?: boolean;
}) {
  return (
    <button
      className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium"
      {...props}
    >
      {isStreaming ? "🧠" : "💡"}
      <span>{label}</span>
      {hasContent && (
        <span className="ml-auto text-xs">{isOpen ? "Hide" : "Show"}</span>
      )}
    </button>
  );
}

// harness glue: the prose prints the element as a bare expression after the component
export function HeaderOnlyChat() {
  return (
<CopilotChat
  messageView={{
    reasoningMessage: { header: CustomHeader },
  }}
/>
  );
}
// ── end doc ──

// ── doc: Reasoning Messages prose block "Custom content" (verbatim) ──
function CustomContent({
  isStreaming,
  hasContent,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  isStreaming?: boolean;
  hasContent?: boolean;
}) {
  if (!hasContent && !isStreaming) return null;

  return (
    <div className="px-4 pb-3 text-sm text-gray-500 font-mono" {...props}>
      {children}
      {isStreaming && <span className="animate-pulse ml-1">▊</span>}
    </div>
  );
}

// harness glue: the prose prints the element as a bare expression after the component
export function ContentOnlyChat() {
  return (
<CopilotChat
  messageView={{
    reasoningMessage: { contentView: CustomContent },
  }}
/>
  );
}
// ── end doc ──

export function HeaderAndContentChat() {
  return ( // harness glue: the prose prints a bare JSX fragment
    // ── doc: Reasoning Messages prose block "messageView.reasoningMessage sub-slots" (verbatim) ──
    <CopilotChat
      messageView={{
        reasoningMessage: {
          header: CustomHeader,
          contentView: CustomContent,
        },
      }}
    />
    // ── end doc ──
  );
}
