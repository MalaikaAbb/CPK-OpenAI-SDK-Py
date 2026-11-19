"use client"; // harness: not in the prose

// ── doc: Reasoning Messages prose block "render-prop layout" (verbatim) ──
import {
  CopilotChatReasoningMessage,
} from "@copilotkit/react-core/v2";
import { CopilotChat } from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";

function MyReasoningLayout(props: React.ComponentProps<typeof CopilotChatReasoningMessage>) {
  return (
    <CopilotChatReasoningMessage {...props}>
      {({ header, toggle }) => (
        <div className="rounded-lg border bg-yellow-50 my-2">
          {header}
          {toggle}
        </div>
      )}
    </CopilotChatReasoningMessage>
  );
}

// harness glue: the prose prints the element as a bare expression after the component
export function MyReasoningLayoutChat() {
  return (
<CopilotChat
  messageView={{
    // @ts-expect-error doc bug: a plain function component is not assignable to the reasoningMessage slot (expects the compound CopilotChatReasoningMessage with Header/Content/Toggle) in 1.87
    reasoningMessage: MyReasoningLayout,
  }}
/>
  );
}
// ── end doc ──
