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

export const DECISION_CATEGORIES = ['Architectural', 'Product', 'Technical', 'Workflow'] as const
export type DecisionCategory = (typeof DECISION_CATEGORIES)[number]

export interface HighlightItem {
  title: string
  detail: string
  category?: DecisionCategory
  skills?: string[]
  diagram?: FlowSpec
}

export type Tone = 'primary' | 'green' | 'red' | 'gold' | 'purple' | 'muted'

export interface FlowNode {
  id: string
  label: string
  col: number
  row: number
  tone?: Tone
}

export interface FlowEdge {
  from: string
  to: string
  label?: string
  tone?: Tone
  dashed?: boolean
  back?: boolean
}

export interface FlowGroup {
  label: string
  cols: [number, number]
  rows: [number, number]
  tone?: Tone
}

export interface FlowSpec {
  nodes: FlowNode[]
  edges: FlowEdge[]
  groups?: FlowGroup[]
  caption?: string
}

export interface MyStuffNote {
  term: string
  tldr: string
  section?: string
  why?: string
  diagram?: FlowSpec
  example?: string
  items?: { label: string; code?: string }[]
  analogy?: string
  rule?: string
}

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
