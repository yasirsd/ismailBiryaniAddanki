import { useMemo } from 'react'
import { cn } from '@/lib/utils'

export function Steam({ count = 6, className }) {
  const puffs = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = 30 + Math.random() * 40
      const size = 60 + Math.random() * 80
      const delay = (i / count) * 3 + Math.random() * 1.2
      const duration = 5 + Math.random() * 3
      const opacity = 0.25 + Math.random() * 0.35
      return { id: i, left, size, delay, duration, opacity }
    })
  }, [count])

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0', className)}
    >
      {puffs.map((puff) => (
        <span
          key={puff.id}
          className="absolute bottom-0 rounded-full bg-white"
          style={{
            left: `${puff.left}%`,
            width: puff.size,
            height: puff.size,
            filter: 'blur(24px)',
            opacity: puff.opacity,
            animation: `steam ${puff.duration}s ease-in-out ${puff.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
