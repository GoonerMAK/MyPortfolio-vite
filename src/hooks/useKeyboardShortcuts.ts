import { useEffect, useState } from 'react'

const SECTION_KEYS: Record<string, string> = {
  '1': 'about',
  '2': 'skills',
  '3': 'experience',
  '4': 'projects',
  '5': 'contact',
}

export function useKeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.isContentEditable || ['INPUT', 'TEXTAREA'].includes(target.tagName)) return

      if (e.key === '?') {
        setShowHelp((prev) => !prev)
        return
      }
      if (e.key === 'Escape') {
        setShowHelp(false)
        return
      }
      if (e.key === 'g') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      const sectionId = SECTION_KEYS[e.key]
      if (sectionId) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return { showHelp, setShowHelp }
}
