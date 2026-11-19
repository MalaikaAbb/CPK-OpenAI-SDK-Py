"use client";

// "Dark mode". The page says to put `class="dark"` on <html> (`<html class="dark">`)
// or to run its script in <head>. Both belong in the ROOT layout, which every
// harness route shares, so (labelled) the script renders here in the demo
// body instead. It runs on a full page load but not after a client-side
// navigation: reload the demo to test it.

// ── doc: theming prose block "Dark mode" script (verbatim) ──
const colorSchemeScript = `(() => {
  const media = matchMedia("(prefers-color-scheme: dark)");
  const apply = () => document.documentElement.classList.toggle("dark", media.matches);
  apply();
  media.addEventListener("change", apply);
})();`;
// ── end doc ──

/** Harness: the page's `<head><script dangerouslySetInnerHTML …/></head>`, moved into the body. */
export function ColorSchemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: colorSchemeScript }} />;
}

/** Harness glue: flip `<html class="dark">` by hand, without changing the OS setting. */
export function DarkToggle() {
  return (
    <button
      type="button"
      onClick={() => document.documentElement.classList.toggle("dark")}
      className="rounded border px-2 py-1 text-xs"
    >
      Toggle {'<html class="dark">'}
    </button>
  );
}
