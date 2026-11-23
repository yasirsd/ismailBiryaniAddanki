const words = [
  'Basmati Rice',
  'Saffron',
  'Green Cardamom',
  'Black Cardamom',
  'Cinnamon',
  'Mint Leaves',
  'Fresh Coriander',
  'Ginger Garlic Paste',
  'Yogurt',
  'Ghee',
  'Lemon Juice',
]

// Two identical copies so the -50% keyframe loops seamlessly, including the
// gap after the last name and the filled/outline pairing.
const copies = [words, words]

function Bullet() {
  return (
    <span
      aria-hidden
      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-saffron align-middle md:h-3 md:w-3"
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
        className="flex w-max whitespace-nowrap text-[clamp(2.5rem,10vw,9rem)] font-extrabold uppercase leading-none tracking-tight text-luxury-black/85 motion-safe:animate-[marquee_45s_linear_infinite] dark:text-cream"
        style={{ willChange: 'transform' }}
      >
        {copies.map((list, copy) => (
          <div key={copy} className="flex items-center gap-16 pr-16">
            {list.map((w, i) => {
              const outlined = i % 2 === 1
              return (
                <span key={w} className="relative inline-flex items-center">
                  <span
                    className="inline-block"
                    style={
                      outlined
                        ? {
                            WebkitTextStroke: 'clamp(1.5px, 0.18vw, 3px) currentColor',
                            WebkitTextFillColor: 'transparent',
                          }
                        : undefined
                    }
                  >
                    {w}
                  </span>
                  <span className="absolute left-full flex w-16 items-center justify-center">
                    <Bullet />
                  </span>
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
