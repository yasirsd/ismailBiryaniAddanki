import { cn } from '@/lib/utils'
import { brandLogo } from '@/assets/images'

/**
 * Brand mark + wordmark used in the navbar and footer.
 *
 * - The PNG mark is rendered at h-12 (mobile) / h-14 (desktop) so the crest
 *   itself reads clearly at glance.
 * - The wordmark "Ismail Biryani" sits beside it in the display serif so the
 *   brand name is always visible without relying on the PNG's internal
 *   lockup.
 * - Passing `invert` switches the wordmark + tagline to a light palette for
 *   dark surfaces (e.g. the Footer).
 */
export function Logo({ className, invert = false }) {
  return (
    <a
      href="#top"
      aria-label="Ismail Biryani — Home"
      className={cn(
        'group inline-flex items-center gap-3 select-none md:gap-4',
        className
      )}
    >
      <img
        src={brandLogo}
        alt=""
        aria-hidden
        className="h-12 w-auto shrink-0 object-contain md:h-14"
        loading="eager"
        decoding="async"
      />

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[1.15rem] font-bold tracking-tight md:text-xl',
            invert ? 'text-cream' : 'text-luxury-black dark:text-cream'
          )}
          style={{
            fontFamily:
              'var(--font-display, "Playfair Display", "Georgia", serif)',
          }}
        >
          Ismail <span className="text-saffron">Biryani</span>
        </span>
        <span
          className={cn(
            'mt-1.5 text-[9.5px] font-semibold uppercase tracking-[0.32em] md:text-[10px]',
            invert
              ? 'text-cream/55'
              : 'text-luxury-black/55 dark:text-cream/55'
          )}
        >
          Addanki · Since 2005
        </span>
      </span>
    </a>
  )
}
