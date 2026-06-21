import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <motion.header
        className="h-20 md:h-24 max-w-[1400px] w-[95%] mx-auto flex items-center border-b-2 border-[var(--clr-border)]"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <a
          href="/"
          className="link inline-flex items-center gap-2 text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to HQ
        </a>
      </motion.header>

      <main className="flex-1 flex flex-col items-center justify-center gap-6 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="font-['JetBrains_Mono'] text-[8rem] md:text-[12rem] leading-none font-bold text-[var(--clr-primary)] opacity-20 select-none">
            404
          </span>
        </motion.div>

        <motion.div
          className="-mt-8 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--clr-accent-red)] shadow-[0_0_8px_var(--clr-accent-red)] animate-pulse" />
            <span className="font-['JetBrains_Mono'] text-xs text-[var(--clr-accent-red)] uppercase tracking-widest">
              Signal Lost
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl">Page not found</h1>
          <p className="text-[var(--clr-fg)] max-w-sm text-base opacity-70">
            This sector doesn't exist in the system. Double-check the URL or head back to base.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <a
            href="/"
            className="link inline-flex items-center gap-2 text-sm uppercase tracking-wider border border-[var(--clr-border)] px-5 py-2.5 rounded-lg hover:border-[var(--clr-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to HQ
          </a>
        </motion.div>
      </main>
    </div>
  )
}

export default NotFoundPage
