# Agent Read-Only Context

> Publish UI values to the agent as a one-way read-only channel via useAgentContext.



<!-- interactive demo: readonly-state-agent-context -->


<Callout type="info" title="See this in Inspector">
  Open Inspector on localhost. Go to **Agents**, then **Context**.
  The values you publish with `useAgentContext` appear here.

  More detail: [Inspector](/openai-agents-python/inspector).
</Callout>


## What is this?

Sometimes you want the agent to *know* something about the current UI, like the logged-in user, the current page, or a recent activity log, but you don't want the agent to be able to modify it. That's what
`useAgentContext` is for: a one-way **UI → agent** channel for
read-only context.

Unlike full shared state (where the agent can call tools that mutate
the state back to the UI), `useAgentContext` values are pure inputs.
The agent sees them on every turn via the runtime's context injection,
but it has no setter and no tool to write them back.

## When should I use this?

Reach for `useAgentContext` instead of full shared state when:

- The value is **UI-owned** and has no meaning to the agent beyond
  "what the user is looking at right now".
- The agent should read but never write (user identity, feature flags,
  selected record, scroll position).
- You want the value to automatically unregister on unmount (e.g. the
  "current record" context disappears when you leave the page).

Think of it as "props for the agent".

## How it works in code

<Steps>
  <Step>
    ### Say in the instructions what the context is for

    Each `useAgentContext` entry reaches the agent in the run's
    `RunAgentInput.context`. `OpenAIAgentsAgent` appends the entries to the
    agent's instructions on every model call, under
    `Context from the application:` as `description: value` lines, so the
    model always sees the current values. The instructions only have to say
    how to use them:

    
~~~~python title="app_context.py"
SYSTEM_PROMPT = (
    "You are a helpful, concise assistant. The frontend may provide "
    "read-only context about the user (e.g. name, timezone, recent "
    "activity) via the `useAgentContext` hook. Always consult that "
    "context when it is relevant — address the user by name if known, "
    "respect their timezone when mentioning times, and reference "
    "recent activity when it helps you answer. Keep responses short."
)


app_context_agent = Agent(
    name="context_assistant",
    instructions=SYSTEM_PROMPT,
    model=MODEL,
    model_settings=chat_settings(),
)


~~~~


  </Step>
  <Step>
    ### Or read the context in code

    When the agent has no SDK context of its own, the wrapper also passes the
    AG-UI context list as the SDK's run context. Tools and dynamic
    instructions can read it through `RunContextWrapper.context`, for example
    to filter a query by the user's timezone without asking the model to pass
    it along:

    ```python
    from ag_ui.core import Context
    from agents import RunContextWrapper, function_tool


    @function_tool
    def upcoming_events(ctx: RunContextWrapper[list[Context]]) -> list[dict]:
        """Lists the user's upcoming events in their own timezone."""
        timezone = next(
            (c.value for c in ctx.context or [] if "timezone" in c.description),
            "UTC",
        )
        ...
    ```

    To place the context yourself, pass `context_in_instructions=False` to
    `OpenAIAgentsAgent` and the wrapper leaves the instructions alone.

  </Step>
</Steps>

Call `useAgentContext({ description, value })` once per value you want
to publish. Each call registers a dynamic context entry with the
runtime that is:

- Refreshed whenever `value` changes (React re-renders).
- Automatically removed when the component unmounts.
- Surfaced to the agent via the backend's `CopilotKitMiddleware`, which
  threads the entries into the model's message history on every turn.

```typescript
// src/app/demos/readonly-state-agent-context/page.tsx
  useAgentContext({
    description: "The currently logged-in user's display name",
    value: userName,
  });
  useAgentContext({
    description: "The user's IANA timezone (used when mentioning times)",
    value: userTimezone,
  });
  useAgentContext({
    description: "The user's recent activity in the app, newest first",
    value: recentActivity,
  });
```

The `description` is important: it's a short human-readable label the
agent sees alongside the value, so it knows what to do with it. Treat
it like a parameter docstring.

## Wire it to your own state

`useAgentContext` doesn't care where the value comes from: local
state, a React Context, Redux, a query cache, anything. The only
requirement is that the identity of the value is stable enough for
React to avoid a render loop. In the demo we use a handful of
`useState` hooks; in a real app these would likely come from an auth
provider, a router hook, and your domain state stores.

```typescript
// src/app/demos/readonly-state-agent-context/page.tsx
import React, { useState } from "react";
import {
  CopilotKit,
  CopilotPopup,
  useAgentContext,
} from "@copilotkit/react-core/v2";

import { ACTIVITIES, DemoLayout } from "./demo-layout";
import { useReadonlyStateAgentContextSuggestions } from "./suggestions";

export default function ReadonlyStateAgentContextDemo() {
  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit"
      agent="readonly-state-agent-context"
    >
      <DemoContent />
      <CopilotPopup
        agentId="readonly-state-agent-context"
        defaultOpen={true}
        labels={{ chatInputPlaceholder: "Ask about your context..." }}
      />
    </CopilotKit>
  );
}

function DemoContent() {
  const [userName, setUserName] = useState("Atai");
  const [userTimezone, setUserTimezone] = useState("America/Los_Angeles");
  const [recentActivity, setRecentActivity] = useState<string[]>([
    ACTIVITIES[0],
    ACTIVITIES[2],
  ]);
```

## Read-only, by design

Because the agent never sees a setter or a mutation tool for these
values, there's no way for a confused LLM to "update" them. That
makes `useAgentContext` the right tool whenever the value in question
is an input, not a field: the "context object passed to the agent on
every turn", rather than "shared workspace you both edit".

When you need both reads *and* writes, you want full
**[shared state](/openai-agents-python/shared-state)** instead.

## Related

- **[Shared State (overview)](/openai-agents-python/shared-state)** — bidirectional
  reads + writes.
- **[State streaming](/openai-agents-python/shared-state/streaming)** — stream
  agent-written state back to the UI during a run.
