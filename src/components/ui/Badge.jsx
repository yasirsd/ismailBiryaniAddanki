import { cn } from '@/lib/utils'

export function Badge({ className, children, tone = 'neutral', ...props }) {
  const tones = {
    neutral:
      'bg-black/[0.04] text-luxury-black border-black/10 dark:bg-white/10 dark:text-cream dark:border-white/10',
    gold: 'bg-gold/12 text-gold border-gold/25',
    red: 'bg-deep-red/10 text-deep-red border-deep-red/25',
    saffron: 'bg-saffron/12 text-saffron border-saffron/25',
    olive: 'bg-olive/12 text-olive border-olive/25',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]',
        tones[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
