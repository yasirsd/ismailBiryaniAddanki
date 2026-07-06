import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { storyChapters } from '@/data/story'
import { ChapterDock } from './story/ChapterDock'
import { MobileStory } from './story/MobileStory'
import { ReelFounding } from './story/reels/ReelFounding'
import { ReelGrowth } from './story/reels/ReelGrowth'
import { ReelAddanki } from './story/reels/ReelAddanki'
import { ReelCraft } from './story/reels/ReelCraft'
import { ReelToday } from './story/reels/ReelToday'
import { ReelTomorrow } from './story/reels/ReelTomorrow'
import { prefersReducedMotion } from '@/lib/utils'
import { useLenis } from '@/providers/SmoothScroll'
import { useIsMobile } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

const reelByTone = {
  founding: ReelFounding,
  growth: ReelGrowth,
  addanki: ReelAddanki,
  craft: ReelCraft,
  today: ReelToday,
  tomorrow: ReelTomorrow,
}

const TOTAL = storyChapters.length

// Chapter-transition timing. Slow + cinematic feel.
const SNAP_DURATION_S = 1.2 // seconds Lenis takes to glide to next chapter
const SNAP_COOLDOWN_MS = 1300 // total lockout between accepted gestures
const TOUCH_THRESHOLD_PX = 34 // finger travel before a swipe counts

/**
 * StoryScroll — thin dispatcher.
 *
 * Desktop mounts the horizontal-pinned cinema (heavy GSAP DOM
 * manipulation); mobile mounts a completely different vertical stack
 * that relies on native scroll-snap. Keeping them as two independent
 * components (rather than branching inside one) guarantees React fully
 * unmounts one before mounting the other — without this, the desktop
 * variant's GSAP pin-spacer wrapper survives across the branch swap
 * and React throws `NotFoundError: Failed to execute 'removeChild'`.
 */
export function StoryScroll() {
  const isMobile = useIsMobile()
  return isMobile ? <StoryMobile /> : <StoryDesktop />
}

/**
 * StoryMobile — thin adapter that wires storyChapters into MobileStory
 * with the per-chapter reel picker. Lives here so it stays paired with
 * `reelByTone` (which is only defined in this file).
 */
function StoryMobile() {
  return (
    <MobileStory
      chapters={storyChapters}
      StoryIntro={StoryIntro}
      renderReel={({ chapter, active, index, mobile }) => {
        const Reel = reelByTone[chapter.tone] ?? ReelFounding
        return (
          <Reel
            chapter={chapter}
            active={active}
            index={index}
            total={TOTAL}
            mobile={mobile}
          />
        )
      }}
    />
  )
}

function StoryDesktop() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const scrollTriggerRef = useRef(null)
  const chapterIdxRef = useRef(0)
  const animatingRef = useRef(false)
  const lastGestureRef = useRef(0)

  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  const getLenis = useLenis()

  useEffect(() => {
    setReducedMotion(prefersReducedMotion())
  }, [])

  // Mirror the active chapter into a ref so our raw wheel/touch handlers can
  // read it without re-binding on every render.
  useEffect(() => {
    chapterIdxRef.current = activeIndex
  }, [activeIndex])

  // Shared animator used by wheel, touch, keyboard, and dock jumps.
  const animateToChapter = useCallback(
    (idx, duration = SNAP_DURATION_S) => {
      const st = scrollTriggerRef.current
      if (!st) return
      const clamped = Math.max(0, Math.min(TOTAL - 1, idx))
      const targetProgress = TOTAL <= 1 ? 0 : clamped / (TOTAL - 1)
      const targetY = st.start + (st.end - st.start) * targetProgress

      animatingRef.current = true
      lastGestureRef.current = performance.now()
      chapterIdxRef.current = clamped

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

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (reducedMotion) return
    if (!pinRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      const track = trackRef.current
      const pin = pinRef.current

      const getScrollDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth)

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: true,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          // Built-in snap remains as a *safety net* for cases the custom
          // gesture controller can't observe (scrollbar drag, deep-link,
          // browser find-in-page, etc.). The primary "one flick = one
          // chapter" behaviour is driven by the wheel/touch listeners
          // below, which fire instantly on gesture rather than waiting
          // for scroll velocity to decay.
          snap: {
            snapTo: 1 / (TOTAL - 1),
            duration: { min: 0.9, max: 1.6 },
            ease: 'power2.inOut',
            delay: 0.2,
            inertia: false,
          },
          onUpdate: (self) => {
            setProgress(self.progress)
            const raw = self.progress * (TOTAL - 1)
            const next = Math.min(TOTAL - 1, Math.round(raw))
            setActiveIndex((prev) => (prev === next ? prev : next))
          },
        },
      })

      scrollTriggerRef.current = tween.scrollTrigger

      // Once background images finish loading, GSAP needs to recompute
      // the pin spacer + horizontal distance so the section ends exactly
      // when the last chapter finishes panning (no stuck-transform bug).
      const imgs = Array.from(track.querySelectorAll('img'))
      let pending = imgs.length
      if (pending === 0) {
        ScrollTrigger.refresh()
      } else {
        const onImgSettled = () => {
          pending -= 1
          if (pending <= 0) ScrollTrigger.refresh()
        }
        imgs.forEach((img) => {
          if (img.complete) {
            onImgSettled()
          } else {
            img.addEventListener('load', onImgSettled, { once: true })
            img.addEventListener('error', onImgSettled, { once: true })
          }
        })
      }

      const onResize = () => ScrollTrigger.refresh()
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }, sectionRef)

    // ---------------------------------------------------------------------
    // Custom gesture snap: one wheel / trackpad flick / Page-Down =
    // advance one chapter. Only active while scroll position sits inside
    // the pinned range; otherwise gestures pass through to Lenis so the
    // user can enter/exit the section naturally.
    //
    // IMPORTANT — mobile behaviour:
    // Touch devices skip the wheel/touchmove capture handlers entirely.
    // On a phone, `touchmove preventDefault` + a 1.3s cool-down feels
    // laggy and blocks native inertia. Instead we let iOS/Android drive
    // the scroll natively and let the GSAP ScrollTrigger `snap` config
    // above glide to the nearest chapter after the flick ends. Keyboard
    // still works everywhere so external keyboards on iPads keep the
    // one-flick-one-chapter behaviour.
    // ---------------------------------------------------------------------
    const isCoarsePointer =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: coarse)').matches

    let touchStartY = null

    const isInsidePin = () => {
      const st = scrollTriggerRef.current
      if (!st) return false
      const y = window.scrollY
      // Small tolerance either side so a gesture that lands right on the
      // boundary is still treated as "inside" and gets a snap.
      return y >= st.start - 4 && y <= st.end + 4
    }

    const decide = (dir) => {
      if (!isInsidePin()) return { intercept: false, targetIdx: null }
      if (animatingRef.current) return { intercept: true, targetIdx: null }
      const now = performance.now()
      if (now - lastGestureRef.current < SNAP_COOLDOWN_MS) {
        return { intercept: true, targetIdx: null }
      }

      const current = chapterIdxRef.current
      const next = current + dir

      if (next < 0) {
        // At first chapter, gesturing back — release control so Lenis can
        // carry the user up into the StoryIntro naturally.
        return { intercept: false, targetIdx: null }
      }
      if (next > TOTAL - 1) {
        // At last chapter, gesturing forward — release control so Lenis
        // can carry the user down into the next section (Marquee).
        return { intercept: false, targetIdx: null }
      }

      return { intercept: true, targetIdx: next }
    }

    const consume = (e) => {
      if (e.cancelable) e.preventDefault()
      // stopImmediatePropagation prevents Lenis (also listening on window)
      // from consuming this gesture and dragging the scroll on top of our
      // scripted animation.
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
      if (targetIdx !== null) animateToChapter(targetIdx)
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
        animateToChapter(targetIdx)
        touchStartY = null
      }
    }

    const onTouchEnd = () => {
      touchStartY = null
    }

    const onKeyDown = (e) => {
      const t = e.target
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
        return
      }
      let dir = 0
      if (e.key === 'PageDown' || e.key === 'ArrowRight') dir = 1
      else if (e.key === 'PageUp' || e.key === 'ArrowLeft') dir = -1
      else if (e.key === ' ' && !e.shiftKey) dir = 1
      else if (e.key === ' ' && e.shiftKey) dir = -1
      else return
      const { intercept, targetIdx } = decide(dir)
      if (!intercept) return
      e.preventDefault()
      if (targetIdx !== null) animateToChapter(targetIdx)
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
  }, [reducedMotion, animateToChapter])

  const jumpTo = useCallback(
    (i) => animateToChapter(i, 1.35),
    [animateToChapter]
  )

  if (reducedMotion) {
    return (
      <section
        id="story"
        aria-label="Our story, chapter by chapter"
        className="relative bg-luxury-black text-cream"
      >
        <StoryIntro />
        <div className="flex flex-col">
          {storyChapters.map((chapter, i) => {
            const Reel = reelByTone[chapter.tone] ?? ReelFounding
            return (
              <div key={chapter.id} className="min-h-svh relative">
                <Reel chapter={chapter} active index={i} total={TOTAL} />
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section
      id="story"
      ref={sectionRef}
      aria-label="Our story, chapter by chapter"
      className="relative bg-luxury-black text-cream"
    >
      <StoryIntro />

      <div
        ref={pinRef}
        className="h-svh relative w-full overflow-hidden"
        style={{ willChange: 'transform' }}
      >
        <div
          ref={trackRef}
          className="flex h-full"
          style={{
            width: `${TOTAL * 100}vw`,
            willChange: 'transform',
          }}
        >
          {storyChapters.map((chapter, i) => {
            const Reel = reelByTone[chapter.tone] ?? ReelFounding
            const active = i === activeIndex
            return (
              <Reel
                key={chapter.id}
                chapter={chapter}
                active={active}
                index={i}
                total={TOTAL}
              />
            )
          })}
        </div>

        <ChapterDock
          chapters={storyChapters}
          activeIndex={activeIndex}
          onJump={jumpTo}
          progress={progress}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-cream/50 md:flex"
        >
          <span>Scroll</span>
          <span className="relative block h-[1px] w-16 overflow-hidden bg-white/15">
            <span
              className="absolute inset-y-0 left-0 block w-1/3 bg-saffron"
              style={{ animation: 'shimmer 2.4s var(--ease-out-luxury) infinite' }}
            />
          </span>
          <span className="tabular-nums">
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(TOTAL).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div aria-hidden className="h-[10vh] bg-luxury-black" />
    </section>
  )
}

function StoryIntro() {
  return (
    <div className="container-luxury relative z-10 py-28 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl"
      >
        <div className="eyebrow flex items-center gap-3 text-saffron">
          <span className="h-px w-10 bg-saffron/60" />
          Our Story · Six reels
        </div>
        <h2 className="display-2 mt-6 text-cream text-balance">
          Twenty years. <span className="gradient-text-fire">One handi.</span>{' '}
          A story still being served.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
          Scroll through the chapters of Ismail Biryani — each scroll turns one
          page of the film, from a single kitchen in Ongole to a global vision.
        </p>
      </motion.div>
    </div>
  )
}
