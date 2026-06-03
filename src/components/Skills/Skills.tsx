import { motion } from 'motion/react'
import { skills } from '@/data/portfolio'
import { skillIconMap } from '@/data/skillIcons'

const CATEGORY_COLORS = [
  'var(--clr-primary)',
  'var(--clr-accent-green)',
  'var(--clr-accent-gold)',
  'var(--clr-accent-red)',
  'var(--clr-accent-purple)',
  'var(--clr-primary)',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
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

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skillGroup, index) => (
          <motion.div
            key={skillGroup.title}
            className="panel p-5 flex flex-col"
            style={{ borderLeftWidth: '3px', borderLeftColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <h4
              className="text-xs mb-3 pt-1"
              style={{ color: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }}
            >
              {skillGroup.title}
            </h4>
            <motion.ul
              className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-1"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {skillGroup.skills.map((skill) => {
                const Icon = skillIconMap[skill]
                return (
                  <motion.li key={skill} variants={itemVariants} className="flex">
                    <span className="btn btn--plain flex flex-col items-center justify-center gap-2 w-full aspect-square p-2">
                      {Icon && <Icon className="w-6 h-6 text-[var(--clr-fg)]" />}
                      <span className="text-center text-[12px] leading-tight break-words">
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
