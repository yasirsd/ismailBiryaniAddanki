const GRAIN_SVG =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>\")"

/**
 * Film-grain overlay whose strength varies per era.
 * Heavier for the 2005 chapter, near-zero for Tomorrow.
 */
export function FilmGrain({ strength = 0.15 }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        opacity: strength,
        mixBlendMode: 'overlay',
        backgroundImage: GRAIN_SVG,
        backgroundSize: '240px 240px',
      }}
    />
  )
}
