/**
 * ReelBackdrop
 *
 * Ambient, hand-drawn ornament layer sitting *behind* each reel's content
 * (above the palette gradient, below the edge blends and safe-zone content).
 *
 * The doodles are subliminal — 5-9% opacity, fine 0.5-0.8px strokes, and use
 * `currentColor` so they inherit the reel's ink tone. Each chapter gets its
 * own thematic motif that quietly reinforces the story beat:
 *
 *   founding  — compass rose + spice scatter (finding the recipe)
 *   growth    — constellation of pins + dashed arcs (Ongole → Chimakurti)
 *   addanki   — lotus mandala + paisley (settling into the home branch)
 *   craft     — handi silhouette + rising steam (the dum ceremony)
 *   today     — spice galaxy + steam wisps (the living kitchen)
 *   tomorrow  — constellation + growth branches (the future)
 */

/* ---------- Doodle atoms ---------- */

function CompassRose({ className }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="50" cy="50" r="42" strokeDasharray="1.6 2.4" />
      <circle cx="50" cy="50" r="30" />
      <circle cx="50" cy="50" r="2.4" fill="currentColor" fillOpacity="0.5" />
      <path
        d="M50 8 L52 50 L50 92 L48 50 Z"
        fill="currentColor"
        fillOpacity="0.25"
      />
      <path
        d="M8 50 L50 48 L92 50 L50 52 Z"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <path d="M22 22 L48 48 M52 48 L78 22 M22 78 L48 52 M52 52 L78 78" />
      <text
        x="50"
        y="6"
        fontSize="5"
        textAnchor="middle"
        fill="currentColor"
        opacity="0.7"
      >
        N
      </text>
    </svg>
  )
}

function SpiceScatter({ className }) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden>
      <g fill="currentColor">
        <circle cx="10" cy="14" r="1.6" />
        <circle cx="28" cy="8" r="2.2" />
        <circle cx="46" cy="20" r="1" />
        <circle cx="68" cy="10" r="2.8" />
        <circle cx="94" cy="24" r="1.6" />
        <circle cx="110" cy="12" r="1.2" />
        <circle cx="18" cy="88" r="1.2" />
        <circle cx="42" cy="80" r="1.8" />
        <circle cx="62" cy="90" r="2.4" />
        <circle cx="90" cy="82" r="1.4" />
        <circle cx="106" cy="94" r="1" />
      </g>
      {/* Star anise */}
      <g fill="currentColor" opacity="0.85">
        <path
          transform="translate(24 52)"
          d="M0 -7 L1.7 -2.2 L7 -2.2 L2.7 0.8 L4.3 5.7 L0 2.7 L-4.3 5.7 L-2.7 0.8 L-7 -2.2 L-1.7 -2.2 Z"
        />
        <path
          transform="translate(84 46)"
          d="M0 -6 L1.4 -1.9 L6 -1.9 L2.3 0.7 L3.7 4.9 L0 2.3 L-3.7 4.9 L-2.3 0.7 L-6 -1.9 L-1.4 -1.9 Z"
        />
      </g>
      {/* Cardamom pods */}
      <g fill="none" stroke="currentColor" strokeWidth="0.5">
        <ellipse cx="56" cy="52" rx="3" ry="4.4" />
        <ellipse cx="102" cy="58" rx="2.4" ry="3.6" />
      </g>
    </svg>
  )
}

function SteamCurls({ className }) {
  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 118 C 14 96, 28 82, 20 62 C 12 42, 26 30, 22 12 C 20 6, 22 2, 22 2" />
      <path
        d="M46 118 C 42 92, 56 74, 44 52 C 32 30, 50 20, 44 4"
        strokeWidth="0.9"
      />
      <path d="M74 118 C 70 100, 84 82, 72 60 C 60 38, 78 26, 74 8" />
      {/* Tiny dots to suggest heat particles */}
      <g fill="currentColor" stroke="none">
        <circle cx="32" cy="30" r="0.8" />
        <circle cx="60" cy="20" r="0.7" />
        <circle cx="82" cy="34" r="0.6" />
        <circle cx="28" cy="10" r="0.5" />
      </g>
    </svg>
  )
}

function HandiSilhouette({ className }) {
  return (
    <svg
      viewBox="0 0 120 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Steam curls above */}
      <path d="M46 20 C 48 12, 44 8, 48 2" strokeWidth="0.5" opacity="0.75" />
      <path d="M60 18 C 62 10, 58 6, 62 1" strokeWidth="0.5" opacity="0.85" />
      <path d="M74 20 C 76 12, 72 8, 76 2" strokeWidth="0.5" opacity="0.75" />
      {/* Handi rim */}
      <ellipse cx="60" cy="34" rx="26" ry="4" />
      {/* Handi body */}
      <path d="M34 34 C 30 42, 28 54, 34 66 C 42 78, 78 78, 86 66 C 92 54, 90 42, 86 34" />
      {/* Handi lid indication */}
      <path
        d="M40 34 C 44 30, 76 30, 80 34"
        strokeDasharray="1.4 1.4"
        opacity="0.7"
      />
      {/* Ladle */}
      <path
        d="M92 40 L 108 32 M 105 30 A 4 4 0 1 0 111 34 Z"
        strokeWidth="0.6"
        opacity="0.8"
      />
      {/* Ground line */}
      <line
        x1="24"
        y1="86"
        x2="96"
        y2="86"
        strokeDasharray="1.2 1.8"
        opacity="0.5"
      />
    </svg>
  )
}

function LotusMandala({ className }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="50" cy="50" r="6" fill="currentColor" fillOpacity="0.3" />
      <circle cx="50" cy="50" r="14" />
      <circle cx="50" cy="50" r="26" strokeDasharray="1.6 2.2" />
      <circle cx="50" cy="50" r="38" opacity="0.55" />
      {/* Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <path
          key={deg}
          d="M50 50 C 46 34, 46 22, 50 10 C 54 22, 54 34, 50 50 Z"
          transform={`rotate(${deg} 50 50)`}
          fill="currentColor"
          fillOpacity="0.06"
        />
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
        <path
          key={deg}
          d="M50 50 C 48 40, 48 30, 50 22 C 52 30, 52 40, 50 50 Z"
          transform={`rotate(${deg} 50 50)`}
          opacity="0.6"
        />
      ))}
    </svg>
  )
}

function ConstellationMark({ className }) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden>
      <g stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.55">
        <line x1="14" y1="24" x2="38" y2="16" />
        <line x1="38" y1="16" x2="66" y2="22" />
        <line x1="66" y1="22" x2="90" y2="12" />
        <line x1="66" y1="22" x2="78" y2="50" />
        <line x1="78" y1="50" x2="102" y2="42" />
        <line x1="38" y1="16" x2="30" y2="52" />
        <line x1="30" y1="52" x2="54" y2="66" />
        <line x1="54" y1="66" x2="78" y2="50" />
        <line x1="30" y1="52" x2="22" y2="82" />
        <line x1="54" y1="66" x2="60" y2="90" />
        <line x1="60" y1="90" x2="90" y2="82" />
        <line x1="90" y1="82" x2="102" y2="42" />
      </g>
      <g fill="currentColor">
        <circle cx="14" cy="24" r="1.4" />
        <circle cx="38" cy="16" r="1.9" />
        <circle cx="66" cy="22" r="2.2" />
        <circle cx="90" cy="12" r="1.2" />
        <circle cx="30" cy="52" r="1.5" />
        <circle cx="78" cy="50" r="1.7" />
        <circle cx="102" cy="42" r="1" />
        <circle cx="54" cy="66" r="2.4" />
        <circle cx="22" cy="82" r="1.3" />
        <circle cx="60" cy="90" r="1.6" />
        <circle cx="90" cy="82" r="1.1" />
      </g>
      {/* twinkle rings around the big star */}
      <circle
        cx="54"
        cy="66"
        r="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.25"
        opacity="0.5"
      />
      <circle
        cx="54"
        cy="66"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.2"
        opacity="0.3"
      />
    </svg>
  )
}

function PaisleyMark({ className }) {
  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 10 C 60 10, 82 40, 78 70 C 74 100, 40 116, 22 108 C 6 100, 8 80, 24 74 C 40 68, 54 56, 50 42 C 46 28, 34 22, 24 24" />
      <path
        d="M28 30 C 46 32, 60 44, 60 60 C 60 76, 46 88, 34 88"
        opacity="0.7"
      />
      <path
        d="M36 44 C 44 46, 50 52, 50 60 C 50 68, 44 74, 38 74"
        opacity="0.5"
        strokeDasharray="1 1.2"
      />
      <circle cx="45" cy="60" r="1.4" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

function GrowthTree({ className }) {
  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M50 118 L50 66" />
      <path d="M50 66 C 40 60, 30 58, 22 46" />
      <path d="M50 66 C 60 60, 70 58, 78 46" />
      <path d="M50 82 C 42 78, 34 74, 26 66" opacity="0.7" />
      <path d="M50 82 C 58 78, 66 74, 74 66" opacity="0.7" />
      <path d="M50 50 C 46 42, 46 34, 50 22" />
      <path d="M50 50 C 44 44, 40 38, 36 30" opacity="0.7" />
      <path d="M50 50 C 56 44, 60 38, 64 30" opacity="0.7" />
      {/* Fruits/dots */}
      <g fill="currentColor">
        <circle cx="22" cy="46" r="1.6" />
        <circle cx="78" cy="46" r="1.6" />
        <circle cx="26" cy="66" r="1.2" />
        <circle cx="74" cy="66" r="1.2" />
        <circle cx="36" cy="30" r="1" />
        <circle cx="64" cy="30" r="1" />
        <circle cx="50" cy="22" r="1.8" opacity="0.85" />
      </g>
      {/* Ground */}
      <line
        x1="30"
        y1="118"
        x2="70"
        y2="118"
        strokeDasharray="1.2 1.6"
        opacity="0.55"
      />
    </svg>
  )
}

/* ---------- Per-tone recipe ---------- */

const backdropByTone = {
  founding: [
    {
      Icon: CompassRose,
      className:
        'absolute right-[4vw] top-[9vh] h-40 w-40 opacity-[0.06] md:h-56 md:w-56',
    },
    {
      Icon: SpiceScatter,
      className:
        'absolute left-[3vw] bottom-[12vh] h-32 w-40 opacity-[0.09] md:h-44 md:w-52',
    },
  ],
  growth: [
    {
      Icon: ConstellationMark,
      className:
        'absolute right-[8vw] top-[16vh] h-44 w-52 opacity-[0.07] md:h-56 md:w-64',
    },
    {
      Icon: SpiceScatter,
      className:
        'absolute left-[3vw] bottom-[10vh] h-32 w-40 opacity-[0.07] md:h-40 md:w-48',
    },
  ],
  addanki: [
    {
      Icon: LotusMandala,
      className:
        'absolute right-[6vw] top-[8vh] h-52 w-52 opacity-[0.055] md:h-72 md:w-72',
    },
    {
      Icon: PaisleyMark,
      className:
        'absolute left-[3vw] bottom-[8vh] h-40 w-32 opacity-[0.07] md:h-52 md:w-40',
    },
  ],
  craft: [
    {
      Icon: HandiSilhouette,
      className:
        'absolute right-[5vw] top-[14vh] h-52 w-64 opacity-[0.06] md:h-64 md:w-80',
    },
    {
      Icon: SteamCurls,
      className:
        'absolute left-[3vw] bottom-[6vh] h-52 w-40 opacity-[0.055] md:h-64 md:w-48',
    },
  ],
  today: [
    {
      Icon: SpiceScatter,
      className:
        'absolute right-[6vw] top-[14vh] h-40 w-52 opacity-[0.07] md:h-48 md:w-64',
    },
    {
      Icon: SteamCurls,
      className:
        'absolute left-[3vw] bottom-[8vh] h-52 w-40 opacity-[0.055] md:h-60 md:w-44',
    },
  ],
  tomorrow: [
    {
      Icon: ConstellationMark,
      className:
        'absolute right-[6vw] top-[12vh] h-52 w-60 opacity-[0.09] md:h-64 md:w-80',
    },
    {
      Icon: GrowthTree,
      className:
        'absolute left-[3vw] bottom-[6vh] h-52 w-40 opacity-[0.06] md:h-64 md:w-48',
    },
  ],
}

/**
 * Renders the two ambient doodles for a chapter tone. Positioned absolutely
 * inside the ReelShell, below any content. Non-interactive.
 */
export function ReelBackdrop({ tone }) {
  const doodles = backdropByTone[tone] ?? backdropByTone.founding
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      style={{ color: 'var(--reel-ink)' }}
    >
      {doodles.map((d, i) => {
        const Icon = d.Icon
        return <Icon key={i} className={d.className} />
      })}
    </div>
  )
}
