import { useEffect } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { deepDive } from '@/data/portfolio'
import { skillIconMap, skillColorMap } from '@/data/skillIcons'
import { ScrollToTop } from '@/components/ScrollToTop/ScrollToTop'
import { MyStuffCarousel } from '@/components/DeepDive/MyStuffCarousel'

// Company → external site (mirrors the links in the Experience section)
const companyUrls: Record<string, string> = {
  'Gain Solutions': 'https://gainhq.com/',
  'BinduLogic LLC': 'https://www.bindulogic.com/',
}

export function DeepDivePage() {
  // Open at the top — navigation from a scrolled-down card would otherwise
  // land the new page at whatever scroll offset the browser kept.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <div id="top" className="app min-h-screen">
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
            A closer look behind the experience — the engineering lessons I
            picked up along the way, and the work that produced them.
          </p>
        </motion.div>

        {/* Field-notes showcase carousel */}
        <MyStuffCarousel />

        {/* By-role breakdown */}
        <div className="text-center mt-16 mb-8">
          <span className="font-['JetBrains_Mono'] text-xs text-[var(--clr-primary)] uppercase tracking-[0.3em]">
            // By Role
          </span>
          <h2 className="text-2xl md:text-3xl mt-2">The Work</h2>
        </div>

        <div className="max-w-[1250px] mx-auto flex flex-col gap-6">
          {deepDive.map((role, index) => {
            const companyUrl = companyUrls[role.company]
            return (
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
                    {companyUrl ? (
                      <a
                        href={companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {role.company}
                      </a>
                    ) : (
                      role.company
                    )}
                  </p>
                  <p className="text-xs text-[var(--clr-fg)] mt-0.5 font-['JetBrains_Mono']">
                    {role.dateRange}
                  </p>
                  <p className="text-base text-[var(--clr-fg)] mt-3 leading-relaxed">
                    {role.overview}
                  </p>
                </div>

                {/* Detailed items with related-skill chips (icon + label) */}
                <div className="flex flex-col gap-5 border-t border-[var(--clr-border)] pt-5">
                  {role.items.map((item, i) => (
                    <div key={i}>
                      <p className="text-base text-[var(--clr-fg)] leading-relaxed pl-3 relative before:content-['▹'] before:absolute before:left-0 before:text-[var(--clr-primary)] before:text-sm">
                        {item.detail}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3 pl-3">
                        {item.skills.map((skill) => {
                          const Icon = skillIconMap[skill]
                          const brandColor = skillColorMap[skill]
                          return (
                            <span
                              key={skill}
                              className="btn btn--plain cursor-default inline-flex items-center gap-2 group !py-1.5 !px-2.5"
                              style={{ '--icon-color': brandColor || 'var(--clr-fg-alt)' } as React.CSSProperties}
                            >
                              {Icon && (
                                <Icon className="w-4 h-4 transition-all duration-300 skill-icon" />
                              )}
                              <span className="text-[12px] font-['JetBrains_Mono'] text-[var(--clr-fg-alt)] leading-none">
                                {skill}
                              </span>
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </main>

      <ScrollToTop />
    </div>
  )
}

export default DeepDivePage
