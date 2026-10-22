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
  /** Related skills per achievement (parallel to `achievements`).
   *  Names must match keys in `skillIconMap`. */
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
  /** Short concept name, rendered emphasised */
  term: string
  /** Plain-English explainer. Wrap inline code in backticks — the carousel
   *  renders `…` segments as styled <code> chips. */
  detail: string
  /** Groups notes under an in-card subsection tab. Notes sharing the same
   *  string render together; omitting it on every note in a topic keeps
   *  today's single ungrouped grid. */
  section?: string
}

/** One themed card in the "My Stuff" field-notes carousel */
export interface MyStuffTopic {
  /** Stable id — also used to wire up tab/tabpanel aria attributes */
  id: string
  /** Short label shown on the pill / tab */
  label: string
  /** Card headline */
  title: string
  /** One-line intro under the headline */
  blurb: string
  /** Lucide glyph representing the topic */
  icon: LucideIcon
  /** Accent colour (any valid CSS colour value, incl. CSS vars) */
  accent: string
  /** The concepts grouped under this topic */
  notes: MyStuffNote[]
  /** Related skills — names must match keys in `skillIconMap` */
  skills: string[]
}

export interface Skills {
  skills: string[]
  languages: string[]
  frameworks: string[]
  databases: string[]
  mlAi: string[]
}
