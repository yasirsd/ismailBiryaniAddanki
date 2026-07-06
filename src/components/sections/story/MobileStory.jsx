import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChapterDock } from './ChapterDock'

/**
 * Mobile-only Story renderer.
 *
 * Instead of the desktop's horizontal-pin cinema (600vw wide, GSAP-
 * driven horizontal panning), on phones we simply stack the reels
 * vertically. Each reel is `100svh` tall and has `scroll-snap-align`
 * applied via CSS, so the browser natively snaps to the next chapter
 * when the user flicks up or down — no JS gesture jack, no cooldown,
 * no fight with iOS inertia.
 *
 * We track the active reel with an IntersectionObserver so the mobile
 * dock (`ChapterDock variant="mobile-fixed"`) can reflect progress and
 * the active reel gets `active={true}` (which triggers the entrance
 * animations inside each reel component).
 *
 * The dock itself is visible only while the story wrapper is in view;
 * scrolling into Hero above or Marquee below hides it so it doesn't
 * cover unrelated content.
 */
export function MobileStory({ chapters, StoryIntro, renderReel }) {
  const wrapperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [dockVisible, setDockVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  // Track which reel is closest to the viewport centre. Using
  // rootMargin to bias detection towards the middle of the screen means
  // the "active" reel switches at the exact moment scroll-snap locks
  // onto it, so the dock and the reel's entrance animation stay in
  // perfect sync.
  useEffect(() => {
    const nodes = wrapperRef.current?.querySelectorAll('[data-mobile-reel]')
    if (!nodes || nodes.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersection ratio in this batch.
        let best = null
        for (const e of entries) {
          if (!e.isIntersecting) continue
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e
        }
        if (!best) return
        const idx = Number(best.target.getAttribute('data-index'))
        if (!Number.isNaN(idx)) {
          setActiveIndex(idx)
          const total = chapters.length
          setProgress(total <= 1 ? 0 : idx / (total - 1))
        }
      },
      {
        // Middle 40% of the viewport acts as the "active zone".
        rootMargin: '-30% 0px -30% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [chapters.length])

  // Show / hide the fixed dock based on whether the story wrapper is
  // meaningfully in the viewport. This keeps the dock out of the way
  // when the user is reading Hero, Marquee, Menu, etc.
  useEffect(() => {
    const node = wrapperRef.current
    if (!node) return

    const io = new IntersectionObserver(
      ([entry]) => setDockVisible(entry.isIntersecting),
      { rootMargin: '-15% 0px -15% 0px', threshold: 0.05 }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  // Programmatic jump when the dock is tapped. Uses native
  // scrollIntoView with smooth behavior — no dependency on Lenis (which
  // isn't running on touch anyway).
  const jumpTo = useCallback((i) => {
    const node = wrapperRef.current?.querySelector(
      `[data-mobile-reel][data-index="${i}"]`
    )
    if (!node) return
    node.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <section
      id="story"
      aria-label="Our story, chapter by chapter"
      className="relative bg-luxury-black text-cream"
      ref={wrapperRef}
    >
      {/* Intro block — snap-aligned so the transition from intro to
          chapter 1 feels intentional rather than partial. */}
      <div data-story-intro>
        <StoryIntro />
      </div>

      {/* Vertical stack of reels. Each wrapper is exactly 100svh and
          gets `scroll-snap-align: start` via the CSS rule in
          index.css keyed off `[data-mobile-reel]`. */}
      <div className="flex flex-col">
        {chapters.map((chapter, i) => {
          const active = i === activeIndex
          return (
            <motion.div
              key={chapter.id}
              data-mobile-reel
              data-index={i}
              className="h-svh relative w-full"
              // Subtle entrance so a chapter fading in feels alive as
              // it snaps into view, without competing with the reel's
              // own internal choreography.
              initial={false}
              animate={{ opacity: active ? 1 : 0.6 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderReel({ chapter, active, index: i, mobile: true })}
            </motion.div>
          )
        })}
      </div>

      {/* Bottom-fixed dock (thumb-reachable). Rendered as a fixed nav
          so it stays glued to the viewport bottom as reels snap by. */}
      <ChapterDock
        variant="mobile-fixed"
        chapters={chapters}
        activeIndex={activeIndex}
        onJump={jumpTo}
        progress={progress}
        visible={dockVisible}
      />

      {/* Small breathing room before the next section starts so the
          last reel doesn't feel guillotined by Marquee. */}
      <div aria-hidden className="h-6 bg-luxury-black" />
    </section>
  )
}
