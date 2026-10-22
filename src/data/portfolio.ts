import type { Header, About, Project, Contact, ExperienceCompany } from '@/types'
import gainSolutionsLogo from '@/assets/gain-solutions-logo.svg'
import binduLogicLogo from '@/assets/bindulogic-logo.svg'

export const header: Header = {
  homepage: '',
  title: 'Portfolio',
}

export const about: About = {
  name: 'Mashrur Ahsan',
  role: 'Software Engineer',
  description: `Your friendly neighborhood web developer👋, always up for a challenge and eager to practice the art of coding.
    Collaboration being my forte 🤝 - Always strive to interact with people, learn new things and create something awesome!
    Bit of a gaming enthusiast 🎮 and a lifeling Arsenal fan  #COYG`,
  social: {
    linkedin: 'https://www.linkedin.com/in/mak-/',
    github: 'https://github.com/GoonerMAK',
  },
}

export const projects: Project[] = [
  {
    name: 'EasyDesk',
    description:
      'Customer support platform that integrates AI-powered agents, ticketing automation, and team collaboration into a single workspace  so support teams can reduce manual work, reply faster and handle more customer conversations with less pressure.',
    stack: ['Node.js', 'Express.js', 'PostgreSQL', 'Next.js', 'JavaScript'],
    livePreview: 'https://easydesk.app/',
    status: 'active',
  },
  {
    name: 'InternConnect',
    description:
      'A user-friendly Web Application that would streamline the entire internship placement process of a university - from application to onboarding, providing a seamless experience for students, employers, and the university administration.',
    stack: ['JavaScript', 'Express.js', 'React', 'Node.js', 'MongoDB'],
    sourceCode: 'https://github.com/GoonerMAK/InternConnect/tree/main',
    livePreview: 'https://internconnect.netlify.app/',
    status: 'resolved',
  },
  {
    name: 'CoGraph',
    description:
      'VS code extension that renders your project as a live call graph inside VS Code — updating in real-time as AI agents rewrite your codebase. Making the invisible visible.',
    stack: ['Node.js', 'TypeScript', 'Python', 'HTML & CSS', 'JavaScript'],
    sourceCode: 'https://github.com/thraenbe/cograph',
    livePreview: 'https://www.cograph.co/',
    status: 'resolved',
  },
  {
    name: 'English Handwriting Recognition Project',
    description:
      'Machine Learning model that recognizes English characters from handwritings - Project includes canvas for real time prediction',
    stack: ['Python', 'Pandas', 'Tensorflow', 'Numpy', 'Scikit-learn'],
    sourceCode: 'https://github.com/GoonerMAK/Handwriting-Recognition',
    livePreview: 'https://hwr-ml-report-mashrurahsan.netlify.app/',
    status: 'resolved',
  },
  {
    name: 'Bongcloud - Chess Blog Site',
    description:
      'Chess blog website for chess enthusiasts - to explore, discuss opening strategies, unconventional tactics, and many more',
    stack: ['Express.js', 'Node.js', 'MongoDB', 'JavaScript'],
    sourceCode: 'https://github.com/GoonerMAK/SWE-4537-Server-Programming/tree/main/Project',
    status: 'active',
  },
  {
    name: 'Whispering Shadow',
    description:
      'A 2D pixel art action adventure game with fictional narrative- made with Unity and deployed on Itch.io',
    stack: ['Unity', 'C#'],
    sourceCode: 'https://github.com/GoonerMAK/Whispering-Shadow',
    livePreview: 'https://m-a-k.itch.io/whispering-shadow',
    status: 'resolved',
  },
  {
    name: 'CO2 Emission Prediction Model',
    description:
      'Time series forecasting model that aims to address the critical issue of CO2 emissions and their impact on environment',
    stack: ['Python', 'Numpy', 'Pandas', 'Tensorflow'],
    sourceCode: 'https://github.com/GoonerMAK/CO2_Emissions_Prediction',
    livePreview: 'https://www.kaggle.com/code/shantamaria/co2-prediction-using-time-series-forecasting-lstm',
    status: 'archived',
  },
  {
    name: 'Cosmic Dodge',
    description:
      'Dive into a symphony of sights, sounds, and survival. Unearth high scores in the depths of space where legends are born.',
    stack: ['Unity', 'C#'],
    sourceCode: 'https://github.com/GoonerMAK/BrackeysGameJam23',
    livePreview: 'https://m-a-k.itch.io/cosmic-dodge',
    status: 'active',
  },
]

export const skillsList = [
  {
    title: 'Backend Development',
    skills: ['Node.js', 'Express.js', 'GraphQL', 'Apollo-GraphQL', 'REST APIs', 'Microservices', 'Zod', 'Stripe', 'JWT', 'Postman', 'JavaScript', 'TypeScript', 'Python']
  },
  {
    title: 'Frontend Development',
    skills: ['React', 'Next.js', 'Redux', 'React Query', 'HTML', 'CSS3', 'JavaScript', 'TypeScript', 'Vite']
  },
  {
    title: 'Databases & ORMs',
    skills: ['PostgreSQL', 'pgvector', 'MongoDB', 'MySQL', 'Redis', 'Supabase', 'Prisma', 'Sequelize', 'Mongoose']
  },
  {
    title: 'UI Frameworks & Styling',
    skills: ['Tailwind CSS', 'shadcn/ui', 'Chakra UI', 'Material UI']
  },
  {
    title: 'Testing & Debugging',
    skills: ['Jest', 'Playwright', 'Chrome DevTools']
  },
  {
    title: 'DevOps, Cloud & Deployment',
    skills: ['Git', 'GitHub Actions', 'Docker', 'AWS', 'Vercel', 'Netlify', 'Render']
  },
  {
    title: 'AI / LLM',
    skills: ['Claude Code', 'LangChain', 'Google Gemini', 'AWS Bedrock', 'MCP', 'RAG & Embeddings', 'GitHub Copilot', 'Ollama']
  }
]

export const skills = skillsList

export const experience: ExperienceCompany[] = [
  {
    name: 'Gain Solutions',
    logo: gainSolutionsLogo,
    roles: [
      {
        title: 'Backend Developer',
        type: 'Full-time',
        start: '2026-01',
        mode: 'On-site',
        achievements: [
          'Led AI-augmented development of the customer support side of a unified helpdesk and Customer Relationship Management (CRM) SaaS, owning feature delivery for both its helpdesk and CRM modules from requirements to release',
          'Developed a RAG knowledge capture system that turned resolved customer conversations across 3+ helpdesk modules into chatbot answers, using Gemini structured output (LangChain & Zod) for PII-free extraction, pgvector embeddings, and an LLM contradiction check that holds conflicting answers for human review',
          'Integrated a two stage (local + deployed) pre-QA verification process into an AI-native workflow built on an agentic harness, using Jest unit tests, API tests, DB query checks and Playwright E2E tests, plus structured logging and AWS CloudWatch monitoring, which sped up debugging and reduced post-QA bugs',
          'Improved the performance of data-heavy interfaces by combining Next.js list virtualization, lazy loading and debounced GraphQL queries with parallelized, memory-light PostgreSQL reads in Node.js, which reduced server RAM load and lowered render time by 150ms on average',
          'Adopted a multi-agent AI workflow with planning, developer, QA & adversarial reviewer agents, merging 4+ PRs a day',
          'Built features on a microservice architecture utilizing 6+ AWS Lambda workers and event-driven AWS SQS pipelines that ran background operations (billing, email events, automated workflows) without slowing down the core API server',
          'Re-engineered Stripe subscription billing for two SaaS products from tiered plans to flat-rate per-seat pricing, with prorated mid-cycle upgrades and scheduled downgrades, allowing revenue to scale as teams grow',
          'Extended role based access control (RBAC) in a multi-tenant SaaS with 2+ new roles & GraphQL authorization checks',
        ],
        highlights: [
          ['Led AI-augmented development', 'unified helpdesk and Customer Relationship Management (CRM) SaaS', 'from requirements to release'],
          ['RAG knowledge capture system', '3+ helpdesk modules', 'PII-free extraction', 'LLM contradiction check'],
          ['two stage (local + deployed) pre-QA verification process', 'agentic harness', 'reduced post-QA bugs'],
          ['parallelized, memory-light PostgreSQL reads', 'reduced server RAM load', 'lowered render time by 150ms on average'],
          ['multi-agent AI workflow', 'merging 4+ PRs a day'],
          ['microservice architecture', '6+ AWS Lambda workers', 'event-driven AWS SQS pipelines'],
          ['Re-engineered Stripe subscription billing', 'flat-rate per-seat pricing', 'allowing revenue to scale as teams grow'],
          ['role based access control (RBAC)', 'multi-tenant SaaS', '2+ new roles'],
        ],
        skills: [
          ['Node.js', 'PostgreSQL', 'GraphQL', 'Next.js', 'Sequelize'],
          ['LangChain', 'Google Gemini', 'Zod', 'pgvector', 'RAG & Embeddings'],
          ['Jest', 'Playwright', 'AWS', 'Claude Code'],
          ['Next.js', 'React', 'GraphQL', 'PostgreSQL', 'Node.js'],
          ['Claude Code', 'MCP', 'Git'],
          ['AWS', 'Microservices', 'Node.js', 'Express.js'],
          ['Stripe', 'Node.js', 'PostgreSQL'],
          ['GraphQL', 'Apollo-GraphQL', 'Node.js', 'PostgreSQL'],
        ],
      },
    ],
  },
  {
    name: 'BinduLogic LLC',
    logo: binduLogicLogo,
    roles: [
      {
        title: 'Junior Software Engineer',
        type: 'Full-time',
        start: '2024-12',
        end: '2025-09',
        mode: 'Hybrid',
        achievements: [
          'Developed full-stack modules for a Hospital Management Information System (HMIS) covering supply, consumption, stock, distribution — using React, TypeScript, Redux Toolkit, Express (Node.js) & PostgreSQL, spanning 60+ RESTful endpoints and 25+ Prisma models indexed for faster queries',
          'Designed reusable base React components for the HMIS, adopted across 10+ responsive user interfaces, which reduced code duplication and development effort for future modules',
          'Built 7+ stock movement flows (e.g. transfers, adjustments, distributions) with multi-level approvals, atomic transactions, and the system’s audit trail and Datadog monitoring, giving hospitals a reliable record of who moved what, where, and when',
        ],
        highlights: [
          ['Hospital Management Information System (HMIS)', '60+ RESTful endpoints', '25+ Prisma models'],
          ['reusable base React components', '10+ responsive user interfaces'],
          ['7+ stock movement flows', 'multi-level approvals', 'atomic transactions', 'who moved what, where, and when'],
        ],
        skills: [
          ['React', 'TypeScript', 'Redux', 'Express.js', 'PostgreSQL', 'Prisma'],
          ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
          ['Node.js', 'Prisma', 'PostgreSQL', 'Datadog'],
        ],
      },
      {
        title: 'Software Engineer Intern',
        type: 'Internship',
        start: '2024-06',
        end: '2024-11',
        mode: 'On-site',
        achievements: [
          'Implemented an inventory dashboard and product catalog for a Hospital Management Information System (HMIS) with React, TypeScript, shadcn/ui and RTK Query, and Zod-validated RESTful APIs serving 30K+ medicine brands across 200+ manufacturers with live stock quantities',
          'Collaborated as part of a four-person intern team on product features, broke down assigned work into actionable tickets and coordinated delivery through regular syncs and reviews on a rotational basis',
        ],
        highlights: [
          ['inventory dashboard and product catalog', '30K+ medicine brands', '200+ manufacturers'],
          ['four-person intern team', 'on a rotational basis'],
        ],
        skills: [
          ['React', 'TypeScript', 'shadcn/ui', 'Redux', 'Zod', 'Express.js'],
          ['Git'],
        ],
      },
    ],
  },
]

export const contact: Contact = {
  email: 'mash.ahsan81@gmail.com',
}
