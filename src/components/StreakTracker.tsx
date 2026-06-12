import { Flame, Trophy } from 'lucide-react'

interface StreakTrackerProps {
  currentStreak: number
  longestStreak: number
  completedDates: string[]
}

function CalendarDots({ completedDates }: { completedDates: string[] }) {
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    return d.toISOString().split('T')[0]
  })

  return (
    <div className="flex flex-wrap gap-[5px] justify-center mt-2">
      {days.map((day, i) => {
        const done    = completedDates.includes(day)
        const isToday = i === 29
        return (
          <div
            key={day}
            title={day}
            className={[
              'w-4 h-4 rounded-full transition-all duration-200',
              done    ? 'bg-pink-400 scale-110 shadow-sm shadow-pink-200' : 'bg-pink-100',
              isToday && !done ? 'ring-2 ring-offset-1 ring-pink-300' : '',
            ].join(' ')}
          />
        )
      })}
    </div>
  )
}

export function StreakTracker({ currentStreak, longestStreak, completedDates }: StreakTrackerProps) {
  return (
    <div className="rounded-2xl border border-pink-200 bg-white/70 p-4 w-full max-w-xs text-center shadow-sm">
      <p className="text-[10px] font-black text-pink-300 uppercase tracking-[0.15em] mb-3">
        Your Journey
      </p>

      <div className="flex justify-center gap-8 mb-3">
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-1">
            <Flame size={18} className="text-orange-400" />
            <span className="text-2xl font-black text-orange-500">{currentStreak}</span>
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">streak</p>
        </div>

        <div className="w-px bg-pink-100" />

        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-1">
            <Trophy size={18} className="text-yellow-400" />
            <span className="text-2xl font-black text-yellow-500">{longestStreak}</span>
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">best</p>
        </div>
      </div>

      <p className="text-[10px] text-gray-400 mb-0.5">last 30 days</p>
      <CalendarDots completedDates={completedDates} />
    </div>
  )
}
