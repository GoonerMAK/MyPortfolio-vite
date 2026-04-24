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
    <div className="fixed bottom-8 right-16 bg-transparent hidden lg:block">
      <a href="#top" aria-label="Scroll to top">
        <ArrowUp className="w-8 h-8" />
      </a>
    </div>
  ) : null
}

export default ScrollToTop
