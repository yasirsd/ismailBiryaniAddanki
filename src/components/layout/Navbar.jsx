import { useEffect, useId, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/Button'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Story', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Craft', href: '#craft' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const drawerId = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // When the drawer closes, return keyboard focus to the hamburger
  // button so screen-reader/keyboard users don't get dumped at the top
  // of the document. Skips the return when the close happened because
  // a nav link was activated — the browser will then focus the target
  // section instead.
  const closeDrawer = () => {
    setOpen(false)
    window.requestAnimationFrame(() => {
      triggerRef.current?.focus?.()
    })
  }

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[70] transition-all duration-500"
        style={{
          // Respect the iOS status-bar / notch inset so the nav pill isn't
          // clipped under the punch-hole camera on modern devices.
          paddingTop: `calc(env(safe-area-inset-top, 0px) + ${scrolled ? '0.75rem' : '1.5rem'})`,
        }}
      >
        <div className="container-luxury">
          <div
            className={cn(
              'flex items-center justify-between rounded-full px-4 py-2.5 pr-2.5 transition-all duration-500',
              scrolled
                ? 'glass-strong shadow-[0_20px_60px_-30px_rgba(17,17,17,0.35)]'
                : 'bg-transparent'
            )}
          >
            <Logo />

            <nav
              aria-label="Primary"
              className="hidden items-center gap-1 md:flex"
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative rounded-full px-4 py-2 text-sm font-medium text-luxury-black/80 transition-colors hover:text-luxury-black dark:text-cream/75 dark:hover:text-cream"
                >
                  <span>{link.label}</span>
                  <span className="pointer-events-none absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-500 group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle className="hidden sm:grid" />
              <Button
                variant="primary"
                size="sm"
                asChild
                className="hidden md:inline-flex"
              >
                <a href={`tel:${site.branch.phone.replace(/\s/g, '')}`}>
                  <Phone size={14} />
                  Reserve a table
                </a>
              </Button>
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="grid h-11 w-11 place-items-center rounded-full border border-luxury-black/10 bg-white/60 backdrop-blur-md dark:border-white/10 dark:bg-white/5 md:hidden"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls={drawerId}
                aria-haspopup="dialog"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <MobileDrawer
            id={drawerId}
            links={links}
            onClose={closeDrawer}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}

/* ------------------------------------------------------------------
 * MobileDrawer — full-viewport nav sheet.
 *
 * Slides in from the top (matches the hamburger position) and fills
 * the entire viewport below the navbar. This gives us room for:
 *   - Large, thumb-reachable navigation typography
 *   - A "quick actions" tile row (Call / WhatsApp / Directions) that
 *     mirrors the BottomNav but with richer context/labels
 *   - Theme toggle and the primary "Reserve" CTA in the sticky footer
 *
 * A tinted backdrop below the sheet closes on tap.
 * The sheet respects env(safe-area-inset-bottom) so the sticky footer
 * doesn't sit under the iOS home indicator.
 * ------------------------------------------------------------------ */
function MobileDrawer({ id, links, onClose }) {
  const waLink = `https://wa.me/${site.branch.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    'Hello Ismail Biryani, I would like to make a reservation.'
  )}`
  const telLink = `tel:${site.branch.phone.replace(/\s/g, '')}`

  const dialogRef = useRef(null)
  const titleId = `${id}-title`

  /**
   * Focus management + focus trap.
   *
   * On mount: move focus into the drawer (the first focusable link)
   * so keyboard users don't have to Tab through the closed navbar to
   * reach the menu contents.
   *
   * While open: Tab / Shift+Tab cycles focus inside the drawer only.
   * Escape closes.
   *
   * The Navbar's `closeDrawer` handles returning focus to the
   * hamburger trigger, so we don't need to duplicate that here.
   */
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const getFocusable = () =>
      Array.from(
        dialog.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea'
        )
      ).filter((el) => el.offsetWidth > 0 || el.offsetHeight > 0)

    // Initial focus — first focusable inside the sheet.
    const focusables = getFocusable()
    focusables[0]?.focus?.()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const items = getFocusable()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (e.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <motion.div
      key="mobile-drawer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] md:hidden"
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        tabIndex={-1}
        className="absolute inset-0 bg-luxury-black/40 backdrop-blur-[2px]"
      />

      <motion.aside
        id={id}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-3 top-[calc(env(safe-area-inset-top,0px)+5rem)] flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-luxury-black/95 text-cream shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        style={{
          maxHeight:
            'calc(100svh - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px) - 6rem)',
        }}
      >
        <h2 id={titleId} className="sr-only">
          Site navigation
        </h2>
        <div className="flex-1 overflow-y-auto px-5 pb-5 pt-6">
          <div className="eyebrow text-saffron">Explore</div>
          <ul className="mt-4 flex flex-col gap-1">
            {links.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05 * i + 0.05, duration: 0.5 }}
              >
                <a
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-2xl px-3 py-3 text-2xl font-extrabold tracking-tight text-cream active:bg-white/8"
                >
                  <span>{link.label}</span>
                  <span aria-hidden className="text-cream/40 text-base">
                    ↗
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>

          <div className="mt-8">
            <div className="eyebrow text-cream/50">Right now</div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <a
                href={telLink}
                onClick={onClose}
                className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] py-4 text-cream active:bg-white/8"
                aria-label={`Call ${site.branch.phoneDisplay}`}
              >
                <Phone size={18} className="text-saffron" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
                  Call
                </span>
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] py-4 text-cream active:bg-white/8"
                aria-label="WhatsApp Ismail Biryani"
              >
                <MessageCircle size={18} className="text-[#25D366]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
                  Chat
                </span>
              </a>
              <a
                href={site.branch.mapLink}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] py-4 text-cream active:bg-white/8"
                aria-label="Open in Google Maps"
              >
                <MapPin size={18} className="text-saffron" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
                  Map
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-luxury-black/95 px-5 py-4">
          <ThemeToggle />
          <Button asChild variant="gold" size="md" className="grow">
            <a href="#contact" onClick={onClose}>
              <Phone size={14} /> Reserve a table
            </a>
          </Button>
        </div>
      </motion.aside>
    </motion.div>
  )
}
