import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { myStuff } from '@/data/myStuff'
import { skillIconMap, skillColorMap } from '@/data/skillIcons'

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

const TOTAL = myStuff.length
const SLIDE_OFFSET = 48

/** Pill-driven carousel showcasing personal topics. ARIA tablist with roving tabindex + arrow-key nav. */
export function MyStuffCarousel() {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  // +1 = moved forward, -1 = moved back — drives slide direction.
  const [direction, setDirection] = useState(1)
  // Set when navigation came from the keyboard, so we re-focus the active tab.
  const refocus = useRef(false)
  const activeTabRef = useRef<HTMLButtonElement>(null)

  const topic = myStuff[index]
  const prevTopic = myStuff[(index - 1 + TOTAL) % TOTAL]
  const nextTopic = myStuff[(index + 1) % TOTAL]

  const goTo = useCallback(
    (next: number, fromKeyboard = false) => {
      const target = (next + TOTAL) % TOTAL
      setDirection(target >= index ? 1 : -1)
      setIndex(target)
      refocus.current = fromKeyboard
    },
    [index],
  )

  // Ensure the pill stays on-screen when the row scrolls (mobile),
  // and return keyboard focus to it after an arrow-key move.
  useEffect(() => {
    const el = activeTabRef.current
    if (!el) return
    el.scrollIntoView({
      inline: 'center',
      block: 'nearest',
      behavior: reduced ? 'auto' : 'smooth',
    })
    if (refocus.current) {
      el.focus()
      refocus.current = false
    }
  }, [index, reduced])

  // Standard tablist keyboard model.
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

      {/* Carousel — width matched to the by-role experience cards (max-w-[1250px]) */}
      <div className="relative max-w-[1250px] mx-auto">
        {/* Stage — holds the focal card */}
        <div className="relative">
          {/* Focal card */}
          <div className="relative z-10">
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
              aria-labelledby={`mystuff-tab-${topic.id}`}
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

              {/* Notes — 2 columns on wide screens; fixed-height card scrolls
                  this region instead of growing, so every topic is the same size */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 content-start border-t border-[var(--clr-border)] pt-5 flex-1 min-h-0 lg:overflow-y-auto pr-1">
                {topic.notes.map((note) => (
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

        {/* Connector: card → pills (static dotted line, on-theme) */}
        <div
          aria-hidden="true"
          className="mx-auto mt-3 mb-1 w-px h-5 border-l border-dashed border-[var(--clr-primary)] opacity-50"
          style={{ filter: 'drop-shadow(0 0 4px var(--clr-primary))' }}
        />

        {/* Pills (tablist) */}
        <div
          role="tablist"
          aria-label="My Stuff topics"
          onKeyDown={handleKeyDown}
          className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-2 overflow-x-auto sm:overflow-visible scrollbar-hide px-1"
        >
          {myStuff.map((t, i) => {
            const active = i === index
            return (
              <button
                key={t.id}
                ref={active ? activeTabRef : undefined}
                role="tab"
                id={`mystuff-tab-${t.id}`}
                aria-selected={active}
                aria-controls={`mystuff-panel-${t.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => goTo(i)}
                className={`relative isolate inline-flex items-center gap-1.5 min-h-[40px] px-3.5 rounded-[4px] text-[11px] font-['JetBrains_Mono'] uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--clr-bg)] ${
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
                      backgroundColor: t.accent,
                      boxShadow: `0 0 16px -4px ${t.accent}`,
                    }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 420, damping: 34 }
                    }
                  />
                )}
                <t.icon className="w-3.5 h-3.5" aria-hidden="true" />
                {t.label}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

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
