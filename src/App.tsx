import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/theme'
import { HomePage } from './pages/HomePage'

const GamePage = lazy(() => import('./pages/GamePage'))
const DeepDivePage = lazy(() => import('./pages/DeepDivePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[var(--clr-border)] border-t-[var(--clr-primary)]"></div>
        <span className="font-['JetBrains_Mono'] text-xs text-[var(--clr-fg)] uppercase tracking-widest">
          Connecting...
        </span>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/game"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <GamePage />
              </Suspense>
            }
          />
          <Route
            path="/deepdive"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <DeepDivePage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
