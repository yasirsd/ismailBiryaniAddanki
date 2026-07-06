import { motion } from 'framer-motion'
import { ReelShell, ReelCopy } from '../ReelShell'
import { KineticYear } from '../KineticYear'
import { Artifact } from '../Artifact'

/**
 * Reel 6 — Tomorrow. Illustrative world silhouette with a saffron pin over
 * Addanki and dotted arcs radiating to future destinations.
 */

const ADDANKI = { x: 63.5, y: 46 }
const destinations = [
  { id: 'dubai', name: 'Dubai', x: 54, y: 44, delay: 1.0 },
  { id: 'london', name: 'London', x: 42, y: 30, delay: 1.25 },
  { id: 'toronto', name: 'Toronto', x: 22, y: 34, delay: 1.5 },
  { id: 'singapore', name: 'Singapore', x: 72, y: 55, delay: 1.75 },
  { id: 'sydney', name: 'Sydney', x: 84, y: 72, delay: 2.0 },
]

function arcPath(a, b, curve = 10) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2 - curve
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`
}

export function ReelTomorrow({ chapter, active, index, total, mobile = false }) {
  if (mobile) {
    return (
      <MobileReelTomorrow
        chapter={chapter}
        active={active}
        index={index}
        total={total}
      />
    )
  }

  return (
    <ReelShell tone={chapter.tone} index={index} total={total}>
      {/* Faded kinetic "NEXT" behind everything */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-85">
        <KineticYear
          label="NEXT"
          active={active}
          outlineIndices={[0, 2]}
          fontSize="clamp(6rem, 18vw, 15rem)"
          color="var(--reel-ink)"
          className="justify-center"
        />
      </div>

      {/* World map */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{
          paddingTop: 'var(--reel-safe-top)',
          paddingBottom: 'var(--reel-safe-bottom)',
        }}
      >
        <motion.svg
          viewBox="0 0 100 80"
          className="h-full w-[85vw] max-w-[1300px]"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          aria-label="World map with radiating destinations from Addanki"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern
              id="worldDots"
              width="1.4"
              height="1.4"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="0.7"
                cy="0.7"
                r="0.32"
                fill="var(--reel-ink)"
                opacity="0.5"
              />
            </pattern>
            <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
              <stop
                offset="0"
                stopColor="var(--reel-accent)"
                stopOpacity="0.9"
              />
              <stop
                offset="1"
                stopColor="var(--reel-accent)"
                stopOpacity="0.15"
              />
            </linearGradient>
          </defs>

          <g opacity="0.8">
            <path
              d="M8 22 C 14 16, 22 14, 30 16 C 34 20, 32 26, 28 30 C 24 34, 18 36, 12 34 C 8 30, 6 26, 8 22 Z"
              fill="url(#worldDots)"
            />
            <path
              d="M22 44 C 26 40, 32 42, 32 48 C 32 56, 28 64, 24 62 C 20 58, 18 50, 22 44 Z"
              fill="url(#worldDots)"
            />
            <path
              d="M40 22 C 46 18, 52 20, 54 24 C 54 30, 50 32, 46 32 C 42 30, 38 28, 40 22 Z"
              fill="url(#worldDots)"
            />
            <path
              d="M46 34 C 52 32, 58 34, 58 42 C 58 52, 54 60, 50 58 C 46 54, 44 46, 46 34 Z"
              fill="url(#worldDots)"
            />
            <path
              d="M56 20 C 66 16, 76 18, 82 24 C 84 30, 82 34, 76 36 C 70 38, 64 36, 60 32 C 56 28, 54 24, 56 20 Z"
              fill="url(#worldDots)"
            />
            <path
              d="M62 38 C 66 36, 70 38, 68 44 C 66 50, 62 50, 60 46 C 58 42, 60 40, 62 38 Z"
              fill="url(#worldDots)"
            />
            <path
              d="M80 62 C 86 60, 92 62, 90 68 C 88 74, 82 74, 78 70 C 76 66, 78 62, 80 62 Z"
              fill="url(#worldDots)"
            />
          </g>

          {destinations.map((d) => (
            <motion.path
              key={d.id}
              d={arcPath(ADDANKI, d, 8 + Math.random() * 6)}
              stroke="url(#arcGrad)"
              strokeWidth="0.35"
              strokeDasharray="0.9 0.8"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                active
                  ? { pathLength: 1, opacity: 0.9 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{
                duration: 1.6,
                delay: d.delay,
                ease: 'easeInOut',
              }}
            />
          ))}

          {destinations.map((d) => (
            <motion.g
              key={`pin-${d.id}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
              }
              transition={{
                duration: 0.5,
                delay: d.delay + 1.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <circle
                cx={d.x}
                cy={d.y}
                r="0.9"
                fill="var(--reel-ink)"
                opacity="0.8"
              />
              <text
                x={d.x + 1.4}
                y={d.y + 0.6}
                fontSize="1.6"
                fontWeight="700"
                fill="var(--reel-ink)"
                opacity="0.7"
                letterSpacing="0.04"
              >
                {d.name}
              </text>
            </motion.g>
          ))}

          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={
              active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.circle
              cx={ADDANKI.x}
              cy={ADDANKI.y}
              r="2.5"
              fill="none"
              stroke="var(--reel-accent)"
              strokeWidth="0.3"
              initial={{ scale: 1, opacity: 0.9 }}
              animate={{ scale: [1, 3, 1], opacity: [0.9, 0, 0.9] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
              style={{ transformOrigin: `${ADDANKI.x}px ${ADDANKI.y}px` }}
            />
            <circle
              cx={ADDANKI.x}
              cy={ADDANKI.y}
              r="1.3"
              fill="var(--reel-accent)"
            />
            <text
              x={ADDANKI.x + 2.2}
              y={ADDANKI.y - 1}
              fontSize="1.8"
              fontWeight="800"
              fill="var(--reel-accent)"
              letterSpacing="0.05"
            >
              ADDANKI
            </text>
          </motion.g>
        </motion.svg>
      </div>

      {/* Copy pinned bottom-left, safely inside the reel */}
      <div
        className="pointer-events-none relative z-30 flex h-full w-full items-end"
        style={{
          paddingBottom: 'calc(var(--reel-safe-bottom) + 0.5rem)',
          paddingLeft: 'var(--reel-safe-left)',
          paddingRight: 'var(--reel-safe-right)',
        }}
      >
        <div className="pointer-events-auto max-w-md rounded-3xl border border-white/10 bg-black/50 p-7 backdrop-blur-md md:max-w-lg md:p-8">
          <ReelCopy
            chapter={chapter.chapter}
            kicker={chapter.kicker}
            title={chapter.title}
            body={chapter.body}
            accent={chapter.accent}
          />
        </div>
      </div>

      {/* Passport-stamp artifact (respects safe zones) */}
      <Artifact
        active={active}
        delay={2.4}
        rotate={-6}
        className="top-28 z-30 hidden md:block"
        style={{ right: 'var(--reel-safe-right)' }}
        from={{ x: 30, y: -20, opacity: 0 }}
      >
        <div
          className="w-52 rounded-lg border-2 border-dashed border-[color:var(--reel-accent)]/70 bg-[color:var(--reel-accent-soft)] p-4 text-center backdrop-blur-md"
          style={{ transform: 'rotate(-4deg)' }}
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-[color:var(--reel-accent)]">
            Boarding pass
          </div>
          <div className="mt-2 font-serif text-2xl italic text-[color:var(--reel-ink)]">
            Addanki → World
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-[color:var(--reel-ink-muted)]">
            Departure: soon
          </div>
        </div>
      </Artifact>
    </ReelShell>
  )
}

/* ------------------------------------------------------------------
 * Mobile composition — Reel 6 (Tomorrow / world map)
 *
 * Vertical: faded NEXT wordmark background, then a compact world map
 * centered, then the boarding-pass artifact, then title + body at
 * the bottom.
 * ------------------------------------------------------------------ */
function MobileReelTomorrow({ chapter, active, index, total }) {
  return (
    <ReelShell tone={chapter.tone} index={index} total={total}>
      {/* Faded "NEXT" wordmark behind everything */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-70">
        <KineticYear
          label="NEXT"
          active={active}
          outlineIndices={[0, 2]}
          fontSize="clamp(4.5rem, 26vw, 8rem)"
          color="var(--reel-ink)"
          className="justify-center"
        />
      </div>

      <div
        className="relative z-10 flex h-full w-full flex-col justify-between gap-4"
        style={{
          paddingTop: 'var(--reel-safe-top)',
          paddingBottom: 'calc(var(--reel-safe-bottom) + 4rem)',
          paddingLeft: 'var(--reel-safe-left)',
          paddingRight: 'var(--reel-safe-left)',
        }}
      >
        {/* Compact world map, top */}
        <motion.svg
          viewBox="0 0 100 80"
          className="mx-auto h-auto w-full max-w-[340px]"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          aria-label="World map with destinations from Addanki"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern
              id="worldDotsMobile"
              width="1.4"
              height="1.4"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="0.7"
                cy="0.7"
                r="0.32"
                fill="var(--reel-ink)"
                opacity="0.5"
              />
            </pattern>
            <linearGradient id="arcGradMobile" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="var(--reel-accent)" stopOpacity="0.9" />
              <stop offset="1" stopColor="var(--reel-accent)" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <g opacity="0.8">
            <path
              d="M8 22 C 14 16, 22 14, 30 16 C 34 20, 32 26, 28 30 C 24 34, 18 36, 12 34 C 8 30, 6 26, 8 22 Z"
              fill="url(#worldDotsMobile)"
            />
            <path
              d="M22 44 C 26 40, 32 42, 32 48 C 32 56, 28 64, 24 62 C 20 58, 18 50, 22 44 Z"
              fill="url(#worldDotsMobile)"
            />
            <path
              d="M40 22 C 46 18, 52 20, 54 24 C 54 30, 50 32, 46 32 C 42 30, 38 28, 40 22 Z"
              fill="url(#worldDotsMobile)"
            />
            <path
              d="M46 34 C 52 32, 58 34, 58 42 C 58 52, 54 60, 50 58 C 46 54, 44 46, 46 34 Z"
              fill="url(#worldDotsMobile)"
            />
            <path
              d="M56 20 C 66 16, 76 18, 82 24 C 84 30, 82 34, 76 36 C 70 38, 64 36, 60 32 C 56 28, 54 24, 56 20 Z"
              fill="url(#worldDotsMobile)"
            />
            <path
              d="M62 38 C 66 36, 70 38, 68 44 C 66 50, 62 50, 60 46 C 58 42, 60 40, 62 38 Z"
              fill="url(#worldDotsMobile)"
            />
            <path
              d="M80 62 C 86 60, 92 62, 90 68 C 88 74, 82 74, 78 70 C 76 66, 78 62, 80 62 Z"
              fill="url(#worldDotsMobile)"
            />
          </g>

          {destinations.map((d) => (
            <motion.path
              key={d.id}
              d={arcPath(ADDANKI, d, 8 + Math.random() * 6)}
              stroke="url(#arcGradMobile)"
              strokeWidth="0.4"
              strokeDasharray="0.9 0.8"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                active
                  ? { pathLength: 1, opacity: 0.9 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 1.4, delay: d.delay, ease: 'easeInOut' }}
            />
          ))}

          {destinations.map((d) => (
            <motion.g
              key={`pin-${d.id}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
              }
              transition={{
                duration: 0.5,
                delay: d.delay + 1.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <circle cx={d.x} cy={d.y} r="1.1" fill="var(--reel-ink)" opacity="0.85" />
              <text
                x={d.x + 1.8}
                y={d.y + 0.7}
                fontSize="2"
                fontWeight="700"
                fill="var(--reel-ink)"
                opacity="0.75"
                letterSpacing="0.04"
              >
                {d.name}
              </text>
            </motion.g>
          ))}

          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <motion.circle
              cx={ADDANKI.x}
              cy={ADDANKI.y}
              r="2.5"
              fill="none"
              stroke="var(--reel-accent)"
              strokeWidth="0.3"
              initial={{ scale: 1, opacity: 0.9 }}
              animate={{ scale: [1, 3, 1], opacity: [0.9, 0, 0.9] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
              style={{ transformOrigin: `${ADDANKI.x}px ${ADDANKI.y}px` }}
            />
            <circle cx={ADDANKI.x} cy={ADDANKI.y} r="1.6" fill="var(--reel-accent)" />
            <text
              x={ADDANKI.x + 2.4}
              y={ADDANKI.y - 1.2}
              fontSize="2.2"
              fontWeight="800"
              fill="var(--reel-accent)"
              letterSpacing="0.05"
            >
              ADDANKI
            </text>
          </motion.g>
        </motion.svg>

        {/* Boarding pass card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-[260px] rounded-lg border-2 border-dashed border-[color:var(--reel-accent)]/70 bg-[color:var(--reel-accent-soft)] p-4 text-center backdrop-blur-md"
          style={{ transform: 'rotate(-2deg)' }}
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-[color:var(--reel-accent)]">
            Boarding pass
          </div>
          <div className="mt-1.5 font-serif text-xl italic text-[color:var(--reel-ink)]">
            Addanki → World
          </div>
          <div className="mt-1 text-[9px] uppercase tracking-[0.28em] text-[color:var(--reel-ink-muted)]">
            Departure: soon
          </div>
        </motion.div>

        {/* Copy at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.7 }}
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
          {chapter.body ? (
            <p className="mx-auto max-w-md text-[13px] leading-relaxed text-[color:var(--reel-ink-muted)]">
              {chapter.body}
            </p>
          ) : null}
        </motion.div>
      </div>
    </ReelShell>
  )
}
