export function Footer() {
  return (
    <footer className="py-8 mt-16 border-t-2 border-[var(--clr-border)]">
      <div className="max-w-[1100px] w-[95%] mx-auto flex items-center justify-between text-xs font-['JetBrains_Mono'] text-[var(--clr-fg)]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--clr-accent-green)] shadow-[0_0_6px_var(--clr-accent-green)]" />
          <span className="uppercase tracking-wider">System Online</span>
        </div>
        <a
          href="https://github.com/GoonerMAK"
          className="hover:text-[var(--clr-primary)] transition-colors duration-150 uppercase tracking-wider"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy; 2026 // Mashrur Ahsan
        </a>
      </div>
    </footer>
  )
}

export default Footer
