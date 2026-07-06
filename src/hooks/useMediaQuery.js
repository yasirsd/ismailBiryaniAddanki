import { useEffect, useState } from 'react'

/**
 * Reactive matchMedia hook.
 *
 * Returns the current match state and updates on viewport / device
 * changes.
 *
 * CRITICAL: the initial value MUST be resolved synchronously via a
 * lazy initializer that reads `window.matchMedia` on the first render.
 * If it defaulted to `false` and only flipped in a subsequent effect,
 * components that render entirely different DOM subtrees on the two
 * branches (e.g. DumReveal / StoryScroll — desktop pinned cinema vs
 * mobile vertical stack) would mount the wrong tree first, let GSAP
 * inject `pin-spacer` wrappers into the DOM, then swap the whole
 * subtree — and React would explode with `NotFoundError: Failed to
 * execute 'removeChild'` because the children it's trying to unmount
 * have been relocated by GSAP under the pin-spacer.
 *
 * Vite is client-only, so `window` is guaranteed on the first render.
 * The `typeof window` guard is kept for defensiveness only.
 *
 * @param {string} query CSS media query, e.g. `(max-width: 767px)`
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia(query)
    // Sync in case the media state changed between the lazy init and
    // effect subscription (rare, but possible during fast reloads).
    setMatches(mql.matches)
    const onChange = () => setMatches(mql.matches)
    // Modern API (Safari 14+, all evergreens). Fall back to the
    // deprecated addListener for very old iOS Safari.
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    }
    mql.addListener(onChange)
    return () => mql.removeListener(onChange)
  }, [query])

  return matches
}

/**
 * Convenience: matches phones and small tablets in portrait. Aligns
 * with the site's `md` breakpoint so components branching on this hook
 * flip in lock-step with Tailwind's `md:` utilities.
 */
export function useIsMobile() {
  return useMediaQuery('(max-width: 767.98px)')
}
