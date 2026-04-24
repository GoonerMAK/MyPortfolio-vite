import { motion } from 'motion/react'
import { languages, frameworks, databases, mlAi } from '@/data/portfolio'

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
      
      <motion.h4
        className="section__title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Languages
      </motion.h4>
      <motion.ul
        className="max-w-[450px] w-[95%] mx-auto flex flex-wrap justify-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {languages.map((language) => (
          <motion.li key={crypto.randomUUID()} variants={itemVariants}>
            <span className="skills__list-item btn btn--plain m-2 inline-block">
              {language}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      <br /><br />

      <motion.h4
        className="section__title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Frameworks &amp; Libraries
      </motion.h4>
      <motion.ul
        className="max-w-[450px] w-[95%] mx-auto flex flex-wrap justify-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {frameworks.map((framework) => (
          <motion.li key={crypto.randomUUID()} variants={itemVariants}>
            <span className="skills__list-item btn btn--plain m-2 inline-block">
              {framework}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      <br /><br />

      <motion.h4
        className="section__title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Databases
      </motion.h4>
      <motion.ul
        className="max-w-[450px] w-[95%] mx-auto flex flex-wrap justify-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {databases.map((database) => (
          <motion.li key={crypto.randomUUID()} variants={itemVariants}>
            <span className="skills__list-item btn btn--plain m-2 inline-block">
              {database}
            </span>
          </motion.li>
        ))}
      </motion.ul>
      
      <br /><br />

      <motion.h4
        className="section__title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Machine Learning &amp; AI
      </motion.h4>
      <motion.ul
        className="max-w-[450px] w-[95%] mx-auto flex flex-wrap justify-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {mlAi.map((ml) => (
          <motion.li key={crypto.randomUUID()} variants={itemVariants}>
            <span className="skills__list-item btn btn--plain m-2 inline-block">
              {ml}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}

export default Skills
