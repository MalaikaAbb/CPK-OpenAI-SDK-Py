from agents import Agent
from ag_ui_openai_agents import (
    OpenAIAgentsAgent,
    add_openai_agents_fastapi_endpoint,
)
from fastapi import FastAPI

agent = OpenAIAgentsAgent(
    Agent(
        name="assistant",
        instructions="You are a helpful assistant embedded in a CopilotKit app.",
    )
)

app = FastAPI()
add_openai_agents_fastapi_endpoint(app, agent, "/agent")
