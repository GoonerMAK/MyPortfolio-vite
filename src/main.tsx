import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, domAnimation } from 'motion/react'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <LazyMotion features={domAnimation} strict>
        <App />
      </LazyMotion>
    </ErrorBoundary>
  </StrictMode>,
)
