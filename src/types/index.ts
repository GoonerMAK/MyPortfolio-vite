import type { LucideIcon } from 'lucide-react'
import type { YearMonth } from '@/lib/date'

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
  start: YearMonth
  end?: YearMonth
  mode: string
  achievements: string[]
  highlights?: string[][]
  skills?: string[][]
}

export interface ExperienceCompany {
  name: string
  logo: string
  roles: ExperienceRole[]
}

export type DecisionCategory = 'Architectural' | 'Product' | 'Technical' | 'Workflow'

export interface HighlightItem {
  title: string
  detail: string
  category?: DecisionCategory
  skills?: string[]
}

/** A single concept inside a "My Stuff" topic card */
export interface MyStuffNote {
  term: string
  detail: string
  section?: string
}

/** One themed card in the "My Stuff" field-notes carousel */
export interface MyStuffTopic {
  id: string
  label: string
  title: string
  blurb: string
  icon: LucideIcon
  accent: string
  notes: MyStuffNote[]
  skills: string[]
}

export interface Skills {
  skills: string[]
  languages: string[]
  frameworks: string[]
  databases: string[]
  mlAi: string[]
}
