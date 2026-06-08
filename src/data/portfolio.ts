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
    name: 'InternConnect',
    description:
      'A user-friendly Web Application that would streamline the entire internship placement process of Islamic University of Technology',
    stack: ['JavaScript', 'Express.js', 'React', 'Node.js', 'MongoDB'],
    sourceCode: 'https://github.com/GoonerMAK/InternConnect/tree/main',
    livePreview: 'https://internconnect.netlify.app/',
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
    skills: ['Node.js', 'Express.js', 'GraphQL', 'Apollo-GraphQL', 'Zod', 'Stripe', 'Postman', 'JavaScript', 'TypeScript']
  },
  {
    title: 'Frontend Development',
    skills: ['React', 'Next.js', 'Redux', 'React Query', 'HTML', 'CSS3', 'JavaScript', 'TypeScript', 'Vite']
  },
  {
    title: 'Databases & ORMs',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Supabase', 'Prisma', 'Sequelize']
  },
  {
    title: 'UI Frameworks & Styling',
    skills: ['Tailwind CSS', 'shadcn/ui', 'Chakra UI', 'Material UI']
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
    totalTenure: '5 mos',
    roles: [
      {
        title: 'Backend Developer',
        type: 'Full-time',
        dateRange: 'Jan 2026 – Present',
        duration: '6 mos',
        mode: 'On-site',
        achievements: [
          'Drove end-to-end performance improvements — optimized database queries and introduced parallelization techniques, achieving ∼30% faster average API response times; implemented UI virtualization, reducing average render time by ∼150ms across data-heavy interfaces',
          'Built features utilizing 6+ AWS Lambda workers and AWS SNS/SQS pipelines to implement asynchronous background jobs, ensuring long-running operations ran in the background without slowing down the core API server',
          'Optimized the AI coding workflow across full-stack modules by integrating compressed agentic prompts and a codebase knowledge graph — scoping model context to relevant nodes rather than full file trees, achieving top-21% amongst developers for AI token efficiency',
          'Led the development of a helpdesk platform while concurrently contributing to backend systems for an HR management system and a CRM — all three being SaaS products',
          'Integrated AI-assisted coding tools into the development cycle, improving pre-QA smoke test coverage and reducing bug escalation rate to QA, achieving a 67% acceleration in overall feature delivery',
        ],
        highlights: [
          ['Drove end-to-end performance improvements', 'achieving ∼30% faster average API response times', 'reducing average render time by ∼150ms'],
          ['6+ AWS Lambda workers', 'asynchronous background jobs'],
          ['compressed agentic prompts', 'codebase knowledge graph', 'achieving top-21%'],
          ['SaaS products', 'Led the development'],
          ['improving pre-QA smoke test coverage', 'achieving a 67% acceleration'],
        ],
      },
    ],
  },
  {
    name: 'BinduLogic LLC',
    logo: binduLogicLogo,
    totalTenure: '1 yr 4 mos',
    roles: [
      {
        title: 'Junior Software Engineer',
        type: 'Full-time',
        dateRange: 'Dec 2024 – Sept 2025',
        duration: '10 mos',
        mode: 'Hybrid',
        achievements: [
          'Developed full-stack modules for a web application consisting of 25+ RESTful API endpoints and 10+ managed database schemas in PostgreSQL, using Express.js (Node.js) for backend services and Redux for state management',
          'Migrated legacy code from older versions of React and Material UI to the React/Tailwind/shadcn UI stack, contributing 54% of the migration efforts towards 88% of overall project completion',
          'Built 7+ responsive interfaces with React while writing optimized backend code, implementing lazy API fetching that improved Lighthouse Performance scores by an average of 12% across five modules',
        ],
        highlights: [
          ['25+ RESTful API endpoints', '10+ managed database schemas'],
          ['contributing 54%', 'towards 88% of overall project completion'],
          ['7+ responsive interfaces', 'improved Lighthouse Performance scores by an average of 12%'],
        ],
      },
      {
        title: 'Software Engineer Intern',
        type: 'Internship',
        dateRange: 'Jun 2024 – Nov 2024',
        duration: '6 mos',
        mode: 'On-site',
        achievements: [
          'Created a project expenditure app using React, TypeScript, Express, Prisma; ensured 80%+ test coverage through unit & integration testing using Jest, while enforcing runtime type safety with Zod',
          'Contributed to the development of a project module — implemented RTK Query, ensured proper state management, and maintained UI consistency, delivering 71% of the team\'s frontend output',
          'Actively collaborated with a five-person team on full-stack development and took on the role of team lead on a rotational basis',
        ],
        highlights: [
          ['ensured 80%+ test coverage', 'runtime type safety with Zod'],
          ['Contributed to the development', 'delivering 71% of the team\'s frontend output'],
          ['five-person team', 'team lead on a rotational basis'],
        ],
      },
    ],
  },
]

export const contact: Contact = {
  email: 'mash.ahsan81@gmail.com',
}
