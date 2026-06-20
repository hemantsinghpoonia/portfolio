/**
 * Sanity's workspace `icon` slot renders small (navbar-corner sized),
 * so this intentionally mirrors the portfolio sidebar's "HS" wordmark
 * rather than a literal logo graphic — same brand mark, same Playfair
 * Display voice, scaled for a 24-32px icon slot.
 */
export function StudioIcon() {
  return (
    <span
      style={{
        fontFamily: '"Playfair Display", Georgia, serif',
        fontWeight: 600,
        fontSize: "0.95em",
        color: "#1a1c1a",
        letterSpacing: "-0.02em",
      }}
    >
      HS
    </span>
  );
}
