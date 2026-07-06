import { motion } from 'framer-motion'
import { ReelShell, ReelCopy } from '../ReelShell'
import { KineticYear } from '../KineticYear'
import { Artifact, TicketStub } from '../Artifact'

/**
 * Reel 2 — Growth. Stylised region map (illustrative, not cartographic) with
 * animated pins tracing the expansion from Ongole → Chimakurti → Addanki.
 */

const cities = [
  { id: 'ongole', name: 'Ongole', x: 42, y: 58, main: true, order: 0 },
  { id: 'chimakurti', name: 'Chimakurti', x: 55, y: 48, order: 1 },
  { id: 'addanki', name: 'Addanki', x: 32, y: 40, star: true, order: 2 },
]

export function ReelGrowth({ chapter, active, index, total, mobile = false }) {
  if (mobile) {
    return (
      <MobileReelGrowth
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
        className="relative z-10 flex h-full w-full items-center gap-8"
        style={{
          paddingTop: 'var(--reel-safe-top)',
          paddingBottom: 'var(--reel-safe-bottom)',
          paddingLeft: 'var(--reel-safe-left)',
          paddingRight: 'var(--reel-safe-right)',
        }}
      >
        {/* Left — copy card + year, tight vertical rhythm */}
        <div className="relative z-20 flex w-full max-w-md flex-col justify-center gap-5 md:w-[42%] md:gap-6">
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
            <span>Growth begins</span>
          </div>

          <KineticYear
            label="2008"
            active={active}
            outlineIndices={[0, 3]}
            fontSize="clamp(2.75rem, 6.5vw, 5.5rem)"
            color="var(--reel-ink)"
          />
        </div>

        {/* Right — map */}
        <div className="relative hidden flex-1 items-center justify-center md:flex">
          <motion.svg
            viewBox="0 0 100 100"
            className="h-[62vh] max-h-[560px] w-full max-w-[560px]"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={
              active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }
            }
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <defs>
              <radialGradient id="mapGlow" cx="0.4" cy="0.5" r="0.7">
                <stop
                  offset="0"
                  stopColor="var(--reel-accent)"
                  stopOpacity="0.22"
                />
                <stop
                  offset="1"
                  stopColor="var(--reel-accent)"
                  stopOpacity="0"
                />
              </radialGradient>
              <pattern
                id="mapDots"
                width="2"
                height="2"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="1"
                  cy="1"
                  r="0.35"
                  fill="var(--reel-ink)"
                  opacity="0.28"
                />
              </pattern>
            </defs>

            <circle cx="45" cy="50" r="46" fill="url(#mapGlow)" />

            <path
              d="M18 22 C 28 18, 38 22, 46 16 C 55 12, 68 18, 74 26 C 82 34, 84 46, 78 56 C 82 66, 76 74, 68 78 C 60 84, 48 86, 40 82 C 30 78, 22 72, 18 62 C 14 52, 12 40, 14 30 Z"
              fill="url(#mapDots)"
              stroke="var(--reel-ink)"
              strokeOpacity="0.35"
              strokeWidth="0.4"
              strokeDasharray="1.5 1.2"
            />

            <motion.path
              d="M 42 58 C 48 55, 52 52, 55 48 C 50 46, 42 43, 32 40"
              fill="none"
              stroke="var(--reel-accent)"
              strokeWidth="0.4"
              strokeDasharray="1.2 1"
              initial={{ pathLength: 0 }}
              animate={active ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2.2, delay: 0.9, ease: 'easeInOut' }}
            />

            {cities.map((c) => (
              <motion.g
                key={c.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.9 + c.order * 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {c.star ? (
                  <motion.circle
                    cx={c.x}
                    cy={c.y}
                    r="2"
                    fill="none"
                    stroke="var(--reel-accent)"
                    strokeWidth="0.3"
                    initial={{ scale: 1, opacity: 0.9 }}
                    animate={{ scale: [1, 2.5, 1], opacity: [0.9, 0, 0.9] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                    style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                  />
                ) : null}

                <circle
                  cx={c.x}
                  cy={c.y}
                  r={c.star ? 1.3 : c.main ? 1.1 : 0.9}
                  fill={c.star || c.main ? 'var(--reel-accent)' : 'var(--reel-ink)'}
                />
                <text
                  x={c.x + 2.4}
                  y={c.y + 0.6}
                  fontSize="2.1"
                  fontWeight="700"
                  fill="var(--reel-ink)"
                  letterSpacing="0.05"
                >
                  {c.name}
                </text>
              </motion.g>
            ))}
          </motion.svg>
        </div>
      </div>

      {/* Stat callout — sits inside the safe zone */}
      <Artifact
        active={active}
        delay={1.6}
        rotate={-2}
        className="top-1/2 z-30 hidden -translate-y-1/2 md:block"
        style={{ right: 'var(--reel-safe-right)' }}
        from={{ x: 40, y: 0, opacity: 0 }}
      >
        <div className="w-52 rounded-2xl border border-[color:var(--reel-accent)]/30 bg-black/50 p-5 text-[color:var(--reel-ink)] backdrop-blur-md">
          <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--reel-accent)]">
            2005 → 2020
          </div>
          <div className="mt-3 text-3xl font-extrabold tracking-tight">
            8 branches
          </div>
          <div className="mt-1 text-sm text-[color:var(--reel-ink-muted)]">
            Ongole • Chimakurti • Addanki
          </div>
        </div>
      </Artifact>

      <Artifact
        active={active}
        delay={2.0}
        rotate={2}
        className="bottom-20 left-10 z-30 hidden md:block"
        from={{ x: -40, y: 20, opacity: 0 }}
      >
        <TicketStub>The queue keeps growing.</TicketStub>
      </Artifact>
    </ReelShell>
  )
}

/* ------------------------------------------------------------------
 * Mobile composition — Reel 2
 *
 * Vertical: chip → map (compact) → year → title/body → 8-branches
 * pill inline. Ticket-stub artifact floats at the bottom-left as a
 * small aesthetic anchor.
 * ------------------------------------------------------------------ */
function MobileReelGrowth({ chapter, active, index, total }) {
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
        {/* Chip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7 }}
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

        {/* Compact map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={
            active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }
          }
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-[280px]"
        >
          <MapSvg active={active} />
        </motion.div>

        {/* Year */}
        <div className="flex justify-center">
          <KineticYear
            label="2008"
            active={active}
            outlineIndices={[0, 3]}
            fontSize="clamp(2.5rem, 14vw, 4rem)"
            color="var(--reel-ink)"
          />
        </div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.35 }}
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

        {/* 8-branches inline pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto flex items-center gap-2 rounded-full border border-[color:var(--reel-accent)]/40 bg-black/40 px-4 py-2 backdrop-blur-md"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--reel-accent)]">
            2005 → 2020
          </span>
          <span className="h-4 w-px bg-[color:var(--reel-ink-muted)]/50" />
          <span className="text-sm font-bold text-[color:var(--reel-ink)]">
            8 branches
          </span>
        </motion.div>
      </div>

      {/* Small ticket stub as decorative artifact bottom-left */}
      <Artifact
        active={active}
        delay={0.9}
        rotate={-4}
        className="bottom-24 left-2 z-30 scale-[0.65] origin-bottom-left"
        from={{ x: -20, y: 20, opacity: 0 }}
      >
        <TicketStub>The queue keeps growing.</TicketStub>
      </Artifact>
    </ReelShell>
  )
}

function MapSvg({ active }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="h-auto w-full"
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <defs>
        <radialGradient id="mapGlowMobile" cx="0.4" cy="0.5" r="0.7">
          <stop offset="0" stopColor="var(--reel-accent)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--reel-accent)" stopOpacity="0" />
        </radialGradient>
        <pattern
          id="mapDotsMobile"
          width="2"
          height="2"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.35" fill="var(--reel-ink)" opacity="0.28" />
        </pattern>
      </defs>

      <circle cx="45" cy="50" r="46" fill="url(#mapGlowMobile)" />

      <path
        d="M18 22 C 28 18, 38 22, 46 16 C 55 12, 68 18, 74 26 C 82 34, 84 46, 78 56 C 82 66, 76 74, 68 78 C 60 84, 48 86, 40 82 C 30 78, 22 72, 18 62 C 14 52, 12 40, 14 30 Z"
        fill="url(#mapDotsMobile)"
        stroke="var(--reel-ink)"
        strokeOpacity="0.35"
        strokeWidth="0.4"
        strokeDasharray="1.5 1.2"
      />

      <motion.path
        d="M 42 58 C 48 55, 52 52, 55 48 C 50 46, 42 43, 32 40"
        fill="none"
        stroke="var(--reel-accent)"
        strokeWidth="0.5"
        strokeDasharray="1.2 1"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 2, delay: 0.6, ease: 'easeInOut' }}
      />

      {cities.map((c) => (
        <motion.g
          key={c.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.6 + c.order * 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {c.star ? (
            <motion.circle
              cx={c.x}
              cy={c.y}
              r="2"
              fill="none"
              stroke="var(--reel-accent)"
              strokeWidth="0.3"
              initial={{ scale: 1, opacity: 0.9 }}
              animate={{ scale: [1, 2.5, 1], opacity: [0.9, 0, 0.9] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              style={{ transformOrigin: `${c.x}px ${c.y}px` }}
            />
          ) : null}

          <circle
            cx={c.x}
            cy={c.y}
            r={c.star ? 1.5 : c.main ? 1.3 : 1.1}
            fill={c.star || c.main ? 'var(--reel-accent)' : 'var(--reel-ink)'}
          />
          <text
            x={c.x + 2.6}
            y={c.y + 0.8}
            fontSize="2.6"
            fontWeight="700"
            fill="var(--reel-ink)"
            letterSpacing="0.05"
          >
            {c.name}
          </text>
        </motion.g>
      ))}
    </motion.svg>
  )
}
