import { useContext } from 'react'
import { motion } from 'motion/react'
import { Gamepad2 } from 'lucide-react'
import { ThemeContext } from '@/contexts/theme'
import { Header } from '@/components/Header/Header'
import { About } from '@/components/About/About'
import { Projects } from '@/components/Projects/Projects'
import { Skills } from '@/components/Skills/Skills'
import { Contact } from '@/components/Contact/Contact'
import { Footer } from '@/components/Footer/Footer'
import { ScrollToTop } from '@/components/ScrollToTop/ScrollToTop'

export function HomePage() {
  const themeCtx = useContext(ThemeContext)
  const isDark = themeCtx?.isDark ?? false

  return (
    <div id="top" className={`${isDark ? 'dark' : ''} app`}>
      <Header />

      <main className="max-w-[1100px] w-[95%] mx-auto">
        <About />
        <Projects />
        <Skills />
        <Contact />

        {/* Game CTA Section */}
        <motion.section
          className="section py-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="p-8 rounded-2xl bg-gradient-to-br from-[var(--clr-primary)]/10 to-[var(--clr-primary)]/5 border border-[var(--clr-primary)]/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Gamepad2 className="w-12 h-12 mx-auto mb-4 text-[var(--clr-primary)]" />
            <h3 className="text-2xl mb-3">Take a Break!</h3>
            <p className="text-[var(--clr-fg-alt)] mb-6 max-w-md mx-auto">
              Ready for a quick challenge? Test your memory with Dev Dispatch - a card matching game built with React.
            </p>
            <a href="/MyPortfolio/game">
              <motion.span
                className="btn btn--outline inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Gamepad2 className="w-4 h-4" />
                Play Game
              </motion.span>
            </a>
          </motion.div>
        </motion.section>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  )
}

export default HomePage
