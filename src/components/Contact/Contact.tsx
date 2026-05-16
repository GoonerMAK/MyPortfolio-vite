import { motion } from 'motion/react'
import { Mail } from 'lucide-react'
import { contact } from '@/data/portfolio'

export function Contact() {
  if (!contact.email) return null

  return (
    <section className="section px-4" id="contact">
      <motion.h2
        className="section__title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.3 }}
      >
        Contact
      </motion.h2>
      <motion.div
        className="panel panel-hud p-8 max-w-md mx-auto text-center"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="pt-2">
          <p className="font-['JetBrains_Mono'] text-xs text-[var(--clr-fg)] mb-1 uppercase tracking-wider">
            Secure Line Available
          </p>
          <p className="font-['JetBrains_Mono'] text-sm text-[var(--clr-primary)] mb-6">
            {contact.email}
          </p>
          <a href={`mailto:${contact.email}`}>
            <motion.span
              className="btn btn--outline inline-flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail className="w-4 h-4" />
              Mail me
            </motion.span>
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
