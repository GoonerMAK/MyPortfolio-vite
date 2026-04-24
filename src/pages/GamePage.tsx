import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { MemoryGame } from '@/components/game/MemoryGame'

export function GamePage() {
  return (
    <div className="min-h-screen">
      <motion.header
        className="h-24 md:h-32 max-w-[1100px] w-[95%] mx-auto flex items-center justify-between px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <a
          href="/MyPortfolio"
          className="link flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Portfolio
        </a>
      </motion.header>

      <main className="max-w-[1100px] w-[95%] mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl mb-4">Dev Dispatch🚀</h1>
          <p className="text-[var(--clr-fg-alt)] max-w-lg mx-auto">
            Take a quick break and test your memory! Match all the pairs to win.
          </p>
        </motion.div>

        <MemoryGame />
      </main>
    </div>
  )
}

export default GamePage
