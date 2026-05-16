import { motion } from 'motion/react'
import { Menu, X, Radio } from 'lucide-react'
import { useState } from 'react'
import { projects, contact } from '@/data/portfolio'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [showNavList, setShowNavList] = useState(false)

  const toggleNavList = () => setShowNavList(!showNavList)
  const closeNavList = () => setShowNavList(false)

  const navLinks = [
    { href: '#about', label: 'About', show: true },
    { href: '#projects', label: 'Projects', show: projects.length > 0 },
    { href: '#skills', label: 'Skills', show: true },
    { href: '#contact', label: 'Contact', show: !!contact.email },
    { href: '/MyPortfolio/game', label: 'Simulation', show: true, highlight: true },
  ]

  return (
    <nav className="flex items-center">
      <ul
        className={cn(
          'nav__list flex mr-4 space-x-5 items-center',
          showNavList
            ? 'flex-col fixed inset-0 bg-[var(--clr-bg)] z-50 justify-center items-center space-y-6 space-x-0'
            : 'hidden md:flex'
        )}
      >
        {navLinks
          .filter((link) => link.show)
          .map((link, index) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <a
                href={link.href}
                onClick={closeNavList}
                className={cn(
                  'link link--nav inline-flex items-center gap-1.5',
                  link.highlight && 'text-[var(--clr-accent-red)]'
                )}
              >
                {link.highlight && <Radio className="w-3.5 h-3.5" />}
                {link.label}
              </a>
            </motion.li>
          ))}
      </ul>

      <motion.button
        type="button"
        onClick={toggleNavList}
        className={cn(
          'btn btn--icon p-0 md:hidden text-[var(--clr-primary)]',
          showNavList && 'z-50'
        )}
        aria-label="toggle navigation"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {showNavList ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </motion.button>
    </nav>
  )
}

export default Navbar
