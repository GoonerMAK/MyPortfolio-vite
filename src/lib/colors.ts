import type { CSSProperties } from 'react'

// Theme colours as CSS var references, for inline styles and data. Values live in index.css;
// in class names use the matching Tailwind tokens instead (text-primary, bg-bg-alt, …).
export const clr = {
  bg: 'var(--clr-bg)',
  bgAlt: 'var(--clr-bg-alt)',
  bgPanel: 'var(--clr-bg-panel)',
  fg: 'var(--clr-fg)',
  fgAlt: 'var(--clr-fg-alt)',
  primary: 'var(--clr-primary)',
  red: 'var(--clr-accent-red)',
  green: 'var(--clr-accent-green)',
  gold: 'var(--clr-accent-gold)',
  purple: 'var(--clr-accent-purple)',
  border: 'var(--clr-border)',
  borderAccent: 'var(--clr-border-accent)',
} as const

// Active pill colours for tab rows and their sub-tab filters
export const TAB_ACCENT = clr.primary
export const FILTER_ACCENT = clr.gold

/** `color` mixed into transparent, e.g. a 12% tinted background */
export function tint(color: string, percent: number): string {
  return `color-mix(in srgb, ${color} ${percent}%, transparent)`
}

/** Soft outer glow used behind active pills */
export function glow(color: string, blur = 16): string {
  return `0 0 ${blur}px -4px ${color}`
}

/** Sets `--icon-color` for `.skill-icon`, falling back to the light foreground */
export function iconColor(color?: string): CSSProperties {
  return { '--icon-color': color || clr.fgAlt } as CSSProperties
}
