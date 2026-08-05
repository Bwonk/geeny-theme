import { getThemeColors } from "@ikas/bp-storefront";

/** Document-level CSS custom properties for brand text selection. */
export const SELECTION_BG_VAR = "--ikas-selection-bg";
export const SELECTION_FG_VAR = "--ikas-selection-fg";
export const SELECTION_ON_VAR = "--ikas-selection-on";

/** Unscoped style tag injected into <head> so ::selection escapes component CSS scope. */
export const SELECTION_STYLE_ID = "ikas-text-selection";

export const SELECTION_BG_FALLBACK = "#E3E045";
export const SELECTION_FG_FALLBACK = "#101418";

/**
 * Theme Setting displayNames for Seçim / * globals (Theme Settings panel).
 */
export const SELECTION_ENABLED_DISPLAY = "Seçim / Etkin";
export const SELECTION_BG_DISPLAY = "Seçim / Arka Plan";
export const SELECTION_FG_DISPLAY = "Seçim / Metin";

/**
 * Stable variableNames from list_theme_globals (TOKENS.md §8).
 */
export const SELECTION_ENABLED_SETTING = "_Nj7fGnZidb";
export const SELECTION_BG_SETTING = "_U2NDSSNjOC";
export const SELECTION_FG_SETTING = "_v71Mf9bk7q";

export interface TextSelectionConfig {
  enabled: boolean;
  backgroundColor: string;
  textColor: string;
}

export interface TextSelectionInputs {
  /** Header prop — wins when defined (including explicit false). */
  enabled?: boolean | null | { value?: boolean };
  backgroundColor?: unknown;
  textColor?: unknown;
  /** Theme Setting fallbacks (used when prop is null/undefined/empty). */
  themeEnabled?: boolean | null;
  themeBackgroundColor?: unknown;
  themeTextColor?: unknown;
}

const HEX_COLOR_RE =
  /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const RGB_COLOR_RE =
  /^rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*(?:,\s*[\d.]+\s*)?\)$/i;
const HSL_COLOR_RE =
  /^hsla?\(\s*[\d.]+\s*,\s*[\d.]+%\s*,\s*[\d.]+%\s*(?:,\s*[\d.]+\s*)?\)$/i;
const CSS_VAR_RE = /^var\(\s*--[A-Za-z0-9_-]+\s*(?:,[^)]+)?\)$/;

function isPaintableColor(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const v = value.trim();
  if (!v) return false;
  return (
    HEX_COLOR_RE.test(v) ||
    RGB_COLOR_RE.test(v) ||
    HSL_COLOR_RE.test(v) ||
    CSS_VAR_RE.test(v)
  );
}

/**
 * Normalize COLOR prop / Theme Setting values to a CSS color string.
 * Handles plain hex, `{ value }`, `{ patternValueId }` (theme color token bind),
 * and `var(--id)` cssVar strings.
 */
export function normalizeColorValue(raw: unknown): string | undefined {
  if (raw == null) return undefined;

  if (typeof raw === "string") {
    const v = raw.trim();
    return v || undefined;
  }

  if (typeof raw !== "object") return undefined;
  const obj = raw as Record<string, unknown>;

  if (typeof obj.value === "string" && obj.value.trim()) {
    return obj.value.trim();
  }

  const patternId =
    (typeof obj.patternValueId === "string" && obj.patternValueId) ||
    (typeof obj.id === "string" && obj.id) ||
    undefined;

  if (patternId) {
    try {
      const colors = getThemeColors() ?? [];
      const token = colors.find((c) => c.id === patternId);
      if (token?.resolved && typeof token.resolved === "string") {
        return token.resolved;
      }
      if (token?.cssVar && typeof token.cssVar === "string") {
        return token.cssVar;
      }
    } catch {
      // getThemeColors unavailable (SSR edge) — fall through
    }
    // cssVar form from token id (ikas color tokens use var(--<id>) with mixed case)
    return `var(--${patternId})`;
  }

  return undefined;
}

function pickColor(
  prop: unknown,
  theme: unknown,
  fallback: string
): string {
  const fromProp = normalizeColorValue(prop);
  if (fromProp && isPaintableColor(fromProp)) return fromProp.trim();
  // Prefer resolved hex when prop was a token bind that only yielded var() — still usable
  if (fromProp) return fromProp.trim();

  const fromTheme = normalizeColorValue(theme);
  if (fromTheme && isPaintableColor(fromTheme)) return fromTheme.trim();
  if (fromTheme) return fromTheme.trim();

  return fallback;
}

function pickEnabled(
  prop: boolean | null | undefined | { value?: boolean },
  theme: boolean | null | undefined
): boolean {
  if (typeof prop === "boolean") return prop;
  if (prop && typeof prop === "object" && typeof prop.value === "boolean") {
    return prop.value;
  }
  if (typeof theme === "boolean") return theme;
  return true;
}

/**
 * Resolve merchant Header props → Theme Settings → brand fallbacks.
 * Prop wins when present; empty/invalid colors fall through.
 */
export function resolveTextSelectionConfig(
  inputs: TextSelectionInputs = {}
): TextSelectionConfig {
  return {
    enabled: pickEnabled(inputs.enabled, inputs.themeEnabled),
    backgroundColor: pickColor(
      inputs.backgroundColor,
      inputs.themeBackgroundColor,
      SELECTION_BG_FALLBACK
    ),
    textColor: pickColor(
      inputs.textColor,
      inputs.themeTextColor,
      SELECTION_FG_FALLBACK
    ),
  };
}

/**
 * CRITICAL: never comma-group ::selection with ::-moz-selection.
 * Browsers drop the entire rule if any selector in the list is unknown
 * (Chrome drops ::-moz-selection rules; Firefox historically dropped ::selection).
 */
function selectionCss(bg: string, fg: string): string {
  return `::selection {
  background: ${bg};
  color: ${fg};
}
::-moz-selection {
  background: ${bg};
  color: ${fg};
}
input::selection,
textarea::selection {
  background: ${bg};
  color: ${fg};
}
input::-moz-selection,
textarea::-moz-selection {
  background: ${bg};
  color: ${fg};
}
@media (forced-colors: active) {
  ::selection,
  input::selection,
  textarea::selection {
    background: Highlight;
    color: HighlightText;
  }
}`;
}

/** Remove document vars + injected style tag (native browser selection). */
export function clearTextSelectionStyles(): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.style.removeProperty(SELECTION_BG_VAR);
  root.style.removeProperty(SELECTION_FG_VAR);
  root.style.removeProperty(SELECTION_ON_VAR);

  document.getElementById(SELECTION_STYLE_ID)?.remove();
}

/**
 * Publish selection colors to documentElement and inject an unscoped <style>.
 * Idempotent — reuses the same style tag on subsequent calls.
 * When disabled, clears everything so the UA default applies.
 */
export function applyTextSelectionStyles(config: TextSelectionConfig): void {
  if (typeof document === "undefined") return;

  if (!config.enabled) {
    clearTextSelectionStyles();
    return;
  }

  const bg =
    normalizeColorValue(config.backgroundColor) || SELECTION_BG_FALLBACK;
  const fg = normalizeColorValue(config.textColor) || SELECTION_FG_FALLBACK;

  const root = document.documentElement;
  root.style.setProperty(SELECTION_BG_VAR, bg);
  root.style.setProperty(SELECTION_FG_VAR, fg);
  root.style.setProperty(SELECTION_ON_VAR, "1");

  let tag = document.getElementById(
    SELECTION_STYLE_ID
  ) as HTMLStyleElement | null;
  if (!tag) {
    tag = document.createElement("style");
    tag.id = SELECTION_STYLE_ID;
    document.head.appendChild(tag);
  }
  tag.textContent = selectionCss(bg, fg);
}
