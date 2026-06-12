import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'lucide-react'

import { useWorkoutTimer } from '@/hooks/useWorkoutTimer'
import { useStreak }        from '@/hooks/useStreak'
import { EXERCISES }        from '@/data/exercises'
import { TimerRing }        from './TimerRing'
import { ExerciseDisplay }  from './ExerciseDisplay'
import { QuoteCard }        from './QuoteCard'
import { StreakTracker }    from './StreakTracker'
import { CompletionModal }  from './CompletionModal'

export function WorkoutTimer() {
  const { frame, isRunning, start, togglePause, reset } = useWorkoutTimer()
  const streak = useStreak()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (frame?.state === 'complete' && !showModal) {
      streak.markComplete()
      setShowModal(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frame?.state])

  const handleReset = () => { reset(); setShowModal(false) }

  const isWork    = frame?.state === 'work'
  const isRest    = frame?.state === 'rest'
  const progress  = frame ? frame.secondsLeft / frame.phaseTotal : 1

  // Display "5:00" before start, otherwise ceiling of seconds left
  const clockDisplay: string = frame
    ? String(Math.ceil(frame.secondsLeft))
    : '5:00'

  const phaseLabel: string = !frame
    ? 'ready'
    : frame.state === 'work' ? 'GO!'
    : frame.state === 'rest' ? 'rest'
    : frame.state

  return (
    <div
      className="min-h-screen flex flex-col items-center pb-16 px-4"
      style={{ background: 'linear-gradient(155deg, #fdf2f8 0%, #faf5ff 55%, #eff6ff 100%)' }}
    >
      {/* ── Logo / Header ──────────────────────────────────────────────── */}
      <header className="w-full max-w-xs pt-10 pb-4 text-center select-none">
        <h1
          className="text-5xl font-black text-pink-600 font-display tracking-wide leading-none"
          style={{ textShadow: '3px 3px 0px #f9a8d4' }}
        >
          LazyMe
        </h1>
        <p className="text-xs text-gray-400 mt-1.5 font-semibold">
          5 minutes. No excuses. (One excuse is fine.)
        </p>
      </header>

      {/* ── EMOM minute progress dots ──────────────────────────────────── */}
      <div className="flex gap-2 mb-5">
        {EXERCISES.map((ex, i) => {
          const isDone    = !!frame && i < frame.minuteIndex
          const isCurrent = !!frame && i === frame.minuteIndex
          return (
            <motion.div
              key={ex.id}
              animate={{ scale: isCurrent ? 1.18 : 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              className={[
                'w-9 h-9 rounded-full flex items-center justify-center text-base',
                'font-bold transition-colors duration-300 shadow-sm',
                isDone    ? 'bg-pink-400 text-white'                       : '',
                isCurrent ? 'bg-pink-500 text-white shadow-pink-200 shadow-md' : '',
                !isDone && !isCurrent ? 'bg-pink-100 text-pink-300'        : '',
              ].join(' ')}
            >
              {isDone ? '✓' : ex.emoji}
            </motion.div>
          )
        })}
      </div>

      {/* ── Timer ring ─────────────────────────────────────────────────── */}
      <TimerRing progress={progress} isWork={!!isWork}>
        <motion.span
          key={clockDisplay}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1,   opacity: 1 }}
          transition={{ duration: 0.18 }}
          className="text-5xl font-black text-pink-700 tabular-nums font-display"
        >
          {clockDisplay}
        </motion.span>
        <span className={[
          'text-xs font-black tracking-[0.18em] uppercase mt-0.5',
          isWork ? 'text-pink-500' : isRest ? 'text-violet-400' : 'text-gray-400',
        ].join(' ')}>
          {phaseLabel}
        </span>
      </TimerRing>

      {/* ── Exercise display or idle welcome ───────────────────────────── */}
      <div className="w-full max-w-xs mt-5">
        <AnimatePresence mode="wait">
          {frame && frame.state !== 'complete' ? (
            <ExerciseDisplay
              key={frame.exercise.id}
              exercise={frame.exercise}
              isWork={!!isWork}
            />
          ) : !frame ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6"
            >
              <p className="text-4xl mb-3">🛋️</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Press start when you're ready.<br />
                <span className="text-gray-300 text-xs">(After coffee. We understand.)</span>
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* ── Sarcastic rest quote ───────────────────────────────────────── */}
      <QuoteCard visible={!!isRest} />

      {/* ── "Next up" subtle hint ─────────────────────────────────────── */}
      <AnimatePresence>
        {isWork && frame?.nextExercise && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-xs text-gray-400"
          >
            Next: {frame.nextExercise.emoji} {frame.nextExercise.name}
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── Controls ──────────────────────────────────────────────────── */}
      <div className="flex gap-3 mt-6">
        {!frame ? (
          <button
            onClick={start}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 active:scale-95 transition-all text-white font-black text-lg px-10 py-3.5 rounded-2xl shadow-lg shadow-pink-200"
          >
            <Play size={20} fill="white" /> Let's go 🛋️→💪
          </button>
        ) : frame.state !== 'complete' ? (
          <>
            <button
              onClick={togglePause}
              className="flex items-center gap-2 bg-white border-2 border-pink-300 hover:bg-pink-50 active:scale-95 transition-all text-pink-600 font-bold px-6 py-3 rounded-2xl shadow-sm"
            >
              {isRunning
                ? <><Pause size={18} /> Pause</>
                : <><Play  size={18} fill="currentColor" /> Resume</>
              }
            </button>
            <button
              onClick={handleReset}
              title="Reset"
              className="flex items-center justify-center bg-white border-2 border-gray-200 hover:bg-gray-50 active:scale-95 transition-all text-gray-400 px-4 py-3 rounded-2xl shadow-sm"
            >
              <RotateCcw size={18} />
            </button>
          </>
        ) : (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 bg-white border-2 border-pink-200 hover:bg-pink-50 active:scale-95 transition-all text-pink-600 font-bold px-6 py-3 rounded-2xl shadow-sm"
          >
            <RotateCcw size={18} /> Do it again
          </button>
        )}
      </div>

      {/* ── Streak tracker ────────────────────────────────────────────── */}
      <div className="mt-8 w-full max-w-xs">
        <StreakTracker
          currentStreak={streak.currentStreak}
          longestStreak={streak.longestStreak}
          completedDates={streak.completedDates}
        />
      </div>

      {/* ── Completion modal ──────────────────────────────────────────── */}
      {showModal && (
        <CompletionModal
          streak={streak.currentStreak}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
