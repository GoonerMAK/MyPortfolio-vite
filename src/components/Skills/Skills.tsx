import { motion } from 'motion/react'
import { skills } from '@/data/portfolio'

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
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
}

export function Skills() {
  return (
    <section className="section skills px-4" id="skills">
      <motion.h2
        className="section__title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h2>

      {skills.map((skillGroup, index) => (
        <div key={skillGroup.title}>
          <motion.h4
            className="section__title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index === 0 ? 0.1 : 0 }}
          >
            {skillGroup.title}
          </motion.h4>
          <motion.ul
            className="max-w-[800px] w-[95%] mx-auto flex flex-wrap justify-center mb-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skillGroup.skills.map((skill) => (
              <motion.li key={skill} variants={itemVariants}>
                <span className="skills__list-item btn btn--plain m-2 inline-block">
                  {skill}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      ))}
    </section>
  )
}

export default Skills
