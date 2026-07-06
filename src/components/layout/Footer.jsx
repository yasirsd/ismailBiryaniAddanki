import { Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { Logo } from './Logo'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@/components/ui/BrandIcons'
import { site } from '@/data/site'

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Our story', href: '#story' },
      { label: 'The craft', href: '#craft' },
      { label: 'Menu', href: '#menu' },
      { label: 'Gallery', href: '#gallery' },
    ],
  },
  {
    title: 'Visit Addanki',
    links: [
      { label: 'Directions', href: site.branch.mapLink, external: true },
      { label: `Call ${site.branch.phoneDisplay}`, href: `tel:${site.branch.phone.replace(/\s/g, '')}` },
      { label: 'WhatsApp us', href: `https://wa.me/${site.branch.whatsapp.replace(/\D/g, '')}`, external: true },
      { label: 'Reserve a table', href: '#contact' },
    ],
  },
  {
    title: 'Family',
    links: [
      { label: 'Instagram', href: site.socials.instagram, external: true },
      { label: 'Facebook', href: site.socials.facebook, external: true },
      { label: 'YouTube', href: site.socials.youtube, external: true },
      { label: 'Careers', href: '#contact' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-luxury-black text-cream">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-deep-red/40 blur-[140px]" />
        <div className="absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-saffron/25 blur-[160px]" />
      </div>

      <div className="container-luxury relative py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-16 border-b border-white/10 pb-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]"
        >
          <div className="max-w-md">
            <Logo invert />
            <p className="mt-8 text-lg leading-relaxed text-cream/70">
              Since 2005, Ismail Biryani has been serving Hyderabadi Dum Biryani
              made with premium basmati, traditional masalas and the patience of
              a family kitchen.
            </p>

            <div className="mt-8 space-y-3 text-sm text-cream/70">
              <a
                href={site.branch.mapLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 hover:text-cream"
              >
                <MapPin size={16} className="mt-0.5 text-saffron" />
                <span>{site.branch.address}</span>
              </a>
              <a
                href={`tel:${site.branch.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 hover:text-cream"
              >
                <Phone size={16} className="text-saffron" />
                {site.branch.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.branch.email}`}
                className="flex items-center gap-3 hover:text-cream"
              >
                <Mail size={16} className="text-saffron" />
                {site.branch.email}
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow text-cream/50">{col.title}</h4>
              <ul className="mt-6 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noreferrer' : undefined}
                      className="group inline-flex items-center gap-1 text-[15px] text-cream/80 transition-colors hover:text-cream"
                    >
                      <span className="border-b border-transparent transition-colors duration-500 group-hover:border-saffron">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 text-sm text-cream/60 md:flex-row md:items-center">
          <p className="max-w-lg">
            © {new Date().getFullYear()} Ismail Biryani — Addanki. A proprietor
            firm by {site.proprietor}. Recipe by {site.founder}.
          </p>

          <div className="flex items-center gap-2">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Ismail Biryani on Instagram"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-saffron hover:text-saffron"
            >
              <InstagramIcon size={16} aria-hidden />
            </a>
            <a
              href={site.socials.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Ismail Biryani on Facebook"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-saffron hover:text-saffron"
            >
              <FacebookIcon size={16} aria-hidden />
            </a>
            <a
              href={site.socials.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="Ismail Biryani on YouTube"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-saffron hover:text-saffron"
            >
              <YoutubeIcon size={16} aria-hidden />
            </a>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none mt-16 select-none overflow-hidden opacity-[0.06]"
        >
          <p
            className="whitespace-nowrap text-[22vw] font-extrabold leading-none tracking-tighter text-cream"
            style={{
              WebkitTextStroke: '1px rgba(255,255,255,0.35)',
              color: 'transparent',
            }}
          >
            ISMAIL BIRYANI
          </p>
        </div>
      </div>
    </footer>
  )
}
