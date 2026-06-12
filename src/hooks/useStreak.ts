import { useState, useCallback } from 'react'

const STORAGE_KEY = 'lazyme-streak-v1'

export interface StreakData {
  currentStreak: number
  longestStreak: number
  lastCompletedDate: string | null  // "YYYY-MM-DD"
  completedDates: string[]          // array of "YYYY-MM-DD"
}

const DEFAULT: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastCompletedDate: null,
  completedDates: [],
}

function todayISO(): string {
  return new Date().toISOString().split('T')[0]
}

function yesterdayISO(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

function loadFromStorage(): StreakData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT
    return { ...DEFAULT, ...JSON.parse(raw) }
  } catch {
    return DEFAULT
  }
}

function saveToStorage(data: StreakData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function useStreak() {
  const [data, setData] = useState<StreakData>(loadFromStorage)

  const markComplete = useCallback(() => {
    const today = todayISO()
    setData(prev => {
      if (prev.completedDates.includes(today)) return prev  // already logged

      const isConsecutive = prev.lastCompletedDate === yesterdayISO()
      const newStreak = isConsecutive ? prev.currentStreak + 1 : 1
      const next: StreakData = {
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, prev.longestStreak),
        lastCompletedDate: today,
        completedDates: [...prev.completedDates, today],
      }
      saveToStorage(next)
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    saveToStorage(DEFAULT)
    setData(DEFAULT)
  }, [])

  return { ...data, markComplete, resetAll }
}
