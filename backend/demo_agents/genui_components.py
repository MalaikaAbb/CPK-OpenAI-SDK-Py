"""genui_components.py — Components and surfaces (overview page), "Try it".

Doc: https://docs.copilotkit.ai/openai-agents-python/generative-ui/components

Agent swap (labelled). The page's `app/api/copilotkit/[[...slug]]/route.ts`
prints a TanStack `BuiltInAgent`:

    chat({ adapter: openaiText("gpt-6-luna"), messages,
           systemPrompts: ["You are a helpful assistant. When a visual answer
                            helps, render it with generative UI.", ...systemPrompts],
           tools, abortController })

No OpenAI Agents SDK agent is printed for this page. Per the user's
instruction ("do not use built in agent, use the openai-sdk one") this is an
OpenAI Agents SDK `Agent` with the page's prompt, on MODEL (default
"gpt-6-luna", the page's literal), and no tools of its own. The run's tools
(`render_ui`) and context (the runtime's guide, the provider's catalog) reach
the model through `OpenAIAgentsAgent`'s defaults (client tools are added to
the agent; `context_in_instructions=True` appends context to the
instructions) — that is the bridge's behaviour, not something the page states
for this framework.
"""

from agents import Agent

from demo_agents._common import MODEL

# ── doc: components prose block "app/api/copilotkit/[[...slug]]/route.ts" — the
#    systemPrompts string, verbatim; the Agent around it is the labelled swap ──
agent = Agent(
    name="assistant",  # harness glue: the SDK requires a name; this is the Quickstart agent's
    instructions=(
        "You are a helpful assistant. When a visual answer helps, render it with generative UI."
    ),
    model=MODEL,
)
# ── end doc ──
