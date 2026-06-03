import { motion } from 'motion/react'
import { Briefcase } from 'lucide-react'
import { experience } from '@/data/portfolio'

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

      <div className="max-w-[1000px] mx-auto flex flex-col gap-6">
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
              <div className="w-11 h-11 rounded-md bg-[var(--clr-bg-alt)] border border-[var(--clr-border)] flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-[var(--clr-primary)]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[var(--clr-fg-alt)] font-['IBM_Plex_Sans'] normal-case tracking-normal leading-tight">
                  {company.name}
                </h3>
                <span className="text-xs text-[var(--clr-fg)] font-['JetBrains_Mono']">
                  {company.totalTenure}
                </span>
              </div>
            </div>

            {/* Roles Timeline */}
            <div className="relative ml-5 pl-5 border-l-2 border-[var(--clr-border)]">
              {company.roles.map((role, roleIndex) => (
                <div
                  key={role.title}
                  className={roleIndex < company.roles.length - 1 ? 'pb-5' : ''}
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[7px] mt-1.5 w-3 h-3 rounded-full border-2 border-[var(--clr-primary)] bg-[var(--clr-bg-panel)]" />

                  {/* Role Info */}
                  <h4 className="text-sm font-semibold text-[var(--clr-fg-alt)] font-['IBM_Plex_Sans'] normal-case tracking-normal leading-tight">
                    {role.title}
                  </h4>
                  <p className="text-xs text-[var(--clr-fg)] mt-0.5 font-['JetBrains_Mono']">
                    {role.type} · {role.dateRange} · {role.duration} · {role.mode}
                  </p>

                  {/* Achievements */}
                  <ul className="mt-2 space-y-1.5">
                    {role.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-base text-[var(--clr-fg)] leading-relaxed pl-3 relative before:content-['▹'] before:absolute before:left-0 before:text-[var(--clr-primary)] before:text-sm"
                      >
                        {achievement}
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
