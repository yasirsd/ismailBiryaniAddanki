import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { ReelShell, ReelCopy } from '../ReelShell'
import { KineticYear } from '../KineticYear'
import { Artifact } from '../Artifact'
import { branchPic, proprietorPic } from '@/assets/images'

const IMG_MAIN = branchPic
const IMG_SUPPORT =
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=90'

export function ReelAddanki({ chapter, active, index, total, mobile = false }) {
  if (mobile) {
    return (
      <MobileReelAddanki
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
        className="relative z-10 grid h-full w-full grid-cols-1 gap-6 md:grid-cols-[1.05fr_1fr] md:gap-8 lg:gap-12"
        style={{
          paddingTop: 'var(--reel-safe-top)',
          paddingBottom: 'var(--reel-safe-bottom)',
          paddingLeft: 'var(--reel-safe-left)',
          paddingRight: 'var(--reel-safe-right)',
        }}
      >
        {/* LEFT — big lead image with proprietor card layered at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative min-h-0"
        >
          <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]">
            <img
              src={IMG_MAIN}
              alt="Ismail Biryani — the Addanki branch"
              loading="lazy"
              className="h-full w-full object-cover"
              style={{ filter: 'var(--reel-img-filter)' }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />

            {/* Location badge (top-left of image) */}
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-cream backdrop-blur-md">
              <MapPin size={12} className="text-[color:var(--reel-accent)]" />
              Addanki · AP
            </div>

            {/* Proprietor card overlaid on the image bottom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-black/55 p-5 backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[color:var(--reel-accent)]/60 ring-offset-2 ring-offset-black/60">
                  <img
                    src={proprietorPic}
                    alt="Syed Vaseem Akram, proprietor"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--reel-accent)]">
                    Proprietor
                  </div>
                  <div className="text-base font-extrabold leading-tight text-cream">
                    Syed Vaseem Akram
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[13px] italic leading-relaxed text-cream/75">
                "The recipe travels. The intention travels. The family travels."
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT — kinetic wordmark + copy stack + supporting image */}
        <div className="relative flex min-h-0 flex-col gap-6">
          {/* Kinetic ADDANKI top */}
          <div className="shrink-0">
            <KineticYear
              label="ADDANKI"
              active={active}
              outlineIndices={[0, 2, 4, 6]}
              fontSize="clamp(2.5rem, 6.8vw, 6rem)"
              color="var(--reel-ink)"
            />
          </div>

          {/* Copy card */}
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

          {/* Supporting image fills remaining space */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-0 flex-1"
          >
            <div className="relative h-full min-h-[16vh] overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)]">
              <img
                src={IMG_SUPPORT}
                alt="Families dining together at Ismail Biryani"
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ filter: 'var(--reel-img-filter)' }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-4">
                <div className="flex items-center justify-between text-cream">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-cream/60">
                      In the room
                    </div>
                    <div className="mt-0.5 text-sm font-semibold">
                      Guests, not customers.
                    </div>
                  </div>
                  <div className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-cream/80">
                    Family run
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Faint sub-title strip at very bottom of the reel (fills lower dead space) */}
      <Artifact
        active={active}
        delay={0.9}
        rotate={0}
        float={false}
        className="left-1/2 z-20 hidden -translate-x-1/2 md:block"
        style={{ bottom: 'calc(var(--reel-safe-bottom) - 1.2rem)' }}
        from={{ y: 20, opacity: 0 }}
      >
        <div className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.5em] text-[color:var(--reel-ink-muted)]">
          Ismail Biryani · Addanki · A proprietor firm · Est 2024
        </div>
      </Artifact>
    </ReelShell>
  )
}

/* ------------------------------------------------------------------
 * Mobile composition — Reel 3 (Addanki)
 *
 * Full-bleed branch photograph fills the top ~55% of the reel with the
 * proprietor card overlaid at the bottom of the image; copy stack sits
 * below the photograph. This gives the branch (the physical place) top
 * billing, which is the entire point of this chapter.
 * ------------------------------------------------------------------ */
function MobileReelAddanki({ chapter, active, index, total }) {
  return (
    <ReelShell tone={chapter.tone} index={index} total={total}>
      <div
        className="relative z-10 flex h-full w-full flex-col"
        style={{
          paddingTop: 'var(--reel-safe-top)',
          paddingBottom: 'calc(var(--reel-safe-bottom) + 4rem)',
          paddingLeft: 'var(--reel-safe-left)',
          paddingRight: 'var(--reel-safe-left)',
          gap: '1.25rem',
        }}
      >
        {/* Hero image with proprietor overlay */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex-1 min-h-0"
        >
          <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
            <img
              src={IMG_MAIN}
              alt="Ismail Biryani — the Addanki branch"
              loading="lazy"
              className="h-full w-full object-cover"
              style={{ filter: 'var(--reel-img-filter)' }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />

            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-cream backdrop-blur-md">
              <MapPin size={10} className="text-[color:var(--reel-accent)]" />
              Addanki · AP
            </div>

            {/* Proprietor card, overlaid on the image bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-3 bottom-3 rounded-xl border border-white/12 bg-black/60 p-3 backdrop-blur-md"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-[color:var(--reel-accent)]/60">
                  <img
                    src={proprietorPic}
                    alt="Syed Vaseem Akram, proprietor"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[color:var(--reel-accent)]">
                    Proprietor
                  </div>
                  <div className="truncate text-sm font-extrabold leading-tight text-cream">
                    Syed Vaseem Akram
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Kinetic wordmark */}
        <div className="flex justify-center">
          <KineticYear
            label="ADDANKI"
            active={active}
            outlineIndices={[0, 2, 4, 6]}
            fontSize="clamp(1.9rem, 9vw, 3rem)"
            color="var(--reel-ink)"
          />
        </div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.3 }}
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
