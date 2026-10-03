import type { Header, About, Project, Contact, ExperienceCompany, DeepDiveRole } from '@/types'
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
    status: 'resolved',
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
    skills: ['Node.js', 'Express.js', 'GraphQL', 'Apollo-GraphQL', 'Zod', 'Stripe', 'JWT', 'Postman', 'JavaScript', 'TypeScript']
  },
  {
    title: 'Frontend Development',
    skills: ['React', 'Next.js', 'Redux', 'React Query', 'HTML', 'CSS3', 'JavaScript', 'TypeScript', 'Vite']
  },
  {
    title: 'Databases & ORMs',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Supabase', 'Prisma', 'Sequelize', 'Mongoose']
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
    title: 'Agentic Tools',
    skills: ['Claude', 'GitHub Copilot', 'Google Gemini', 'Ollama']
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
          'Built features on a microservice architecture utilizing 6+ AWS Lambda workers and event-driven AWS SQS pipelines that ran background operations (billing, email events, automated workflows) without slowing down the core API server',
          'Led the development of the customer support platform for a unified helpdesk and Customer Relationship Management (CRM) SaaS, with contributions across the CRM side of the product',
          'Improved the performance of data-heavy interfaces by combining Next.js list virtualization, lazy loading and debounced GraphQL queries with parallelized, memory-light PostgreSQL reads in Node.js, which reduced server RAM load and lowered render time by 150ms on average',
          'Extended role based access control (RBAC) in a multi-tenant SaaS with 2+ new roles & GraphQL authorization checks',
          'Integrated a two stage (local + deployed) pre-QA verification process into an AI-assisted development workflow using Jest unit tests, API tests, DB query checks and Playwright E2E tests, plus structured logging and AWS CloudWatch monitoring, which sped up debugging and reduced QA-reported bugs',
          'Re-engineered Stripe subscription billing for two SaaS products from tiered plans to flat-rate per-seat pricing, with prorated mid-cycle upgrades and scheduled downgrades',
        ],
        highlights: [
          ['microservice architecture', '6+ AWS Lambda workers', 'event-driven AWS SQS pipelines'],
          ['Led the development', 'unified helpdesk and Customer Relationship Management (CRM) SaaS'],
          ['parallelized, memory-light PostgreSQL reads', 'reduced server RAM load', 'lowered render time by 150ms on average'],
          ['role based access control (RBAC)', 'multi-tenant SaaS', '2+ new roles'],
          ['two stage (local + deployed) pre-QA verification process', 'reduced QA-reported bugs'],
          ['Re-engineered Stripe subscription billing', 'flat-rate per-seat pricing', 'prorated mid-cycle upgrades'],
        ],
        skills: [
          ['AWS', 'Node.js', 'Express.js'],
          ['Node.js', 'PostgreSQL', 'GraphQL', 'Next.js', 'Sequelize'],
          ['Next.js', 'React', 'GraphQL', 'PostgreSQL', 'Node.js'],
          ['GraphQL', 'Apollo-GraphQL', 'Node.js', 'PostgreSQL'],
          ['Jest', 'Playwright', 'AWS', 'Claude'],
          ['Stripe', 'Node.js', 'PostgreSQL'],
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
          'Built 7+ stock movement flows (e.g. transfers, adjustments, distributions) ensuring atomicity and integrated them with the system’s audit trail and Datadog monitoring',
        ],
        highlights: [
          ['Hospital Management Information System (HMIS)', '60+ RESTful endpoints', '25+ Prisma models'],
          ['reusable base React components', '10+ responsive user interfaces'],
          ['7+ stock movement flows', 'ensuring atomicity', 'Datadog monitoring'],
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

export const deepDive: DeepDiveRole[] = [
  {
    company: 'Gain Solutions',
    title: 'Backend Developer',
    dateRange: 'Jan 2026 – Present',
    overview:
      'Backend-focused role on a unified helpdesk and CRM SaaS — leading the customer support platform while contributing across the CRM side. Work spans event-driven background processing, performance, access control, billing, and a tighter pre-QA loop around AI-assisted development.',
    items: [
      {
        detail:
          'Built features on a microservice architecture with 6+ AWS Lambda workers fed by event-driven SQS pipelines, moving billing, email events and automated workflows off the request path so the core API server stayed responsive.',
        skills: ['AWS', 'Node.js'],
      },
      {
        detail:
          'Tuned data-heavy interfaces end to end: Next.js list virtualization, lazy loading and debounced GraphQL queries on the client, paired with parallelized, memory-light PostgreSQL reads in Node.js. Cut server RAM load and lowered average render time by 150ms.',
        skills: ['Next.js', 'GraphQL', 'PostgreSQL', 'Node.js'],
      },
      {
        detail:
          'Extended RBAC in the multi-tenant product with 2+ new roles and GraphQL authorization checks, and re-engineered Stripe subscription billing for two SaaS products from tiered plans to flat-rate per-seat pricing with prorated mid-cycle upgrades and scheduled downgrades.',
        skills: ['GraphQL', 'Stripe', 'Node.js'],
      },
      {
        detail:
          'Added a two-stage (local + deployed) pre-QA verification process to the AI-assisted workflow — Jest unit tests, API tests, DB query checks and Playwright E2E tests, backed by structured logging and AWS CloudWatch — which sped up debugging and reduced QA-reported bugs.',
        skills: ['Jest', 'Playwright', 'AWS', 'Claude'],
      },
    ],
  },
  {
    company: 'BinduLogic LLC',
    title: 'Junior Software Engineer',
    dateRange: 'Dec 2024 – Sept 2025',
    overview:
      'Full-stack delivery on a Hospital Management Information System (HMIS) — supply, consumption, stock and distribution modules, owned from schema to UI.',
    items: [
      {
        detail:
          'Developed full-stack HMIS modules with React, TypeScript, Redux Toolkit, Express and PostgreSQL — 60+ RESTful endpoints and 25+ Prisma models, indexed for faster queries.',
        skills: ['React', 'TypeScript', 'Express.js', 'PostgreSQL', 'Prisma'],
      },
      {
        detail:
          'Designed reusable base React components adopted across 10+ responsive interfaces, cutting duplication and speeding up development of later modules.',
        skills: ['React', 'Tailwind CSS', 'shadcn/ui'],
      },
      {
        detail:
          'Built 7+ atomic stock movement flows (transfers, adjustments, distributions) wired into the system’s audit trail and Datadog monitoring.',
        skills: ['Node.js', 'Prisma', 'Datadog'],
      },
    ],
  },
  {
    company: 'BinduLogic LLC',
    title: 'Software Engineer Intern',
    dateRange: 'Jun 2024 – Nov 2024',
    overview:
      'Internship on a four-person team building HMIS inventory features, with rotating ownership of planning and delivery.',
    items: [
      {
        detail:
          'Implemented an inventory dashboard and product catalog with React, TypeScript, shadcn/ui and RTK Query, backed by Zod-validated RESTful APIs serving 30K+ medicine brands across 200+ manufacturers with live stock quantities.',
        skills: ['React', 'TypeScript', 'Redux', 'Zod'],
      },
      {
        detail:
          'Broke assigned work into actionable tickets and coordinated delivery through regular syncs and reviews, taking ownership on a rotational basis.',
        skills: ['Git'],
      },
    ],
  },
]

export const contact: Contact = {
  email: 'mash.ahsan81@gmail.com',
}
