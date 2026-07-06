import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Getter-style context: consumers call `useLenis()` to get a stable
// function that always returns the current Lenis instance (or null before
// it's ready / when reduced-motion is on). Because the function reference
// itself never changes, effects that depend on `useLenis()` do not re-run.
const LenisContext = createContext(() => null)

export function useLenis() {
  return useContext(LenisContext)
}

export function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Skip Lenis entirely on touch devices. Native touch scrolling is
    // silky on iOS/Android and — critically — CSS scroll-snap only works
    // when the browser owns the scroller. Lenis translates the body via
    // transforms, which disables page-level scroll-snap. By opting out
    // on touch we let phones behave like phones: native inertia, native
    // rubber-band, native scroll-snap for the mobile story. Desktop
    // (fine pointer) still gets Lenis's silky wheel smoothing.
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (reduce || isTouch) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })
    lenisRef.current = lenis

    const rafHandler = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(rafHandler)
    gsap.ticker.lagSmoothing(0)

    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(rafHandler)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const getLenis = useCallback(() => lenisRef.current, [])

  return (
    <LenisContext.Provider value={getLenis}>{children}</LenisContext.Provider>
  )
}
