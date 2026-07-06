import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin, MessageCircle, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { site } from '@/data/site'

// Machine-readable schedule (day-of-week 0=Sun ... 6=Sat).
// Derived from site.branch.hours:
//   Mon–Thu 11:00 AM — 11:00 PM
//   Fri–Sun 11:00 AM — 12:00 AM (midnight)
// Close hour of 24 represents midnight (end-of-day).
const SCHEDULE = {
  0: { open: 11, close: 24 },
  1: { open: 11, close: 23 },
  2: { open: 11, close: 23 },
  3: { open: 11, close: 23 },
  4: { open: 11, close: 23 },
  5: { open: 11, close: 24 },
  6: { open: 11, close: 24 },
}

function formatHour(h) {
  if (h === 24 || h === 0) return '12 AM'
  if (h === 12) return '12 PM'
  return h > 12 ? `${h - 12} PM` : `${h} AM`
}

function computeStatus(now) {
  const day = now.getDay()
  const hour = now.getHours() + now.getMinutes() / 60
  const { open, close } = SCHEDULE[day]

  if (hour >= open && hour < close) {
    return { state: 'open', closeAt: formatHour(close) }
  }
  if (hour < open) {
    return { state: 'preopen', openAt: formatHour(open) }
  }
  const tomorrow = (day + 1) % 7
  return {
    state: 'closed',
    tomorrowOpen: formatHour(SCHEDULE[tomorrow].open),
  }
}

const STATE_COLOR = {
  open: 'bg-emerald-400',
  preopen: 'bg-amber-400',
  closed: 'bg-cream/40',
}

/**
 * Live restaurant status card used in the Hero.
 *
 * `variant="full"` (default) — desktop composition with big time, hours
 * detail rows, and stacked CTAs. Sits in the hero's right column.
 *
 * `variant="compact"` — mobile composition: horizontal status pill, tight
 * hours row, and a 3-icon action strip (Call · WhatsApp · Directions).
 * Designed to sit at the bottom of the hero on phones so the most
 * important business info (are they open, how to reach them, where they
 * are) is always visible without hiding behind desktop-only chrome.
 */
export function OpenNowCard({ className, variant = 'full' }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  const status = useMemo(() => computeStatus(now), [now])
  const dayLabel = now.toLocaleDateString('en-IN', { weekday: 'long' })
  const dateLabel = now.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  })
  const timeLabel = now.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  const today = SCHEDULE[now.getDay()]
  const todayRange = `${formatHour(today.open)} — ${formatHour(today.close)}`

  const waNumber = site.branch.whatsapp.replace(/\D/g, '')
  const waMessage = encodeURIComponent(
    `Hello Ismail Biryani, I would like to make a reservation.`
  )
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`
  const telLink = `tel:${site.branch.phone.replace(/\s/g, '')}`

  const statusLabel =
    status.state === 'open'
      ? `Open · until ${status.closeAt}`
      : status.state === 'preopen'
        ? `Opens at ${status.openAt}`
        : `Closed · opens ${status.tomorrowOpen}`

  if (variant === 'compact') {
    return (
      <CompactStatus
        className={className}
        status={status}
        statusLabel={statusLabel}
        todayRange={todayRange}
        timeLabel={timeLabel}
        waLink={waLink}
        telLink={telLink}
      />
    )
  }

  return (
    <motion.aside
      initial={{ opacity: 0, y: 30, rotate: -0.6 }}
      animate={{ opacity: 1, y: 0, rotate: -0.6 }}
      transition={{ delay: 0.9, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Restaurant open status and contact"
      className={cn(
        'relative w-full max-w-[420px] overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.045] p-7 backdrop-blur-xl shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] md:p-8',
        'ring-1 ring-inset ring-white/5',
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-saffron/60 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-saffron/10 blur-3xl"
      />

      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5" aria-hidden>
            <span
              className={cn(
                'absolute inset-0 rounded-full opacity-70 motion-safe:animate-ping',
                STATE_COLOR[status.state]
              )}
            />
            <span
              className={cn(
                'relative h-2.5 w-2.5 rounded-full',
                STATE_COLOR[status.state]
              )}
            />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cream">
            {statusLabel}
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.28em] text-cream/65">
          Live
        </span>
      </header>

      <div className="mt-6">
        <div className="text-[10px] uppercase tracking-[0.32em] text-cream/65">
          {dayLabel} · {dateLabel}
        </div>
        <div
          className="mt-2 font-serif text-cream"
          style={{
            fontSize: 'clamp(2.25rem, 3.6vw, 2.9rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {timeLabel}
        </div>
      </div>

      <div className="my-6 h-px bg-linear-to-r from-transparent via-white/12 to-transparent" />

      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.32em] text-cream/65">
            Today
          </div>
          <div className="mt-1.5 text-sm font-semibold text-cream">
            {todayRange}
          </div>
        </div>
        <a
          href="#contact"
          className="text-[10px] font-semibold uppercase tracking-[0.28em] text-saffron/85 transition-colors hover:text-saffron"
        >
          Full hours ↗
        </a>
      </div>

      <div className="my-6 h-px bg-linear-to-r from-transparent via-white/12 to-transparent" />

      <ul className="space-y-4 text-sm">
        <li>
          <a
            href={telLink}
            className="group flex items-center gap-3 text-cream/85 transition-colors hover:text-cream"
          >
            <IconChip>
              <Phone size={13} />
            </IconChip>
            <span className="font-semibold tracking-wide">
              {site.branch.phoneDisplay}
            </span>
            <ArrowUpRight
              size={13}
              className="ml-auto text-cream/30 transition-all group-hover:translate-x-0.5 group-hover:text-saffron"
            />
          </a>
        </li>
        <li>
          <a
            href={site.branch.mapLink}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-3 text-cream/85 transition-colors hover:text-cream"
          >
            <IconChip>
              <MapPin size={13} />
            </IconChip>
            <span className="pt-0.5 text-[13px] leading-snug">
              Main Road, Addanki
              <br />
              <span className="text-cream/50">Prakasam · Andhra Pradesh</span>
            </span>
            <ArrowUpRight
              size={13}
              className="ml-auto mt-1 text-cream/30 transition-all group-hover:translate-x-0.5 group-hover:text-saffron"
            />
          </a>
        </li>
      </ul>

      <div className="mt-7 flex flex-col gap-3">
        <a
          href={site.branch.mapLink}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center justify-between rounded-full bg-linear-to-r from-saffron via-gold to-saffron px-5 py-3 text-[11px] font-bold uppercase tracking-[0.28em] text-luxury-black shadow-[0_18px_50px_-20px_rgba(212,175,55,0.7)] transition-transform hover:-translate-y-0.5"
        >
          Get directions
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </a>
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cream/85 transition-colors hover:border-saffron/50 hover:text-cream"
        >
          <MessageCircle size={13} />
          Chat on WhatsApp
        </a>
      </div>
    </motion.aside>
  )
}

function IconChip({ children }) {
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-saffron">
      {children}
    </span>
  )
}

/* -----------------------------------------------------------------
 * CompactStatus — mobile hero card.
 * Single row of essential info (status + time), a tight hours line,
 * and a 3-icon action strip. Designed to sit at the bottom of the
 * hero on phones so the most important info is always visible.
 * ----------------------------------------------------------------- */
function CompactStatus({
  className,
  status,
  statusLabel,
  todayRange,
  timeLabel,
  waLink,
  telLink,
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Restaurant open status and contact"
      className={cn(
        'relative w-full overflow-hidden rounded-3xl border border-white/12 bg-white/[0.045] p-5 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]',
        'ring-1 ring-inset ring-white/5',
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-saffron/60 to-transparent"
      />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
            <span
              className={cn(
                'absolute inset-0 rounded-full opacity-70 motion-safe:animate-ping',
                STATE_COLOR[status.state]
              )}
            />
            <span
              className={cn(
                'relative h-2 w-2 rounded-full',
                STATE_COLOR[status.state]
              )}
            />
          </span>
          <span className="truncate text-[11px] font-semibold uppercase tracking-[0.28em] text-cream">
            {statusLabel}
          </span>
        </div>
        <span className="shrink-0 font-serif text-lg text-cream tabular-nums">
          {timeLabel}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/8 pt-3 text-[11px]">
        <span className="uppercase tracking-[0.24em] text-cream/65">Today</span>
        <span className="font-semibold text-cream/85 tabular-nums">
          {todayRange}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <a
          href={telLink}
          aria-label="Call the restaurant"
          className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] py-3 text-cream/85 transition-colors hover:border-saffron/50 hover:text-cream active:bg-white/[0.06]"
        >
          <Phone size={16} className="text-saffron" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">
            Call
          </span>
        </a>
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] py-3 text-cream/85 transition-colors hover:border-saffron/50 hover:text-cream active:bg-white/[0.06]"
        >
          <MessageCircle size={16} className="text-saffron" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">
            WhatsApp
          </span>
        </a>
        <a
          href={site.branch.mapLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Get directions"
          className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-saffron/40 bg-saffron/10 py-3 text-saffron transition-colors hover:bg-saffron/15 active:bg-saffron/20"
        >
          <MapPin size={16} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">
            Directions
          </span>
        </a>
      </div>
    </motion.aside>
  )
}
