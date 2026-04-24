import { motion } from 'motion/react'
import { Moon, Sun, Menu, X, Gamepad2 } from 'lucide-react'
import { useState, useContext } from 'react'
import { ThemeContext } from '@/contexts/theme'
import { projects, contact } from '@/data/portfolio'
import { cn } from '@/lib/utils'

export function Navbar() {
  const themeCtx = useContext(ThemeContext)
  const isDark = themeCtx?.isDark ?? false
  const toggleTheme = themeCtx?.toggleTheme ?? (() => {})
  const [showNavList, setShowNavList] = useState(false)

  const toggleNavList = () => setShowNavList(!showNavList)

  const navLinks = [
    { href: '#projects', label: 'Projects', show: projects.length > 0 },
    { href: '#skills', label: 'Skills', show: true },
    { href: '#contact', label: 'Contact', show: !!contact.email },
    { href: '/MyPortfolio/game', label: 'Game', show: true },
  ]

  return (
    <nav className="flex items-center">
      <ul
        className={cn(
          'nav__list flex mr-6 space-x-6 items-center',
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
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <a
                href={link.href}
                onClick={toggleNavList}
                className={cn(
                  'link link--nav text-[var(--clr-fg)] lowercase font-medium inline-flex items-center gap-1',
                  link.href === '/MyPortfolio/game' && 'text-[var(--clr-primary)]'
                )}
              >
                {link.label === 'Game' && <Gamepad2 className="w-4 h-4" />}
                {link.label}
              </a>
            </motion.li>
          ))}
      </ul>

      <motion.button
        type="button"
        onClick={toggleTheme}
        className="btn btn--icon mt-1 p-0"
        aria-label="toggle theme"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDark ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </motion.button>

      <motion.button
        type="button"
        onClick={toggleNavList}
        className={cn(
          'btn btn--icon ml-3 p-0 md:hidden',
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
