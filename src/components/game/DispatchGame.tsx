import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { AlertTriangle, Shield, Flame, Zap, Clock, Trophy, RotateCcw, Heart, Radio } from 'lucide-react'

type UnitType = 'police' | 'fire' | 'medical' | 'hazmat'

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
  { type: 'police', label: 'Police', icon: Shield, color: 'var(--clr-primary)' },
  { type: 'fire', label: 'Fire Dept', icon: Flame, color: 'var(--clr-accent-red)' },
  { type: 'medical', label: 'Medical', icon: Heart, color: 'var(--clr-accent-green)' },
  { type: 'hazmat', label: 'Hazmat', icon: AlertTriangle, color: 'var(--clr-accent-gold)' },
]

const EMERGENCIES: Emergency[] = [
  { id: '1', title: 'Armed Robbery in Progress', description: 'Silent alarm triggered at First National Bank, 5th Avenue. Multiple armed suspects reported inside.', correctUnit: 'police', severity: 'critical', timeLimit: 12 },
  { id: '2', title: 'Structure Fire - Residential', description: 'Three-story apartment building fully engulfed. Multiple residents still inside upper floors.', correctUnit: 'fire', severity: 'critical', timeLimit: 10 },
  { id: '3', title: 'Cardiac Arrest', description: 'Elderly male collapsed in grocery store. Bystander performing CPR. AED not available on site.', correctUnit: 'medical', severity: 'critical', timeLimit: 10 },
  { id: '4', title: 'Chemical Spill on Highway', description: 'Tanker truck overturned on I-95. Unknown substance leaking. Visible vapor cloud forming.', correctUnit: 'hazmat', severity: 'critical', timeLimit: 12 },
  { id: '5', title: 'Domestic Disturbance', description: 'Neighbors report screaming and sounds of breaking glass. Children may be present.', correctUnit: 'police', severity: 'high', timeLimit: 14 },
  { id: '6', title: 'Vehicle Fire - Highway', description: 'Sedan engulfed in flames on shoulder of Route 9. No injuries reported. Traffic backing up.', correctUnit: 'fire', severity: 'medium', timeLimit: 15 },
  { id: '7', title: 'Allergic Reaction', description: 'Child experiencing severe anaphylaxis at elementary school. EpiPen administered but symptoms persisting.', correctUnit: 'medical', severity: 'high', timeLimit: 12 },
  { id: '8', title: 'Gas Leak - Commercial', description: 'Strong gas odor reported in downtown office building. Building being evacuated. 200+ occupants.', correctUnit: 'hazmat', severity: 'high', timeLimit: 12 },
  { id: '9', title: 'Hit and Run', description: 'Pedestrian struck by vehicle that fled the scene. Victim conscious but unable to move. Witnesses have plate number.', correctUnit: 'police', severity: 'high', timeLimit: 14 },
  { id: '10', title: 'Kitchen Fire - Restaurant', description: 'Grease fire spread to ventilation system at busy restaurant. Staff attempting to evacuate patrons.', correctUnit: 'fire', severity: 'high', timeLimit: 12 },
  { id: '11', title: 'Multi-Vehicle Accident', description: 'Five-car pileup on freeway overpass. Multiple injuries reported. Possible fuel leak from one vehicle.', correctUnit: 'medical', severity: 'critical', timeLimit: 10 },
  { id: '12', title: 'Suspicious Package', description: 'Unattended briefcase found in subway station. White powder visible through seams. Station being cleared.', correctUnit: 'hazmat', severity: 'critical', timeLimit: 10 },
  { id: '13', title: 'Burglary in Progress', description: 'Homeowner called from closet. Two intruders heard ransacking the house. Family pet injured.', correctUnit: 'police', severity: 'high', timeLimit: 14 },
  { id: '14', title: 'Wildfire Approaching', description: 'Brush fire moving toward residential neighborhood. Wind shifting. Evacuation may be necessary.', correctUnit: 'fire', severity: 'critical', timeLimit: 10 },
  { id: '15', title: 'Drowning - Public Pool', description: 'Teenager pulled from pool, not breathing. Lifeguard performing rescue breathing.', correctUnit: 'medical', severity: 'critical', timeLimit: 10 },
  { id: '16', title: 'Industrial Accident', description: 'Worker trapped in machinery at manufacturing plant. Chemical coolant leaking from damaged equipment.', correctUnit: 'hazmat', severity: 'high', timeLimit: 12 },
  { id: '17', title: 'Shoplifting Turned Violent', description: 'Suspect brandished weapon at store security. Fled on foot into crowded mall. Civilians sheltering in place.', correctUnit: 'police', severity: 'high', timeLimit: 14 },
  { id: '18', title: 'Electrical Fire - Substation', description: 'Transformer explosion at power substation. Flames and sparks visible. Surrounding blocks lost power.', correctUnit: 'fire', severity: 'high', timeLimit: 12 },
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
