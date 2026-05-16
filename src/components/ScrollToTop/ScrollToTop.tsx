import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () =>
      setIsVisible(window.scrollY > 500)

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return isVisible ? (
    <div className="fixed bottom-8 right-8 hidden lg:block">
      <a
        href="#top"
        aria-label="Scroll to top"
        className="flex items-center justify-center w-10 h-10 border-2 border-[var(--clr-primary)] text-[var(--clr-primary)] hover:bg-[var(--clr-primary)] hover:text-[var(--clr-bg)] transition-all duration-150"
        style={{ borderRadius: 'var(--radius)' }}
      >
        <ArrowUp className="w-5 h-5" />
      </a>
    </div>
  ) : null
}

export default ScrollToTop
