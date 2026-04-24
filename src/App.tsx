import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/theme'
import { HomePage } from './pages/HomePage'

const GamePage = lazy(() => import('./pages/GamePage'))

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--clr-primary)]"></div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/MyPortfolio">
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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
