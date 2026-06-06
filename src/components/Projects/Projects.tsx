import { useState, useRef, useEffect } from 'react'
import { motion, type Variants } from 'motion/react'
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

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [isPaused, setIsPaused] = useState(false)
  const [autoplayKey, setAutoplayKey] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        const width = scrollRef.current.clientWidth
        if (width < 640) setItemsPerView(1)
        else if (width < 1024) setItemsPerView(2)
        else setItemsPerView(3)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const visibleDotCount = projects.length - itemsPerView + 1

  useEffect(() => {
    if (isPaused || !projects.length) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev >= visibleDotCount - 1 ? 0 : prev + 1

        const container = scrollRef.current
        if (container) {
          const cardWidth = container.querySelector('.panel')?.clientWidth || 320
          const gap = 24
          container.scrollTo({
            left: next * (cardWidth + gap),
            behavior: 'smooth',
          })
        }

        return next
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isPaused, visibleDotCount, autoplayKey])

  if (!projects.length) return null

  const scrollTo = (direction: 'left' | 'right') => {
    setAutoplayKey((prev) => prev + 1)

    const container = scrollRef.current
    if (!container) return

    const cardWidth = container.querySelector('.panel')?.clientWidth || 320
    const gap = 24
    const scrollAmount = cardWidth + gap

    if (direction === 'right') {
      const maxScroll = container.scrollWidth - container.clientWidth
      const newScroll = Math.min(container.scrollLeft + scrollAmount, maxScroll)
      container.scrollTo({ left: newScroll, behavior: 'smooth' })
      setCurrentIndex(Math.min(currentIndex + 1, visibleDotCount - 1))
    } else {
      const newScroll = Math.max(container.scrollLeft - scrollAmount, 0)
      container.scrollTo({ left: newScroll, behavior: 'smooth' })
      setCurrentIndex(Math.max(currentIndex - 1, 0))
    }
  }

  return (
    <section id="projects" className="section px-4">
      <motion.h2
        className="section__title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>

      <div className="max-w-[1200px] mx-auto relative">
        {/* Navigation arrows */}
        <button
          onClick={() => scrollTo('left')}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--clr-bg-alt)] border border-[var(--clr-border)] text-[var(--clr-fg)] hover:border-[var(--clr-primary)] hover:text-[var(--clr-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => scrollTo('right')}
          disabled={currentIndex >= visibleDotCount - 1}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--clr-bg-alt)] border border-[var(--clr-border)] text-[var(--clr-fg)] hover:border-[var(--clr-primary)] hover:text-[var(--clr-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Next project"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel container */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onMouseDown={() => setAutoplayKey((prev) => prev + 1)}
          onTouchStart={() => setAutoplayKey((prev) => prev + 1)}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          onScroll={(e) => {
            const container = e.currentTarget
            const cardWidth = container.querySelector('.panel')?.clientWidth || 320
            const gap = 24
            const index = Math.round(container.scrollLeft / (cardWidth + gap))
            setCurrentIndex(Math.min(index, visibleDotCount - 1))
          }}
          style={{ scrollBehavior: 'smooth' }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.name || Math.random()}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-shrink-0 w-[300px] sm:w-[340px] snap-center"
            >
              <ProjectContainer project={project} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Dots indicator */}
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
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
