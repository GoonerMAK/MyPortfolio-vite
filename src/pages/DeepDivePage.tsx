import { useEffect } from 'react'
import { LazyMotion, domMax, m } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ScrollToTop } from '@/components/ScrollToTop/ScrollToTop'
import { MyStuffCarousel } from '@/components/DeepDive/MyStuffCarousel'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function DeepDivePage() {
  useDocumentTitle('Deep Dive // Portfolio')

  // Open at the top — navigation from a scrolled-down card would otherwise
  // land the new page at whatever scroll offset the browser kept.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <LazyMotion features={domMax}>
    <div id="top" className="app min-h-screen">
      <m.header
        className="h-20 md:h-24 max-w-[1400px] w-[95%] mx-auto flex items-center justify-between border-b-2 border-[var(--clr-border)]"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/#experience"
          className="link inline-flex items-center gap-2 text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to HQ
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--clr-primary)] shadow-[0_0_8px_var(--clr-primary)] animate-pulse" />
          <span className="font-['JetBrains_Mono'] text-xs text-[var(--clr-primary)] uppercase tracking-widest">
            Deep Dive
          </span>
        </div>
      </m.header>

      <main className="max-w-[1400px] w-[95%] mx-auto px-4 pb-12">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center my-8"
        >
          <h1 className="text-3xl md:text-4xl mb-3">Experience Deep Dive</h1>
          <p className="text-[var(--clr-fg)] max-w-xl mx-auto text-base">
            A closer look behind the experience — the engineering lessons I
            picked up along the way, and the work that produced them.
          </p>
        </m.div>

        {/* Field-notes showcase carousel */}
        <MyStuffCarousel />
      </main>

      <ScrollToTop />
    </div>
    </LazyMotion>
  )
}

export default DeepDivePage
