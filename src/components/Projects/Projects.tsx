import { motion, type Variants } from 'motion/react'
import { projects } from '@/data/portfolio'
import { ProjectContainer } from '../ProjectContainer/ProjectContainer'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
}

export function Projects() {
  if (!projects.length) return null

  return (
    <section id="projects" className="section px-4">
      <motion.h2
        className="section__title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.3 }}
      >
        Active Emergencies
      </motion.h2>

      <motion.div
        className="max-w-[1100px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {projects.map((project, index) => (
          <motion.div key={project.name || Math.random()} variants={itemVariants}>
            <ProjectContainer project={project} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Projects
