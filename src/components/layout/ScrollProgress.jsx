import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.4,
  })

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-linear-to-r from-deep-red via-saffron to-gold"
      style={{ scaleX }}
    />
  )
}
