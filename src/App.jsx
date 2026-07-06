import { lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { SmoothScroll } from '@/providers/SmoothScroll'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { FloatingActions } from '@/components/layout/FloatingActions'
import { BottomNav } from '@/components/layout/BottomNav'
import { StructuredData } from '@/components/layout/StructuredData'
import { Hero } from '@/components/sections/Hero'
import { StoryScroll } from '@/components/sections/StoryScroll'

const Marquee = lazy(() =>
  import('@/components/sections/Marquee').then((m) => ({ default: m.Marquee }))
)
const ChefPromise = lazy(() =>
  import('@/components/sections/ChefPromise').then((m) => ({
    default: m.ChefPromise,
  }))
)
const DumReveal = lazy(() =>
  import('@/components/sections/DumReveal').then((m) => ({
    default: m.DumReveal,
  }))
)
const Menu = lazy(() =>
  import('@/components/sections/Menu').then((m) => ({ default: m.Menu }))
)
const WhyUs = lazy(() =>
  import('@/components/sections/WhyUs').then((m) => ({ default: m.WhyUs }))
)
const Stats = lazy(() =>
  import('@/components/sections/Stats').then((m) => ({ default: m.Stats }))
)
const Gallery = lazy(() =>
  import('@/components/sections/Gallery').then((m) => ({ default: m.Gallery }))
)
const Testimonials = lazy(() =>
  import('@/components/sections/Testimonials').then((m) => ({
    default: m.Testimonials,
  }))
)
const FAQ = lazy(() =>
  import('@/components/sections/FAQ').then((m) => ({ default: m.FAQ }))
)
const Contact = lazy(() =>
  import('@/components/sections/Contact').then((m) => ({ default: m.Contact }))
)

function SectionFallback() {
  return <div className="h-32 w-full" aria-hidden />
}

export default function App() {
  return (
    <ThemeProvider>
      {/* MotionConfig with reducedMotion="user" tells every Framer
          Motion animation across the tree to honour the operating
          system's "reduce motion" preference. This is a single global
          switch instead of a per-component check and covers the
          Navbar drawer, BottomNav slide-in, mobile Story dock,
          Contact success card-swap, testimonial fade-ins, hero
          reveals, and every other <motion.*> element. */}
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <StructuredData />

        {/* Skip-to-content link — invisible until keyboard-focused, then
            appears as a chip in the top-left. Meets WCAG 2.4.1 by
            letting keyboard users bypass the fixed navbar. */}
        <a
          href="#main"
          className="skip-link"
        >
          Skip to content
        </a>

        <ScrollProgress />
        <Navbar />

        {/* `#top` anchor target for the BottomNav "Home" button and
            any programmatic scroll-to-top interactions. Rendered as a
            self-closing invisible anchor so it can't affect layout. */}
        <span id="top" aria-hidden className="sr-only" />

        <main id="main" tabIndex={-1} className="relative overflow-clip">
          <Hero />
          <StoryScroll />

          <Suspense fallback={<SectionFallback />}>
            <Marquee />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <DumReveal />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <ChefPromise />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Menu />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <WhyUs />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Stats />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Gallery />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Testimonials />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <FAQ />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </main>

        <Footer />

        {/* Desktop-only floating actions (WhatsApp + back-to-top) —
            mobile uses the persistent BottomNav below instead. */}
        <FloatingActions />

        {/* Mobile-only persistent action bar (Home / Menu / WhatsApp /
            Reserve). Owns primary CTAs; the top hamburger owns
            secondary navigation. */}
        <BottomNav />
        </SmoothScroll>
      </MotionConfig>
    </ThemeProvider>
  )
}
