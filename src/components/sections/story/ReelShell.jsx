import { FilmGrain } from './FilmGrain'
import { ReelBackdrop } from './ReelBackdrop'
import { reelPalettes } from './palette'
import { cn } from '@/lib/utils'

// Shared warm-black used by every reel's left + right edge fade. When
// reel N ends and reel N+1 begins, both meet at this tone, so the seam
// between them dissolves instead of showing a hard vertical line.
const SEAM_TONE = 'rgba(8, 5, 2, 0.85)'

/**
 * Every reel is a 100vw x 100vh cinematic panel. The shell applies the
 * chapter's palette, film grain, ambient chapter doodles, and a nav-safe
 * padding so content never collides with the fixed site nav or the sticky
 * chapter dock.
 *
 * Reels can read the safe zones with the CSS variables:
 *   --reel-safe-top / --reel-safe-bottom / --reel-safe-right / --reel-safe-left
 */
export function ReelShell({ tone, index, total, children, className }) {
  const palette = reelPalettes[tone] ?? reelPalettes.founding

  return (
    <section
      data-reel
      aria-roledescription="story chapter"
      className={cn(
        'h-svh relative flex w-screen shrink-0 flex-col overflow-hidden',
        className
      )}
      style={{
        background: palette.bg,
        color: palette.ink,
        '--reel-ink': palette.ink,
        '--reel-ink-muted': palette.inkMuted,
        '--reel-accent': palette.accent,
        '--reel-accent-soft': palette.accentSoft,
        '--reel-img-filter': palette.imageFilter,
        // Mobile leaves room for the top ChapterDock pill; on md+ the
        // ChapterDock is a right-side rail so the top-safe zone shrinks
        // back to nav clearance.
        '--reel-safe-top': 'clamp(4.5rem, 11vh, 6rem)',
        '--reel-safe-bottom': 'clamp(2.5rem, 5vh, 3.5rem)',
        '--reel-safe-left': 'clamp(1.25rem, 4vw, 2rem)',
        // --reel-safe-right is inherited from :root and switches from
        // 2rem (mobile, no dock) to 14rem (md+, dock reserved). See
        // index.css. This means reels automatically reclaim the right
        // half of the viewport on phones without any per-reel overrides.
      }}
    >
      {/* Ambient thematic doodles — sit above the bg gradient, below content. */}
      <ReelBackdrop tone={tone} />

      {/* Left seam-blend — fades this reel's leftmost stripe into the shared
          warm-black so the previous reel's right seam meets it seamlessly. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[18vw] max-w-[280px]"
        style={{
          background: `linear-gradient(to right, ${SEAM_TONE} 0%, rgba(8,5,2,0.55) 35%, transparent 100%)`,
        }}
      />
      {/* Right seam-blend — mirror of the left. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-[18vw] max-w-[280px]"
        style={{
          background: `linear-gradient(to left, ${SEAM_TONE} 0%, rgba(8,5,2,0.55) 35%, transparent 100%)`,
        }}
      />

      {/* Soft top + bottom vignettes to give the reel a "cinematic frame"
          feel and prevent the fixed nav / dock chrome from feeling stapled
          onto the reel edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-32"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
        }}
      />

      {children}

      <FilmGrain strength={palette.grain} />

      {/* Reel index (bottom-left) */}
      <div className="pointer-events-none absolute bottom-5 left-6 z-30 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] md:left-10">
        <span className="text-[color:var(--reel-accent)]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="h-px w-8 bg-[color:var(--reel-ink-muted)]" />
        <span className="text-[color:var(--reel-ink-muted)]">
          {String(total).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}

/**
 * Standard title block used by most reels — chip + kicker + title + body.
 */
export function ReelCopy({
  chapter,
  kicker,
  title,
  body,
  accent,
  className,
}) {
  return (
    <div className={cn('flex max-w-xl flex-col gap-5', className)}>
      <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[color:var(--reel-ink-muted)]">
        <span
          className="rounded-full border px-3 py-1"
          style={{
            borderColor:
              'color-mix(in srgb, var(--reel-ink) 18%, transparent)',
            background:
              'color-mix(in srgb, var(--reel-ink) 6%, transparent)',
          }}
        >
          {chapter}
        </span>
        {accent ? (
          <span className="text-[color:var(--reel-accent)]">{accent}</span>
        ) : null}
      </div>

      {kicker ? (
        <div className="text-lg font-medium tracking-tight text-[color:var(--reel-ink-muted)] md:text-xl">
          {kicker}
        </div>
      ) : null}

      <h3
        className="text-3xl font-extrabold leading-[1.02] tracking-tight text-balance md:text-5xl lg:text-6xl"
        style={{ color: 'var(--reel-ink)' }}
      >
        {title}
      </h3>

      {body ? (
        <p className="max-w-lg text-[15px] leading-relaxed text-[color:var(--reel-ink-muted)] md:text-base">
          {body}
        </p>
      ) : null}
    </div>
  )
}
