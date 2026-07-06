import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-tight transition-all duration-500 [transition-timing-function:var(--ease-out-luxury)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50 will-change-transform',
  {
    variants: {
      variant: {
        primary:
          'bg-luxury-black text-cream shadow-[0_20px_50px_-20px_rgba(17,17,17,0.55)] hover:-translate-y-0.5 hover:shadow-[0_30px_70px_-25px_rgba(17,17,17,0.7)] dark:bg-cream dark:text-luxury-black dark:hover:shadow-[0_30px_70px_-25px_rgba(255,255,255,0.25)]',
        secondary:
          'bg-white/70 text-luxury-black backdrop-blur-md border border-black/5 hover:bg-white hover:-translate-y-0.5 dark:bg-white/10 dark:text-cream dark:border-white/10 dark:hover:bg-white/15',
        ghost:
          'text-luxury-black hover:bg-black/5 dark:text-cream dark:hover:bg-white/10',
        outline:
          'border border-luxury-black/25 text-luxury-black hover:border-luxury-black hover:-translate-y-0.5 dark:border-white/25 dark:text-cream dark:hover:border-white',
        gold: 'bg-linear-to-r from-saffron via-gold to-saffron text-luxury-black shadow-[0_25px_60px_-25px_rgba(212,175,55,0.6)] hover:-translate-y-0.5',
        red: 'bg-deep-red text-cream hover:-translate-y-0.5 shadow-[0_25px_60px_-25px_rgba(155,17,30,0.6)]',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-[0.95rem]',
        lg: 'h-14 px-8 text-base',
        xl: 'h-16 px-10 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

export const Button = forwardRef(function Button(
  { className, variant, size, asChild = false, children, ...props },
  ref
) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Comp>
  )
})
