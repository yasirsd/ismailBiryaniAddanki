import { motion } from 'framer-motion'
import { Drumstick, Flame, Sparkles, Wheat } from 'lucide-react'
import { ReelShell, ReelCopy } from '../ReelShell'
import { KineticYear } from '../KineticYear'
import { Steam } from '@/components/effects/Steam'

const HANDI =
  'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1800&q=90'

const ingredients = [
  {
    id: 'rice',
    icon: Wheat,
    label: 'Aged Basmati',
    body: '12-month aged long-grain, kesar-kissed.',
    n: '01',
  },
  {
    id: 'spice',
    icon: Sparkles,
    label: 'Masalas',
    body: 'Hand-pounded, small batch, elder to elder.',
    n: '02',
  },
  {
    id: 'chicken',
    icon: Drumstick,
    label: 'Sneha Farm Chicken',
    body: 'Trusted brand, delivered fresh daily.',
    n: '03',
  },
  {
    id: 'fire',
    icon: Flame,
    label: 'Whisper of flame',
    body: 'Sealed handi, low fire, no shortcuts.',
    n: '04',
  },
]

export function ReelCraft({ chapter, active, index, total, mobile = false }) {
  if (mobile) {
    return (
      <MobileReelCraft
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
        className="relative z-10 grid h-full w-full grid-cols-1 gap-6 md:grid-cols-[1.1fr_1fr] md:gap-8 lg:gap-12"
        style={{
          paddingTop: 'var(--reel-safe-top)',
          paddingBottom: 'var(--reel-safe-bottom)',
          paddingLeft: 'var(--reel-safe-left)',
          paddingRight: 'var(--reel-safe-right)',
        }}
      >
        {/* LEFT — handi hero + DUM wordmark */}
        <div className="relative flex min-h-0 flex-col justify-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={
              active
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.94, y: 30 }
            }
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative mx-auto w-full max-w-[500px]"
          >
            {/* Circular handi image */}
            <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-full border border-white/10 shadow-[0_60px_140px_-40px_rgba(0,0,0,0.9)]">
              <img
                src={HANDI}
                alt="A sealed copper handi resting on charcoal"
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ filter: 'var(--reel-img-filter)' }}
              />
              <div className="absolute inset-0 rounded-full bg-linear-to-b from-black/20 via-transparent to-black/50" />
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-2 rounded-full"
                style={{
                  boxShadow:
                    'inset 0 0 60px 4px color-mix(in srgb, var(--reel-accent) 40%, transparent)',
                }}
              />
            </div>

            {/* Rotating dashed ring */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-full border border-dashed border-[color:var(--reel-accent)]/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            />

            {/* Center saffron dot mark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-black/50 backdrop-blur-md">
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[color:var(--reel-accent)]">
                  Dum
                </span>
              </div>
            </div>
          </motion.div>

          {/* DUM wordmark under handi */}
          <div className="flex justify-center">
            <KineticYear
              label="DUM"
              active={active}
              outlineIndices={[1]}
              fontSize="clamp(3rem, 8vw, 6.5rem)"
              color="var(--reel-ink)"
              className="justify-center"
            />
          </div>
        </div>

        {/* RIGHT — copy + 2x2 ingredient bento */}
        <div className="relative flex min-h-0 flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0"
          >
            <ReelCopy
              chapter={chapter.chapter}
              kicker={chapter.kicker}
              title={chapter.title}
              body={chapter.body}
              accent={chapter.accent}
            />
          </motion.div>

          {/* 2×2 ingredient bento fills remaining vertical space */}
          <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 md:gap-4">
            {ingredients.map((ing, i) => (
              <IngredientChip key={ing.id} ing={ing} active={active} idx={i} />
            ))}
          </div>
        </div>
      </div>
    </ReelShell>
  )
}

function IngredientChip({ ing, active, idx }) {
  const Icon = ing.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={
        active
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 20, scale: 0.96 }
      }
      transition={{
        duration: 0.9,
        delay: 0.5 + idx * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex min-h-0 flex-col justify-between overflow-hidden rounded-2xl border border-[color:var(--reel-accent)]/20 bg-black/40 p-5 backdrop-blur-md transition-colors duration-500 hover:border-[color:var(--reel-accent)]/45"
    >
      <div className="flex items-start justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--reel-accent-soft)] text-[color:var(--reel-accent)] transition-transform duration-700 group-hover:-rotate-6">
          <Icon size={18} strokeWidth={1.8} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[color:var(--reel-accent)]">
          {ing.n}
        </span>
      </div>

      <div className="mt-6">
        <div className="text-lg font-extrabold leading-tight tracking-tight text-[color:var(--reel-ink)]">
          {ing.label}
        </div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--reel-ink-muted)]">
          {ing.body}
        </p>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-[color:var(--reel-accent)]/10 blur-2xl transition-opacity duration-700 group-hover:opacity-70"
      />
    </motion.div>
  )
}

/* ------------------------------------------------------------------
 * Mobile composition — Reel 4 (Craft / Dum)
 *
 * Editorial spread designed to fit one phone viewport without any
 * hidden swipe content:
 *
 *   1. Capsule hero image (16:11) with the "DUM" wordmark overlaid at
 *      its base like a magazine cover. Chapter chip pinned top-left,
 *      steam curls in the top-right corner.
 *   2. Tight copy block: kicker + title + poetic body.
 *   3. 2×2 ingredient grid — all four visible at once (no horizontal
 *      scroll, no undiscoverable off-screen content).
 *
 * We deliberately drop the earlier circular handi + separate wordmark
 * arrangement because on a 375px viewport it forced four stacked
 * blocks into the same vertical budget the BottomNav already consumes
 * ~76px of.
 * ------------------------------------------------------------------ */
function MobileReelCraft({ chapter, active, index, total }) {
  return (
    <ReelShell tone={chapter.tone} index={index} total={total}>
      <div
        className="relative z-10 flex h-full w-full flex-col gap-4"
        style={{
          paddingTop: 'var(--reel-safe-top)',
          // Extra bottom padding accounts for the BottomNav (~76px on
          // mobile, plus 12px gap + the safe-area inset).
          paddingBottom: 'calc(var(--reel-safe-bottom) + 5rem)',
          paddingLeft: 'var(--reel-safe-left)',
          paddingRight: 'var(--reel-safe-left)',
        }}
      >
        {/* Hero — capsule handi image with DUM wordmark overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={
            active
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.96, y: 16 }
          }
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]"
        >
          <div className="relative aspect-[16/11]">
            <img
              src={HANDI}
              alt="A sealed copper handi resting on glowing charcoal"
              loading="lazy"
              className="h-full w-full object-cover"
              style={{ filter: 'var(--reel-img-filter)' }}
            />
            {/* Warm bottom vignette so the DUM wordmark sits on a
                consistent, legible base regardless of image contents. */}
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/25" />

            {/* Accent glow inside the frame — echoes the ReelShell
                palette (--reel-accent) for tonal coherence. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                boxShadow:
                  'inset 0 -80px 80px -40px color-mix(in srgb, var(--reel-accent) 25%, transparent)',
              }}
            />

            {/* Steam curls in the top-right corner — hints at the
                still-cooking handi below. */}
            <div className="pointer-events-none absolute right-2 top-2 h-24 w-16 opacity-70">
              <Steam count={2} />
            </div>

            {/* Chapter chip pinned top-left, glass over image */}
            <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white/90 backdrop-blur-md">
              {chapter.chapter}
            </div>

            {/* DUM wordmark overlaid at the base of the image */}
            <div className="absolute inset-x-0 bottom-3 flex justify-center">
              <KineticYear
                label="DUM"
                active={active}
                outlineIndices={[1]}
                fontSize="clamp(3rem, 18vw, 5rem)"
                color="var(--reel-accent)"
                className="justify-center"
              />
            </div>
          </div>
        </motion.div>

        {/* Copy block — kicker, title, poetic body */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2"
        >
          {chapter.kicker ? (
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--reel-accent)]">
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
            <p
              className="mt-1 text-[13.5px] leading-relaxed text-balance"
              style={{ color: 'var(--reel-ink-muted)' }}
            >
              {chapter.body}
            </p>
          ) : null}
        </motion.div>

        {/* 2×2 ingredient grid — all four ingredients visible at once,
            no hidden horizontal scroll to discover. */}
        <div
          className="mt-1 grid grid-cols-2 gap-2.5"
          role="list"
          aria-label="What goes into the dum"
        >
          {ingredients.map((ing, i) => (
            <MobileIngredientCard
              key={ing.id}
              ing={ing}
              active={active}
              idx={i}
            />
          ))}
        </div>
      </div>
    </ReelShell>
  )
}

function MobileIngredientCard({ ing, active, idx }) {
  const Icon = ing.icon
  return (
    <motion.article
      role="listitem"
      initial={{ opacity: 0, y: 12 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{
        duration: 0.7,
        delay: 0.3 + idx * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative overflow-hidden rounded-2xl border border-[color:var(--reel-accent)]/25 bg-black/40 p-3.5 backdrop-blur-md"
    >
      <div className="flex items-center gap-2.5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[color:var(--reel-accent-soft)] text-[color:var(--reel-accent)]">
          <Icon size={16} strokeWidth={1.8} aria-hidden />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[color:var(--reel-accent)]">
          {ing.n}
        </span>
      </div>
      <div className="mt-3">
        <div
          className="text-[13.5px] font-extrabold leading-tight tracking-tight"
          style={{ color: 'var(--reel-ink)' }}
        >
          {ing.label}
        </div>
        <p
          className="mt-1 line-clamp-2 text-[11.5px] leading-snug"
          style={{ color: 'var(--reel-ink-muted)' }}
        >
          {ing.body}
        </p>
      </div>

      {/* Corner accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-[color:var(--reel-accent)]/15 blur-2xl"
      />
    </motion.article>
  )
}
