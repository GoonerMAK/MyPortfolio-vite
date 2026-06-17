import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { deepDive } from '@/data/portfolio'

export function DeepDivePage() {
  return (
    <div className="min-h-screen">
      <motion.header
        className="h-20 md:h-24 max-w-[1400px] w-[95%] mx-auto flex items-center justify-between border-b-2 border-[var(--clr-border)]"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/#experience"
          className="link inline-flex items-center gap-2 text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to HQ
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--clr-primary)] shadow-[0_0_8px_var(--clr-primary)] animate-pulse" />
          <span className="font-['JetBrains_Mono'] text-xs text-[var(--clr-primary)] uppercase tracking-widest">
            Deep Dive
          </span>
        </div>
      </motion.header>

      <main className="max-w-[1400px] w-[95%] mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center my-8"
        >
          <h1 className="text-3xl md:text-4xl mb-3">Experience Deep Dive</h1>
          <p className="text-[var(--clr-fg)] max-w-xl mx-auto text-base">
            A closer look at the work behind each role — what was built, why it
            mattered, and the skills each piece exercised.
          </p>
        </motion.div>

        <div className="max-w-[1000px] mx-auto flex flex-col gap-6">
          {deepDive.map((role, index) => (
            <motion.div
              key={`${role.company}-${role.title}`}
              className="panel p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Role header */}
              <div className="mb-5">
                <h2 className="text-xl !text-[var(--clr-primary)]">{role.title}</h2>
                <p className="text-sm text-[var(--clr-fg-alt)] mt-1 font-['IBM_Plex_Sans']">
                  {role.company}
                </p>
                <p className="text-xs text-[var(--clr-fg)] mt-0.5 font-['JetBrains_Mono']">
                  {role.dateRange}
                </p>
                <p className="text-base text-[var(--clr-fg)] mt-3 leading-relaxed">
                  {role.overview}
                </p>
              </div>

              {/* Detailed items with related-skill badges */}
              <div className="flex flex-col gap-5 border-t border-[var(--clr-border)] pt-5">
                {role.items.map((item, i) => (
                  <div key={i}>
                    <p className="text-base text-[var(--clr-fg)] leading-relaxed pl-3 relative before:content-['▹'] before:absolute before:left-0 before:text-[var(--clr-primary)] before:text-sm">
                      {item.detail}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3 pl-3">
                      {item.skills.map((skill) => (
                        <span key={skill} className="badge badge--resolved">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default DeepDivePage
