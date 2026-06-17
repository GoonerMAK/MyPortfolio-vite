export interface Header {
  homepage: string
  title: string
}

export interface About {
  name: string
  role: string
  description: string
  resume?: string
  social: {
    linkedin: string
    github: string
  }
}

export interface Project {
  name: string
  description: string
  stack: string[]
  sourceCode?: string
  livePreview?: string
  status?: 'active' | 'resolved' | 'archived'
}

export interface Contact {
  email: string
}

export interface ExperienceRole {
  title: string
  type: string
  dateRange: string
  duration: string
  mode: string
  achievements: string[]
  highlights?: string[][]
}

export interface ExperienceCompany {
  name: string
  logo: string
  totalTenure: string
  roles: ExperienceRole[]
}

export interface DeepDiveItem {
  /** Expanded write-up of a single piece of work done */
  detail: string
  /** Related skills — names must match entries in `skillsList` for badge consistency */
  skills: string[]
}

export interface DeepDiveRole {
  company: string
  title: string
  dateRange: string
  /** High-level summary of the role's scope */
  overview: string
  items: DeepDiveItem[]
}

export interface Skills {
  skills: string[]
  languages: string[]
  frameworks: string[]
  databases: string[]
  mlAi: string[]
}
