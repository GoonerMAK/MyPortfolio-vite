import { motion } from 'motion/react'
import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/types'

const PRIORITY_COLORS = [
  'var(--clr-primary)',
  'var(--clr-accent-red)',
  'var(--clr-accent-green)',
  'var(--clr-accent-gold)',
  'var(--clr-accent-purple)',
  'var(--clr-primary)',
]

function getStatusBadge(status?: string) {
  switch (status) {
    case 'active':
      return { label: 'In Progress', className: 'badge badge--active' }
    case 'resolved':
      return { label: 'Deployed', className: 'badge badge--resolved' }
    case 'archived':
      return { label: 'Archived', className: 'badge badge--archived' }
    default:
      return { label: 'Active', className: 'badge badge--active' }
  }
}

interface ProjectContainerProps {
  project: Project
  index: number
}

export function ProjectContainer({ project, index }: ProjectContainerProps) {
  const borderColor = PRIORITY_COLORS[index % PRIORITY_COLORS.length]
  const incidentNum = String(index + 1).padStart(3, '0')
  const status = getStatusBadge(project.status)

  return (
    <motion.div
      className="panel relative flex flex-col h-full"
      style={{ borderLeftWidth: '4px', borderLeftColor: borderColor }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 0 20px ${borderColor}22`,
        transition: { duration: 0.15 },
      }}
    >
      <div className="p-6 pt-5 flex flex-col h-full">
        {/* Header row: incident number + status */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="font-['JetBrains_Mono'] text-xs tracking-wider"
            style={{ color: borderColor }}
          >
            #{incidentNum}
          </span>
          <span className={status.className}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {status.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg mb-2" style={{ fontSize: '1.2rem' }}>
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--clr-fg)] leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech stack tags */}
        {project.stack && (
          <ul className="flex flex-wrap gap-2 mb-5">
            {project.stack.map((item) => (
              <li key={item}>
                <span className="btn btn--plain">{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-3 pt-2 border-t border-[var(--clr-border)]">
          {project.sourceCode && (
            <motion.a
              href={project.sourceCode}
              aria-label="source code"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--clr-fg)] hover:text-[var(--clr-primary)] transition-colors duration-150"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github className="w-4 h-4" />
              Source
            </motion.a>
          )}

          {project.livePreview && (
            <motion.a
              href={project.livePreview}
              aria-label="live preview"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--clr-fg)] hover:text-[var(--clr-accent-green)] transition-colors duration-150"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.97 }}
            >
              <ExternalLink className="w-4 h-4" />
              Live Deploy
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectContainer
