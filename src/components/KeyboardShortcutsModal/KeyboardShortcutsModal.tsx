import { m, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KeyboardShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function KeyboardShortcutsModal({
  isOpen,
  onClose,
}: KeyboardShortcutsModalProps) {
  const shortcuts = [
    { key: '1', description: 'Jump to About' },
    { key: '2', description: 'Jump to Skills' },
    { key: '3', description: 'Jump to Experience' },
    { key: '4', description: 'Jump to Projects' },
    { key: '5', description: 'Jump to Contact' },
    { key: 'g', description: 'Scroll to top' },
    { key: '?', description: 'Toggle this help menu' },
    { key: 'Esc', description: 'Close this menu' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--clr-bg)] border-2 border-[var(--clr-border)] rounded-lg shadow-lg z-50 w-full max-w-sm mx-4 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[var(--clr-fg)]">
                Keyboard Shortcuts
              </h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-1 hover:bg-[var(--clr-border)] rounded transition-colors"
              >
                <X className="w-5 h-5 text-[var(--clr-fg-alt)]" />
              </button>
            </div>

            <div className="space-y-3">
              {shortcuts.map((shortcut) => (
                <div
                  key={shortcut.key}
                  className="flex items-center gap-4 py-2 border-b border-[var(--clr-border)] last:border-b-0"
                >
                  <kbd
                    className={cn(
                      'px-2.5 py-1.5 rounded font-mono text-sm font-semibold',
                      'bg-[var(--clr-border)] text-[var(--clr-fg)]',
                      'border border-[var(--clr-fg-alt)] min-w-12 text-center'
                    )}
                  >
                    {shortcut.key}
                  </kbd>
                  <span className="text-[var(--clr-fg-alt)] text-sm">
                    {shortcut.description}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-[var(--clr-fg-alt)] mt-6 text-center opacity-75">
              Press <kbd className="font-mono">?</kbd> anytime to open shortcuts
            </p>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}
