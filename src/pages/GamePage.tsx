import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { DispatchGame } from '@/components/game/DispatchGame'

export function GamePage() {
  return (
    <div className="min-h-screen">
      <motion.header
        className="h-20 md:h-24 max-w-[1100px] w-[95%] mx-auto flex items-center justify-between border-b-2 border-[var(--clr-border)]"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <a
          href="/MyPortfolio"
          className="link inline-flex items-center gap-2 text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to HQ
        </a>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--clr-accent-red)] shadow-[0_0_8px_var(--clr-accent-red)] animate-pulse" />
          <span className="font-['JetBrains_Mono'] text-xs text-[var(--clr-accent-red)] uppercase tracking-widest">
            Simulation Active
          </span>
        </div>
      </motion.header>

      <main className="max-w-[1100px] w-[95%] mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-center my-8"
        >
          <h1 className="text-3xl md:text-4xl mb-3">
            Tech Dispatch
          </h1>
          <p className="text-[var(--clr-fg)] max-w-lg mx-auto text-sm">
            Incoming requirements require your immediate response. Triage each incident by selecting the correct response unit before time runs out.
          </p>
        </motion.div>

        <DispatchGame />
      </main>
    </div>
  )
}

export default GamePage
