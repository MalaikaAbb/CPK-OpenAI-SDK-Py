"""genui_shop.py — harness glue, NOT from the docs.

The Catalogs page's ProductCard (also used by Surfaces through `./catalog`)
tells the model: "One product. Copy every value from a product of a tool
result." No page in the Components and surfaces family publishes a tool that
returns products, so there is nothing to copy from. This agent is the
overview page's swapped agent (`genui_components.agent`, same prompt, same
model) plus one minimal fake-data tool, so the shop demos have products whose
ids match the frontend scaffolding (p1..p3).
"""

from agents import function_tool

from demo_agents.genui_components import agent as components_agent

# Harness glue: fake catalogue. imageUrl points at a placeholder image service.
PRODUCTS = [
    {
        "id": "p1",
        "name": "Trail Runner",
        "price": 120,
        "imageUrl": "https://placehold.co/300x300/png?text=Trail+Runner",
    },
    {
        "id": "p2",
        "name": "City Sneaker",
        "price": 85,
        "imageUrl": "https://placehold.co/300x300/png?text=City+Sneaker",
    },
    {
        "id": "p3",
        "name": "Track Spike",
        "price": 140,
        "imageUrl": "https://placehold.co/300x300/png?text=Track+Spike",
    },
    {
        "id": "p4",
        "name": "Wool Running Socks",
        "price": 18,
        "imageUrl": "https://placehold.co/300x300/png?text=Socks",
    },
    {
        "id": "p5",
        "name": "Enamel Camp Mug",
        "price": 40,
        "imageUrl": "https://placehold.co/300x300/png?text=Mug",
    },
]


@function_tool
def search_products(query: str = "") -> list[dict]:
    """Search the shop's products. Returns id, name, price and imageUrl for each match (all products when the query is empty or matches nothing)."""
    q = query.lower().strip()
    hits = [p for p in PRODUCTS if q and any(w in p["name"].lower() for w in q.split())]
    return hits or PRODUCTS


agent = components_agent.clone(name="shop_assistant", tools=[search_products])
