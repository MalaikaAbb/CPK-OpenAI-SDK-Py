// The Transports page's three provider samples. Each `generativeUI` value is
// verbatim; the provider around it (runtimeUrl → /api/genui-transports) is
// harness glue in GenUIDemo.
import { standardUI, type GenerativeUIConfig } from "@copilotkit/react-core/v2/generative-ui";

/** "Tool transport" — doc: `generativeUI={{ ui: standardUI }}`. */
export const toolTransport: GenerativeUIConfig = { ui: standardUI };

/** "Markdown transport" — doc: `generativeUI={{ ui: standardUI, transport: "markdown" }}`. */
export const markdownTransport: GenerativeUIConfig = { ui: standardUI, transport: "markdown" };

/** "Only some agents" — doc: `generativeUI={{ ui: standardUI, agentIds: ["shop"] }}`. */
export const someAgents: GenerativeUIConfig = { ui: standardUI, agentIds: ["shop"] };
