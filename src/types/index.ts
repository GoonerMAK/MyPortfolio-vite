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
  sourceCode: string
  livePreview?: string
  status?: 'active' | 'resolved' | 'archived'
}

export interface Contact {
  email: string
}

export interface Skills {
  skills: string[]
  languages: string[]
  frameworks: string[]
  databases: string[]
  mlAi: string[]
}
