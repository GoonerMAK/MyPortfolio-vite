import { useState, useRef, useEffect } from 'react'
import { m, type Variants } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { projects } from '@/data/portfolio'
import { ProjectContainer } from '../ProjectContainer/ProjectContainer'

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: {
      duration: 0.4,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
}

// Carousel: Displays a list of projects in a responsive carousel with navigation arrows and dot indicators.
export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [isPaused, setIsPaused] = useState(false)
  const [autoplayKey, setAutoplayKey] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Resize effect: update the number of items per view based on container width
  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        const width = scrollRef.current.clientWidth
         // Card: 500px width + 24px gap = 524px per item
         if (width < 768) setItemsPerView(1)
         else if (width < 1280) setItemsPerView(2)
        else setItemsPerView(2) // Max 2 cards for 500px width
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate the number of visible dots (for pagination) based on total items and items per view
  const visibleDotCount = projects.length - itemsPerView + 1

  // Autoplay effect: automatically advance the carousel every 8 seconds
  useEffect(() => {
    if (isPaused || !projects.length) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev >= visibleDotCount - 1 ? 0 : prev + 1

        const container = scrollRef.current
        if (container) {
          const cardWidth = container.querySelector('.panel')?.clientWidth || 320
          const gap = 24
          
          if (next === 0) {
            // Wrap to start - scroll to beginning
            container.scrollTo({ left: 0, behavior: 'smooth' })
          } else {
            container.scrollTo({
              left: next * (cardWidth + gap),
              behavior: 'smooth',
            })
          }
        }

        return next
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [isPaused, visibleDotCount, autoplayKey])

  if (!projects.length) return null

  const scrollTo = (direction: 'left' | 'right') => {

    setAutoplayKey((prev) => prev + 1)      // Reset autoplay key to restart the interval

    const container = scrollRef.current
    if (!container) return

    const cardWidth = container.querySelector('.panel')?.clientWidth || 320
    const gap = 24
    const scrollAmount = cardWidth + gap
    const maxScroll = container.scrollWidth - container.clientWidth

    if (direction === 'right') {
      if (currentIndex >= visibleDotCount - 1) {
        // Wrap to start
        container.scrollTo({ left: 0, behavior: 'smooth' })
        setCurrentIndex(0)
      } else {
        const targetIndex = currentIndex + 1
        const newScroll = Math.min(targetIndex * scrollAmount, maxScroll)
        container.scrollTo({ left: newScroll, behavior: 'smooth' })
        setCurrentIndex(targetIndex)
      }
    } else {
      if (currentIndex <= 0) {
        // Wrap to end
        container.scrollTo({ left: maxScroll, behavior: 'smooth' })
        setCurrentIndex(visibleDotCount - 1)
      } else {
        const targetIndex = currentIndex - 1
        const newScroll = Math.max(targetIndex * scrollAmount, 0)
        container.scrollTo({ left: newScroll, behavior: 'smooth' })
        setCurrentIndex(targetIndex)
      }
    }
  }

  return (
    <section id="projects" className="section px-4">
      <m.h2
        className="section__title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </m.h2>

      <div className="max-w-[1250px] mx-auto relative">
        {/* Navigation arrows */}
        {visibleDotCount > 1 && (
          <>
            <button
              onClick={() => scrollTo('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--clr-bg-alt)] border border-[var(--clr-border)] text-[var(--clr-fg)] hover:border-[var(--clr-primary)] hover:text-[var(--clr-primary)] transition-colors cursor-pointer"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollTo('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--clr-bg-alt)] border border-[var(--clr-border)] text-[var(--clr-fg)] hover:border-[var(--clr-primary)] hover:text-[var(--clr-primary)] transition-colors cursor-pointer"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Carousel container */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onMouseDown={() => setAutoplayKey((prev) => prev + 1)}
          onTouchStart={() => setAutoplayKey((prev) => prev + 1)}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          onScroll={(e) => {
            const container = e.currentTarget
            const cardWidth = container.querySelector('.panel')?.clientWidth || 320
            const gap = 24
            const scrollAmount = cardWidth + gap
            const index = Math.round(container.scrollLeft / scrollAmount)
            setCurrentIndex(Math.min(Math.max(0, index), visibleDotCount - 1))
          }}
          style={{ scrollBehavior: 'smooth' }}
        >
          {projects.map((project, index) => (
            <m.div
              key={project.name || index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-shrink-0 w-[400px] sm:w-[500px] snap-center"
            >
              <ProjectContainer project={project} index={index} />
            </m.div>
          ))}
        </div>

        {/* Dots indicator */}
        {visibleDotCount > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: visibleDotCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setAutoplayKey((prev) => prev + 1)
                const container = scrollRef.current
                if (container) {
                  const cardWidth = container.querySelector('.panel')?.clientWidth || 320
                  const gap = 24
                  container.scrollTo({
                    left: index * (cardWidth + gap),
                    behavior: 'smooth',
                  })
                  setCurrentIndex(index)
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                index === currentIndex
                  ? 'bg-[var(--clr-primary)] w-6'
                  : 'bg-[var(--clr-border)] hover:bg-[var(--clr-fg-alt)]'
              }`}
              aria-label={`Go to project ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
            />
          ))}
        </div>
        )}
      </div>
    </section>
  )
}

export default Projects
