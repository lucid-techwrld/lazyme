import { motion } from 'framer-motion'

interface TimerRingProps {
  progress: number       // 0→1, fraction of phase remaining
  isWork: boolean
  children: React.ReactNode
}

const R = 82
const CIRCUMFERENCE = 2 * Math.PI * R

export function TimerRing({ progress, isWork, children }: TimerRingProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress))
  const dashOffset = CIRCUMFERENCE * (1 - clampedProgress)
  const strokeColor = isWork ? '#ec4899' : '#a78bfa'

  return (
    <div className="relative flex items-center justify-center w-56 h-56">
      {/* Ambient glow blob behind ring when working */}
      {isWork && (
        <div className="absolute inset-2 rounded-full bg-pink-200 animate-pulse-glow" />
      )}

      <svg
        className="absolute inset-0 -rotate-90"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Track */}
        <circle cx="100" cy="100" r={R} fill="none" stroke="#fce7f3" strokeWidth="14" />
        {/* Progress arc */}
        <motion.circle
          cx="100" cy="100" r={R}
          fill="none"
          stroke={strokeColor}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          animate={{ strokeDashoffset: dashOffset, stroke: strokeColor }}
          transition={{ duration: 0.9, ease: 'linear' }}
        />
      </svg>

      <div className="relative z-10 flex flex-col items-center justify-center gap-0.5">
        {children}
      </div>
    </div>
  )
}
