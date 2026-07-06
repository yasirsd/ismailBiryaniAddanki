import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { stats } from '@/data/site'

export function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 })

  return (
    <section
      aria-label="Two decades of craft, in numbers"
      className="section-blend-t blend-t-cream section-py relative overflow-hidden bg-luxury-black text-cream"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-40 top-1/2 h-[500px] w-[500px] rounded-full bg-deep-red/30 blur-[160px]" />
        <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-saffron/25 blur-[160px]" />
      </div>

      <div className="container-luxury relative">
        <div className="grid gap-16 md:grid-cols-[1fr_1.15fr] md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow text-saffron">Legacy in numbers</div>
            <h2 className="display-2 mt-6 text-cream text-balance">
              A slow story,{' '}
              <span className="gradient-text-fire">still simmering.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/70">
              We measure success in returning guests, in shared plates, in the
              elders who tell us it tasted like home.
            </p>
          </motion.div>

          <div ref={ref} className="grid grid-cols-2 gap-6 md:gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.9,
                  delay: 0.1 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md"
              >
                <div className="flex items-baseline gap-1 text-6xl font-extrabold tracking-tight text-cream md:text-7xl">
                  <AnimatedNumber
                    className="tabular-nums"
                    value={s.value}
                    duration={2.4}
                    play={inView}
                  />
                  <span className="text-saffron">{s.suffix}</span>
                </div>
                <div className="mt-6 text-lg font-semibold tracking-tight">
                  {s.label}
                </div>
                <div className="mt-1 text-sm text-cream/60">{s.hint}</div>

                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-14 -right-14 h-32 w-32 rounded-full bg-saffron/10 blur-2xl"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
