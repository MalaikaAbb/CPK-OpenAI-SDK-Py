/**
 * Who owns the Inspector, decided in one place.
 *
 * The Inspector is bound to the core of the provider that renders it, and two
 * on one page is fatal (lit custom elements loop). So: exactly one per page.
 * Demo routes that mount their own `<CopilotKit>` list their paths in
 * `nestedProviderPaths` on their RouteMeta; there the root provider stands down.
 */
import { ALL_ROUTES } from "@/lib/nav-config";

/** Kill switch — `NEXT_PUBLIC_COPILOTKIT_INSPECTOR=off` disables it everywhere. */
export const INSPECTOR_ENABLED =
  process.env.NEXT_PUBLIC_COPILOTKIT_INSPECTOR !== "off";

export const NESTED_PROVIDER_ROUTES: readonly string[] = ALL_ROUTES.flatMap(
  (r) => r.nestedProviderPaths ?? [],
);

/** What the app-wide provider passes as `showDevConsole`. */
export function rootInspectorSetting(pathname: string | null): "auto" | false {
  if (!INSPECTOR_ENABLED) return false;
  if (pathname && NESTED_PROVIDER_ROUTES.includes(pathname)) return false;
  return "auto";
}

/** What a nested `<CopilotKit>` passes as `enableInspector`. */
export const nestedInspectorSetting: boolean | undefined = INSPECTOR_ENABLED
  ? undefined
  : false;
