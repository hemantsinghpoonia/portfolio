import { buildLegacyTheme } from "sanity";

/**
 * Maps the portfolio's --surface / --brand / --foreground tokens
 * (apps/web/src/app/globals.css) onto Sanity's legacy theme variables,
 * so the Studio chrome reads as "the same app" rather than a bolted-on
 * admin tool. Colors are copied as literal hex values rather than CSS
 * vars, since buildLegacyTheme runs at config-load time, outside any
 * browser context that could resolve var() against apps/web's stylesheet.
 *
 * Source of truth for these values: apps/web/src/app/globals.css :root.
 * If you tweak the portfolio palette, mirror the change here too.
 *
 * Note: Sanity's docs mark buildLegacyTheme for eventual removal in a
 * future major version, but it remains the current, documented, working
 * theming API as of Studio v4. If a future Sanity major removes it,
 * this is the one file that needs porting to whatever replaces it.
 */
const colors = {
  surface: "#fbf9f5",
  surfaceContainerLow: "#f5f3ef",
  surfaceContainer: "#efeeea",
  surfaceContainerHigh: "#e9e8e4",
  surfaceContainerLowest: "#ffffff",
  foreground: "#1b1c1a",
  mutedForeground: "#444844",
  outline: "#757874",
  outlineVariant: "#c5c7c3",
  brand: "#904d00",
  brandStrong: "#c86a00",
  primaryStrong: "#1a1c1a",
  destructive: "#ba1a1a",
};

export const portfolioStudioTheme = buildLegacyTheme({
  /* Base */
  "--black": colors.foreground,
  "--white": colors.surfaceContainerLowest,
  "--gray": colors.mutedForeground,
  "--gray-base": colors.outline,

  "--component-bg": colors.surfaceContainerLowest,
  "--component-text-color": colors.foreground,

  /* Brand */
  "--brand-primary": colors.brand,

  /* Default button */
  "--default-button-color": colors.outline,
  "--default-button-primary-color": colors.brand,
  "--default-button-success-color": "#22c55e",
  "--default-button-warning-color": "#f59e0b",
  "--default-button-danger-color": colors.destructive,

  /* State */
  "--state-info-color": colors.brand,
  "--state-success-color": "#22c55e",
  "--state-warning-color": "#f59e0b",
  "--state-danger-color": colors.destructive,

  /* Navbar */
  "--main-navigation-color": colors.primaryStrong,
  "--main-navigation-color--inverted": colors.surfaceContainerLowest,
  "--focus-color": colors.brandStrong,
});
