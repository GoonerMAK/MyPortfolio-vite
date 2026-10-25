import { m } from 'motion/react'
import { ExternalLink, Github } from 'lucide-react'
import { skillIconMap, skillColorMap } from '@/data/skillIcons'
import { clr, iconColor, tint } from '@/lib/colors'
import type { Project } from '@/types'

const PRIORITY_COLORS = [
  clr.primary,
  clr.red,
  clr.green,
  clr.gold,
  clr.purple,
  clr.primary,
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
    <m.div
      className="panel relative flex flex-col h-full min-h-[400px]"
      style={{ borderLeftWidth: '4px', borderLeftColor: borderColor }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 0 20px ${tint(borderColor, 13)}`,
        transition: { duration: 0.15 },
      }}
    >
      <div className="p-8 pt-6 flex flex-col h-full">
        {/* Header row: incident number + status */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="font-['M_PLUS_Rounded_1c'] text-xs tracking-wider"
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
        <p className="text-base text-fg leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech stack tags (icon + label) */}
        {project.stack && (
          <ul className="flex flex-wrap gap-2 mb-5">
            {project.stack.map((item) => {
              const Icon = skillIconMap[item]
              const brandColor = skillColorMap[item]
              return (
                <li key={item}>
                  <span
                    className="btn btn--plain cursor-default inline-flex items-center gap-2 group !py-1.5 !px-2.5"
                    style={iconColor(brandColor)}
                  >
                    {Icon && (
                      <Icon className="w-4 h-4 transition-all duration-300 skill-icon" />
                    )}
                    <span className="text-[12px] font-['M_PLUS_Rounded_1c'] text-fg-alt leading-none">
                      {item}
                    </span>
                  </span>
                </li>
              )
            })}
          </ul>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          {project.sourceCode && (
            <m.a
              href={project.sourceCode}
              aria-label={`${project.name} source code`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-fg hover:text-primary focus-visible:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-150"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github className="w-4 h-4" />
              Source
            </m.a>
          )}

          {project.livePreview && (
            <m.a
              href={project.livePreview}
              aria-label={`${project.name} live preview`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-fg hover:text-accent-green focus-visible:text-accent-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green transition-colors duration-150"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.97 }}
            >
              <ExternalLink className="w-4 h-4" />
              Live Deploy
            </m.a>
          )}
        </div>
      </div>
    </m.div>
  )
}

export default ProjectContainer
