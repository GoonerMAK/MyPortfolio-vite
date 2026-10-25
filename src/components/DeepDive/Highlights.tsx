import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { Scale, Trophy, Workflow } from 'lucide-react'
import { FlowDiagram } from '@/components/DeepDive/FlowDiagram'
import { decisions, proudOf } from '@/data/highlights'
import { skillColorMap, skillIconMap } from '@/data/skillIcons'
import { useMediaQuery, usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { FILTER_ACCENT, TAB_ACCENT, glow, iconColor } from '@/lib/colors'
import { DECISION_CATEGORIES } from '@/types'
import type { DecisionCategory, HighlightItem } from '@/types'

const TABS = [
  { id: 'built', label: 'Features Built', icon: Trophy, items: proudOf },
  { id: 'decisions', label: 'Decisions Taken', icon: Scale, items: decisions },
]

type Filter = 'All' | DecisionCategory

const FILTERS: { id: Filter; count: number }[] = [
  { id: 'All', count: decisions.length },
  ...DECISION_CATEGORIES
    .map((c) => ({ id: c, count: decisions.filter((d) => d.category === c).length }))
    .filter((f) => f.count > 0),
]

// Hover has to rest this long before the side panel swaps, so sweeping across rows doesn't replay every diagram
const HOVER_DELAY_MS = 150

export function Highlights() {
  const reduced = usePrefersReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [index, setIndex] = useState(0)
  const [filter, setFilter] = useState<Filter>('All')
  const [activeTitle, setActiveTitle] = useState<string | null>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const tab = TABS[index]
  const isDecisions = tab.id === 'decisions'
  const items = isDecisions && filter !== 'All' ? tab.items.filter((item) => item.category === filter) : tab.items
  const active = items.find((item) => item.title === activeTitle) ?? items[0]

  useEffect(() => () => clearTimeout(hoverTimer.current), [])

  function activate(title: string, delay: number) {
    clearTimeout(hoverTimer.current)
    if (delay === 0) setActiveTitle(title)
    else hoverTimer.current = setTimeout(() => setActiveTitle(title), delay)
  }

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
        <span className="font-['M_PLUS_Rounded_1c'] text-xs text-primary uppercase tracking-[0.3em]">
          // Highlights
        </span>
        <h2 id="highlights-heading" className="text-2xl md:text-3xl mt-2">
          Features Built &amp; Decisions Taken
        </h2>
        <p className="text-fg max-w-xl mx-auto text-sm md:text-base mt-2">
          More features I&apos;ve shipped, and the product &amp; architectural calls I stand by.
        </p>
      </div>

      {/* overflow-clip, not .panel's hidden, so the sticky diagram panel can stick */}
      <div className="max-w-[1536px] mx-auto panel panel-hud !overflow-clip p-5 md:p-8">
        <div
          role="tablist"
          aria-label="Highlights"
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
          className="flex flex-wrap gap-2 pb-5 border-b border-border"
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
                className={`relative isolate inline-flex items-center gap-2 px-3.5 py-2 rounded-[4px] text-[12px] font-['M_PLUS_Rounded_1c'] uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                  active
                    ? 'text-bg font-semibold border border-transparent'
                    : 'text-fg hover:text-fg-alt hover:bg-bg-alt border border-border'
                }`}
              >
                {active && (
                  <m.span
                    layoutId="highlights-pill"
                    className="absolute inset-0 -z-10 rounded-[4px]"
                    style={{ backgroundColor: TAB_ACCENT, boxShadow: glow(TAB_ACCENT) }}
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

        {isDecisions && (
          <div role="group" aria-label="Filter decisions by category" className="flex flex-wrap gap-2 pt-5">
            {FILTERS.map((f) => {
              const active = f.id === filter
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                  className={`relative isolate inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-[11px] font-['M_PLUS_Rounded_1c'] uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                    active
                      ? 'text-bg font-semibold border border-transparent'
                      : 'text-fg hover:text-fg-alt hover:bg-bg-alt border border-border'
                  }`}
                >
                  {active && (
                    <m.span
                      layoutId="highlights-filter-pill"
                      className="absolute inset-0 -z-10 rounded-[4px]"
                      style={{ backgroundColor: FILTER_ACCENT, boxShadow: glow(FILTER_ACCENT, 14) }}
                      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  {f.id}
                  <span className="tabular-nums opacity-70">{String(f.count).padStart(2, '0')}</span>
                </button>
              )
            })}
          </div>
        )}

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,440px)] lg:gap-10">
          <AnimatePresence mode="wait" initial={false}>
            <m.ol
              key={isDecisions ? `${tab.id}-${filter}` : tab.id}
              role="tabpanel"
              id={`highlights-panel-${tab.id}`}
              aria-labelledby={`highlights-tab-${tab.id}`}
              tabIndex={0}
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -12 }}
              transition={{ duration: reduced ? 0.15 : 0.28, ease: 'easeOut' }}
              className="grid grid-cols-1 gap-y-2 pt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-[4px]"
            >
              {items.map((item, i) => (
                <HighlightRow
                  key={item.title}
                  item={item}
                  rank={i + 1}
                  active={item === active}
                  isDesktop={isDesktop}
                  reduced={reduced}
                  onHover={() => activate(item.title, HOVER_DELAY_MS)}
                  onFocus={() => activate(item.title, 0)}
                />
              ))}
            </m.ol>
          </AnimatePresence>

          {/* Desktop only: a CSS-hidden copy would still mount and animate on mobile */}
          {isDesktop && (
            <aside className="pt-6" aria-label="Diagram for the highlighted item">
              <div className="sticky top-24 rounded-[4px] border border-border bg-bg p-5">
                <span className="font-['M_PLUS_Rounded_1c'] text-[11px] text-primary uppercase tracking-[0.2em]">
                  // Flow
                </span>
                <p className="text-sm text-fg-alt font-semibold mt-1 mb-4 leading-snug">{active?.title}</p>
                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={active?.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.15 }}
                  >
                    {active?.diagram ? (
                      <FlowDiagram spec={active.diagram} title={active.title} reduced={reduced} />
                    ) : (
                      <p className="text-[13px] text-fg">No diagram for this item yet.</p>
                    )}
                  </m.div>
                </AnimatePresence>
                <p className="text-[11px] text-fg mt-4 opacity-70">Hover or focus an item to see its flow.</p>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}

function HighlightRow({
  item,
  rank,
  active,
  isDesktop,
  reduced,
  onHover,
  onFocus,
}: {
  item: HighlightItem
  rank: number
  active: boolean
  isDesktop: boolean
  reduced: boolean
  onHover: () => void
  onFocus: () => void
}) {
  const [open, setOpen] = useState(false)
  const diagram = item.diagram
  const diagramId = `highlight-flow-${rank}-${item.title.replace(/\W+/g, '-').toLowerCase()}`

  return (
    <li
      // Desktop rows are focusable so keyboard users can drive the side panel; on mobile the toggle button is the stop
      tabIndex={isDesktop ? 0 : undefined}
      aria-current={isDesktop && active ? 'true' : undefined}
      onMouseEnter={isDesktop ? onHover : undefined}
      onFocus={isDesktop ? onFocus : undefined}
      className={`flex flex-wrap gap-4 p-3 rounded-[4px] border-l-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
        isDesktop && active ? 'border-primary bg-bg-alt' : 'border-transparent'
      }`}
    >
      <span
        className="shrink-0 font-['M_PLUS_Rounded_1c'] text-sm font-semibold tabular-nums leading-6"
        style={{ color: TAB_ACCENT }}
        aria-hidden="true"
      >
        {String(rank).padStart(2, '0')}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="!text-fg-alt !text-sm md:!text-base !tracking-normal !normal-case !font-['IBM_Plex_Sans'] !font-semibold !leading-6">
          <span className="sr-only">{rank}. </span>
          {item.title}
        </h3>
        <p className="text-[13px] md:text-sm text-fg leading-relaxed mt-1.5">{item.detail}</p>
        {item.skills && item.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {item.skills.map((skill) => {
              const Icon = skillIconMap[skill]
              return (
                <span
                  key={skill}
                  className="btn btn--plain cursor-default inline-flex items-center gap-1.5 group !py-1 !px-2"
                  style={iconColor(skillColorMap[skill])}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 transition-all duration-300 skill-icon" />}
                  <span className="text-[11px] font-['M_PLUS_Rounded_1c'] text-fg-alt leading-none">
                    {skill}
                  </span>
                </span>
              )
            })}
          </div>
        )}
        {diagram && !isDesktop && (
          <button
            type="button"
            aria-expanded={open}
            aria-controls={diagramId}
            onClick={() => setOpen((o) => !o)}
            className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] border border-border text-[11px] font-['M_PLUS_Rounded_1c'] uppercase tracking-wider text-primary cursor-pointer hover:bg-bg-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <Workflow className="w-3.5 h-3.5" aria-hidden="true" />
            {open ? 'Hide flow' : 'Show flow'}
          </button>
        )}
      </div>
      {/* Spans the full row, not the indented text column, so the diagram stays legible on phones */}
      <AnimatePresence initial={false}>
        {diagram && !isDesktop && open && (
          <m.div
            id={diagramId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: 'easeOut' }}
            className="basis-full overflow-hidden"
          >
            <div className="rounded-[4px] border border-border bg-bg p-2 overflow-x-auto">
              <div className="min-w-[340px]">
                <FlowDiagram spec={diagram} title={item.title} reduced={reduced} />
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default Highlights
