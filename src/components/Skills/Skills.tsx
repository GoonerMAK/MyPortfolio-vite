import { motion } from 'motion/react'
import { skills } from '@/data/portfolio'
import { skillIconMap } from '@/data/skillIcons'

const CATEGORY_COLORS = [
  'var(--clr-primary)',
  'var(--clr-primary)',
  'var(--clr-primary)',
  'var(--clr-primary)',
  'var(--clr-primary)',
  'var(--clr-primary)',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
}

export function Skills() {
  return (
    <section className="section px-4" id="skills">
      <motion.h2
        className="section__title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        Skills
      </motion.h2>

      <div className="max-w-[1250px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skillGroup, index) => (
          <motion.div
            key={skillGroup.title}
            className="panel p-6 flex flex-col"
            style={{ borderLeftWidth: '4px', borderLeftColor: CATEGORY_COLORS[index] }}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h4
              className="text-sm mb-5 pt-1 font-['JetBrains_Mono'] tracking-widest"
              style={{ color: CATEGORY_COLORS[index] }}
            >
              {skillGroup.title}
            </h4>
            <motion.ul
              className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {skillGroup.skills.map((skill) => {
                const Icon = skillIconMap[skill]
                return (
                  <motion.li key={skill} variants={itemVariants} className="flex">
                    <span className="btn btn--plain cursor-default flex flex-col items-center justify-center gap-3 w-full aspect-square p-3 border-[var(--clr-border)] hover:border-[var(--clr-primary)] hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300">
                      {Icon && <Icon className="w-8 h-8 brightness-190 drop-shadow-[0_0_8px_rgba(0,229,255,0.3)]" />}
                      <span className="text-center text-[13px] font-['JetBrains_Mono'] font-medium leading-tight break-words text-[var(--clr-fg-alt)]">
                        {skill}
                      </span>
                    </span>
                  </motion.li>
                )
              })}
            </motion.ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills
