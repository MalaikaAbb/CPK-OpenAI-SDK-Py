# Markdown mode — "Build your own prompt" (Python block), verbatim. NOT imported.
# Doc: https://docs.copilotkit.ai/openai-agents-python/generative-ui/components/markdown-mode
#
# Not runnable as printed: `input`, `MY_PROMPT` and `json` are undefined, and
# `OpenAIAgentsAgent` never hands the AG-UI RunAgentInput (or its
# forwarded_props) to the Agent's instructions — it passes the run's context
# entries instead. No page shows the wiring, so the harness does not invent it;
# the `sendContext: false` variant of the Markdown mode demo renders no UI.
ui = input.forwarded_props["copilotkit"]["ui"]
catalog = ui["1.0"]["inlineCatalogs"][0]
system = f"{MY_PROMPT}\n\n{catalog['instructions']}\n\nComponents:\n{json.dumps(catalog['components'])}"
