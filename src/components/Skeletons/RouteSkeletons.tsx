/**
 * Content-shaped Suspense fallbacks for the lazy `/game` and `/deepdive`
 * routes. They mirror each page's real layout (header bar, title block, body)
 * so the route fills its final footprint instantly instead of flashing blank
 * before a centered spinner pops in. No animation libs — pure CSS shimmer via
 * the `.skeleton` utility, which also respects `prefers-reduced-motion`.
 */

/** Header bar shared by both pages: back-link left, status pill right. */
function HeaderSkeleton() {
  return (
    <div className="h-20 md:h-24 max-w-[1400px] w-[95%] mx-auto flex items-center justify-between border-b-2 border-[var(--clr-border)]">
      <div className="skeleton h-4 w-32" />
      <div className="flex items-center gap-2">
        <div className="skeleton h-2 w-2 rounded-full" />
        <div className="skeleton h-3 w-28" />
      </div>
    </div>
  )
}

/** Centered title + subtitle lines shared by both pages. */
function TitleSkeleton() {
  return (
    <div className="text-center my-8 flex flex-col items-center gap-3">
      <div className="skeleton h-9 md:h-10 w-64 max-w-[80%]" />
      <div className="skeleton h-4 w-full max-w-xl" />
      <div className="skeleton h-4 w-3/4 max-w-md" />
    </div>
  )
}

export function GameSkeleton() {
  return (
    <div className="min-h-screen" aria-busy="true" aria-label="Loading game">
      <HeaderSkeleton />
      <main className="max-w-[1400px] w-[95%] mx-auto px-4 pb-12">
        <TitleSkeleton />

        {/* Dispatch board: status row + grid of response-unit cards */}
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="skeleton h-6 w-28" />
            <div className="skeleton h-6 w-20" />
          </div>
          <div className="skeleton h-24 w-full mb-6 rounded-lg" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-28 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export function DeepDiveSkeleton() {
  return (
    <div className="min-h-screen" aria-busy="true" aria-label="Loading deep dive">
      <HeaderSkeleton />
      <main className="max-w-[1400px] w-[95%] mx-auto px-4 pb-12">
        <TitleSkeleton />

        {/* Field-notes carousel placeholder */}
        <div className="skeleton h-72 w-full max-w-[1100px] mx-auto rounded-lg" />

        {/* "By Role" section heading */}
        <div className="flex flex-col items-center gap-2 mt-16 mb-8">
          <div className="skeleton h-3 w-24" />
          <div className="skeleton h-8 w-40" />
        </div>

        {/* Role panels */}
        <div className="max-w-[1250px] mx-auto flex flex-col gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="panel p-6 md:p-8">
              <div className="mb-5 flex flex-col gap-2">
                <div className="skeleton h-6 w-56 max-w-[70%]" />
                <div className="skeleton h-4 w-40" />
                <div className="skeleton h-3 w-32" />
                <div className="skeleton h-4 w-full mt-2" />
                <div className="skeleton h-4 w-5/6" />
              </div>
              <div className="flex flex-col gap-5 border-t border-[var(--clr-border)] pt-5">
                {Array.from({ length: 2 }).map((__, j) => (
                  <div key={j} className="flex flex-col gap-3">
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-4/5" />
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 4 }).map((___, k) => (
                        <div key={k} className="skeleton h-7 w-20 rounded" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
