import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Home, MessageCircle, Phone, UtensilsCrossed } from 'lucide-react'
import { site } from '@/data/site'
import { cn, prefersReducedMotion } from '@/lib/utils'

/**
 * Mobile-only persistent bottom action bar.
 *
 * For a restaurant where phones are the primary touchpoint, a bottom
 * nav is dramatically more usable than a top hamburger. The four items
 * are the four things a hungry visitor actually wants to do:
 *
 *   Home    — jump back to the top (also acts as "back to top")
 *   Menu    — browse dishes
 *   WhatsApp — chat with the restaurant right now
 *   Reserve — quick jump to the reservation form (highlighted CTA)
 *
 * Behaviour:
 *   - Only renders on `md:hidden` (< 768px).
 *   - Sits above the iPhone home indicator via env(safe-area-inset-bottom).
 *   - Slides in once the user has scrolled past the hero (keeps the
 *     first impression uncluttered), then remains persistent.
 *   - Highlights the item whose section is currently in the viewport,
 *     so the user knows where they are on the page.
 *
 * The Navbar top hamburger continues to exist and covers *secondary*
 * navigation (Story, Craft, Gallery, Visit). BottomNav owns *actions*.
 */
export function BottomNav() {
  const [visible, setVisible] = useState(false)
  const [activeId, setActiveId] = useState('top')
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(prefersReducedMotion())
  }, [])

  // Reveal after the user has scrolled ~85vh (approximately past the
  // hero). Keeps the hero clean on first impression, then the bar
  // stays glued to the bottom for the rest of the session.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onScroll = () => {
      const threshold = window.innerHeight * 0.85
      setVisible(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track which section is currently in the viewport centre so we can
  // highlight the matching nav item. Uses a single IntersectionObserver
  // watching all named sections; whichever intersects with the highest
  // ratio in the centre band wins.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const ids = ['top', 'story', 'craft', 'menu', 'contact']
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (nodes.length === 0) return

    let ratios = new Map()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0)
        }
        // Pick id with highest ratio, biased to the earliest in `ids`
        // when tied so we don't flip constantly at boundaries.
        let bestId = activeId
        let bestRatio = 0
        for (const id of ids) {
          const r = ratios.get(id) ?? 0
          if (r > bestRatio) {
            bestRatio = r
            bestId = id
          }
        }
        if (bestRatio > 0 && bestId !== activeId) setActiveId(bestId)
      },
      {
        rootMargin: '-30% 0px -30% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
    // We intentionally leave `activeId` out of deps: including it would
    // re-observe every switch. We just want a stable observer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const waLink = `https://wa.me/${site.branch.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    'Hello Ismail Biryani, I would like to place an order.'
  )}`

  const items = [
    {
      id: 'home',
      match: 'top',
      label: 'Home',
      href: '#top',
      Icon: Home,
    },
    {
      id: 'menu',
      match: 'menu',
      label: 'Menu',
      href: '#menu',
      Icon: UtensilsCrossed,
    },
    {
      id: 'whatsapp',
      match: null, // external, never "active"
      label: 'WhatsApp',
      href: waLink,
      Icon: MessageCircle,
      external: true,
      accent: 'wa',
    },
    {
      id: 'reserve',
      match: 'contact',
      label: 'Reserve',
      href: '#contact',
      Icon: Phone,
      accent: 'primary',
    },
  ]

  return (
    <AnimatePresence>
      {visible ? (
        <motion.nav
          key="bottom-nav"
          aria-label="Primary mobile actions"
          initial={reducedMotion ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0.15 : 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed inset-x-0 z-[75] flex justify-center px-3 md:hidden"
          style={{
            bottom: 'calc(0.75rem + var(--safe-bottom, 0px))',
          }}
        >
          <ul className="pointer-events-auto grid w-full max-w-md grid-cols-4 items-center gap-1 rounded-3xl border border-white/12 bg-luxury-black/85 p-1.5 backdrop-blur-xl shadow-[0_18px_50px_-12px_rgba(0,0,0,0.9)]">
            {items.map((it) => {
              const isActive = it.match && activeId === it.match
              return (
                <li key={it.id} className="contents">
                  <BottomNavItem
                    item={it}
                    isActive={Boolean(isActive)}
                    reducedMotion={reducedMotion}
                  />
                </li>
              )
            })}
          </ul>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  )
}

function BottomNavItem({ item, isActive, reducedMotion }) {
  const { Icon, label, href, external, accent } = item

  const base =
    'group relative flex flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 min-h-[52px]'

  // Style precedence: primary accent (Reserve) > WhatsApp brand green >
  // active section > default subdued
  const toneClass = (() => {
    if (accent === 'primary') {
      return 'bg-linear-to-r from-saffron via-gold to-saffron text-luxury-black shadow-[0_10px_30px_-10px_rgba(212,175,55,0.6)]'
    }
    if (accent === 'wa') {
      return 'text-[#25D366] active:bg-white/10'
    }
    if (isActive) {
      return 'bg-white/8 text-cream'
    }
    return 'text-cream/60 active:bg-white/5 active:text-cream'
  })()

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
      className={cn(base, toneClass)}
    >
      <Icon size={20} strokeWidth={2} aria-hidden />
      <span className="mt-0.5">{label}</span>
      {isActive && accent !== 'primary' && accent !== 'wa' ? (
        <motion.span
          layoutId="bottom-nav-active-dot"
          transition={
            reducedMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 320, damping: 30 }
          }
          className="absolute -bottom-0.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-saffron"
          aria-hidden
        />
      ) : null}
    </a>
  )
}
