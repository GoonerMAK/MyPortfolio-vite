import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { projects, contact } from '@/data/portfolio'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: '#about', label: 'About', show: true },
    { href: '#skills', label: 'Skills', show: true },
    { href: '#experience', label: 'Experience', show: true },
    { href: '#projects', label: 'Projects', show: projects.length > 0 },
    { href: '#contact', label: 'Contact', show: !!contact.email },
  ].filter((link) => link.show)

  return (
    <nav className="flex items-center">
      {/* Desktop nav */}
      <ul className={cn('nav__list hidden md:flex mr-4 space-x-5 items-center')}>
        {navLinks.map((link, index) => (
          <motion.li
            key={link.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <a
              href={link.href}
              className={cn('link link--nav inline-flex items-center gap-1.5')}
            >
              {link.label}
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Mobile hamburger toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="md:hidden inline-flex items-center justify-center p-2 text-[var(--clr-fg-alt)] hover:text-[var(--clr-primary)] transition-colors"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[var(--clr-bg)]/95 backdrop-blur-md border-b-2 border-[var(--clr-border)]"
          >
            <ul className="max-w-[1200px] w-[95%] mx-auto flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'link link--nav block py-3 text-base uppercase tracking-wider'
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
