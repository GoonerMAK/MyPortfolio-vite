import type { LucideIcon } from 'lucide-react'

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

/** A single concept inside a "My Stuff" topic card */
export interface MyStuffNote {
  /** Short concept name, rendered emphasised */
  term: string
  /** Plain-English explainer. Wrap inline code in backticks — the carousel
   *  renders `…` segments as styled <code> chips. */
  detail: string
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
