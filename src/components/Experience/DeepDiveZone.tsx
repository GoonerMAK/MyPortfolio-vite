import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'

/**
 * Pointer-tracked dotted spotlight that lives in the dark margin to the right of an
 * experience card. Clean by default; on hover a circular dot field and a dotted
 * "DEEP DIVE" label follow the cursor. Clicking navigates to the /deepdive page.
 *
 * Desktop-only (2xl+) where a real gutter exists — small screens get a fallback
 * button rendered inside the card instead. Cursor position is pushed to CSS vars
 * (--mx/--my) by direct style mutation so pointer movement never triggers a React
 * re-render. Uses React's synthetic onMouseMove, so there are no manually-attached
 * listeners to clean up.
 */
export function DeepDiveZone() {
  const ref = useRef<HTMLAnchorElement>(null)

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <Link
      ref={ref}
      to="/deepdive"
      aria-label="Deep dive into detailed experience"
      onMouseMove={handleMouseMove}
      className="deepdive-zone hidden 2xl:block absolute top-0 left-full h-full w-[calc(50vw-640px)]"
    >
      <span className="deepdive-dots" aria-hidden="true" />
      <span className="deepdive-label" aria-hidden="true">
        Deep
        <br />
        Dive
      </span>
    </Link>
  )
}

export default DeepDiveZone
