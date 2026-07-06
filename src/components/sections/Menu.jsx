import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { menuCategories, menuItems } from '@/data/menu'
import { cn } from '@/lib/utils'

export function Menu() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id)

  const filtered = useMemo(
    () => menuItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  )

  const activeMeta = menuCategories.find((c) => c.id === activeCategory)

  return (
    <section
      id="menu"
      aria-label="The menu — Ismail Biryani signature offerings"
      className="section-py relative overflow-hidden bg-cream dark:bg-luxury-black"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-saffron/10 blur-[160px]" />
        <div className="absolute right-0 top-10 h-[400px] w-[400px] rounded-full bg-deep-red/10 blur-[120px]" />
      </div>

      <div className="container-luxury relative">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="The Menu"
            title={
              <>
                Crafted plates.{' '}
                <span className="gradient-text-fire">Signature stories.</span>
              </>
            }
            subtitle="Every biryani, every kebab, every dessert has a place in a bigger family recipe. Explore the categories."
          />

          <div className="hidden text-right md:block">
            <div className="eyebrow text-luxury-black/50 dark:text-cream/50">
              Now viewing
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-2 text-xl font-semibold tracking-tight text-luxury-black dark:text-cream"
              >
                {activeMeta?.name}
              </motion.div>
            </AnimatePresence>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              {activeMeta?.tagline}
            </div>
          </div>
        </div>

        {/* Category chips — horizontal scroll on mobile with edge fade
            masks so the user gets a visual cue that there's more to
            swipe. `mask-image` fades both edges to transparent so chips
            visually dissolve into the section background. */}
        <div
          className="relative -mx-4 mt-12 md:mt-16"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%)',
            maskImage:
              'linear-gradient(to right, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%)',
          }}
        >
          <div className="no-scrollbar overflow-x-auto px-4">
            <div className="flex min-w-max gap-2">
              {menuCategories.map((cat) => {
                const isActive = cat.id === activeCategory
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      'relative shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-500',
                      isActive
                        ? 'border-luxury-black bg-luxury-black text-cream dark:border-cream dark:bg-cream dark:text-luxury-black'
                        : 'border-black/10 bg-white/70 text-luxury-black hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-cream dark:hover:bg-white/10'
                    )}
                    aria-pressed={isActive}
                    aria-label={`Filter to ${cat.name}`}
                  >
                    <span className="relative z-10">{cat.name}</span>
                    {isActive ? (
                      <motion.span
                        layoutId="menu-active"
                        className="absolute inset-0 rounded-full"
                        transition={{
                          type: 'spring',
                          stiffness: 320,
                          damping: 30,
                        }}
                      />
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="max-w-lg text-center text-neutral-500 dark:text-neutral-400">
            Full menu available at the restaurant. Prices in INR. Family packs
            and catering on request.
          </p>
          <Button asChild variant="primary" size="lg">
            <a href="#contact">
              Reserve a table
              <ArrowUpRight size={18} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

function MenuCard({ item, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  function handleMove(e) {
    // Skip the 3D tilt on touch devices — pointer events fire once at
    // tap and the card would be stuck rotated. `pointerType` is the
    // authoritative check.
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -8, y: px * 8 })
  }

  function reset() {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="group relative overflow-hidden rounded-[2rem] border border-black/5 bg-white/70 shadow-[0_30px_80px_-30px_rgba(17,17,17,0.15)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_40px_100px_-30px_rgba(155,17,30,0.25)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover"
          initial={{ scale: 1.05 }}
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Bottom gradient — softened on mobile so the always-visible
            price/name overlay stays legible without a hover trigger. */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100" />
        {item.tag ? (
          <div className="absolute left-4 top-4">
            <Badge tone="gold">{item.tag}</Badge>
          </div>
        ) : null}
        {/* Arrow chip — always visible on mobile (touch has no hover),
            reveals on hover on desktop. */}
        <div className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all duration-500 md:opacity-0 md:group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold tracking-tight text-luxury-black dark:text-cream">
            {item.name}
          </h3>
          <div className="shrink-0 text-right">
            <div className="text-[10px] uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
              from
            </div>
            <div className="text-lg font-extrabold text-luxury-black dark:text-cream">
              ₹{item.price}
            </div>
          </div>
        </div>
        <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
          {item.description}
        </p>
      </div>
    </motion.article>
  )
}
