import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Massive editorial year/label typography — the visual anchor of each reel.
 * Mixes solid + outlined characters, animates in char-by-char.
 */
export function KineticYear({
  label,
  active = false,
  className,
  style,
  outlineIndices = [1, 3],
  fontSize = 'clamp(6rem, 18vw, 16rem)',
  color = '#f2e4c8',
  letterSpacing = '-0.03em',
}) {
  const chars = String(label).split('')

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none select-none font-extrabold uppercase leading-[0.9]',
        className
      )}
      style={{ fontSize, color, letterSpacing, ...style }}
    >
      <span className="flex flex-wrap items-baseline justify-start">
        {chars.map((c, i) => {
          const isOutlined = outlineIndices.includes(i)
          return (
            <span
              key={i}
              className="relative inline-block overflow-hidden"
              style={{ marginRight: c === ' ' ? '0.35em' : 0 }}
            >
              <motion.span
                initial={{ y: '105%' }}
                animate={active ? { y: '0%' } : { y: '105%' }}
                transition={{
                  duration: 1.05,
                  delay: 0.05 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
                style={
                  isOutlined
                    ? {
                        WebkitTextStroke: `1.2px ${color}`,
                        color: 'transparent',
                      }
                    : undefined
                }
              >
                {c === ' ' ? '\u00A0' : c}
              </motion.span>
            </span>
          )
        })}
      </span>
    </div>
  )
}
