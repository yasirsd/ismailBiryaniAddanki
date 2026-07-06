# Ismail Biryani — Addanki

> The Art of Authentic Hyderabadi Dum Biryani.
> Crafted with tradition. Served like family. Built for generations.

A premium, editorial, production-ready website for **Ismail Biryani — Addanki**.
Built to feel like a cinematic Apple product launch, styled like Aesop / Rolls Royce,
and engineered like a modern SaaS front-end.

---

## The Brand

- **Restaurant** — Ismail Biryani
- **Since** — 2005
- **Founder** — Syed Ismail Basha
- **Proprietor (Addanki)** — Syed Vaseem Akram
- **Speciality** — Hyderabadi Dum Biryani, aged basmati, traditional masalas, Sneha Farm chicken
- **Location** — Addanki, Prakasam District, Andhra Pradesh
- **Vision** — A global Indian food brand, rooted in family tradition

---

## Tech Stack

| Layer            | Choice                                                                 |
| ---------------- | ---------------------------------------------------------------------- |
| Framework        | **React 19** (JavaScript, no TypeScript)                               |
| Build tool       | **Vite 8** (Rolldown) with manual chunk splitting                      |
| Styling          | **Tailwind CSS v4** (via `@tailwindcss/vite`)                           |
| UI primitives    | **shadcn-style** components on `@radix-ui/react-*`                     |
| Motion           | **Framer Motion**, **GSAP + ScrollTrigger**, **Lenis**                 |
| Iconography      | **lucide-react** + custom brand icons                                  |
| Carousel         | **Embla Carousel** + Autoplay plugin                                    |
| Counters         | **react-countup** + **react-intersection-observer**                    |
| Fonts            | **Inter Variable** (100–900) + Cormorant Garamond accent               |

---

## Sections (in narrative order)

1. **Hero** — cinematic parallax hero with steam, spice particles, layered rice bokeh, kinetic type reveal
2. **Story Scroll** — Apple-style pinned chapters (2005 → Global Vision), GSAP ScrollTrigger, animated progress rail
3. **Marquee** — kinetic brand word-band that reverses with scroll
4. **Dum Reveal** — pinned canvas that reveals the dum ceremony stage-by-stage as user scrolls
5. **Chef's Promise** — cinematic quote band with parallax spice backdrop
6. **Menu** — 7 categories, glassmorphic cards, 3D hover tilt, image zoom
7. **Why Choose Us** — animated Bento Grid with 8 quiet promises
8. **Statistics** — animated CountUp counters with glowing tiles
9. **Gallery** — immersive editorial masonry with hover reveals
10. **Testimonials** — luxury glass carousel powered by Embla, autoplay pauses on hover
11. **FAQ** — Radix accordion, custom easing
12. **Contact** — split layout with Google Maps, hours, WhatsApp, call, socials, enquiry form
13. **Footer** — minimal, elegant, oversized brand mark, structured columns

Plus **globals**: Lenis smooth scroll, custom scroll progress bar, floating WhatsApp + back-to-top, Restaurant JSON-LD.

---

## Design Language

- **Palette** — Cream `#F5F5F2`, Deep Red `#9B111E`, Saffron `#E59A2E`, Gold `#D4AF37`, Olive `#556B52`, Luxury Black `#111`, Dark bg `#090909`
- **Type** — Inter Variable at extreme weights (800–900) for display, medium body, generous line-height
- **Depth** — heavy, elegant glassmorphism (`glass`, `glass-strong`, `glass-dark`)
- **Motion easing** — luxury cubic-bezier `cubic-bezier(0.16, 1, 0.3, 1)`
- **Themes** — Light + Dark, respects OS, persisted to localStorage, one-click toggle
- **Motion respect** — full `prefers-reduced-motion` support (Lenis + GSAP + Framer all disabled cleanly)

---

## Project Structure

```
src/
├── App.jsx                    # Composed sections + lazy loading
├── main.jsx                   # React entry
├── index.css                  # Tailwind + design tokens + keyframes
├── providers/
│   ├── ThemeProvider.jsx      # Light/dark, localStorage, prefers-color-scheme
│   └── SmoothScroll.jsx       # Lenis + GSAP ticker sync
├── components/
│   ├── layout/                # Navbar, Footer, ScrollProgress, FloatingActions, Logo, ThemeToggle, StructuredData
│   ├── ui/                    # Button, Badge, SectionHeader, BrandIcons
│   ├── effects/               # SpiceParticles, Steam
│   └── sections/              # Hero, StoryScroll, Marquee, DumReveal, ChefPromise, Menu, WhyUs, Stats, Gallery, Testimonials, FAQ, Contact
├── data/
│   ├── site.js                # Single brand source of truth
│   ├── menu.js                # 15 items across 7 categories
│   ├── story.js               # 6 story chapters + 4 dum stages
│   ├── testimonials.js
│   ├── faq.js
│   ├── gallery.js
│   └── why.js
└── lib/
    └── utils.js               # cn(), reduced-motion helper
```

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve production build on :4173
npm run lint       # oxlint
```

---

## Performance & SEO

- **Route-level code splitting** — every below-the-fold section is a `React.lazy` chunk
- **Manual vendor chunks** — react, gsap, framer, embla, icons all split
- **Font preconnect** + `display=swap` for fastest text paint
- **Image hints** — `loading="lazy"` everywhere except hero; `fetchPriority="high"` for hero image
- **Structured data** — full `Restaurant` schema (address, hours, cuisine, social profiles)
- **OpenGraph + Twitter** meta cards
- **Sitemap.xml + robots.txt** shipped in `/public`
- **A11y** — skip-to-content, ARIA labels, focus-visible saffron ring, reduced motion, WCAG-safe contrast

---

## Notes on Content

All copy, story chapters and testimonials were written from the business brief you provided. No dates,
awards or people were invented — the narrative uses only:
2005 founding, Syed Ismail Basha (founder), Syed Vaseem Akram (Addanki proprietor), Ongole → Chimakurti → Addanki
expansion, Hyderabadi Dum specialty, Sneha Farm chicken, and the family-oriented experience promise.

Social links are wired to the exact Facebook, Instagram and YouTube URLs supplied.

Address / phone in `src/data/site.js` are placeholders and are the only two values you should update
before launch.

---

## Roadmap ideas

- Wire enquiry form to WhatsApp Cloud API or an email service
- Add an actual booking / online-order integration
- Add per-branch pages (Ongole, Chimakurti, Addanki)
- Ship a light MDX-powered blog for stories from the kitchen

Built with love for a family recipe.
