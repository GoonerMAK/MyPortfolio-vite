import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, type Variants } from 'motion/react'
import { RotateCcw, Trophy, Clock, Zap } from 'lucide-react'

type CardType = {
  id: string
  value: string
  isFlipped: boolean
  isMatched: boolean
}

const EMOJIS = ['🚀', '⚡', '🔥', '💎', '🎯', '🎮', '🎨', '🎭']

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = temp
  }
  return shuffled
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

export function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<string[]>([])
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)

  const initializeGame = useCallback(() => {
    const gameCards: CardType[] = []
    EMOJIS.forEach((emoji) => {
      gameCards.push(
        { id: crypto.randomUUID(), value: emoji, isFlipped: false, isMatched: false },
        { id: crypto.randomUUID(), value: emoji, isFlipped: false, isMatched: false }
      )
    })
    setCards(shuffleArray(gameCards))
    setFlippedCards([])
    setMoves(0)
    setTime(0)
    setIsGameComplete(false)
    setIsGameStarted(false)
  }, [])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (isGameStarted && !isGameComplete) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isGameStarted, isGameComplete])

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards
      const firstCard = cards.find((c) => c.id === first)
      const secondCard = cards.find((c) => c.id === second)

      if (firstCard?.value === secondCard?.value) {
        setTimeout(() => {
          setCards((previousCards) =>
            previousCards.map((c) =>
              c.id === first || c.id === second
                ? { ...c, isMatched: true }
                : c
            )
          )
          setFlippedCards([])
        }, 500)
      } else {
        setTimeout(() => {
          setCards((previousCards) =>
            previousCards.map((c) =>
              c.id === first || c.id === second
                ? { ...c, isFlipped: false }
                : c
            )
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }, [flippedCards, cards])

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setIsGameComplete(true)
    }
  }, [cards])

  const handleCardClick = (cardId: string) => {
    if (!isGameStarted) setIsGameStarted(true)
    
    const currentCard = cards.find((c) => c.id === cardId)
    if (!currentCard || currentCard.isFlipped || currentCard.isMatched || flippedCards.length === 2) {
      return
    }

    setCards((previousCards) =>
      previousCards.map((c) =>
        c.id === cardId ? { ...c, isFlipped: true } : c
      )
    )

    setFlippedCards((previousFlipped) => {
      const newFlipped = [...previousFlipped, cardId]
      if (newFlipped.length === 2) {
        setMoves((m) => m + 1)
      }
      return newFlipped
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[var(--clr-primary)]" />
            <span className="text-lg font-mono">{formatTime(time)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[var(--clr-primary)]" />
            <span className="text-lg font-mono">{moves} moves</span>
          </div>
        </div>

        <motion.button
          onClick={initializeGame}
          className="btn btn--outline flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </motion.button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all duration-300 ${card.isFlipped || card.isMatched ? 'bg-[var(--clr-bg-alt)]' : 'bg-[var(--clr-primary)]'}`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
            whileTap={{ scale: card.isFlipped || card.isMatched ? 1 : 0.95 }}
            disabled={card.isFlipped || card.isMatched || flippedCards.length === 2}
          >
            <AnimatePresence mode="wait">
              {(card.isFlipped || card.isMatched) && (
                <motion.span
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {card.value}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {isGameComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              className="bg-[var(--clr-bg)] p-8 rounded-2xl shadow-[var(--shadow)] text-center max-w-sm mx-4"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-2xl mb-2">Victory!</h3>
              <p className="text-[var(--clr-fg-alt)] mb-6">
                Completed in {formatTime(time)} with {moves} moves
              </p>
              <motion.button
                onClick={initializeGame}
                className="btn btn--outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MemoryGame
