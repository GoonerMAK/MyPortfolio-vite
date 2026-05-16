import type { Header, About, Project, Contact } from '@/types'

export const header: Header = {
  homepage: '',
  title: 'Portfolio',
}

export const about: About = {
  name: 'Mashrur Ahsan',
  role: 'Software Engineer',
  description: `Your friendly neighborhood web developer👋, always up for a challenge and eager to practice the art of coding.
    Collaborate being my forte 🤝 - Always strive to interact with people, learn new things and create something awesome!
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
    skills: ['Claude', 'GitHub Copilot', 'Google Gemini', 'HuggingFace', 'Ollama']
  }
]

export const skills = skillsList

export const contact: Contact = {
  email: 'mash.ahsan81@gmail.com',
}
