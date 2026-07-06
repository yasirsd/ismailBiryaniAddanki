import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SpiceParticles } from '@/components/effects/SpiceParticles'
import { Steam } from '@/components/effects/Steam'
import { OpenNowCard } from '@/components/sections/hero/OpenNowCard'
import { branchPic, founderPic, proprietorPic } from '@/assets/images'

export function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  })

  const yFar = useTransform(smooth, [0, 1], ['0%', '-18%'])
  const scaleHero = useTransform(smooth, [0, 1], [1, 1.14])
  const textOpacity = useTransform(smooth, [0, 0.6], [1, 0])
  const textY = useTransform(smooth, [0, 1], [0, 120])

  return (
    <section
      id="top"
      ref={ref}
      aria-label="Ismail Biryani — the art of authentic Hyderabadi Dum"
      className="min-h-hero relative isolate overflow-hidden bg-luxury-black text-cream"
    >
      {/* Backdrop: Addanki branch, graded */}
      <motion.div
        style={{ y: yFar, scale: scaleHero }}
        className="absolute inset-0"
        aria-hidden
      >
        <img
          src={branchPic}
          alt=""
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover"
          style={{
            // Portrait phones need the crop biased slightly high so the
            // horizon / warm lights of the shopfront stay in the frame
            // instead of showing an empty slice of ceiling.
            objectPosition: '50% 35%',
            filter: 'brightness(0.52) saturate(1.08) contrast(1.04)',
          }}
        />
        {/* Warm color grade */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(80% 60% at 18% 40%, rgba(155,17,30,0.16) 0%, transparent 60%),
              radial-gradient(70% 60% at 82% 30%, rgba(229,154,46,0.14) 0%, transparent 55%),
              linear-gradient(180deg, rgba(9,4,2,0.55) 0%, rgba(9,4,2,0.20) 30%, rgba(9,4,2,0.85) 92%)
            `,
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)',
          }}
        />
        {/* Left-to-center gradient for text legibility */}
        <div className="absolute inset-0 bg-linear-to-r from-luxury-black/70 via-luxury-black/25 to-transparent" />
      </motion.div>

      {/* Subtle steam near lower center */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3">
        <Steam count={3} className="opacity-40" />
      </div>

      {/* Few floating spice grains */}
      <SpiceParticles count={12} />

      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 noise opacity-40" aria-hidden />

      {/* Content grid */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="min-h-hero container-luxury relative z-10 grid grid-cols-1 items-center gap-10 pb-16 pt-24 sm:pt-28 md:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)] md:gap-14 md:pb-32 md:pt-40"
      >
        {/* LEFT — invitation */}
        <div className="max-w-3xl">
          {/* Location chip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9 }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.32em] backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inset-0 rounded-full bg-saffron opacity-60 motion-safe:animate-ping" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-saffron" />
            </span>
            <MapPin size={11} className="text-cream/60" />
            <span>Ismail Biryani · Addanki · India</span>
          </motion.div>

          {/* Kinetic headline */}
          <h1
            className="text-cream text-balance"
            style={{
              fontSize: 'clamp(2.75rem, 7.4vw, 6.75rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.04em',
              fontWeight: 800,
              fontFamily: 'var(--font-display, "Playfair Display", serif)',
            }}
          >
            <KineticWord text="Addanki's" delay={0.18} />{' '}
            <KineticWord text="favourite" delay={0.32} />
            <motion.span
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-1 block overflow-hidden"
            >
              <span className="inline-block gradient-text-fire">biryani.</span>
            </motion.span>
          </h1>

          {/* Sub-line */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9 }}
            className="mt-8 max-w-xl text-lg italic leading-relaxed text-cream/70 md:text-xl"
          >
            Twenty years of Hyderabadi dum, one plate at a time.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Button asChild variant="gold" size="lg">
              <a href="#contact">
                Reserve a table
                <ArrowRight
                  size={18}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </a>
            </Button>
            <a
              href="#story"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cream/70 transition-colors hover:text-cream"
            >
              Our story
              <ArrowRight
                size={13}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </a>
          </motion.div>

          {/* Family credential strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="mt-10 border-t border-white/10 pt-6 md:mt-14 md:pt-8"
          >
            <div className="mb-4 text-[10px] uppercase tracking-[0.32em] text-cream/65 md:mb-5">
              A family kitchen · Two generations
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
              <FamilyBadge
                avatar={proprietorPic}
                name="Syed Vaseem Akram"
                role="Proprietor · Addanki"
              />
              <FamilyBadge
                avatar={founderPic}
                name="Syed Ismail Basha"
                role="Founder · Ongole, 2005"
                sepia
              />
            </div>
          </motion.div>

          {/* MOBILE — Compact live status card. Slots into the left column on
              phones (right column is hidden below md) so the most critical
              business info — open / closed, hours, Call / WhatsApp /
              Directions — is visible without hunting. */}
          <div className="mt-8 md:hidden">
            <OpenNowCard variant="compact" />
          </div>
        </div>

        {/* RIGHT — Full OpenNowCard on desktop only */}
        <div className="hidden justify-self-end md:block">
          <OpenNowCard />
        </div>
      </motion.div>

      {/* Scroll cue (desktop only — mobile has the compact status card in
          this space so the cue would just add noise) */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-cream/50 md:flex"
        aria-hidden
      >
        <span>Scroll</span>
        <span className="relative block h-10 w-[1px] overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 block h-1/3 animate-[float-slow_2.6s_ease-in-out_infinite] bg-saffron" />
        </span>
      </motion.div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 bg-linear-to-b from-transparent to-luxury-black"
      />

      <div className="sr-only">
        <a href="#story">Skip hero and start the story</a>
      </div>
    </section>
  )
}

function KineticWord({ text, delay = 0, accent = false }) {
  return (
    <motion.span
      initial={{ y: '110%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block overflow-hidden align-bottom"
    >
      <span className={accent ? 'inline-block gradient-text-fire' : 'inline-block'}>
        {text}
      </span>
    </motion.span>
  )
}

function FamilyBadge({ avatar, name, role, sepia = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-saffron/40 ring-offset-2 ring-offset-luxury-black">
        <img
          src={avatar}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          style={sepia ? { filter: 'sepia(0.55) saturate(0.9) contrast(1.05)' } : undefined}
        />
      </div>
      <div className="leading-tight">
        <div className="text-[15px] font-bold text-cream">{name}</div>
        <div className="mt-0.5 text-[10px] uppercase tracking-[0.28em] text-cream/55">
          {role}
        </div>
      </div>
    </div>
  )
}
