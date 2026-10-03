/** Year-month string, e.g. '2026-01'. Day precision isn't needed for tenure. */
export type YearMonth = `${number}-${string}`

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

function parseYearMonth(value: YearMonth): { year: number; month: number } {
  const [year, month] = value.split('-').map(Number)
  return { year, month: month - 1 }
}

/** 'Jan 2026 – Present' / 'Dec 2024 – Sept 2025'. A missing `end` means the role is ongoing. */
export function formatDateRange(start: YearMonth, end?: YearMonth): string {
  const fmt = (v: YearMonth) => {
    const { year, month } = parseYearMonth(v)
    return `${MONTHS[month]} ${year}`
  }
  return `${fmt(start)} – ${end ? fmt(end) : 'Present'}`
}

/**
 * Counts months inclusively (Jan → Mar = 3), matching LinkedIn's convention.
 * Ongoing roles are measured against `now`, so the portfolio never shows a stale tenure.
 */
export function monthsBetween(start: YearMonth, end?: YearMonth, now: Date = new Date()): number {
  const s = parseYearMonth(start)
  const e = end ? parseYearMonth(end) : { year: now.getFullYear(), month: now.getMonth() }
  return Math.max(1, (e.year - s.year) * 12 + (e.month - s.month) + 1)
}

/** 6 → '6 months', 12 → '1 yr', 16 → '1 yr 4 months'. */
export function formatDuration(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const parts: string[] = []
  if (years) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`)
  if (months) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`)
  return parts.join(' ')
}
