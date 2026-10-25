import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { Scale, Trophy } from 'lucide-react'
import { categoryAccent, decisions, proudOf } from '@/data/highlights'
import { skillColorMap, skillIconMap } from '@/data/skillIcons'
import type { HighlightItem } from '@/types'

const TABS = [
  { id: 'proud', label: 'Proud Of', icon: Trophy, accent: 'var(--clr-primary)', items: proudOf },
  { id: 'defend', label: "Decisions I'd Defend", icon: Scale, accent: 'var(--clr-accent-gold)', items: decisions },
]

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export function Highlights() {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const tab = TABS[index]

  function select(next: number) {
    const target = (next + TABS.length) % TABS.length
    setIndex(target)
    tabRefs.current[target]?.focus()
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        select(index + 1)
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        select(index - 1)
        break
      case 'Home':
        e.preventDefault()
        select(0)
        break
      case 'End':
        e.preventDefault()
        select(TABS.length - 1)
        break
    }
  }

  return (
    <section aria-labelledby="highlights-heading" className="mt-14 mb-4">
      <div className="text-center mb-8">
        <span className="font-['DM_Mono'] text-xs text-[var(--clr-primary)] uppercase tracking-[0.3em]">
          // Highlights
        </span>
        <h2 id="highlights-heading" className="text-2xl md:text-3xl mt-2">
          Built &amp; Defended
        </h2>
        <p className="text-[var(--clr-fg)] max-w-xl mx-auto text-sm md:text-base mt-2">
          The work I&apos;m proudest of, and the calls I&apos;d make again, ranked.
        </p>
      </div>

      <div className="max-w-[1536px] mx-auto panel panel-hud p-5 md:p-8">
        <div
          role="tablist"
          aria-label="Highlights"
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
          className="flex flex-wrap gap-2 pb-5 border-b border-[var(--clr-border)]"
        >
          {TABS.map((t, i) => {
            const active = i === index
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`highlights-tab-${t.id}`}
                aria-selected={active}
                aria-controls={`highlights-panel-${t.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => setIndex(i)}
                className={`relative isolate inline-flex items-center gap-2 px-3.5 py-2 rounded-[4px] text-[12px] font-['DM_Mono'] uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--clr-bg)] ${
                  active
                    ? 'text-[var(--clr-bg)] font-semibold border border-transparent'
                    : 'text-[var(--clr-fg)] hover:text-[var(--clr-fg-alt)] hover:bg-[var(--clr-bg-alt)] border border-[var(--clr-border)]'
                }`}
              >
                {active && (
                  <m.span
                    layoutId="highlights-pill"
                    className="absolute inset-0 -z-10 rounded-[4px]"
                    style={{ backgroundColor: t.accent, boxShadow: `0 0 16px -4px ${t.accent}` }}
                    transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <t.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                {t.label}
                <span className="tabular-nums opacity-70">{String(t.items.length).padStart(2, '0')}</span>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <m.ol
            key={tab.id}
            role="tabpanel"
            id={`highlights-panel-${tab.id}`}
            aria-labelledby={`highlights-tab-${tab.id}`}
            tabIndex={0}
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -12 }}
            transition={{ duration: reduced ? 0.15 : 0.28, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6 pt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--clr-bg)] rounded-[4px]"
          >
            {tab.items.map((item, i) => (
              <HighlightRow key={item.title} item={item} rank={i + 1} accent={tab.accent} />
            ))}
          </m.ol>
        </AnimatePresence>
      </div>
    </section>
  )
}

function HighlightRow({ item, rank, accent }: { item: HighlightItem; rank: number; accent: string }) {
  const rowAccent = item.category ? categoryAccent[item.category] : accent
  return (
    <li className="flex gap-4">
      <span
        className="shrink-0 font-['DM_Mono'] text-sm font-semibold tabular-nums leading-6"
        style={{ color: rowAccent }}
        aria-hidden="true"
      >
        {String(rank).padStart(2, '0')}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h3 className="!text-[var(--clr-fg-alt)] !text-sm md:!text-base !tracking-normal !normal-case !font-['IBM_Plex_Sans'] !font-semibold !leading-6">
            <span className="sr-only">{rank}. </span>
            {item.title}
          </h3>
          {item.category && (
            <span
              className="px-2 py-0.5 rounded-[3px] border text-[10px] font-['DM_Mono'] uppercase tracking-wider"
              style={{
                color: rowAccent,
                borderColor: rowAccent,
                backgroundColor: 'color-mix(in srgb, ' + rowAccent + ' 12%, transparent)',
              }}
            >
              {item.category}
            </span>
          )}
        </div>
        <p className="text-[13px] md:text-sm text-[var(--clr-fg)] leading-relaxed mt-1.5">{item.detail}</p>
        {item.skills && item.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {item.skills.map((skill) => {
              const Icon = skillIconMap[skill]
              return (
                <span
                  key={skill}
                  className="btn btn--plain cursor-default inline-flex items-center gap-1.5 group !py-1 !px-2"
                  style={{ '--icon-color': skillColorMap[skill] || 'var(--clr-fg-alt)' } as React.CSSProperties}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 transition-all duration-300 skill-icon" />}
                  <span className="text-[11px] font-['DM_Mono'] text-[var(--clr-fg-alt)] leading-none">
                    {skill}
                  </span>
                </span>
              )
            })}
          </div>
        )}
      </div>
    </li>
  )
}

export default Highlights
