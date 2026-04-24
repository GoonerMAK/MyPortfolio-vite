import { motion, type Variants } from 'motion/react'
import { projects } from '@/data/portfolio'
import { ProjectContainer } from '../ProjectContainer/ProjectContainer'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
}

export function Projects() {
  if (!projects.length) return null

  return (
    <section id="projects" className="section projects px-4">
      <motion.h2
        className="section__title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h2>

      <motion.div
        className="max-w-[1100px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {projects.map((project) => (
          <motion.div key={crypto.randomUUID()} variants={itemVariants}>
            <ProjectContainer project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Projects
