import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Small "museum object" that floats in a reel composition — recipe card,
 * ticket stub, stamp, badge, etc. Each one drifts subtly on its own timeline.
 */
export function Artifact({
  active = false,
  className,
  children,
  delay = 0,
  rotate = 0,
  float = true,
  from = { x: -20, y: 20, opacity: 0 },
  style,
}) {
  return (
    <motion.div
      initial={from}
      animate={active ? { x: 0, y: 0, opacity: 1, rotate } : from}
      transition={{
        duration: 1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn('pointer-events-none absolute', className)}
      style={style}
    >
      <motion.div
        animate={
          float
            ? { y: [0, -6, 0], rotate: [rotate, rotate + 0.6, rotate] }
            : undefined
        }
        transition={
          float
            ? {
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: delay * 2,
              }
            : undefined
        }
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/* -------------- artifact variants -------------- */

export function RecipeCard({ children, className, style }) {
  return (
    <div
      className={cn(
        'relative w-56 rotate-[-3deg] rounded-lg bg-[#f6ecd3] px-5 py-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]',
        className
      )}
      style={style}
    >
      <div className="mb-2 flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-[#8a6a2f]">
        <span className="h-px w-6 bg-[#c69657]" />
        Family Recipe
      </div>
      <div className="font-serif text-[15px] leading-snug text-[#2b1c07]">
        {children}
      </div>
      <div className="mt-3 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.28em] text-[#8a6a2f]">
        <span>No. 001</span>
        <span>Est. 2005</span>
      </div>
      <div className="absolute -top-2 left-8 h-4 w-10 rotate-3 bg-[#c69657]/40" />
    </div>
  )
}

export function StampBadge({ children, className, style }) {
  return (
    <div
      className={cn(
        'relative grid h-24 w-24 place-items-center rounded-full border-2 border-[#c69657] text-center text-[10px] font-bold uppercase tracking-[0.28em] text-[#c69657]',
        className
      )}
      style={style}
    >
      <div className="absolute inset-1 rounded-full border border-[#c69657]/40" />
      <span className="relative">{children}</span>
    </div>
  )
}

export function TicketStub({ children, className, style }) {
  return (
    <div
      className={cn(
        'flex w-64 items-stretch rounded-md bg-[#faf5e8] text-[#2b1c07] shadow-[0_18px_40px_-15px_rgba(0,0,0,0.5)]',
        className
      )}
      style={style}
    >
      <div className="flex flex-col items-center justify-center border-r border-dashed border-[#c69657]/60 px-3 py-3">
        <div className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#8a6a2f]">
          Adm
        </div>
        <div className="text-lg font-extrabold leading-none">IB</div>
      </div>
      <div className="flex flex-1 flex-col justify-center px-4 py-2">
        <div className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#8a6a2f]">
          Ismail Biryani
        </div>
        <div className="text-sm font-semibold leading-tight">{children}</div>
      </div>
    </div>
  )
}
