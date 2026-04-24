import { motion } from 'motion/react'
import { contact } from '@/data/portfolio'

export function Contact() {
  if (!contact.email) return null

  return (
    <section className="section contact flex flex-col items-center px-4" id="contact">
      <motion.h2
        className="section__title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        Contact
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a href={`mailto:${contact.email}`}>
          <motion.span
            className="btn btn--outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Email me
          </motion.span>
        </a>
      </motion.div>
    </section>
  )
}

export default Contact
