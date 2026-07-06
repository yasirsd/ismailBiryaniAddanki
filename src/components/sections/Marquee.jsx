const words = [
  'Basmati',
  'Saffron',
  'Charcoal',
  'Sneha Farm',
  'Copper Handi',
  'Dum',
  'Family',
  'Since 2005',
  'Addanki',
  'Hyderabad',
  'Ceremony',
]

// Duplicate the word list exactly once so the -50% keyframe loops seamlessly:
// after the first copy scrolls out, the second copy sits where the first was.
const track = [...words, ...words]

function Bullet() {
  return (
    <span
      aria-hidden
      className="mx-6 inline-block h-2.5 w-2.5 rounded-full bg-saffron align-middle md:mx-8 md:h-3 md:w-3"
    />
  )
}

/**
 * Auto-scrolling ingredient marquee.
 *
 * Rewritten from Framer Motion's `useScroll`/`useTransform` to a plain CSS
 * keyframe animation because the scroll-driven implementation was racing with
 * React's commit phase on rapid re-renders (browser extensions injecting DOM
 * during commit could cause `Failed to execute 'insertBefore' on Node`).
 * A CSS animation is decoupled from React reconciliation entirely and is also
 * cheaper to run.
 */
export function Marquee() {
  return (
    <section
      aria-hidden
      className="section-blend-t blend-t-dark relative overflow-hidden bg-cream py-[clamp(2.75rem,7vw,6rem)] dark:bg-luxury-black"
    >
      <div
        className="flex whitespace-nowrap text-[clamp(2.5rem,10vw,9rem)] font-extrabold uppercase leading-none tracking-tight text-luxury-black/85 motion-safe:animate-[marquee_45s_linear_infinite] dark:text-cream"
        style={{ willChange: 'transform' }}
      >
        {track.map((w, i) => {
          const outlined = i % 2 === 1
          return (
            <span key={i} className="inline-flex items-center">
              <Bullet />
              <span
                className="inline-block"
                style={{
                  WebkitTextStroke: outlined
                    ? 'clamp(1.5px, 0.18vw, 3px) currentColor'
                    : '0',
                  color: outlined ? 'transparent' : undefined,
                }}
              >
                {w}
              </span>
            </span>
          )
        })}
      </div>
    </section>
  )
}
