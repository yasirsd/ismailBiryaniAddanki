import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Chapter navigation for the Story section.
 *
 * Two independent surfaces:
 *
 *  1. Desktop dock — vertical rail on the right edge of the pinned
 *     horizontal cinema. Shows all chapters, highlights the active
 *     one, hover reveals the label. Fixed position inside the pinned
 *     container.
 *
 *  2. Mobile dock — thumb-reachable bottom bar (fixed to viewport)
 *     with taps that smooth-scroll to each chapter. Only rendered
 *     when the mobile story is on-screen (controlled by the parent),
 *     using the `variant="mobile-fixed"` prop.
 */
export function ChapterDock({
  chapters,
  activeIndex,
  onJump,
  progress = 0,
  variant = 'desktop',
  visible = true,
}) {
  if (variant === 'mobile-fixed') {
    return (
      <MobileFixedDock
        chapters={chapters}
        activeIndex={activeIndex}
        onJump={onJump}
        progress={progress}
        visible={visible}
      />
    )
  }

  return (
    <>
      {/* Desktop dock — vertical stack, hugs the right edge tightly */}
      <div className="pointer-events-none absolute right-2 top-24 bottom-20 z-40 hidden items-center md:flex lg:right-3">
        <div className="pointer-events-auto flex flex-col gap-0.5 rounded-3xl border border-white/10 bg-black/40 px-2 py-4 backdrop-blur-xl">
          {chapters.map((c, i) => {
            const active = i === activeIndex
            const label = c.kicker ?? c.title
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onJump(i)}
                className={cn(
                  'group flex items-center gap-3 rounded-full py-2 pl-2 pr-3 text-left transition-colors',
                  active
                    ? 'text-cream'
                    : 'text-cream/60 hover:text-cream/85'
                )}
                aria-current={active ? 'step' : undefined}
                aria-label={`Chapter ${i + 1}: ${c.title}`}
              >
                <span
                  className={cn(
                    'relative grid h-2 shrink-0 place-items-center rounded-full transition-all duration-500',
                    active
                      ? 'w-6 bg-saffron'
                      : 'w-2 bg-cream/25 group-hover:bg-cream/60'
                  )}
                />
                <span
                  className={cn(
                    'block overflow-hidden truncate text-[10px] font-semibold uppercase tracking-[0.22em] transition-all duration-500',
                    active
                      ? 'max-w-[136px] opacity-100'
                      : 'max-w-0 opacity-0 group-hover:max-w-[136px] group-hover:opacity-80'
                  )}
                >
                  <span className="tabular-nums text-saffron/90">
                    {String(i + 1).padStart(2, '0')}
                  </span>{' '}
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Mobile progress pill — legacy top-anchored version used by the
          horizontal cinema on `md` tablets. On phones (< md) the story
          uses `variant="mobile-fixed"` and this pill isn't rendered. */}
      <div className="pointer-events-none absolute inset-x-0 top-24 z-40 flex justify-center md:hidden">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-black/50 px-4 py-2 backdrop-blur-xl">
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cream/70 tabular-nums">
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(chapters.length).padStart(2, '0')}
          </span>
          <div className="relative h-[3px] w-24 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 origin-left rounded-full bg-linear-to-r from-saffron via-gold to-deep-red"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * Mobile Story dock — a thumb-reachable bar fixed to the bottom of the
 * viewport that follows the user while they're inside the Story
 * section. Tap any dot to smooth-scroll to that chapter.
 *
 * Rendered as a portal-friendly `fixed` bar rather than an absolutely
 * positioned child so it stays glued to the viewport as reels snap by.
 */
function MobileFixedDock({ chapters, activeIndex, onJump, progress, visible }) {
  return (
    <motion.nav
      aria-label="Story chapters"
      initial={false}
      animate={{
        y: visible ? 0 : 60,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 z-[65] flex justify-center md:hidden"
      style={{
        // Sits above the persistent BottomNav so the two chips stack
        // cleanly on phones instead of overlapping. BottomNav is ~76px
        // tall (icon column + label + padding); we add a 12px gap so
        // the two feel like a paired system, not a collision.
        bottom: 'calc(0.75rem + var(--safe-bottom, 0px) + 76px + 12px)',
      }}
    >
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/12 bg-black/70 px-3 py-2.5 backdrop-blur-xl shadow-[0_16px_40px_-12px_rgba(0,0,0,0.9)]">
        {/* Chapter counter */}
        <span className="pl-1.5 pr-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-cream/70 tabular-nums">
          {String(activeIndex + 1).padStart(2, '0')}
          <span className="text-cream/30">
            /{String(chapters.length).padStart(2, '0')}
          </span>
        </span>

        <span aria-hidden className="h-4 w-px bg-white/12" />

        {/* Tap dots */}
        <div className="flex items-center gap-1.5">
          {chapters.map((c, i) => {
            const active = i === activeIndex
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onJump(i)}
                aria-current={active ? 'step' : undefined}
                aria-label={`Chapter ${i + 1}: ${c.title}`}
                className={cn(
                  'group relative grid h-11 place-items-center px-1 transition-colors',
                  active ? 'text-saffron' : 'text-cream/60 active:text-cream'
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'block rounded-full transition-all duration-500',
                    active ? 'h-2 w-6 bg-saffron' : 'h-1.5 w-1.5 bg-cream/50'
                  )}
                />
              </button>
            )
          })}
        </div>

        <span aria-hidden className="h-4 w-px bg-white/12" />

        {/* Live progress bar */}
        <div className="relative mr-1 h-[3px] w-10 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 origin-left rounded-full bg-linear-to-r from-saffron via-gold to-deep-red"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </motion.nav>
  )
}
