import type { Header, About, Project, Contact } from '@/types'

export const header: Header = {
  homepage: '',
  title: 'WELCOME!',
}

export const about: About = {
  name: 'Mashrur Ahsan',
  role: 'Software Engineer Student',
  description: `Your friendly neighborhood software student👋, always up for a challenge and eager to practice the art of coding.
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
  },
  {
    name: 'English Handwriting Recognition Project',
    description:
      'Machine Learning model that recognizes English characters from handwritings - Project includes canvas for real time prediction',
    stack: ['Python', 'Pandas', 'Tensorflow', 'Numpy', 'Scikit-learn'],
    sourceCode: 'https://github.com/GoonerMAK/Handwriting-Recognition',
    livePreview: 'https://hwr-ml-report-mashrurahsan.netlify.app/',
  },
  {
    name: 'Bongcloud - Chess Blog Site',
    description:
      'Chess blog website for chess enthusiasts - to explore, discuss opening strategies, unconventional tactics, and many more',
    stack: ['Express.js', 'Node.js', 'MongoDB', 'JavaScript'],
    sourceCode: 'https://github.com/GoonerMAK/SWE-4537-Server-Programming/tree/main/Project',
  },
  {
    name: 'Whispering Shadow',
    description:
      'A 2D pixel art action adventure game with fictional narrative- made with Unity and deployed on Itch.io',
    stack: ['Unity', 'C#'],
    sourceCode: 'https://github.com/GoonerMAK/Whispering-Shadow',
    livePreview: 'https://hwr-ml-report-mashrurahsan.netlify.app/',
  },
  {
    name: 'CO2 Emission Prediction Model',
    description:
      'Time series forecasting model that aims to address the critical issue of CO2 emissions and their impact on environment',
    stack: ['Python', 'Numpy', 'Pandas', 'Tensorflow'],
    sourceCode: 'https://github.com/GoonerMAK/CO2_Emissions_Prediction',
    livePreview: 'https://www.kaggle.com/code/shantamaria/co2-prediction-using-time-series-forecasting-lstm',
  },
  {
    name: 'Cosmic Dodge',
    description:
      'Dive into a symphony of sights, sounds, and survival. Unearth high scores in the depths of space where legends are born.',
    stack: ['Unity', 'C#'],
    sourceCode: 'https://github.com/GoonerMAK/BrackeysGameJam23',
    livePreview: 'https://m-a-k.itch.io/cosmic-dodge',
  },
]

export const skillsList = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Redux',
  'SASS',
  'Material UI',
  'Git',
  'CI/CD',
  'Jest',
  'Enzyme',
]

export const skills = skillsList

export const languages = [
  'JavaScript',
  'C',
  'C#',
  'Python',
  'JAVA',
  'C++',
  'PHP',
  'HTML',
  'CSS',
]

export const frameworks = [
  'React',
  'Unity',
  'Next JS',
  'Node JS',
  'Express',
  'Laravel',
]

export const databases = [
  'MongoDB',
  'MySQL',
  'Oracle',
]

export const mlAi = [
  'Keras',
  'Tensorflow',
  'Numpy',
  'Pandas',
  'Scikit-learn',
  'OpenCV',
]

export const contact: Contact = {
  email: 'mashrurahsan@iut-dhaka.edu',
}
