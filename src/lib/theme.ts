/**
 * Theme primitives shared by the server (pre-paint init) and the client
 * (`ThemeToggle`).
 *
 * The toggle persists the user's explicit choice (`'light'` or `'dark'`)
 * in localStorage. The pre-paint script below reads that value before
 * React hydrates and sets `data-theme` on `<html>`, so users never see a
 * flash of the wrong theme on first load. When no preference is stored
 * we default to light.
 */

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'ds-theme';
export const THEME_ATTRIBUTE = 'data-theme';
export const DEFAULT_THEME: Theme = 'light';

/**
 * Inline script body that runs synchronously in `<head>` to resolve the
 * active theme before the first paint. Inject into the layout via
 * `<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />`.
 *
 * Kept dependency-free and wrapped in `try/catch` so storage-blocked
 * browsers (private mode, restrictive CSP) still get a sensible default.
 */
export const THEME_INIT_SCRIPT = `(function(){
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = stored === 'light' || stored === 'dark' ? stored : '${DEFAULT_THEME}';
    document.documentElement.setAttribute('${THEME_ATTRIBUTE}', theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.setAttribute('${THEME_ATTRIBUTE}', '${DEFAULT_THEME}');
    document.documentElement.style.colorScheme = '${DEFAULT_THEME}';
  }
})();`;
