import { motion } from 'framer-motion'
import { ReelShell, ReelCopy } from '../ReelShell'
import { KineticYear } from '../KineticYear'
import { Artifact, RecipeCard, StampBadge } from '../Artifact'
import { founderPic } from '@/assets/images'

const IMAGE = founderPic

export function ReelFounding({ chapter, active, index, total, mobile = false }) {
  if (mobile) {
    return (
      <MobileReelFounding
        chapter={chapter}
        active={active}
        index={index}
        total={total}
      />
    )
  }

  return (
    <ReelShell tone={chapter.tone} index={index} total={total}>
      <div
        className="relative z-10 flex h-full w-full"
        style={{
          paddingTop: 'var(--reel-safe-top)',
          paddingBottom: 'var(--reel-safe-bottom)',
          paddingLeft: 'var(--reel-safe-left)',
          paddingRight: 'var(--reel-safe-right)',
        }}
      >
        {/* Left — copy stack */}
        <div className="relative z-20 flex w-full max-w-lg flex-col justify-center gap-8 md:max-w-xl">
          <ReelCopy
            chapter={chapter.chapter}
            kicker={chapter.kicker}
            title={chapter.title}
            body={chapter.body}
            accent={chapter.accent}
          />

          {/* Hairline + kicker connects the paragraph to the year */}
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[color:var(--reel-ink-muted)]">
            <span className="h-px w-8 bg-[color:var(--reel-accent)]/60" />
            <span>The year the handi first opened</span>
          </div>

          <KineticYear
            label="2005"
            active={active}
            outlineIndices={[1, 2]}
            fontSize="clamp(3.25rem, 7.5vw, 6.25rem)"
            color="var(--reel-ink)"
          />
        </div>

        {/* Right — vintage Polaroid (anchored inside the dock-safe zone) */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 2 }}
          animate={
            active
              ? { opacity: 1, y: 0, rotate: 2 }
              : { opacity: 0, y: 30, rotate: 2 }
          }
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{ right: 'var(--reel-safe-right)' }}
          className="pointer-events-none absolute inset-y-0 z-10 hidden items-center md:flex"
        >
          <div className="w-[34vw] max-w-[440px] rounded-md bg-[#f6ecd3] p-3 pb-12 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]">
            <div className="relative aspect-4/5 overflow-hidden bg-black/50">
              <img
                src={IMAGE}
                alt="Syed Ismail Basha in the founding kitchen, Ongole, 2005"
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ filter: 'var(--reel-img-filter)' }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
            </div>
            <div className="mt-3 text-center font-serif text-sm text-[#2b1c07]">
              Syed Ismail Basha · Ongole, 2005
            </div>
          </div>
        </motion.div>
      </div>

      {/* Artifacts (desktop only — mobile stays clean) */}
      <Artifact
        active={active}
        delay={0.5}
        rotate={-3}
        className="left-6 top-28 z-30 hidden md:block md:left-10"
        from={{ x: -30, y: -10, opacity: 0 }}
      >
        <StampBadge>
          Since
          <br />
          2005
        </StampBadge>
      </Artifact>

      <Artifact
        active={active}
        delay={0.7}
        rotate={-4}
        className="bottom-24 z-30 hidden md:block"
        style={{ right: 'var(--reel-safe-right)' }}
        from={{ x: 30, y: 20, opacity: 0 }}
      >
        <RecipeCard>
          Rice, saffron, patience.
          <br />
          <em className="opacity-70">Never rush the dum.</em>
        </RecipeCard>
      </Artifact>

      {/* Faint archival scan-lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* Recipe journal watermark — hand-drawn open book anchors the middle
          of the composition and ties the copy on the left to the Polaroid on
          the right. Sits above the ambient doodles (z-[1]) but below the copy
          (z-20) and the Polaroid (z-10), so it reads as a soft background
          motif rather than competing with content. */}
      <RecipeJournalMark active={active} />
    </ReelShell>
  )
}

function RecipeJournalMark({ active }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 100 70"
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute z-[2] hidden md:block"
      style={{
        top: '50%',
        left: '50%',
        width: 'clamp(320px, 38vw, 620px)',
        transform: 'translate(-50%, -50%) rotate(-1.5deg)',
        color: 'var(--reel-accent)',
      }}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={
        active
          ? { opacity: 0.22, y: 0, scale: 1 }
          : { opacity: 0, y: 20, scale: 0.96 }
      }
      transition={{ duration: 1.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Warm-paper fill behind the pages (very faint) */}
      <path
        d="M6 8 L 48 6 L 50 64 L 8 66 Z"
        fill="currentColor"
        fillOpacity="0.04"
        stroke="none"
      />
      <path
        d="M52 6 L 94 8 L 92 66 L 50 64 Z"
        fill="currentColor"
        fillOpacity="0.04"
        stroke="none"
      />

      {/* Page outlines */}
      <path d="M6 8 L 48 6 L 50 64 L 8 66 Z" strokeWidth="0.35" />
      <path d="M52 6 L 94 8 L 92 66 L 50 64 Z" strokeWidth="0.35" />

      {/* Spine */}
      <line x1="50" y1="6" x2="50" y2="65" strokeDasharray="0.9 0.9" strokeWidth="0.28" opacity="0.65" />

      {/* Corner curls — top-left and top-right */}
      <path d="M8 12 C 12 10, 14 10, 14 14" strokeWidth="0.32" opacity="0.7" />
      <path d="M92 12 C 88 10, 86 10, 86 14" strokeWidth="0.32" opacity="0.7" />

      {/* LEFT PAGE — handwritten recipe lines */}
      <g strokeWidth="0.28" opacity="0.75">
        <path d="M12 16 L 42 16" strokeDasharray="0.9 0.5" />
        <path d="M12 22 L 40 22.5" strokeDasharray="0.9 0.5" />
        <path d="M12 28 L 44 28" strokeDasharray="1.2 0.6" />
        <path d="M14 34 L 40 34" strokeDasharray="0.9 0.5" />
        <path d="M12 40 L 44 40" strokeDasharray="0.9 0.5" />
        <path d="M12 46 L 38 46" strokeDasharray="0.9 0.5" />
        <path d="M14 52 L 42 52" strokeDasharray="0.9 0.5" />
        <path d="M12 58 L 34 58" strokeDasharray="0.9 0.5" />
      </g>

      {/* Left page number */}
      <text
        x="12"
        y="63"
        fontSize="2.4"
        fill="currentColor"
        opacity="0.55"
        stroke="none"
      >
        i
      </text>

      {/* RIGHT PAGE — header */}
      <g stroke="none" fill="currentColor" opacity="0.9">
        <text x="56" y="18" fontSize="4.4" fontWeight="800" letterSpacing="0.15">
          RECIPE
        </text>
        <text x="56" y="24" fontSize="2.8" fontWeight="600" letterSpacing="0.42">
          NO. 001
        </text>
      </g>
      <line x1="56" y1="27" x2="88" y2="27" strokeWidth="0.32" opacity="0.6" />

      {/* Right page — ingredient list with bullet dots */}
      <g strokeWidth="0.28" opacity="0.8">
        <circle cx="57" cy="34" r="0.7" fill="currentColor" />
        <path d="M60 34 L 88 34" strokeDasharray="0.9 0.5" />

        <circle cx="57" cy="40" r="0.7" fill="currentColor" />
        <path d="M60 40 L 86 40" strokeDasharray="0.9 0.5" />

        <circle cx="57" cy="46" r="0.7" fill="currentColor" />
        <path d="M60 46 L 84 46" strokeDasharray="0.9 0.5" />

        <circle cx="57" cy="52" r="0.7" fill="currentColor" />
        <path d="M60 52 L 88 52" strokeDasharray="0.9 0.5" />

        <circle cx="57" cy="58" r="0.7" fill="currentColor" />
        <path d="M60 58 L 82 58" strokeDasharray="0.9 0.5" />
      </g>

      {/* Right page — signature flourish + "Ismail" scribble */}
      <g stroke="currentColor" strokeWidth="0.35" opacity="0.6" fill="none">
        <path d="M64 63 C 66 61, 68 63, 70 61 C 72 59, 74 62, 76 60 C 78 58, 80 61, 82 59" />
      </g>

      {/* Small ornamental sprig on left page (saffron thread doodle) */}
      <g stroke="currentColor" strokeWidth="0.32" opacity="0.6">
        <path d="M32 62 C 34 60, 36 62, 38 60" />
        <path d="M34 64 C 36 62, 38 64, 40 62" />
      </g>
    </motion.svg>
  )
}

/* ------------------------------------------------------------------
 * Mobile composition — Reel 1
 *
 * Vertical stack from top to bottom:
 *   1. Chapter chip + kicker (identity)
 *   2. Vintage Polaroid photo of the founder (the visual anchor —
 *      previously hidden on mobile, now front-and-centre)
 *   3. Kinetic "2005" year mark
 *   4. Title + body copy
 *   5. Ambient stamp badge in the top-right corner
 *
 * Uses the same ReelShell (so tone, film grain, doodles, and seam
 * blending all carry over) but the internal layout is designed for
 * portrait viewports first.
 * ------------------------------------------------------------------ */
function MobileReelFounding({ chapter, active, index, total }) {
  return (
    <ReelShell tone={chapter.tone} index={index} total={total}>
      <div
        className="relative z-10 flex h-full w-full flex-col justify-center gap-5"
        style={{
          paddingTop: 'var(--reel-safe-top)',
          paddingBottom: 'calc(var(--reel-safe-bottom) + 4rem)',
          paddingLeft: 'var(--reel-safe-left)',
          paddingRight: 'var(--reel-safe-left)',
        }}
      >
        {/* Chapter chip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[color:var(--reel-ink-muted)]"
        >
          <span
            className="rounded-full border px-2.5 py-1"
            style={{
              borderColor:
                'color-mix(in srgb, var(--reel-ink) 18%, transparent)',
              background:
                'color-mix(in srgb, var(--reel-ink) 6%, transparent)',
            }}
          >
            {chapter.chapter}
          </span>
          {chapter.accent ? (
            <span className="text-[color:var(--reel-accent)]">
              {chapter.accent}
            </span>
          ) : null}
        </motion.div>

        {/* Polaroid photo — the visual anchor for the founding story */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -1.5 }}
          animate={
            active
              ? { opacity: 1, y: 0, rotate: -1.5 }
              : { opacity: 0, y: 24, rotate: -1.5 }
          }
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-[240px] rounded-md bg-[#f6ecd3] p-2.5 pb-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
        >
          <div className="relative aspect-4/5 overflow-hidden bg-black/40">
            <img
              src={IMAGE}
              alt="Syed Ismail Basha in the founding kitchen, Ongole, 2005"
              loading="lazy"
              className="h-full w-full object-cover"
              style={{ filter: 'var(--reel-img-filter)' }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div className="mt-2 text-center font-serif text-[11px] text-[#2b1c07]">
            Ongole · 2005
          </div>
        </motion.div>

        {/* Kinetic year */}
        <div className="flex justify-center">
          <KineticYear
            label="2005"
            active={active}
            outlineIndices={[1, 2]}
            fontSize="clamp(2.75rem, 15vw, 4.5rem)"
            color="var(--reel-ink)"
          />
        </div>

        {/* Kicker + title + body */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-3 text-center"
        >
          {chapter.kicker ? (
            <div className="text-sm font-medium text-[color:var(--reel-ink-muted)]">
              {chapter.kicker}
            </div>
          ) : null}
          <h3
            className="text-2xl font-extrabold leading-[1.05] tracking-tight text-balance"
            style={{ color: 'var(--reel-ink)' }}
          >
            {chapter.title}
          </h3>
          {chapter.body ? (
            <p className="mx-auto max-w-md text-[13.5px] leading-relaxed text-[color:var(--reel-ink-muted)]">
              {chapter.body}
            </p>
          ) : null}
        </motion.div>
      </div>

      {/* Ambient "Since 2005" stamp — top-right corner. Small on mobile
          so it decorates without stealing focus from the Polaroid. */}
      <Artifact
        active={active}
        delay={0.6}
        rotate={-6}
        className="right-4 top-20 z-30 scale-75 origin-top-right"
        from={{ x: 20, y: -10, opacity: 0 }}
      >
        <StampBadge>
          Since
          <br />
          2005
        </StampBadge>
      </Artifact>

      {/* Recipe card as a subtle floating artifact bottom-left */}
      <Artifact
        active={active}
        delay={0.8}
        rotate={-3}
        className="bottom-24 left-2 z-30 scale-[0.6] origin-bottom-left"
        from={{ x: -20, y: 20, opacity: 0 }}
      >
        <RecipeCard>
          Rice, saffron,
          <br />
          patience.
        </RecipeCard>
      </Artifact>
    </ReelShell>
  )
}
