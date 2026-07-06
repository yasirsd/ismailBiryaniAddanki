import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Quote } from 'lucide-react'
import { site } from '@/data/site'

export function ChefPromise() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.06])
  const yBg = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section
      ref={ref}
      aria-label="Our promise"
      className="section-blend-t blend-t-dark section-py relative overflow-hidden bg-cream dark:bg-luxury-black"
    >
      <motion.div
        style={{ y: yBg }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[130%]"
        aria-hidden
      >
        <img
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=2200&q=85"
          alt=""
          className="h-full w-full object-cover opacity-15 dark:opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-b from-cream via-cream/60 to-cream dark:from-luxury-black dark:via-luxury-black/40 dark:to-luxury-black" />
      </motion.div>

      <motion.div
        style={{ scale }}
        className="container-luxury relative flex flex-col items-center gap-10 text-center"
      >
        <Quote className="text-saffron" size={40} strokeWidth={1.5} />

        <blockquote className="max-w-4xl">
          <p className="display-2 text-luxury-black text-balance dark:text-cream">
            "{site.mission}"
          </p>
        </blockquote>

        <footer className="mt-4">
          <div className="eyebrow text-luxury-black/50 dark:text-cream/50">
            — Our promise
          </div>
          <div className="mt-3 text-lg font-semibold text-luxury-black dark:text-cream">
            {site.proprietor}
          </div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            Proprietor, Ismail Biryani — Addanki
          </div>
        </footer>
      </motion.div>
    </section>
  )
}
