import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { testimonials } from '@/data/testimonials'
import { cn } from '@/lib/utils'

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: false, containScroll: 'trimSnaps' },
    [Autoplay({ delay: 6500, stopOnMouseEnter: true, stopOnInteraction: false })]
  )
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  return (
    <section
      aria-label="Guest testimonials"
      className="section-py relative overflow-hidden bg-background dark:bg-background-dark"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[160px]" />
      </div>

      <div className="container-luxury relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Loved by families"
            title={
              <>
                Words from{' '}
                <span className="gradient-text-gold">our table.</span>
              </>
            }
            subtitle="Guests who came for the biryani and stayed for the family."
            className="max-w-2xl"
          />

          {/* Desktop arrows sit inline with the header. On mobile the
              carousel is swipe-driven so we hide arrows here and only
              show them (larger) below the cards. */}
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous testimonial"
              className="grid h-12 w-12 place-items-center rounded-full border border-black/10 bg-white/70 backdrop-blur transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <ArrowLeft size={16} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next testimonial"
              className="grid h-12 w-12 place-items-center rounded-full border border-black/10 bg-white/70 backdrop-blur transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <ArrowRight size={16} aria-hidden />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden md:mt-14" ref={emblaRef}>
          <div className="flex touch-pan-y select-none">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className="min-w-0 shrink-0 grow-0 basis-full pl-4 first:pl-0 md:basis-1/2 md:pl-6 lg:basis-1/3"
              >
                <TestimonialCard t={t} active={selected === i} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls row — on mobile: dots (primary) + arrows (secondary,
            below cards, thumb-reachable). On desktop: dots only since
            arrows live in the header. */}
        <div className="mt-8 flex items-center justify-between gap-4 md:mt-10">
          <div className="flex items-center gap-1">
            {snaps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={selected === i ? 'true' : undefined}
                className="group grid h-11 place-items-center px-1"
              >
                <span
                  aria-hidden
                  className={cn(
                    'block h-1.5 rounded-full transition-all duration-500',
                    selected === i
                      ? 'w-8 bg-luxury-black dark:bg-cream'
                      : 'w-3 bg-luxury-black/20 dark:bg-cream/20'
                  )}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/70 backdrop-blur transition-colors active:bg-white dark:border-white/10 dark:bg-white/5"
            >
              <ArrowLeft size={16} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/70 backdrop-blur transition-colors active:bg-white dark:border-white/10 dark:bg-white/5"
            >
              <ArrowRight size={16} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ t, active }) {
  return (
    <motion.article
      animate={{
        scale: active ? 1 : 0.97,
        opacity: active ? 1 : 0.75,
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-[2rem] border border-black/5 bg-white/70 p-6 shadow-[0_30px_80px_-30px_rgba(17,17,17,0.15)] backdrop-blur-xl md:min-h-[380px] md:p-8 dark:border-white/10 dark:bg-white/[0.04]"
    >
      <div>
        <Quote className="text-saffron/70" size={36} />
        <p className="mt-6 text-xl leading-relaxed text-luxury-black text-balance dark:text-cream md:text-2xl">
          "{t.quote}"
        </p>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <img
          src={t.avatar}
          alt=""
          loading="lazy"
          className="h-12 w-12 rounded-full object-cover ring-2 ring-white dark:ring-white/10"
        />
        <div className="flex-1">
          <div className="font-semibold text-luxury-black dark:text-cream">
            {t.name}
          </div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            {t.role}
          </div>
        </div>
        <div
          className="flex gap-0.5 text-saffron"
          role="img"
          aria-label={`${t.rating} out of 5 stars`}
        >
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star
              key={i}
              size={13}
              fill="currentColor"
              strokeWidth={0}
              aria-hidden
            />
          ))}
        </div>
      </div>
    </motion.article>
  )
}
