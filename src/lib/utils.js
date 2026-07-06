import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function lerp(start, end, alpha) {
  return start * (1 - alpha) + end * alpha
}

export function formatPhone(raw) {
  return raw.replace(/(\d{5})(\d{5})/, '$1 $2')
}
