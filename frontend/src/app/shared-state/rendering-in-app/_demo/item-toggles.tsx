/**
 * Harness glue around the doc's `toggleItem` snippet.
 *
 * The page prints `toggleItem` on its own: `agent` is never declared and no
 * element calls it. This component supplies both: `useAgent()` (the same
 * default agent Canvas uses) and one checkbox per item.
 */
import { useAgent } from "@copilotkit/react-core/v2";

export function ItemToggles() {
  const { agent } = useAgent();

  // ── doc: rendering-in-app prose block "toggleItem" (verbatim) ──
  function toggleItem(id: string) {
    agent.setState({
      ...agent.state,
      // @ts-expect-error doc bug: agent.state is untyped, so `it` is implicitly any
      items: (agent.state?.items ?? []).map((it) =>
        it.id === id ? { ...it, done: !it.done } : it,
      ),
    });
  }
  // ── end doc ──

  const items = (agent.state?.items ?? []) as {
    id: string;
    label: string;
    done: boolean;
  }[];
  return (
    <fieldset className="item-toggles">
      <legend>Toggle from the main view (toggleItem)</legend>
      {items.map((item) => (
        <label key={item.id}>
          <input
            type="checkbox"
            data-testid={`toggle-${item.id}`}
            checked={item.done}
            onChange={() => toggleItem(item.id)}
          />{" "}
          {item.label}
        </label>
      ))}
    </fieldset>
  );
}
