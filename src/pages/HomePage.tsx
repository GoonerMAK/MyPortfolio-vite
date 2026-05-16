import { motion } from 'motion/react'
import { Radio } from 'lucide-react'
import { Header } from '@/components/Header/Header'
import { About } from '@/components/About/About'
import { Projects } from '@/components/Projects/Projects'
import { Skills } from '@/components/Skills/Skills'
import { Contact } from '@/components/Contact/Contact'
import { Footer } from '@/components/Footer/Footer'
import { ScrollToTop } from '@/components/ScrollToTop/ScrollToTop'

export function HomePage() {
  return (
    <div id="top" className="app min-h-screen">
      <Header />

      <main className="max-w-[1100px] w-[95%] mx-auto">
        <About />
        <Projects />
        <Skills />
        <Contact />

        {/* Simulation CTA Section */}
        <motion.section
          className="section py-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
        >
          <div className="panel panel-hud p-8">
            <div className="pt-2">
              <Radio className="w-10 h-10 mx-auto mb-4 text-[var(--clr-accent-red)]" />
              <h3 className="text-2xl mb-3">Incoming Dispatch</h3>
              <p className="text-[var(--clr-fg)] mb-6 max-w-md mx-auto text-sm">
                Emergency simulation available. Test your response time and decision-making under pressure.
              </p>
              <a href="/MyPortfolio/game">
                <motion.span
                  className="btn btn--outline inline-flex items-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Radio className="w-4 h-4" />
                  Enter Simulation
                </motion.span>
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  )
}

export default HomePage
