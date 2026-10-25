import { useId } from 'react'
import { m } from 'motion/react'
import { clr, tint } from '@/lib/colors'
import type { FlowNode, FlowSpec, Tone } from '@/types'

const TONE: Record<Tone, string> = {
  primary: clr.primary,
  green: clr.green,
  red: clr.red,
  gold: clr.gold,
  purple: clr.purple,
  muted: clr.fg,
}

const COL_W = 120
const ROW_H = 72
const NODE_W = 104
const NODE_H = 36
const WIDTH = COL_W * 3

const cx = (col: number) => col * COL_W + COL_W / 2

interface Route {
  d: string
  labelX: number
  labelY: number
  labelAnchor: 'start' | 'middle' | 'end'
}

function route(a: FlowNode, b: FlowNode, back: boolean, top: number): Route {
  const ay = top + a.row * ROW_H + NODE_H / 2
  const by = top + b.row * ROW_H + NODE_H / 2
  const ax = cx(a.col)
  const bx = cx(b.col)

  if (a.row === b.row && back) {
    const dir = Math.sign(bx - ax)
    const sx = ax + dir * 24
    const ex = bx - dir * 24
    const y = ay + NODE_H / 2
    return {
      d: `M${sx},${y} C${sx},${y + 30} ${ex},${y + 30} ${ex},${y}`,
      labelX: (sx + ex) / 2,
      labelY: y + 30,
      labelAnchor: 'middle',
    }
  }

  if (a.row === b.row) {
    const dir = Math.sign(bx - ax)
    const sx = ax + (dir * NODE_W) / 2
    const ex = bx - (dir * NODE_W) / 2
    // The column gap is narrower than most labels, so sit the label just above the boxes
    return { d: `M${sx},${ay} H${ex}`, labelX: (sx + ex) / 2, labelY: ay - NODE_H / 2 - 4, labelAnchor: 'middle' }
  }

  // Vertical and elbow routes leave the bottom (or top) edge, turn in the gap
  // between rows and enter the target's facing edge, so fan-outs never cross nodes.
  const down = b.row > a.row
  const sy = ay + ((down ? 1 : -1) * NODE_H) / 2
  const ey = by - ((down ? 1 : -1) * NODE_H) / 2

  if (ax === bx) {
    return { d: `M${ax},${sy} V${ey}`, ...beside(ax), labelY: (sy + ey) / 2 + 3 }
  }

  const gapY = down ? ey - (ROW_H - NODE_H) / 2 : ey + (ROW_H - NODE_H) / 2
  return {
    d: `M${ax},${sy} V${gapY} H${bx} V${ey}`,
    ...beside(bx),
    labelY: (gapY + ey) / 2 + 3,
  }
}

/** Label position next to a vertical segment: to its right, or to its left in the last column so it stays inside */
function beside(x: number): Pick<Route, 'labelX' | 'labelAnchor'> {
  return x >= cx(2) ? { labelX: x - 6, labelAnchor: 'end' } : { labelX: x + 6, labelAnchor: 'start' }
}

export function FlowDiagram({ spec, title, reduced }: { spec: FlowSpec; title: string; reduced: boolean }) {
  const labelsAboveRow0 = spec.edges.some((e) => e.label && !e.back && byId(spec, e.from).row === 0 && byId(spec, e.to).row === 0)
  const top = spec.groups?.length ? 28 : labelsAboveRow0 ? 16 : 8
  const maxRow = Math.max(...spec.nodes.map((n) => n.row))
  const hasBackBelowLast = spec.edges.some((e) => e.back && byId(spec, e.from).row === maxRow)
  const height = top + maxRow * ROW_H + NODE_H + (hasBackBelowLast ? 36 : 10)
  const draw = reduced ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' as const }
  const uid = useId().replace(/[^\w-]/g, '')
  const arrowId = (t: Tone) => `flow-arrow-${uid}-${t}`

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        className="w-full h-auto block"
        role="img"
        aria-label={`Diagram: ${title}`}
      >
        <defs>
          {(Object.keys(TONE) as Tone[]).map((t) => (
            <marker
              key={t}
              id={arrowId(t)}
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L8,4 L0,8 z" fill={TONE[t]} />
            </marker>
          ))}
        </defs>

        {spec.groups?.map((g) => {
          const color = TONE[g.tone ?? 'muted']
          const x = g.cols[0] * COL_W + 4
          const y = top + g.rows[0] * ROW_H - 10
          const w = (g.cols[1] - g.cols[0] + 1) * COL_W - 8
          const h = (g.rows[1] - g.rows[0]) * ROW_H + NODE_H + 20
          return (
            <g key={g.label}>
              <rect x={x} y={y} width={w} height={h} rx={6} fill="none" stroke={color} strokeOpacity={0.5} strokeDasharray="4 4" />
              <text x={x + 6} y={y - 5} fontSize={9} fill={color} className="font-['M_PLUS_Rounded_1c'] uppercase" letterSpacing="0.08em">
                {g.label}
              </text>
            </g>
          )
        })}

        {spec.edges.map((e, i) => {
          const r = route(byId(spec, e.from), byId(spec, e.to), !!e.back, top)
          const tone = e.tone ?? 'muted'
          const color = TONE[tone]
          return (
            <g key={`${e.from}-${e.to}`}>
              <m.path
                d={r.d}
                fill="none"
                stroke={color}
                strokeOpacity={tone === 'muted' ? 0.55 : 0.9}
                strokeWidth={1.4}
                strokeDasharray={e.dashed ? '4 3' : undefined}
                markerEnd={`url(#${arrowId(tone)})`}
                initial={{ pathLength: reduced ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ ...draw, delay: reduced ? 0 : 0.15 + i * 0.07 }}
              />
              {e.label && (
                <m.text
                  x={r.labelX}
                  y={r.labelY}
                  textAnchor={r.labelAnchor}
                  fontSize={9}
                  fill={color}
                  stroke={clr.bg}
                  strokeWidth={3}
                  paintOrder="stroke"
                  className="font-['M_PLUS_Rounded_1c']"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.35 + i * 0.07 }}
                >
                  {e.label}
                </m.text>
              )}
            </g>
          )
        })}

        {spec.nodes.map((n, i) => {
          const color = TONE[n.tone ?? 'muted']
          const lines = n.label.split('\n')
          const x = cx(n.col) - NODE_W / 2
          const y = top + n.row * ROW_H
          return (
            <m.g
              key={n.id}
              initial={{ opacity: 0, y: reduced ? 0 : 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : i * 0.05 }}
            >
              <rect
                x={x}
                y={y}
                width={NODE_W}
                height={NODE_H}
                rx={5}
                fill={tint(color, n.tone && n.tone !== 'muted' ? 14 : 6)}
                stroke={color}
                strokeOpacity={n.tone && n.tone !== 'muted' ? 0.9 : 0.45}
              />
              <text
                x={cx(n.col)}
                y={y + NODE_H / 2 + (lines.length === 1 ? 3.5 : -2)}
                textAnchor="middle"
                fontSize={10}
                fill={clr.fgAlt}
                className="font-['IBM_Plex_Sans']"
              >
                {lines.map((line, li) => (
                  <tspan key={li} x={cx(n.col)} dy={li === 0 ? 0 : 11}>
                    {line}
                  </tspan>
                ))}
              </text>
            </m.g>
          )
        })}
      </svg>
      {spec.caption && (
        <figcaption className="text-[12px] text-fg leading-relaxed mt-3 text-center">{spec.caption}</figcaption>
      )}
    </figure>
  )
}

function byId(spec: FlowSpec, id: string): FlowNode {
  const node = spec.nodes.find((n) => n.id === id)
  if (!node) throw new Error(`FlowDiagram: unknown node "${id}"`)
  return node
}

export default FlowDiagram
