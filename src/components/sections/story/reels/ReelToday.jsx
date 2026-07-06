import { motion } from 'framer-motion'
import { Heart, Users } from 'lucide-react'
import { ReelShell, ReelCopy } from '../ReelShell'
import { KineticYear } from '../KineticYear'

/**
 * Reel 5 — Today (2026). Magazine-cover layout: left column is a text spread
 * (kinetic 2026 + copy + accent tile); right column is a 5-tile bento
 * collage. Both columns fill the reel top-to-bottom — no empty bands.
 */

const tiles = [
  {
    src: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1400&q=85',
    label: 'The first breath',
    span: 'col-span-8 row-span-3',
    delay: 0.15,
  },
  {
    src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=85',
    label: 'Family table',
    span: 'col-span-4 row-span-2',
    delay: 0.22,
  },
  {
    src: 'https://images.unsplash.com/photo-1638176067000-9e2545bb54c8?auto=format&fit=crop&w=1200&q=85',
    label: 'Saffron lassi',
    span: 'col-span-4 row-span-3',
    delay: 0.32,
  },
  {
    src: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=85',
    label: 'Andhra 65',
    span: 'col-span-4 row-span-2',
    delay: 0.4,
  },
  {
    src: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=85',
    label: 'Sweet ending',
    span: 'col-span-4 row-span-2',
    delay: 0.48,
  },
]

export function ReelToday({ chapter, active, index, total, mobile = false }) {
  if (mobile) {
    return (
      <MobileReelToday
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
        className="relative z-10 grid h-full w-full grid-cols-1 gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] md:gap-8 lg:gap-10"
        style={{
          paddingTop: 'var(--reel-safe-top)',
          paddingBottom: 'var(--reel-safe-bottom)',
          paddingLeft: 'var(--reel-safe-left)',
          paddingRight: 'var(--reel-safe-right)',
        }}
      >
        {/* LEFT — kinetic year + copy + live stats tile */}
        <div className="relative flex min-h-0 flex-col justify-between gap-6">
          {/* Kinetic 2026 */}
          <div className="shrink-0">
            <KineticYear
              label="2026"
              active={active}
              outlineIndices={[1, 3]}
              fontSize="clamp(3.5rem, 9vw, 8rem)"
              color="var(--reel-ink)"
            />
          </div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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

          {/* Live stats card fills the remaining space */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-0 flex-1"
          >
            <div className="flex h-full min-h-[100px] flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--reel-accent)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--reel-accent)]" />
                    <span className="relative rounded-full bg-[color:var(--reel-accent)]" />
                  </span>
                  On any given evening
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight text-[color:var(--reel-ink)]">
                      400+
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[color:var(--reel-ink-muted)]">
                    <Users size={12} className="text-[color:var(--reel-accent)]" />
                    Guests seated
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight text-[color:var(--reel-ink)]">
                      92<span className="text-2xl text-[color:var(--reel-accent)]">%</span>
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[color:var(--reel-ink-muted)]">
                    <Heart size={12} className="text-[color:var(--reel-accent)]" />
                    Return within a month
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — bento collage that fills the reel top-to-bottom */}
        <div className="relative grid min-h-0 grid-cols-12 grid-rows-5 gap-3 md:gap-4">
          {tiles.map((t, i) => (
            <motion.figure
              key={t.src}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={
                active
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 40, scale: 0.96 }
              }
              transition={{
                duration: 0.9,
                delay: t.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative min-h-0 overflow-hidden rounded-[1.3rem] border border-white/10 bg-black/40 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ${t.span}`}
            >
              <img
                src={t.src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                style={{ filter: 'var(--reel-img-filter)' }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-black/80 via-black/10 to-transparent p-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-cream">
                <span className="truncate">{t.label}</span>
                <span className="ml-2 shrink-0 text-[color:var(--reel-accent)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </ReelShell>
  )
}

/* ------------------------------------------------------------------
 * Mobile composition — Reel 5 (Today, 2026)
 *
 * Vertical: kinetic "2026" → title/body → 2×2 image bento (top-left is
 * the "hero" tile) → live-stats card. The desktop 12×5 grid is scaled
 * down to a clean 2×2 so each image is legible on a portrait phone.
 * ------------------------------------------------------------------ */
function MobileReelToday({ chapter, active, index, total }) {
  // Pick the 4 strongest visuals from the desktop set for the mobile bento.
  const bentoTiles = tiles.slice(0, 4)
  return (
    <ReelShell tone={chapter.tone} index={index} total={total}>
      <div
        className="relative z-10 flex h-full w-full flex-col justify-center gap-4"
        style={{
          paddingTop: 'var(--reel-safe-top)',
          paddingBottom: 'calc(var(--reel-safe-bottom) + 4rem)',
          paddingLeft: 'var(--reel-safe-left)',
          paddingRight: 'var(--reel-safe-left)',
        }}
      >
        {/* Kinetic year */}
        <div className="flex justify-center">
          <KineticYear
            label="2026"
            active={active}
            outlineIndices={[1, 3]}
            fontSize="clamp(3rem, 16vw, 5rem)"
            color="var(--reel-ink)"
          />
        </div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-2 text-center"
        >
          {chapter.kicker ? (
            <div className="text-sm font-medium text-[color:var(--reel-ink-muted)]">
              {chapter.kicker}
            </div>
          ) : null}
          <h3
            className="text-xl font-extrabold leading-[1.05] tracking-tight text-balance"
            style={{ color: 'var(--reel-ink)' }}
          >
            {chapter.title}
          </h3>
        </motion.div>

        {/* 2×2 bento */}
        <div className="grid grid-cols-2 gap-2.5">
          {bentoTiles.map((t, i) => (
            <motion.figure
              key={t.src}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={
                active
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 24, scale: 0.96 }
              }
              transition={{
                duration: 0.8,
                delay: 0.3 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative aspect-4/5 overflow-hidden rounded-xl border border-white/10 bg-black/40"
            >
              <img
                src={t.src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ filter: 'var(--reel-img-filter)' }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-black/80 via-black/10 to-transparent p-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-cream">
                <span className="truncate">{t.label}</span>
              </div>
            </motion.figure>
          ))}
        </div>

        {/* Live stats — inline row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="rounded-xl border border-white/10 bg-black/40 p-3 backdrop-blur-md"
        >
          <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-[color:var(--reel-accent)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--reel-accent)]" />
              <span className="relative rounded-full bg-[color:var(--reel-accent)]" />
            </span>
            On any given evening
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-3">
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-[color:var(--reel-ink)]">
                400+
              </span>
              <div className="flex items-center gap-1 text-[10px] text-[color:var(--reel-ink-muted)]">
                <Users size={10} className="text-[color:var(--reel-accent)]" />
                Guests
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold tracking-tight text-[color:var(--reel-ink)]">
                92
                <span className="text-lg text-[color:var(--reel-accent)]">
                  %
                </span>
              </span>
              <div className="flex items-center justify-end gap-1 text-[10px] text-[color:var(--reel-ink-muted)]">
                <Heart size={10} className="text-[color:var(--reel-accent)]" />
                Return within a month
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </ReelShell>
  )
}
