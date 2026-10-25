import { m } from 'motion/react'
import { Navbar } from './Navbar'
import { about } from '@/data/portfolio'

export function Header() {
  return (
    <div className="sticky top-0 z-40 bg-bg/60 backdrop-blur-md">
      <header className="h-20 md:h-24 max-w-[1200px] w-[95%] mx-auto flex items-center justify-between border-b-2 border-border">
        <m.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-['Anton'] text-2xl tracking-wider uppercase">
            Portfolio
          </span>
          <span className="text-border text-xl">//</span>
          <span className="text-fg-alt font-['IBM_Plex_Sans'] text-sm font-semibold uppercase tracking-widest">
            {about.name}
          </span>
        </m.div>
        <Navbar />
      </header>
    </div>
  )
}

export default Header
