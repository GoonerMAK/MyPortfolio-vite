import { Component, type ErrorInfo, type ReactNode } from 'react'
import { RotateCcw } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

/**
 * Catches render-time errors anywhere in the child tree so a single crashing
 * component degrades to a recoverable fallback instead of unmounting the whole
 * app. Must be a class component — React exposes the error lifecycle hooks
 * (getDerivedStateFromError / componentDidCatch) only to classes.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface for debugging; swap for a real error reporter (e.g. Sentry) later.
    console.error('Uncaught error in component tree:', error, info)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--clr-accent-red)] shadow-[0_0_8px_var(--clr-accent-red)] animate-pulse" />
          <span className="font-['JetBrains_Mono'] text-xs text-[var(--clr-accent-red)] uppercase tracking-widest">
            System Fault
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl">Something broke</h1>
        <p className="text-[var(--clr-fg)] max-w-sm text-base opacity-70">
          An unexpected error knocked out this view. A reload usually clears it.
        </p>

        <button
          type="button"
          onClick={this.handleReload}
          className="inline-flex items-center gap-2.5 text-sm uppercase tracking-wider text-[var(--clr-primary)] border border-[var(--clr-border)] px-7 py-3.5 rounded-lg hover:border-[var(--clr-primary)] transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reload
        </button>
      </div>
    )
  }
}

export default ErrorBoundary
