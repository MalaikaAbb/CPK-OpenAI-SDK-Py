# Verbatim from https://docs.copilotkit.ai/openai-agents-python/shared-state/agent-readonly
# (the untitled Python block under "Reading context from a tool").
#
# NOT imported anywhere. The page attaches this tool to no agent, and its body
# is `...`, so it returns None despite the `list[dict]` annotation. Nothing
# here is runnable as a feature; it is kept for comparison with the doc.

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
