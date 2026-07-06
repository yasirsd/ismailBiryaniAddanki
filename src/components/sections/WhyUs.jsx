import { motion } from 'framer-motion'
import {
  CookingPot,
  Crown,
  Drumstick,
  Flame,
  HeartHandshake,
  Leaf,
  Users,
  Wheat,
} from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { whyItems } from '@/data/why'
import { cn } from '@/lib/utils'

const iconMap = {
  Flame,
  Wheat,
  Drumstick,
  CookingPot,
  Users,
  Leaf,
  HeartHandshake,
  Crown,
}

const toneMap = {
  red: 'bg-deep-red/8 border-deep-red/15 text-deep-red',
  gold: 'bg-gold/10 border-gold/20 text-gold',
  saffron: 'bg-saffron/10 border-saffron/25 text-saffron',
  dark: 'bg-luxury-black text-cream border-luxury-black',
  cream: 'bg-white border-black/5 text-luxury-black dark:bg-white/[0.06] dark:border-white/10 dark:text-cream',
  olive: 'bg-olive/10 border-olive/20 text-olive',
}

export function WhyUs() {
  return (
    <section
      aria-label="Why families choose Ismail Biryani"
      className="section-py relative overflow-hidden bg-background dark:bg-background-dark"
    >
      <div className="container-luxury">
        <SectionHeader
          eyebrow="Why us"
          title={
            <>
              A recipe of trust,{' '}
              <span className="gradient-text-gold">crafted daily.</span>
            </>
          }
          subtitle="Eight quiet promises that go into every plate — from the rice we age to the way we greet you at the door."
          align="left"
          className="max-w-3xl"
        />

        {/* 2-column grid on mobile so the eight tiles read as a
            compact bento (~4 rows tall) instead of a 1440px stack.
            Cards with a background image get promoted to full-width so
            the imagery still has room to breathe. */}
        <div className="mt-12 grid auto-rows-[minmax(160px,auto)] grid-cols-2 gap-3 md:mt-16 md:auto-rows-[minmax(180px,auto)] md:grid-cols-4 md:gap-5">
          {whyItems.map((item, i) => (
            <BentoCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BentoCard({ item, index }) {
  const Icon = iconMap[item.icon]
  const toneClass = toneMap[item.tone] ?? toneMap.cream
  const hasImage = Boolean(item.image)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      className={cn(
        'group relative flex overflow-hidden rounded-[1.75rem] border p-4 transition-all duration-500 md:p-6',
        // On mobile, image-backed cards span both columns so the photo
        // reads properly instead of being cropped into a stamp.
        hasImage ? 'col-span-2' : '',
        item.span,
        toneClass
      )}
    >
      {hasImage ? (
        <>
          <img
            src={item.image}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-45 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-60"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-black/85 via-black/40 to-transparent" />
        </>
      ) : null}

      <div
        className={cn(
          'relative z-10 flex h-full w-full flex-col justify-between gap-6',
          hasImage ? 'text-cream' : ''
        )}
      >
        <div
          className={cn(
            'inline-grid h-10 w-10 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 md:h-12 md:w-12',
            hasImage
              ? 'bg-white/10 text-cream'
              : item.tone === 'dark'
                ? 'bg-white/10 text-cream'
                : 'bg-white/70 dark:bg-white/10'
          )}
        >
          {Icon ? <Icon size={18} strokeWidth={1.8} /> : null}
        </div>

        <div>
          <h3
            className={cn(
              'text-lg font-extrabold tracking-tight text-balance md:text-2xl',
              hasImage ? 'text-cream' : 'text-luxury-black dark:text-cream'
            )}
          >
            {item.title}
          </h3>
          <p
            className={cn(
              'mt-2 max-w-xs text-sm leading-relaxed md:mt-3 md:text-base',
              hasImage
                ? 'text-cream/80'
                : 'text-neutral-600 dark:text-neutral-300'
            )}
          >
            {item.desc}
          </p>
        </div>
      </div>

      {!hasImage ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-current opacity-[0.06] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.12]"
        />
      ) : null}
    </motion.div>
  )
}
