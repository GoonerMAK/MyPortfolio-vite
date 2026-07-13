import { Fragment, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { myStuff } from '@/data/myStuff'
import { skillIconMap, skillColorMap } from '@/data/skillIcons'
import type { MyStuffTopic } from '@/types'

/** Tracks OS reduced-motion preference; returns true when active. */
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

/** Splits on backticks; odd segments become styled `<code>` chips. */
function renderWithCode(text: string): ReactNode[] {
  return text.split('`').map((segment, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        className="font-['JetBrains_Mono'] text-[0.82em] px-1.5 py-0.5 mx-0.5 rounded-[3px] bg-[var(--clr-bg)] border border-[var(--clr-border)] text-[var(--clr-primary)] align-baseline"
      >
        {segment}
      </code>
    ) : (
      <span key={i}>
        {segment.split('\n').map((line, j, arr) => (
          <Fragment key={j}>
            {line}
            {j < arr.length - 1 && <br />}
          </Fragment>
        ))}
      </span>
    ),
  )
}

/** Turns a section label into an id-safe slug, e.g. "Core Habits" -> "core-habits". */
function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const TOTAL = myStuff.length
const SLIDE_OFFSET = 48
const DEFAULT_SECTION = 'General'

/** Pill-driven carousel showcasing personal topics. ARIA tablist with roving tabindex + arrow-key nav. */
export function MyStuffCarousel() {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  // +1 = moved forward, -1 = moved back — drives slide direction.
  const [direction, setDirection] = useState(1)
  // Set when navigation came from the keyboard, so we re-focus the active tab.
  const refocus = useRef(false)
  const activeTabRef = useRef<HTMLButtonElement>(null)
  // Mobile/narrow: sidebar collapses behind a disclosure trigger.
  const [topicMenuOpen, setTopicMenuOpen] = useState(false)
  const topicMenuTriggerRef = useRef<HTMLButtonElement>(null)

  const topic = myStuff[index]
  const prevTopic = myStuff[(index - 1 + TOTAL) % TOTAL]
  const nextTopic = myStuff[(index + 1) % TOTAL]

  // Ordered, de-duplicated subsection labels for the active topic. Topics
  // that never set `note.section` collapse to a single implicit bucket, so
  // the subsection UI stays fully hidden for them (zero layout change).
  const sections = useMemo(() => {
    const seen = new Set<string>()
    const list: string[] = []
    for (const note of topic.notes) {
      const s = note.section ?? DEFAULT_SECTION
      if (!seen.has(s)) {
        seen.add(s)
        list.push(s)
      }
    }
    return list
  }, [topic.notes])
  const hasSections = sections.length > 1

  const [activeSection, setActiveSection] = useState(sections[0] ?? DEFAULT_SECTION)

  // Reset to the first subsection whenever the topic changes.
  useEffect(() => {
    setActiveSection(sections[0] ?? DEFAULT_SECTION)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic.id])

  const notesToRender = hasSections
    ? topic.notes.filter((note) => (note.section ?? DEFAULT_SECTION) === activeSection)
    : topic.notes

  const goTo = useCallback(
    (next: number, fromKeyboard = false) => {
      const target = (next + TOTAL) % TOTAL
      setDirection(target >= index ? 1 : -1)
      setIndex(target)
      refocus.current = fromKeyboard
    },
    [index],
  )

  // Return keyboard focus to the active tab after an arrow-key move.
  useEffect(() => {
    const el = activeTabRef.current
    if (!el) return
    el.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' })
    if (refocus.current) {
      el.focus()
      refocus.current = false
    }
  }, [index, reduced])

  // Standard tablist keyboard model, plus Escape to close the mobile disclosure.
  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        goTo(index + 1, true)
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        goTo(index - 1, true)
        break
      case 'Home':
        e.preventDefault()
        goTo(0, true)
        break
      case 'End':
        e.preventDefault()
        goTo(TOTAL - 1, true)
        break
      case 'Escape':
        if (topicMenuOpen) {
          e.preventDefault()
          setTopicMenuOpen(false)
          topicMenuTriggerRef.current?.focus()
        }
        break
    }
  }

  // Arrow-key model for the in-card subsection tabs — stops propagation so
  // it never bubbles into the outer topic-switching handler above.
  function handleSectionKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    e.stopPropagation()
    const current = sections.indexOf(activeSection)
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        setActiveSection(sections[(current + 1) % sections.length])
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        setActiveSection(sections[(current - 1 + sections.length) % sections.length])
        break
      case 'Home':
        e.preventDefault()
        setActiveSection(sections[0])
        break
      case 'End':
        e.preventDefault()
        setActiveSection(sections[sections.length - 1])
        break
    }
  }

  const cardVariants = {
    enter: (dir: number) => ({ opacity: 0, x: reduced ? 0 : dir > 0 ? SLIDE_OFFSET : -SLIDE_OFFSET }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: reduced ? 0 : dir > 0 ? -SLIDE_OFFSET : SLIDE_OFFSET }),
  }

  return (
    <section aria-labelledby="mystuff-heading" className="mt-14 mb-4">
      {/* Heading block */}
      <div className="text-center mb-8">
        <span className="font-['JetBrains_Mono'] text-xs text-[var(--clr-primary)] uppercase tracking-[0.3em]">
          // Field Notes
        </span>
        <h2 id="mystuff-heading" className="text-2xl md:text-3xl mt-2">
          My Stuff
        </h2>
        <p className="text-[var(--clr-fg)] max-w-xl mx-auto text-sm md:text-base mt-2">
          A working logbook of concepts I dug into on the job — the kind of
          notes that don&apos;t fit on a résumé. Pick a topic.
        </p>
      </div>

      {/* Sidebar + card — widened to give the sidebar room without shrinking the card */}
      <div className="max-w-[1536px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Topic picker — one stable-order list at every breakpoint; below lg
            it's collapsed behind a separate disclosure trigger */}
        <div className="lg:w-70 shrink-0">
          <button
            type="button"
            ref={topicMenuTriggerRef}
            onClick={() => setTopicMenuOpen((v) => !v)}
            aria-expanded={topicMenuOpen}
            aria-controls="mystuff-topic-list"
            className="lg:hidden w-full panel panel-hud flex items-center gap-3 px-4 py-3 mb-2 rounded-[6px] cursor-pointer"
          >
            <topic.icon className="w-4 h-4 shrink-0" style={{ color: topic.accent }} aria-hidden="true" />
            <span className="flex-1 text-left font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[var(--clr-fg-alt)]">
              {topic.label}
            </span>
            <ChevronDown
              className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                topicMenuOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          <div
            id="mystuff-topic-list"
            role="tablist"
            aria-label="My Stuff topics"
            aria-orientation="vertical"
            onKeyDown={handleKeyDown}
            className={`${
              topicMenuOpen ? 'flex' : 'hidden'
            } lg:flex flex-col gap-3 panel panel-hud p-3 h-full`}
          >
            {myStuff.map((t, i) => {
              const active = i === index
              return (
                <TopicListItem
                  key={t.id}
                  ref={active ? activeTabRef : undefined}
                  topic={t}
                  active={active}
                  reduced={reduced}
                  onClick={() => {
                    goTo(i)
                    setTopicMenuOpen(false)
                    topicMenuTriggerRef.current?.focus()
                  }}
                />
              )
            })}
          </div>
        </div>

        {/* Focal card */}
        <div className="relative z-10 flex-1 min-w-0">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <m.div
              key={topic.id}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduced ? 0.15 : 0.32, ease: 'easeOut' }}
              role="tabpanel"
              id={`mystuff-panel-${topic.id}`}
              aria-label={topic.title}
              tabIndex={0}
              className="panel panel-hud p-5 md:p-8 flex flex-col lg:h-[720px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--clr-bg)]"
            >
              {/* Card header: icon · title · counter */}
              <div className="flex items-start gap-4 mb-5 shrink-0">
                <span
                  className="shrink-0 grid place-items-center w-11 h-11 rounded-[6px] border"
                  style={{
                    color: topic.accent,
                    borderColor: topic.accent,
                    backgroundColor: 'color-mix(in srgb, ' + topic.accent + ' 12%, transparent)',
                  }}
                >
                  <topic.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg md:text-xl !text-[var(--clr-fg-alt)] leading-tight">
                      {topic.title}
                    </h3>
                    {/* Prev / counter / next cluster — out of the way of the notes */}
                    <div className="shrink-0 flex items-center gap-2">
                      <NavArrow
                        side="left"
                        label={`Previous topic: ${prevTopic.label}`}
                        onClick={() => goTo(index - 1)}
                      />
                      <span className="font-['JetBrains_Mono'] text-xs text-[var(--clr-fg)] tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                        <span className="text-[var(--clr-border)]"> / </span>
                        {String(TOTAL).padStart(2, '0')}
                      </span>
                      <NavArrow
                        side="right"
                        label={`Next topic: ${nextTopic.label}`}
                        onClick={() => goTo(index + 1)}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-[var(--clr-fg)] mt-1 font-['IBM_Plex_Sans']">
                    {topic.blurb}
                  </p>
                </div>
              </div>

              {/* Subsection tabs — only when this topic's notes define more than one section */}
              {hasSections && (
                <div className="border-t border-[var(--clr-border)] pt-4 shrink-0">
                  <div
                    role="tablist"
                    aria-label={`${topic.label} sections`}
                    aria-orientation="horizontal"
                    onKeyDown={handleSectionKeyDown}
                    className="flex flex-wrap gap-1.5 pb-4 border-b border-[var(--clr-border)]"
                  >
                    {sections.map((s) => {
                      const activeSec = s === activeSection
                      const secId = `mystuff-sec-tab-${topic.id}-${slugify(s)}`
                      return (
                        <button
                          key={s}
                          role="tab"
                          id={secId}
                          aria-selected={activeSec}
                          aria-controls={`mystuff-sec-panel-${topic.id}`}
                          tabIndex={activeSec ? 0 : -1}
                          onClick={() => setActiveSection(s)}
                          className={`relative isolate px-3 py-1.5 rounded-[4px] text-[11px] font-['JetBrains_Mono'] uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--clr-bg)] ${
                            activeSec
                              ? 'text-[var(--clr-bg)] font-semibold'
                              : 'text-[var(--clr-fg)] hover:text-[var(--clr-fg-alt)]'
                          }`}
                        >
                          {activeSec && (
                            <m.span
                              layoutId="mystuff-section-pill"
                              className="absolute inset-0 -z-10 rounded-[4px]"
                              style={{ backgroundColor: topic.accent }}
                              transition={
                                reduced
                                  ? { duration: 0 }
                                  : { type: 'spring', stiffness: 420, damping: 34 }
                              }
                            />
                          )}
                          {s}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Notes — 2 columns on wide screens; fixed-height card scrolls
                  this region instead of growing, so every topic is the same size */}
              <div
                role={hasSections ? 'tabpanel' : undefined}
                id={hasSections ? `mystuff-sec-panel-${topic.id}` : undefined}
                aria-labelledby={
                  hasSections ? `mystuff-sec-tab-${topic.id}-${slugify(activeSection)}` : undefined
                }
                className={`grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 content-start flex-1 min-h-0 lg:overflow-y-auto pr-1 ${
                  hasSections ? 'pt-4' : 'border-t border-[var(--clr-border)] pt-5'
                }`}
              >
                {notesToRender.map((note) => (
                  <div key={note.term}>
                    <h4
                      className="!text-[var(--clr-fg-alt)] !text-sm !tracking-normal !normal-case font-['JetBrains_Mono'] flex items-center gap-2"
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: topic.accent }}
                        aria-hidden="true"
                      />
                      {note.term}
                    </h4>
                    <p className="text-[13px] md:text-sm text-[var(--clr-fg)] leading-relaxed mt-1.5 pl-[14px]">
                      {renderWithCode(note.detail)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Related skill chips — pinned to the bottom of the fixed-height card */}
              {topic.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-[var(--clr-border)] shrink-0">
                  {topic.skills.map((skill) => {
                    const Icon = skillIconMap[skill]
                    const brandColor = skillColorMap[skill]
                    return (
                      <span
                        key={skill}
                        className="btn btn--plain cursor-default inline-flex items-center gap-2 group !py-1.5 !px-2.5"
                        style={{ '--icon-color': brandColor || 'var(--clr-fg-alt)' } as React.CSSProperties}
                      >
                        {Icon && (
                          <Icon className="w-4 h-4 transition-all duration-300 skill-icon" />
                        )}
                        <span className="text-[12px] font-['JetBrains_Mono'] text-[var(--clr-fg-alt)] leading-none">
                          {skill}
                        </span>
                      </span>
                    )
                  })}
                </div>
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/** One row in the topic sidebar — same stable position in the list whether
 *  it's active or not, only its styling changes */
const TopicListItem = forwardRef<
  HTMLButtonElement,
  {
    topic: MyStuffTopic
    active: boolean
    reduced: boolean
    onClick: () => void
  }
>(function TopicListItem({ topic, active, reduced, onClick }, ref) {
  return (
    <button
      ref={ref}
      role="tab"
      id={`mystuff-tab-${topic.id}`}
      aria-selected={active}
      aria-controls={`mystuff-panel-${topic.id}`}
      tabIndex={active ? 0 : -1}
      onClick={onClick}
      className={`relative isolate w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-[4px] text-[12px] font-['JetBrains_Mono'] uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--clr-bg)] ${
        active
          ? 'text-[var(--clr-bg)] font-semibold border border-transparent'
          : 'text-[var(--clr-fg)] hover:text-[var(--clr-fg-alt)] hover:bg-[var(--clr-bg-alt)] border border-[var(--clr-border)]'
      }`}
    >
      {active && (
        <m.span
          layoutId="mystuff-pill"
          className="absolute inset-0 -z-10 rounded-[4px]"
          style={{
            backgroundColor: topic.accent,
            boxShadow: `0 0 16px -4px ${topic.accent}`,
          }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
        />
      )}
      <topic.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span className="flex-1 text-left truncate">{topic.label}</span>
    </button>
  )
})

/** Small circular prev/next control used in the card header cluster. */
function NavArrow({
  side,
  label,
  onClick,
}: {
  side: 'left' | 'right'
  label: string
  onClick: () => void
}) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid place-items-center w-9 h-9 rounded-full bg-[var(--clr-bg-alt)] border border-[var(--clr-border)] text-[var(--clr-fg-alt)] cursor-pointer transition-colors duration-200 hover:border-[var(--clr-primary)] hover:text-[var(--clr-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)]"
    >
      <Icon className="w-4 h-4" aria-hidden="true" />
    </button>
  )
}

export default MyStuffCarousel
