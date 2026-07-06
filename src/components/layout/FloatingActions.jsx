import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { ArrowUp, MessageCircle } from 'lucide-react'
import { site } from '@/data/site'

export function FloatingActions() {
  const { scrollY } = useScroll()
  const [showTop, setShowTop] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => setShowTop(v > 600))

  const waLink = `https://wa.me/${site.branch.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hello Ismail Biryani, I would like to place an order.')}`

  return (
    <div
      className="pointer-events-none fixed right-4 z-[70] hidden flex-col items-end gap-3 sm:right-6 md:flex"
      style={{ bottom: 'calc(1.5rem + var(--safe-bottom, 0px))' }}
    >
      <motion.a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat with us on WhatsApp"
        className="pointer-events-auto relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_20px_50px_-15px_rgba(37,211,102,0.6)]"
      >
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
        <MessageCircle size={22} className="relative" aria-hidden />
      </motion.a>

      <motion.button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={false}
        animate={{
          opacity: showTop ? 1 : 0,
          y: showTop ? 0 : 20,
          pointerEvents: showTop ? 'auto' : 'none',
        }}
        transition={{ duration: 0.4 }}
        aria-label="Back to top"
        aria-hidden={!showTop}
        className="grid h-12 w-12 place-items-center rounded-full border border-black/10 bg-white/80 text-luxury-black shadow-lg backdrop-blur-md transition-colors hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-cream dark:hover:bg-white/15"
      >
        <ArrowUp size={16} aria-hidden />
      </motion.button>
    </div>
  )
}
