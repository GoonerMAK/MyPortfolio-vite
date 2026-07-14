import { useState } from 'react'
import { m } from 'motion/react'
import { Mail, Copy, Check } from 'lucide-react'
import { contact } from '@/data/portfolio'

export function Contact() {
  const [copied, setCopied] = useState(false)

  if (!contact.email) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(contact.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="section px-4" id="contact" aria-labelledby="contact-title">
      <m.h2
        id="contact-title"
        className="section__title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        Contact
      </m.h2>
      <m.div
        className="panel panel-hud p-8 max-w-xl mx-auto text-center"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="pt-2">
          <p className="font-['JetBrains_Mono'] text-sm text-[var(--clr-fg)] mb-1 uppercase tracking-wider">
            Get in Touch
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <p className="font-['JetBrains_Mono'] text-base text-[var(--clr-primary)]">
              {contact.email}
            </p>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? 'Email copied!' : 'Copy email'}
              className="p-1 rounded hover:bg-[var(--clr-border)] transition-colors text-[var(--clr-fg-alt)] hover:text-[var(--clr-primary)]"
              title={copied ? 'Copied!' : 'Copy to clipboard'}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <m.a
            href={`mailto:${contact.email}`}
            aria-label={`Send email to ${contact.email}`}
            className="btn btn--outline inline-flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            Mail me
          </m.a>
        </div>
      </m.div>
    </section>
  )
}

export default Contact
