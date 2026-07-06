import { useMemo } from 'react'
import { cn } from '@/lib/utils'

const COLORS = ['#E59A2E', '#9B111E', '#D4AF37', '#556B52']

export function SpiceParticles({ count = 24, className }) {
  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.round(2 + Math.random() * 4)
      const left = Math.random() * 100
      const dx = Math.round(-60 + Math.random() * 120)
      const delay = Math.random() * 14
      const duration = 12 + Math.random() * 10
      const color = COLORS[i % COLORS.length]
      const opacity = 0.35 + Math.random() * 0.5
      return { id: i, size, left, dx, delay, duration, color, opacity }
    })
  }, [count])

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
    >
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute -top-4 rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
            filter: 'blur(0.3px)',
            boxShadow: `0 0 ${p.size * 3}px ${p.color}55`,
            animation: `spice ${p.duration}s linear ${p.delay}s infinite`,
            '--dx': `${p.dx}px`,
          }}
        />
      ))}
    </div>
  )
}
