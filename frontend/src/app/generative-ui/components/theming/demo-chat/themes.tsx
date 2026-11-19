"use client";

// The page's `theme` samples. The first is the whole `generativeUI` value of
// the page's provider; the others are printed as bare `theme: { ... }`
// fragments, so `ui: standardUI` around them is harness glue (the page uses
// standardUI throughout). Every `theme` value is verbatim.
import { standardUI, type GenerativeUIConfig } from "@copilotkit/react-core/v2/generative-ui";

import { theme } from "./theme";

// ── doc: theming prose block "What is this?" — provider generativeUI value (verbatim) ──
export const brandTheme: GenerativeUIConfig = {
  ui: standardUI,
  theme: {
    "--a2ui-color-accent": "#d97706",
    "--a2ui-font-family": "Inter, sans-serif",
    "--a2ui-radius-md": "10px",
  },
};
// ── end doc ──

/** "The variables": the typed theme file. `{ ui: standardUI, theme }` is glue. */
export const fileTheme: GenerativeUIConfig = { ui: standardUI, theme };

export const perModeTheme: GenerativeUIConfig = {
  ui: standardUI, // harness glue
  // ── doc: theming prose block "Colors for each mode" (verbatim) ──
  theme: {
    "--a2ui-color-accent": "#d97706",
    dark: {
      "--a2ui-color-panel": "#1f2937",
      "--a2ui-color-surface": "#111827",
    },
  },
  // ── end doc ──
};

export const mapTheme: GenerativeUIConfig = {
  ui: standardUI, // harness glue
  // ── doc: theming prose block "The map" (verbatim; placeholder URLs) ──
  theme: {
    mapStyle: "https://tiles.example.com/light.json",
    dark: { mapStyle: "https://tiles.example.com/dark.json" },
  },
  // ── end doc ──
};

/** "Set variables in CSS": no `theme`; theming.css sets the accent. Glue. */
export const cssTheme: GenerativeUIConfig = { ui: standardUI };
