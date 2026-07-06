import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Check,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from '@/components/ui/BrandIcons'
import { site } from '@/data/site'

const socialLinks = [
  { label: 'Instagram', href: site.socials.instagram, Icon: InstagramIcon },
  { label: 'Facebook', href: site.socials.facebook, Icon: FacebookIcon },
  { label: 'YouTube', href: site.socials.youtube, Icon: YoutubeIcon },
]

// Weekday abbreviations used to detect which hours range covers "today"
// so we can badge it in the mobile-friendly hours list.
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/**
 * Returns true if `today` (a JS weekday index) falls inside the range
 * described by an `hours` entry string like "Monday – Thursday" or
 * "Friday – Sunday". Very forgiving: matches on the three-letter
 * prefixes of the day names.
 */
function rangeIncludesToday(rangeLabel, today) {
  const norm = rangeLabel.toLowerCase()
  const match = norm.match(/([a-z]{3,})\s*[–\-—]\s*([a-z]{3,})/i)
  if (!match) return false
  const startIdx = DAYS.findIndex((d) =>
    match[1].toLowerCase().startsWith(d.toLowerCase())
  )
  const endIdx = DAYS.findIndex((d) =>
    match[2].toLowerCase().startsWith(d.toLowerCase())
  )
  if (startIdx < 0 || endIdx < 0) return false
  if (startIdx <= endIdx) return today >= startIdx && today <= endIdx
  // Wraps around week end (e.g. Fri–Sun with Sunday first in our array)
  return today >= startIdx || today <= endIdx
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    e.target.reset?.()
  }

  const waLink = `https://wa.me/${site.branch.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hello Ismail Biryani, I would like to make a reservation.')}`
  const telLink = `tel:${site.branch.phone.replace(/\s/g, '')}`

  const todayIdx = useMemo(() => new Date().getDay(), [])

  return (
    <section
      id="contact"
      aria-label="Visit our Addanki branch"
      className="section-blend-t blend-t-cream section-py relative overflow-hidden bg-luxury-black text-cream"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -right-32 top-1/3 h-[500px] w-[500px] rounded-full bg-deep-red/25 blur-[160px]" />
        <div className="absolute -left-32 bottom-0 h-[500px] w-[500px] rounded-full bg-saffron/20 blur-[160px]" />
      </div>

      <div className="container-luxury relative">
        <SectionHeader
          eyebrow="Visit us"
          title={
            <>
              Come, sit at our table{' '}
              <span className="gradient-text-fire">in Addanki.</span>
            </>
          }
          subtitle="Reserve ahead, walk in like family, or send us a note. We would love to meet you."
          invert
          className="max-w-2xl"
        />

        {/* Mobile-only quick-action tiles — three thumb-sized shortcuts
            (Call / WhatsApp / Directions) placed above the two-column
            grid so a hungry visitor gets to action in one tap without
            scrolling past the whole contact card first. Hidden on md+
            because desktop has plenty of room to show the full card
            straight away. */}
        <div className="mt-10 grid grid-cols-3 gap-3 md:hidden">
          <a
            href={telLink}
            aria-label={`Call ${site.branch.phoneDisplay}`}
            className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] py-4 text-cream backdrop-blur-md transition-colors active:bg-white/10"
          >
            <Phone size={18} className="text-saffron" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
              Call
            </span>
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp Ismail Biryani"
            className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] py-4 text-cream backdrop-blur-md transition-colors active:bg-white/10"
          >
            <MessageCircle size={18} className="text-[#25D366]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
              WhatsApp
            </span>
          </a>
          <a
            href={site.branch.mapLink}
            target="_blank"
            rel="noreferrer"
            aria-label="Open in Google Maps"
            className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] py-4 text-cream backdrop-blur-md transition-colors active:bg-white/10"
          >
            <MapPin size={18} className="text-saffron" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
              Directions
            </span>
          </a>
        </div>

        <div className="mt-6 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {/* Left column - contact + map */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md md:p-8"
            >
              <div className="flex flex-col gap-6">
                <div>
                  <div className="eyebrow text-saffron">The branch</div>
                  <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-cream">
                    {site.branch.name}
                  </h3>
                  <p className="mt-3 text-cream/70 leading-relaxed">
                    A proprietor firm by {site.proprietor}. Recipe from{' '}
                    {site.founder}.
                  </p>
                </div>

                <div className="grid gap-4 text-sm">
                  <a
                    href={site.branch.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-3 text-cream/80 hover:text-cream"
                  >
                    <MapPin size={18} className="mt-0.5 text-saffron shrink-0" />
                    <span>{site.branch.address}</span>
                  </a>
                  <a
                    href={telLink}
                    className="flex items-center gap-3 text-cream/80 hover:text-cream"
                  >
                    <Phone size={18} className="text-saffron" />
                    {site.branch.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${site.branch.email}`}
                    className="flex items-center gap-3 text-cream/80 hover:text-cream"
                  >
                    <Mail size={18} className="text-saffron" />
                    {site.branch.email}
                  </a>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <div className="eyebrow flex items-center gap-2 text-cream/50">
                    <Clock size={12} /> Hours
                  </div>
                  <ul className="mt-4 space-y-2 text-sm">
                    {site.branch.hours.map((h) => {
                      const isToday = rangeIncludesToday(h.day, todayIdx)
                      return (
                        <li
                          key={h.day}
                          className={
                            isToday
                              ? 'flex items-center justify-between gap-3 rounded-xl border border-saffron/25 bg-saffron/8 px-3 py-2 text-cream'
                              : 'flex items-center justify-between gap-3 px-3 py-1 text-cream/70'
                          }
                        >
                          <span className="flex items-center gap-2">
                            {isToday ? (
                              <span className="rounded-full bg-saffron/25 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-saffron">
                                Today
                              </span>
                            ) : null}
                            {h.day}
                          </span>
                          <span className="font-medium text-cream">{h.time}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                {/* CTA stack — stacks vertically on very narrow phones
                    so labels stay readable; goes back to a row from
                    460px+. */}
                <div className="flex flex-col gap-3 border-t border-white/10 pt-6 min-[460px]:flex-row min-[460px]:flex-wrap">
                  <Button asChild variant="gold" size="md" className="grow">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="secondary" size="md" className="grow text-luxury-black">
                    <a href={telLink}>
                      <Phone size={16} />
                      Call now
                    </a>
                  </Button>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  {socialLinks.map(({ Icon, ...s }) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-cream/70 transition-colors hover:border-saffron hover:text-saffron"
                    >
                      <Icon size={16} aria-hidden />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-[2rem] border border-white/10"
            >
              <iframe
                title="Ismail Biryani Addanki location on Google Maps"
                src={site.branch.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full grayscale-[30%] invert-[0.05]"
              />
            </motion.div>
          </div>

          {/* Right column - form / success card (swaps in place) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex min-h-[420px] flex-col items-center justify-center gap-5 overflow-hidden rounded-[2rem] border border-saffron/40 bg-linear-to-b from-saffron/10 via-white/[0.03] to-white/[0.02] p-8 text-center backdrop-blur-md md:min-h-[520px]"
                  role="status"
                  aria-live="polite"
                >
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-saffron/20 text-saffron">
                    <Check size={28} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="eyebrow text-saffron">Enquiry received</div>
                    <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-cream md:text-3xl">
                      Shukriya — we&apos;ll call you.
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/70">
                      A member of the Ismail Biryani family will confirm your
                      booking within the next hour. If it&apos;s urgent, tap
                      below to reach us right away.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button asChild variant="gold" size="md">
                      <a href={waLink} target="_blank" rel="noreferrer">
                        <MessageCircle size={16} />
                        WhatsApp us
                      </a>
                    </Button>
                    <Button asChild variant="ghost" size="md">
                      <a href={telLink}>
                        <Phone size={16} />
                        Call now
                        <ArrowUpRight size={14} />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  onSubmit={onSubmit}
                  className="relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md md:p-8"
                >
                  <div className="eyebrow text-saffron">Send an enquiry</div>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
                    Reserve, cater or just say hi.
                  </h3>
                  <p className="mt-3 text-cream/70">
                    Tell us the occasion — we will handcraft the plan.
                  </p>

                  <div className="mt-8 grid gap-5">
                    <Field
                      id="name"
                      label="Full name"
                      placeholder="Your good name"
                    />
                    {/* Phone + Date — stacks on tiny phones (< 480px) so each
                        input gets full width, then goes to two-up. */}
                    <div className="grid gap-5 min-[480px]:grid-cols-2">
                      <Field
                        id="phone"
                        type="tel"
                        label="Phone / WhatsApp"
                        placeholder="+91 ..."
                      />
                      <Field
                        id="date"
                        type="date"
                        label="Preferred date"
                      />
                    </div>
                    <Field
                      as="select"
                      id="occasion"
                      label="Occasion"
                      options={[
                        'Family dinner',
                        'Group booking (10+)',
                        'Wedding catering',
                        'Corporate order',
                        'Just visiting',
                      ]}
                    />
                    <Field
                      as="textarea"
                      id="message"
                      label="Message"
                      placeholder="Tell us about your visit or event..."
                    />
                  </div>

                  <div className="mt-8 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-cream/50">
                      We respect your privacy. No spam, ever.
                    </p>
                    <Button type="submit" variant="gold" size="lg">
                      Send enquiry
                      <Send size={16} />
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({ id, label, as = 'input', options, ...rest }) {
  const commonClass =
    'peer w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-base text-cream placeholder:text-cream/30 outline-none transition-colors focus:border-saffron/70 focus:ring-2 focus:ring-saffron/20'

  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="eyebrow text-cream/50">{label}</span>
      {as === 'textarea' ? (
        <textarea id={id} name={id} rows={4} className={commonClass} {...rest} />
      ) : as === 'select' ? (
        <select id={id} name={id} className={commonClass} defaultValue="" {...rest}>
          <option value="" disabled>
            Choose one
          </option>
          {options?.map((o) => (
            <option key={o} value={o} className="bg-luxury-black text-cream">
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input id={id} name={id} className={commonClass} {...rest} />
      )}
    </label>
  )
}
