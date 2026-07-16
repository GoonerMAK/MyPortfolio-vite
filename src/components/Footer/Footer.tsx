import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-8 mt-16 border-t-2 border-[var(--clr-border)]">
      <div className="max-w-[1400px] w-[95%] mx-auto flex items-center justify-between text-xs font-['JetBrains_Mono'] text-[var(--clr-fg)]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--clr-accent-green)] shadow-[0_0_6px_var(--clr-accent-green)]" />
          <span className="uppercase tracking-wider">System Online</span>
        </div>
        <Link
          to="/deepdive"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] border border-[var(--clr-primary)] bg-[var(--clr-primary)] text-(--clr-bg) font-semibold uppercase tracking-wider hover:bg-transparent hover:text-(--clr-primary) transition-colors duration-150"
        >
          Deep Dive
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
        <a
          href="https://github.com/GoonerMAK"
          className="hover:text-[var(--clr-primary)] transition-colors duration-150 uppercase tracking-wider"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy; {year} // Mashrur Ahsan
        </a>
      </div>
    </footer>
  )
}

export default Footer
