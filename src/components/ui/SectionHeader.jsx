import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
  as: Heading = 'h2',
  invert = false,
}) {
  const alignClass =
    align === 'center'
      ? 'items-center text-center'
      : align === 'right'
        ? 'items-end text-right'
        : 'items-start text-left'

  return (
    <div className={cn('flex flex-col gap-5', alignClass, className)}>
      {eyebrow ? (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className={cn(
            'eyebrow inline-flex items-center gap-3',
            invert ? 'text-cream/70' : 'text-luxury-black/60 dark:text-cream/60'
          )}
        >
          <span className="h-px w-8 bg-current opacity-40" />
          <span>{eyebrow}</span>
        </motion.div>
      ) : null}

      {title ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Heading
            className={cn(
              'display-2 max-w-[22ch] text-balance',
              invert ? 'text-cream' : 'text-luxury-black dark:text-cream'
            )}
          >
            {title}
          </Heading>
        </motion.div>
      ) : null}

      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className={cn(
            'max-w-[54ch] text-lg leading-relaxed text-pretty',
            invert ? 'text-cream/70' : 'text-neutral-600 dark:text-neutral-300'
          )}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  )
}
