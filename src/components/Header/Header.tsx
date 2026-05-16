import { motion } from 'motion/react'
import { Navbar } from './Navbar'
import { about } from '@/data/portfolio'

export function Header() {
  return (
    <header className="h-20 md:h-24 max-w-[1100px] w-[95%] mx-auto flex items-center justify-between border-b-2 border-[var(--clr-border)]">
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-[var(--clr-primary)] font-['Anton'] text-2xl tracking-wider uppercase">
          DISPATCH
        </span>
        <span className="text-[var(--clr-border)] text-xl">//</span>
        <span className="text-[var(--clr-fg-alt)] font-['IBM_Plex_Sans'] text-sm font-semibold uppercase tracking-widest">
          {about.name}
        </span>
      </motion.div>
      <Navbar />
    </header>
  )
}

export default Header
