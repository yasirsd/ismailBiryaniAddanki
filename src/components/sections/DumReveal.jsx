import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { dumStages } from '@/data/story'
import { Steam } from '@/components/effects/Steam'
import { prefersReducedMotion } from '@/lib/utils'
import { useLenis } from '@/providers/SmoothScroll'
import { useIsMobile } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

/**
 * DumReveal — thin dispatcher.
 *
 * Desktop and mobile use entirely different mechanics (pinned scroll-
 * scrubbed cinema vs. horizontal-swipe carousel), so we mount them as
 * two independent components rather than branching inside one. This
 * guarantees React fully unmounts one before mounting the other —
 * critical because the desktop variant lets GSAP inject a pin-spacer
 * wrapper into the DOM, and any half-way branch-swap would leave
 * React trying to reconcile children that GSAP has already relocated
 * (the classic `NotFoundError: Failed to execute 'removeChild'` crash).
 */
export function DumReveal() {
  const isMobile = useIsMobile()
  return isMobile ? (
    <DumRevealMobile stages={dumStages} />
  ) : (
    <DumRevealDesktop />
  )
}

const TOTAL = dumStages.length

// Match Story's cinematic snap timing so the whole site feels coherent.
const SNAP_DURATION_S = 1.2
const SNAP_COOLDOWN_MS = 1300
const TOUCH_THRESHOLD_PX = 34

function DumRevealDesktop() {
  const rootRef = useRef(null)
  const scrollTriggerRef = useRef(null)
  const stageIdxRef = useRef(0)
  const animatingRef = useRef(false)
  const lastGestureRef = useRef(0)

  const [activeIndex, setActiveIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  const getLenis = useLenis()

  useEffect(() => {
    setReducedMotion(prefersReducedMotion())
  }, [])

  useEffect(() => {
    stageIdxRef.current = activeIndex
  }, [activeIndex])

  const animateToStage = useCallback(
    (idx, duration = SNAP_DURATION_S) => {
      const st = scrollTriggerRef.current
      if (!st) return
      const clamped = Math.max(0, Math.min(TOTAL - 1, idx))
      const targetProgress = TOTAL <= 1 ? 0 : clamped / (TOTAL - 1)
      const targetY = st.start + (st.end - st.start) * targetProgress

      animatingRef.current = true
      lastGestureRef.current = performance.now()
      stageIdxRef.current = clamped

      const lenis = getLenis()
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(targetY, {
          duration,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          lock: true,
          onComplete: () => {
            animatingRef.current = false
          },
        })
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' })
        window.setTimeout(() => {
          animatingRef.current = false
        }, duration * 1000)
      }
    },
    [getLenis]
  )

  const jumpToStage = useCallback(
    (i) => animateToStage(i, 1.1),
    [animateToStage]
  )

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (reducedMotion) return
    if (!rootRef.current) return

    const ctx = gsap.context(() => {
      const stages = gsap.utils.toArray('[data-dum-stage]')
      const texts = gsap.utils.toArray('[data-dum-text]')
      if (!stages.length) return

      gsap.set(stages, { autoAlpha: 0, scale: 1.08 })
      gsap.set(stages[0], { autoAlpha: 1, scale: 1 })
      gsap.set(texts, { autoAlpha: 0, y: 40 })
      gsap.set(texts[0], { autoAlpha: 1, y: 0 })

      // Each stage transition occupies exactly one timeline unit so snap
      // positions align cleanly with stage boundaries.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: () => `+=${(TOTAL - 1) * 100}%`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          snap: {
            snapTo: 1 / (TOTAL - 1),
            duration: { min: 0.9, max: 1.6 },
            ease: 'power2.inOut',
            delay: 0.2,
            inertia: false,
          },
          onUpdate: (self) => {
            const raw = self.progress * (TOTAL - 1)
            const next = Math.min(TOTAL - 1, Math.round(raw))
            setActiveIndex((prev) => (prev === next ? prev : next))
          },
        },
      })

      stages.forEach((stage, i) => {
        if (i === 0) return
        const pos = i - 1 // absolute timeline position (0, 1, 2, …)
        tl.to(
          stages[i - 1],
          {
            autoAlpha: 0,
            scale: 0.95,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          pos
        )
          .to(
            texts[i - 1],
            { autoAlpha: 0, y: -40, duration: 0.5, ease: 'power2.in' },
            pos
          )
          .fromTo(
            stage,
            { autoAlpha: 0, scale: 1.1 },
            { autoAlpha: 1, scale: 1, duration: 0.85, ease: 'power2.out' },
            pos + 0.1
          )
          .fromTo(
            texts[i],
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
            pos + 0.15
          )
      })

      scrollTriggerRef.current = tl.scrollTrigger

      const onResize = () => ScrollTrigger.refresh()
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }, rootRef)

    // -----------------------------------------------------------------------
    // Custom gesture-driven snap: one flick = one stage. Mirrors StoryScroll
    // so both pinned sections behave identically.
    //
    // On touch devices (`pointer: coarse`) we skip the wheel/touch capture
    // handlers and rely on the built-in ScrollTrigger `snap` above so
    // native iOS/Android inertia is preserved. See StoryScroll for the
    // reasoning.
    // -----------------------------------------------------------------------
    const isCoarsePointer =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: coarse)').matches

    let touchStartY = null

    const isInsidePin = () => {
      const st = scrollTriggerRef.current
      if (!st) return false
      const y = window.scrollY
      return y >= st.start - 4 && y <= st.end + 4
    }

    const decide = (dir) => {
      if (!isInsidePin()) return { intercept: false, targetIdx: null }
      if (animatingRef.current) return { intercept: true, targetIdx: null }
      const now = performance.now()
      if (now - lastGestureRef.current < SNAP_COOLDOWN_MS) {
        return { intercept: true, targetIdx: null }
      }
      const current = stageIdxRef.current
      const next = current + dir
      if (next < 0) return { intercept: false, targetIdx: null }
      if (next > TOTAL - 1) return { intercept: false, targetIdx: null }
      return { intercept: true, targetIdx: next }
    }

    const consume = (e) => {
      if (e.cancelable) e.preventDefault()
      if (typeof e.stopImmediatePropagation === 'function') {
        e.stopImmediatePropagation()
      } else {
        e.stopPropagation()
      }
    }

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 3) return
      const dir = e.deltaY > 0 ? 1 : -1
      const { intercept, targetIdx } = decide(dir)
      if (!intercept) return
      consume(e)
      if (targetIdx !== null) animateToStage(targetIdx)
    }

    const onTouchStart = (e) => {
      if (!e.touches || e.touches.length === 0) return
      touchStartY = e.touches[0].clientY
    }

    const onTouchMove = (e) => {
      if (touchStartY === null || !e.touches || e.touches.length === 0) return
      const delta = touchStartY - e.touches[0].clientY
      if (Math.abs(delta) < TOUCH_THRESHOLD_PX) return
      const dir = delta > 0 ? 1 : -1
      const { intercept, targetIdx } = decide(dir)
      if (!intercept) {
        touchStartY = null
        return
      }
      consume(e)
      if (targetIdx !== null) {
        animateToStage(targetIdx)
        touchStartY = null
      }
    }

    const onTouchEnd = () => {
      touchStartY = null
    }

    const onKeyDown = (e) => {
      const t = e.target
      if (
        t &&
        (t.tagName === 'INPUT' ||
          t.tagName === 'TEXTAREA' ||
          t.isContentEditable)
      ) {
        return
      }
      let dir = 0
      if (e.key === 'PageDown' || e.key === 'ArrowDown') dir = 1
      else if (e.key === 'PageUp' || e.key === 'ArrowUp') dir = -1
      else if (e.key === ' ' && !e.shiftKey) dir = 1
      else if (e.key === ' ' && e.shiftKey) dir = -1
      else return
      const { intercept, targetIdx } = decide(dir)
      if (!intercept) return
      e.preventDefault()
      if (targetIdx !== null) animateToStage(targetIdx)
    }

    if (!isCoarsePointer) {
      window.addEventListener('wheel', onWheel, {
        passive: false,
        capture: true,
      })
      window.addEventListener('touchstart', onTouchStart, {
        passive: true,
        capture: true,
      })
      window.addEventListener('touchmove', onTouchMove, {
        passive: false,
        capture: true,
      })
      window.addEventListener('touchend', onTouchEnd, {
        passive: true,
        capture: true,
      })
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      if (!isCoarsePointer) {
        window.removeEventListener('wheel', onWheel, { capture: true })
        window.removeEventListener('touchstart', onTouchStart, { capture: true })
        window.removeEventListener('touchmove', onTouchMove, { capture: true })
        window.removeEventListener('touchend', onTouchEnd, { capture: true })
      }
      window.removeEventListener('keydown', onKeyDown)
      ctx.revert()
    }
  }, [reducedMotion, animateToStage])

  // Reduced-motion fallback: static stack, no pin, no snap.
  if (reducedMotion) {
    return (
      <section
        id="craft"
        aria-label="The dum ceremony — opened at your table"
        className="section-blend-t blend-t-cream relative overflow-hidden bg-luxury-black text-cream"
      >
        <div className="container-luxury flex flex-col gap-16 py-24">
          {dumStages.map((stage, i) => (
            <article
              key={stage.id}
              className="grid grid-cols-1 gap-10 md:grid-cols-[1.05fr_1fr]"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/50">
                <img
                  src={stage.image}
                  alt={stage.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="eyebrow text-cream/50">
                  Stage {String(i + 1).padStart(2, '0')} of{' '}
                  {String(TOTAL).padStart(2, '0')}
                </div>
                <h3 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
                  {stage.title}
                </h3>
                <p className="mt-5 text-lg leading-relaxed text-cream/70">
                  {stage.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      id="craft"
      ref={rootRef}
      aria-label="The dum ceremony — opened at your table"
      className="section-blend-t blend-t-cream relative overflow-hidden bg-luxury-black text-cream"
    >
      <div className="min-h-svh container-luxury relative z-10 flex flex-col justify-center py-24">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[1.05fr_1fr]">
          {/* Image stage */}
          <div className="relative order-2 md:order-1">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/50 shadow-[0_60px_140px_-40px_rgba(0,0,0,0.9)]">
              {dumStages.map((stage) => (
                <div
                  key={stage.id}
                  data-dum-stage
                  className="absolute inset-0"
                >
                  <img
                    src={stage.image}
                    alt={stage.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                </div>
              ))}

              <div className="pointer-events-none absolute inset-0">
                <Steam count={5} className="opacity-70" />
              </div>

              <div className="pointer-events-none absolute inset-4 rounded-[2rem] border border-white/5" />
            </div>

            {/* Interactive stage dots — clickable so the user can jump.
                The visible dot is 6px tall but the button owns a 44px
                invisible hit area to meet WCAG 2.5.5 tap target size. */}
            <div className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-1">
              {dumStages.map((s, i) => {
                const active = i === activeIndex
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => jumpToStage(i)}
                    aria-current={active ? 'step' : undefined}
                    aria-label={`Jump to stage ${i + 1}: ${s.title}`}
                    className="grid h-11 place-items-center px-1"
                  >
                    <span
                      aria-hidden
                      className={`block h-1.5 rounded-full transition-all duration-500 ${
                        active
                          ? 'w-10 bg-saffron'
                          : 'w-8 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Text stage */}
          <div className="relative order-1 md:order-2">
            <div className="eyebrow flex items-center gap-3 text-saffron">
              <span className="h-px w-10 bg-saffron/60" />
              The Ceremony
            </div>
            <h2 className="display-2 mt-6 text-cream text-balance">
              Every handi is opened{' '}
              <span className="gradient-text-fire">at your table.</span>
            </h2>

            <div className="relative mt-14 h-[280px]">
              {dumStages.map((stage, i) => (
                <div
                  key={stage.id}
                  data-dum-text
                  className="absolute inset-0 flex flex-col justify-start"
                >
                  <div className="eyebrow text-cream/50">
                    Stage {String(i + 1).padStart(2, '0')} of{' '}
                    {String(TOTAL).padStart(2, '0')}
                  </div>
                  <h3 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
                    {stage.title}
                  </h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/70">
                    {stage.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 flex flex-col gap-1 border-t border-white/10 pt-6 text-sm text-cream/70">
              <span className="eyebrow text-cream/65">
                One scroll · one stage
              </span>
              <span>
                Flick to reveal the next beat of the dum ceremony — click a dot
                to jump.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
 * DumRevealMobile — horizontal-swipe carousel for mobile.
 *
 * On phones, the desktop's pinned scrubbed cinema fights native touch
 * inertia and pins the section for 400vh of scroll (which is a lot of
 * "empty" scroll on a phone). Instead we render a compact section
 * with a full-bleed image carousel: flick left/right to walk through
 * the four dum stages. Each stage owns its own image + copy inside
 * the slide, so no coordinated animation of separate columns is
 * needed.
 * ------------------------------------------------------------------ */
function DumRevealMobile({ stages }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: false,
    containScroll: 'trimSnaps',
  })
  const [selected, setSelected] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section
      id="craft"
      aria-label="The dum ceremony — opened at your table"
      className="section-blend-t blend-t-cream section-py relative overflow-hidden bg-luxury-black text-cream"
    >
      <div className="container-luxury relative">
        {/* Section header */}
        <div className="mb-8 max-w-md">
          <div className="eyebrow flex items-center gap-2 text-saffron">
            <span className="h-px w-8 bg-saffron/60" />
            The Ceremony
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-cream text-balance">
            Every handi is opened{' '}
            <span className="gradient-text-fire">at your table.</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="-mx-4 overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y select-none">
            {stages.map((stage, i) => (
              <div
                key={stage.id}
                className="min-w-0 shrink-0 grow-0 basis-[88%] pl-4 first:pl-4 sm:basis-[75%]"
              >
                <DumStageCard stage={stage} index={i} total={stages.length} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls: dots + arrows */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            {stages.map((s, i) => {
              const active = i === selected
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Go to stage ${i + 1}: ${s.title}`}
                  aria-current={active ? 'step' : undefined}
                  className="grid h-11 place-items-center px-1"
                >
                  <span
                    aria-hidden
                    className={
                      active
                        ? 'block h-1.5 w-8 rounded-full bg-saffron'
                        : 'block h-1.5 w-1.5 rounded-full bg-cream/25'
                    }
                  />
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Previous stage"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-cream/80 transition-colors active:bg-white/10 disabled:opacity-30"
            >
              <ArrowLeft size={16} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              aria-label="Next stage"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-cream/80 transition-colors active:bg-white/10 disabled:opacity-30"
            >
              <ArrowRight size={16} aria-hidden />
            </button>
          </div>
        </div>

        <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/55">
          Flick to walk through the ceremony — from sealing the handi with
          dough to opening it, steaming, at your table.
        </p>
      </div>
    </section>
  )
}

function DumStageCard({ stage, index, total }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
      <div className="relative aspect-4/5">
        <img
          src={stage.image}
          alt={stage.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-transparent" />

        {/* Steam decoration inside the image */}
        <div className="pointer-events-none absolute inset-0">
          <Steam count={3} className="opacity-60" />
        </div>

        {/* Stage indicator top-left */}
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-cream backdrop-blur-md">
          Stage {String(index + 1).padStart(2, '0')} · {String(total).padStart(2, '0')}
        </div>

        {/* Copy at the bottom of the card. Each Embla slide is bound to
            a stable `stage` and never mutates — no AnimatePresence
            needed here (and it was actually a source of reconciliation
            bugs when combined with Embla's slide reordering). */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-cream text-balance">
            {stage.title}
          </h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-cream/75">
            {stage.body}
          </p>
        </div>
      </div>
    </article>
  )
}
