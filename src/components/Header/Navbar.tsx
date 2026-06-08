import { motion } from 'motion/react'
import { projects, contact } from '@/data/portfolio'
import { cn } from '@/lib/utils'

export function Navbar() {
  const navLinks = [
    { href: '#about', label: 'About', show: true },
    { href: '#skills', label: 'Skills', show: true },
    { href: '#experience', label: 'Experience', show: true },
    { href: '#projects', label: 'Projects', show: projects.length > 0 },
    { href: '#contact', label: 'Contact', show: !!contact.email },
  ]

  return (
    <nav className="flex items-center">
      <ul className={cn('nav__list flex mr-4 space-x-5 items-center')}>
        {navLinks
          .filter((link) => link.show)
          .map((link, index) => (
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
    </nav>
  )
}

export default Navbar
