import type { CSSProperties, ReactNode } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { ArrowRight, ChevronDown, Lightbulb } from 'lucide-react'
import { FlowDiagram } from '@/components/DeepDive/FlowDiagram'
import { tint } from '@/lib/colors'
import type { MyStuffNote } from '@/types'

/** Splits on backticks; odd segments become styled `<code>` chips. */
export function renderWithCode(text: string): ReactNode[] {
  return text.split('`').map((segment, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        className="font-['M_PLUS_Rounded_1c'] text-[0.85em] px-1 py-px rounded-[3px] bg-bg text-primary"
      >
        {segment}
      </code>
    ) : (
      <span key={i}>{segment}</span>
    ),
  )
}

function SlotLabel({ children }: { children: ReactNode }) {
  return (
    <span className="block font-['M_PLUS_Rounded_1c'] text-[10px] uppercase tracking-[0.18em] text-fg opacity-70 mb-1.5">
      {children}
    </span>
  )
}

export function FieldNote({
  note,
  id,
  rank,
  accent,
  open,
  reduced,
  onToggle,
}: {
  note: MyStuffNote
  id: string
  rank: number
  accent: string
  open: boolean
  reduced: boolean
  onToggle: () => void
}) {
  const panelId = `${id}-panel`

  return (
    <div
      style={{ '--note-accent': accent } as CSSProperties}
      className={`rounded-[4px] border-l-2 transition-colors duration-200 ${
        open ? 'bg-bg-alt border-(--note-accent) pb-5' : 'border-transparent hover:bg-bg-alt hover:border-(--note-accent)'
      }`}
    >
      <h4 className="!m-0 !text-base !tracking-normal !normal-case">
        <button
          type="button"
          id={`${id}-trigger`}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-start gap-4 px-3 py-3.5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-[4px]"
        >
          <span
            className="shrink-0 font-['M_PLUS_Rounded_1c'] text-sm font-semibold tabular-nums leading-6"
            style={{ color: accent }}
            aria-hidden="true"
          >
            {String(rank).padStart(2, '0')}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-['IBM_Plex_Sans'] font-semibold text-[15px] text-fg-alt leading-6">
              {note.term}
            </span>
            <span className="block font-['IBM_Plex_Sans'] font-normal text-sm text-fg leading-relaxed mt-0.5">
              {renderWithCode(note.tldr)}
            </span>
          </span>
          <ChevronDown
            className={`w-4 h-4 mt-1 shrink-0 text-fg transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h4>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={panelId}
            role="region"
            aria-labelledby={`${id}-trigger`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.22, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pl-[52px] pr-4 space-y-4 text-sm leading-relaxed text-fg">
              {note.why && (
                <div>
                  <SlotLabel>Why it matters</SlotLabel>
                  <p>{renderWithCode(note.why)}</p>
                </div>
              )}

              {note.diagram && (
                <div>
                  <SlotLabel>Flow</SlotLabel>
                  <div className="rounded-[4px] border border-border bg-bg p-3 overflow-x-auto">
                    <div className="min-w-[340px] max-w-[460px]">
                      <FlowDiagram spec={note.diagram} title={note.term} reduced={reduced} />
                    </div>
                  </div>
                </div>
              )}

              {note.example && (
                <div>
                  <SlotLabel>Example</SlotLabel>
                  <pre className="font-['M_PLUS_Rounded_1c'] text-[12.5px] leading-relaxed text-fg-alt bg-bg border border-border rounded-[4px] px-4 py-3 overflow-x-auto whitespace-pre">
                    <code>{note.example}</code>
                  </pre>
                </div>
              )}

              {note.items && (
                <div>
                  <SlotLabel>Cheat sheet</SlotLabel>
                  <dl className="rounded-[4px] border border-border divide-y divide-border overflow-hidden">
                    {note.items.map((item) => (
                      <div
                        key={item.label}
                        className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-x-4 gap-y-1 px-3 py-2"
                      >
                        <dt className="text-fg">{renderWithCode(item.label)}</dt>
                        {item.code && (
                          <dd className="m-0 font-['M_PLUS_Rounded_1c'] text-[12px] text-primary break-words">
                            {item.code}
                          </dd>
                        )}
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {note.analogy && (
                <p className="flex gap-2.5 italic">
                  <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-accent-gold" aria-hidden="true" />
                  <span>
                    <span className="sr-only">Analogy: </span>
                    {renderWithCode(note.analogy)}
                  </span>
                </p>
              )}

              {note.rule && (
                <p
                  className="flex gap-2.5 rounded-[4px] px-3 py-2 text-fg-alt"
                  style={{ backgroundColor: tint(accent, 10), borderLeft: `2px solid ${accent}` }}
                >
                  <ArrowRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accent }} aria-hidden="true" />
                  <span>
                    <span className="sr-only">Rule of thumb: </span>
                    {renderWithCode(note.rule)}
                  </span>
                </p>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FieldNote
