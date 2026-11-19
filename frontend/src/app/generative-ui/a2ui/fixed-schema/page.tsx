import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, CodeBlock, Panel, TryIt } from "@/components/ui";

// Prose block (action handlers reference), verbatim. Shown, not run: the page
// says action handlers are not supported yet.
const BUTTON_ACTION = `{
  "Button": {
    "label": "Book",
    "action": {
      "name": "book_flight",
      "context": [
        { "key": "flightNumber", "value": { "path": "/flightNumber" } },
        { "key": "price", "value": { "path": "/price" } }
      ]
    }
  }
}`;

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/a2ui/fixed-schema" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A2UI with the layout decided ahead of time. The component tree lives
          in a JSON file on the backend; the Python tool{" "}
          <code>display_flight</code> returns it as <code>a2ui_operations</code>{" "}
          (create surface, set components, fill the data model with the
          trip&apos;s values). The runtime has A2UI on with tool injection off,
          so its middleware only spots those operations in the tool result and
          renders them against the page&apos;s flight catalog (Title, Airport,
          Arrow, AirlineBadge, PriceTag plus a Card/Button override).
        </p>
        <div className="mt-4">
          <Callout tone="warn" title="Broken as published: myCatalog vs catalog">
            The provider snippet passes <code>myCatalog</code>, but the
            page&apos;s <code>catalog.ts</code> exports <code>catalog</code>. The
            demo reproduces that: the provider receives{" "}
            <code>undefined</code>, so no flight catalog is registered on the
            client. The backend tool, the JSON schema and the runtime still run,
            so you can see how far the published code gets.
          </Callout>
        </div>
        <div className="mt-4">
          <TryIt
            prompts={["Show me a United flight from SFO to JFK for $289"]}
            expect={
              <>
                The agent calls <code>display_flight</code> once and replies
                with one sentence. With the doc bug in place, the flight card
                (SFO → JFK, UNITED badge, Total $289, Book button) does{" "}
                <em>not</em> render with the custom catalog — expect a missing
                or fallback surface. If the card renders fully, the bug has
                been fixed upstream: update this status.
              </>
            }
            fail="No display_flight call at all, a run error, or the raw a2ui_operations JSON printed as text."
          />
        </div>
      </Panel>

      <Panel
        title="The running demo"
        description="definitions / renderers / catalog / provider / runtime are prose (definitions and renderers from the Markdown export). The type export, renderer imports and `s` helper are from the Code tab; chat.tsx and _components are harness glue."
      >
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/generative-ui/a2ui/fixed-schema/demo-chat/page.tsx" },
            { file: "frontend/src/app/api/a2ui-fixed-schema/[[...slug]]/route.ts" },
            { file: "frontend/src/app/generative-ui/a2ui/fixed-schema/demo-chat/a2ui/catalog.ts" },
            { file: "frontend/src/app/generative-ui/a2ui/fixed-schema/demo-chat/a2ui/definitions.ts" },
            { file: "frontend/src/app/generative-ui/a2ui/fixed-schema/demo-chat/a2ui/renderers.tsx" },
            { file: "frontend/src/app/generative-ui/a2ui/fixed-schema/demo-chat/chat.tsx" },
            { file: "frontend/src/app/generative-ui/a2ui/fixed-schema/demo-chat/_components/card.tsx" },
            { file: "frontend/src/app/generative-ui/a2ui/fixed-schema/demo-chat/_components/badge.tsx" },
            { file: "frontend/src/app/generative-ui/a2ui/fixed-schema/demo-chat/_components/button.tsx" },
            { file: "frontend/src/app/generative-ui/a2ui/fixed-schema/demo-chat/_components/separator.tsx" },
          ]}
        />
      </Panel>

      <Panel
        title="The agent and its schema"
        description="Tool verbatim from the prose; Agent and flight_schema.json from the Code tab (the prose shows the schema only as a tree)."
      >
        <SourceCodeGroup
          files={[
            { file: "backend/demo_agents/a2ui_fixed.py" },
            { file: "backend/demo_agents/a2ui_schemas/flight_schema.json" },
          ]}
        />
      </Panel>

      <Panel title="Action handlers (reference only)">
        <CodeBlock code={BUTTON_ACTION} language="json" />
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          The page notes that Python-side action handlers are not available
          yet, so the Book button is inert. The page also mentions a retained{" "}
          <code>booked_schema.json</code> that is published nowhere.
        </p>
      </Panel>
    </>
  );
}
