import { useState, useEffect, useRef, useCallback } from 'react'
import { EXERCISES, Exercise, WorkoutState } from '@/data/exercises'

export interface TimerFrame {
  state: WorkoutState
  exercise: Exercise
  nextExercise: Exercise | null
  secondsLeft: number     // seconds remaining in the current phase
  phaseTotal: number      // total length of the current phase (for ring math)
  minuteIndex: number     // 0–4
  totalElapsed: number    // total seconds elapsed
}

/** Pure function: elapsed seconds → current TimerFrame */
function deriveFrame(elapsed: number): TimerFrame {
  let cursor = 0

  for (let i = 0; i < EXERCISES.length; i++) {
    const ex = EXERCISES[i]
    const workEnd  = cursor + ex.workDuration
    const restEnd  = workEnd + ex.restDuration
    const blockEnd = cursor + 60

    // Active work phase
    if (elapsed < workEnd) {
      return {
        state: 'work',
        exercise: ex,
        nextExercise: EXERCISES[i + 1] ?? null,
        secondsLeft: workEnd - elapsed,
        phaseTotal: ex.workDuration,
        minuteIndex: i,
        totalElapsed: elapsed,
      }
    }
    // Explicit rest phase
    if (ex.restDuration > 0 && elapsed < restEnd) {
      return {
        state: 'rest',
        exercise: ex,
        nextExercise: EXERCISES[i + 1] ?? null,
        secondsLeft: restEnd - elapsed,
        phaseTotal: ex.restDuration,
        minuteIndex: i,
        totalElapsed: elapsed,
      }
    }
    // Rep-based: fills the remainder of the 60s block as rest
    if (ex.restDuration === 0 && elapsed < blockEnd) {
      return {
        state: 'rest',
        exercise: ex,
        nextExercise: EXERCISES[i + 1] ?? null,
        secondsLeft: blockEnd - elapsed,
        phaseTotal: 60 - ex.workDuration,
        minuteIndex: i,
        totalElapsed: elapsed,
      }
    }
    cursor += 60
  }

  return {
    state: 'complete',
    exercise: EXERCISES[EXERCISES.length - 1],
    nextExercise: null,
    secondsLeft: 0,
    phaseTotal: 1,
    minuteIndex: 4,
    totalElapsed: 300,
  }
}

export function useWorkoutTimer() {
  const [frame, setFrame]       = useState<TimerFrame | null>(null)
  const [isRunning, setRunning] = useState(false)
  const elapsedRef  = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const tick = useCallback(() => {
    elapsedRef.current += 1
    const next = deriveFrame(elapsedRef.current)
    setFrame(next)
    if (next.state === 'complete') setRunning(false)
  }, [])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(tick, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isRunning, tick])

  const start = useCallback(() => {
    elapsedRef.current = 0
    setFrame(deriveFrame(0))
    setRunning(true)
  }, [])

  const togglePause = useCallback(() => setRunning(r => !r), [])

  const reset = useCallback(() => {
    setRunning(false)
    elapsedRef.current = 0
    setFrame(null)
  }, [])

  return { frame, isRunning, start, togglePause, reset }
}
