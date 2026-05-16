import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Monitor, Database, Cloud, Shield, Zap, Clock, Trophy, RotateCcw, Radio } from 'lucide-react'

type UnitType = 'frontend' | 'backend' | 'devops' | 'security'

interface Emergency {
  id: string
  title: string
  description: string
  correctUnit: UnitType
  severity: 'low' | 'medium' | 'high' | 'critical'
  timeLimit: number // seconds
}

interface GameState {
  phase: 'idle' | 'playing' | 'reviewing' | 'complete'
  score: number
  streak: number
  bestStreak: number
  currentIndex: number
  totalCorrect: number
  totalAnswered: number
  timeLeft: number
  feedback: 'correct' | 'wrong' | null
}

const UNITS: { type: UnitType; label: string; icon: typeof Shield; color: string }[] = [
  { type: 'frontend', label: 'Frontend', icon: Monitor, color: 'var(--clr-primary)' },
  { type: 'backend', label: 'Backend', icon: Database, color: 'var(--clr-accent-red)' },
  { type: 'devops', label: 'DevOps', icon: Cloud, color: 'var(--clr-accent-green)' },
  { type: 'security', label: 'Security', icon: Shield, color: 'var(--clr-accent-gold)' },
]

const EMERGENCIES: Emergency[] = [
  { id: '1', title: 'DDoS Attack', description: 'Massive traffic spike detected from multiple IPs targeting the main API gateway.', correctUnit: 'security', severity: 'critical', timeLimit: 12 },
  { id: '2', title: 'Database Deadlock', description: 'Production database is entirely locked up. No writes are going through.', correctUnit: 'backend', severity: 'critical', timeLimit: 10 },
  { id: '3', title: 'CI/CD Pipeline Failure', description: 'Deployment to production failed due to a missing environment variable in the runner.', correctUnit: 'devops', severity: 'high', timeLimit: 12 },
  { id: '4', title: 'Mobile Layout Breaking', description: 'New hero section overlaps completely on iOS Safari, rendering the app unusable.', correctUnit: 'frontend', severity: 'high', timeLimit: 12 },
  { id: '5', title: 'Ransomware Attempt', description: 'Automated script attempted to encrypt user storage buckets.', correctUnit: 'security', severity: 'critical', timeLimit: 10 },
  { id: '6', title: 'High Memory Usage', description: 'Node.js server memory leak crashing instances every 5 minutes.', correctUnit: 'backend', severity: 'high', timeLimit: 12 },
  { id: '7', title: 'Cluster Nodes Evicted', description: 'Kubernetes autoscaler is aggressively terminating pods without spinning up new ones.', correctUnit: 'devops', severity: 'critical', timeLimit: 10 },
  { id: '8', title: 'Cross-Site Scripting (XSS)', description: 'User reported an injected script in the comment section bypassing sanitization.', correctUnit: 'security', severity: 'critical', timeLimit: 12 },
  { id: '9', title: 'State Management Bug', description: 'Shopping cart empties itself immediately after adding an item.', correctUnit: 'frontend', severity: 'high', timeLimit: 14 },
  { id: '10', title: 'API Rate Limit Exceeded', description: 'Third-party integration is rate-limiting our internal proxy due to improper caching.', correctUnit: 'backend', severity: 'medium', timeLimit: 15 },
  { id: '11', title: 'Stale Cache on Edge CDN', description: 'Users across Europe are seeing last week’s deployment instead of the current one.', correctUnit: 'devops', severity: 'medium', timeLimit: 15 },
  { id: '12', title: 'Auth Token Leak', description: 'Developer accidentally committed a live AWS admin token into a public repository.', correctUnit: 'security', severity: 'critical', timeLimit: 10 },
  { id: '13', title: 'Broken Payment Form', description: 'The Stripe checkout iframe fails to render on the desktop Safari browser.', correctUnit: 'frontend', severity: 'critical', timeLimit: 10 },
  { id: '14', title: 'Slow Queries', description: 'Search endpoint is taking 15+ seconds to resolve standard queries.', correctUnit: 'backend', severity: 'high', timeLimit: 14 },
  { id: '15', title: 'Domain Expiration', description: 'Primary SSL cert and domain are expiring in 1 hour. Automated renewal script failed.', correctUnit: 'devops', severity: 'critical', timeLimit: 10 },
  { id: '16', title: 'Accessibility Compliance', description: 'Screen readers completely failing to navigate the new modal dialog interface.', correctUnit: 'frontend', severity: 'high', timeLimit: 12 },
  { id: '17', title: 'Suspicious Admin Logins', description: 'Multiple anomalous admin logins originating from abnormal geographic locations.', correctUnit: 'security', severity: 'high', timeLimit: 12 },
  { id: '18', title: 'Unoptimized Bundle Size', description: 'Initial page load payload increased by 5MB, heavily impacting Lighthouse scores.', correctUnit: 'frontend', severity: 'medium', timeLimit: 15 },
]

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

const SEVERITY_COLORS: Record<string, string> = {
  low: 'var(--clr-fg)',
  medium: 'var(--clr-accent-gold)',
  high: 'var(--clr-accent-red)',
  critical: 'var(--clr-accent-red)',
}

const ROUNDS = 10

export function DispatchGame() {
  const [emergencies, setEmergencies] = useState<Emergency[]>([])
  const [gameState, setGameState] = useState<GameState>({
    phase: 'idle',
    score: 0,
    streak: 0,
    bestStreak: 0,
    currentIndex: 0,
    totalCorrect: 0,
    totalAnswered: 0,
    timeLeft: 0,
    feedback: null,
  })
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const currentEmergency = emergencies[gameState.currentIndex] ?? null

  const startGame = useCallback(() => {
    const shuffled = shuffleArray(EMERGENCIES).slice(0, ROUNDS)
    setEmergencies(shuffled)
    setGameState({
      phase: 'playing',
      score: 0,
      streak: 0,
      bestStreak: 0,
      currentIndex: 0,
      totalCorrect: 0,
      totalAnswered: 0,
      timeLeft: shuffled[0].timeLimit,
      feedback: null,
    })
  }, [])

  // Timer countdown
  useEffect(() => {
    if (gameState.phase !== 'playing' || gameState.feedback) return

    timerRef.current = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeLeft <= 1) {
          // Time ran out — wrong answer
          return {
            ...prev,
            timeLeft: 0,
            feedback: 'wrong',
            streak: 0,
            totalAnswered: prev.totalAnswered + 1,
          }
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 }
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [gameState.phase, gameState.feedback, gameState.currentIndex])

  // Auto-advance after feedback
  useEffect(() => {
    if (!gameState.feedback) return

    const timeout = setTimeout(() => {
      setGameState((prev) => {
        const nextIndex = prev.currentIndex + 1
        if (nextIndex >= emergencies.length) {
          return { ...prev, phase: 'complete', feedback: null }
        }
        return {
          ...prev,
          currentIndex: nextIndex,
          timeLeft: emergencies[nextIndex].timeLimit,
          feedback: null,
        }
      })
    }, 1200)

    return () => clearTimeout(timeout)
  }, [gameState.feedback, emergencies])

  const handleDispatch = (unit: UnitType) => {
    if (gameState.feedback || gameState.phase !== 'playing' || !currentEmergency) return

    const isCorrect = unit === currentEmergency.correctUnit
    const timeBonus = Math.ceil(gameState.timeLeft * 10)
    const streakBonus = gameState.streak * 5

    setGameState((prev) => ({
      ...prev,
      feedback: isCorrect ? 'correct' : 'wrong',
      score: isCorrect ? prev.score + 100 + timeBonus + streakBonus : prev.score,
      streak: isCorrect ? prev.streak + 1 : 0,
      bestStreak: isCorrect ? Math.max(prev.bestStreak, prev.streak + 1) : prev.bestStreak,
      totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect,
      totalAnswered: prev.totalAnswered + 1,
    }))
  }

  const timerPct = currentEmergency ? (gameState.timeLeft / currentEmergency.timeLimit) * 100 : 0

  // ---- IDLE STATE ----
  if (gameState.phase === 'idle') {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="panel panel-hud p-8 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-2">
            <Radio className="w-12 h-12 mx-auto mb-4 text-[var(--clr-primary)]" />
            <h3 className="text-xl mb-2">Tech Dispatch Simulation</h3>
            <p className="text-sm text-[var(--clr-fg)] mb-2 max-w-md mx-auto">
              You will receive <strong className="text-[var(--clr-fg-alt)]">{ROUNDS} requirement calls</strong>. 
              For each one, dispatch the correct response unit before time expires.
            </p>
            <div className="flex justify-center gap-4 my-6 flex-wrap">
              {UNITS.map((u) => (
                <div key={u.type} className="flex items-center gap-1.5 text-xs font-['JetBrains_Mono']" style={{ color: u.color }}>
                  <u.icon className="w-3.5 h-3.5" />
                  {u.label}
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--clr-fg)] mb-6 font-['JetBrains_Mono']">
              Score = 100 base + time bonus + streak bonus
            </p>
            <motion.button
              className="btn btn--outline"
              onClick={startGame}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Begin Simulation
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  // ---- COMPLETE STATE ----
  if (gameState.phase === 'complete') {
    const accuracy = Math.round((gameState.totalCorrect / gameState.totalAnswered) * 100)
    const grade = accuracy >= 90 ? 'S' : accuracy >= 70 ? 'A' : accuracy >= 50 ? 'B' : 'C'
    const gradeColor = accuracy >= 90 ? 'var(--clr-accent-gold)' : accuracy >= 70 ? 'var(--clr-accent-green)' : accuracy >= 50 ? 'var(--clr-primary)' : 'var(--clr-accent-red)'

    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="panel panel-hud p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="pt-2">
            <Trophy className="w-14 h-14 mx-auto mb-4" style={{ color: gradeColor }} />
            <h3 className="text-2xl mb-1">Simulation Complete</h3>
            <p className="font-['JetBrains_Mono'] text-4xl font-bold my-4" style={{ color: gradeColor }}>
              {grade}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
              <div className="panel p-3">
                <p className="font-['JetBrains_Mono'] text-xs text-[var(--clr-fg)] uppercase">Score</p>
                <p className="font-['Anton'] text-2xl text-[var(--clr-fg-alt)]">{gameState.score}</p>
              </div>
              <div className="panel p-3">
                <p className="font-['JetBrains_Mono'] text-xs text-[var(--clr-fg)] uppercase">Accuracy</p>
                <p className="font-['Anton'] text-2xl text-[var(--clr-fg-alt)]">{accuracy}%</p>
              </div>
              <div className="panel p-3">
                <p className="font-['JetBrains_Mono'] text-xs text-[var(--clr-fg)] uppercase">Correct</p>
                <p className="font-['Anton'] text-2xl text-[var(--clr-accent-green)]">{gameState.totalCorrect}/{gameState.totalAnswered}</p>
              </div>
              <div className="panel p-3">
                <p className="font-['JetBrains_Mono'] text-xs text-[var(--clr-fg)] uppercase">Best Streak</p>
                <p className="font-['Anton'] text-2xl text-[var(--clr-accent-gold)]">{gameState.bestStreak}</p>
              </div>
            </div>

            <motion.button
              className="btn btn--outline inline-flex items-center gap-2"
              onClick={startGame}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <RotateCcw className="w-4 h-4" />
              Run Again
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  // ---- PLAYING STATE ----
  return (
    <div className="max-w-2xl mx-auto">
      {/* HUD Bar */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-4">
          <span className="font-['JetBrains_Mono'] text-xs text-[var(--clr-fg)]">
            INCIDENT {gameState.currentIndex + 1}/{emergencies.length}
          </span>
          <span className="font-['JetBrains_Mono'] text-xs text-[var(--clr-accent-gold)]">
            <Zap className="w-3.5 h-3.5 inline mr-1" />
            {gameState.score} PTS
          </span>
          {gameState.streak > 1 && (
            <span className="font-['JetBrains_Mono'] text-xs text-[var(--clr-accent-green)]">
              x{gameState.streak} STREAK
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" style={{ color: timerPct < 30 ? 'var(--clr-accent-red)' : 'var(--clr-primary)' }} />
          <span
            className="font-['JetBrains_Mono'] text-sm font-bold"
            style={{ color: timerPct < 30 ? 'var(--clr-accent-red)' : 'var(--clr-primary)' }}
          >
            {gameState.timeLeft}s
          </span>
        </div>
      </div>

      {/* Timer bar */}
      <div className="w-full h-1 bg-[var(--clr-border)] mb-6 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: timerPct < 30 ? 'var(--clr-accent-red)' : 'var(--clr-primary)',
            boxShadow: timerPct < 30 ? '0 0 8px var(--clr-accent-red)' : '0 0 8px var(--clr-primary)',
          }}
          animate={{ width: `${timerPct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Emergency Card */}
      <AnimatePresence mode="wait">
        {currentEmergency && (
          <motion.div
            key={currentEmergency.id}
            className="panel mb-6"
            style={{
              borderLeftWidth: '4px',
              borderLeftColor: SEVERITY_COLORS[currentEmergency.severity],
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6 pt-5">
              <div className="flex items-center justify-between mb-3">
                <span
                  className="badge"
                  style={{
                    color: SEVERITY_COLORS[currentEmergency.severity],
                    borderColor: SEVERITY_COLORS[currentEmergency.severity],
                    background: `color-mix(in srgb, ${SEVERITY_COLORS[currentEmergency.severity]} 8%, transparent)`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {currentEmergency.severity}
                </span>
              </div>
              <h3 className="text-xl mb-2">{currentEmergency.title}</h3>
              <p className="text-sm text-[var(--clr-fg)] leading-relaxed">
                {currentEmergency.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback overlay */}
      <AnimatePresence>
        {gameState.feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`text-center mb-4 py-3 rounded font-['JetBrains_Mono'] text-sm font-bold uppercase tracking-wider border-2 ${
              gameState.feedback === 'correct'
                ? 'border-[var(--clr-accent-green)] text-[var(--clr-accent-green)] bg-[rgba(0,224,150,0.06)]'
                : 'border-[var(--clr-accent-red)] text-[var(--clr-accent-red)] bg-[rgba(255,61,113,0.06)]'
            }`}
          >
            {gameState.feedback === 'correct'
              ? `Correct! +${100 + Math.ceil((currentEmergency?.timeLimit ?? 0) * 10) + (gameState.streak > 1 ? (gameState.streak - 1) * 5 : 0)} pts`
              : `Wrong — Needed: ${UNITS.find((u) => u.type === currentEmergency?.correctUnit)?.label}`}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dispatch Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {UNITS.map((unit) => (
          <motion.button
            key={unit.type}
            onClick={() => handleDispatch(unit.type)}
            disabled={!!gameState.feedback}
            className="panel p-4 flex flex-col items-center gap-2 cursor-pointer transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              borderColor: gameState.feedback
                ? unit.type === currentEmergency?.correctUnit
                  ? 'var(--clr-accent-green)'
                  : 'var(--clr-border)'
                : 'var(--clr-border)',
            }}
            whileHover={!gameState.feedback ? {
              borderColor: unit.color,
              boxShadow: `0 0 16px ${unit.color}22`,
              scale: 1.02,
            } : {}}
            whileTap={!gameState.feedback ? { scale: 0.98 } : {}}
          >
            <unit.icon className="w-6 h-6" style={{ color: unit.color }} />
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-semibold" style={{ color: unit.color }}>
              Dispatch {unit.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default DispatchGame
