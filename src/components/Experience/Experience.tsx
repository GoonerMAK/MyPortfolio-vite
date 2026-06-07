import { motion } from 'motion/react'
import { experience } from '@/data/portfolio'

// Helper: Parse achievement text and wrap highlighted phrases
function HighlightedText({ text, highlights }: { text: string; highlights?: string[] }) {
  if (!highlights || highlights.length === 0) {
    return <>{text}</>
  }

  // Sort highlights by length (longest first) to avoid partial matches
  const sortedHighlights = [...highlights].sort((a, b) => b.length - a.length)
  
  // Build regex pattern from all highlights, escaped for special chars
  const escapedPatterns = sortedHighlights.map(phrase => 
    phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  )
  const regex = new RegExp(`(${escapedPatterns.join('|')})`, 'g')
  
  const parts = text.split(regex).map((part, idx) => {
    // Check if this part matches any highlight (exact match)
    const isHighlight = sortedHighlights.includes(part)
    if (isHighlight) {
      return (
        <span key={idx} className="relative inline highlight-sweep">
          <span className="relative z-10">{part}</span>
        </span>
      )
    }
    // Keep empty strings for proper text reconstruction
    if (part === '') return <span key={idx}></span>
    return <span key={idx}>{part}</span>
  })

  return <>{parts}</>
}

export function Experience() {
  return (
    <section className="section px-4" id="experience">
      <motion.h2
        className="section__title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        Work Experience
      </motion.h2>

      <div className="max-w-[1250px] mx-auto flex flex-col gap-6">
        {experience.map((company, index) => (
          <motion.div
            key={company.name}
            className="panel p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Company Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-md bg-[var(--clr-bg-alt)] border border-[var(--clr-border)] flex items-center justify-center shrink-0 overflow-hidden">
                <img src={company.logo} alt={`${company.name} logo`} className="w-full h-full object-contain p-1" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-[var(--clr-fg-alt)] !font-['IBM_Plex_Sans'] normal-case tracking-normal leading-tight">
                  {company.name === 'Gain Solutions' ? (
                    <a href="https://gainhq.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                      Gain Solutions
                    </a>
                  ) : company.name === 'BinduLogic LLC' ? (
                    <a href="https://www.bindulogic.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                      BinduLogic LLC
                    </a>
                  ) : company.name}
                </h3>
                {/* <span className="text-xs text-[var(--clr-fg)] font-['JetBrains_Mono']">
                  {company.totalTenure}
                </span> */}
              </div>
            </div>

            {/* Roles Timeline */}
            <div className="relative ml-5 pl-5 border-l-2 border-[var(--clr-border)] group/timeline">
              {/* Timeline Sweep Animation */}
              <svg className="timeline-trace-svg">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  pathLength="1200"
                  className="timeline-trace-path"
                />
              </svg>

              {company.roles.map((role, roleIndex) => (
                <div
                  key={role.title}
                  className={roleIndex < company.roles.length - 1 ? 'pb-10' : ''}
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[7px] mt-1.5 w-3 h-3 rounded-full border-2 border-[var(--clr-primary)] bg-[var(--clr-bg-panel)]" />

                  {/* Role Info */}
                  <h4 className="text-sm font-semibold !text-[var(--clr-primary)] font-['IBM_Plex_Sans'] normal-case tracking-normal leading-tight">
                    {role.title}
                  </h4>
                  <p className="text-xs text-[var(--clr-fg)] mt-0.5 font-['JetBrains_Mono']">
                    {role.dateRange} · {role.duration}
                  </p>

                  {/* Achievements */}
                  <ul className="mt-2 space-y-3">
                    {role.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-base text-[var(--clr-fg)] leading-relaxed pl-3 relative before:content-['▹'] before:absolute before:left-0 before:text-[var(--clr-primary)] before:text-sm transition-all duration-500 border border-transparent hover:border-[var(--clr-primary)] hover:bg-[var(--clr-bg-alt)] hover:scale-[1.03] hover:shadow-sm rounded-sm px-4 py-1 -ml-4"
                      >
                        <HighlightedText 
                          text={achievement} 
                          highlights={role.highlights?.[i]} 
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Experience
