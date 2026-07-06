import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/utils'

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function AnimatedNumber({
  value = 0,
  start = 0,
  duration = 2.4,
  play = true,
  separator = ',',
  formatter,
  className,
}) {
  const [display, setDisplay] = useState(start)
  const rafRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!play) return
    if (startedRef.current) return
    startedRef.current = true

    if (prefersReducedMotion()) {
      setDisplay(value)
      return
    }

    const startTime = performance.now()
    const durationMs = Math.max(200, duration * 1000)

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / durationMs)
      const eased = easeOutExpo(progress)
      const current = start + (value - start) * eased
      setDisplay(current)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(value)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [play, value, start, duration])

  const formatted =
    typeof formatter === 'function'
      ? formatter(display)
      : Math.round(display)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, separator)

  return (
    <span className={className} aria-label={String(value)}>
      {formatted}
    </span>
  )
}
