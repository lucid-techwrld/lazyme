import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, X } from 'lucide-react'

interface CompletionModalProps {
  streak: number
  onClose: () => void
}

const QUIPS = [
  "Your couch is disappointed. Your body isn't.",
  "5 whole minutes. A full 0.35% of your day. You're basically an athlete.",
  "Your ancestors, who outran lions, are mildly impressed.",
  "You may now eat breakfast without guilt. For exactly 5 minutes.",
  "The app didn't think you'd finish. The app was wrong.",
]

export function CompletionModal({ streak, onClose }: CompletionModalProps) {
  const quip = QUIPS[streak % QUIPS.length]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.72, opacity: 0, y: 24 }}
          animate={{ scale: 1,    opacity: 1, y: 0  }}
          exit={{    scale: 0.88, opacity: 0        }}
          transition={{ type: 'spring', damping: 16, stiffness: 220 }}
          className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border-2 border-pink-200 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-300 hover:text-gray-400 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="text-5xl mb-2 tracking-wider">🎉🏅✨</div>

          <h2 className="text-4xl font-black text-pink-600 mb-1 font-display text-shadow-pink">
            You did it!
          </h2>
          <p className="text-gray-400 text-sm mb-5 leading-relaxed italic">{quip}</p>

          <div className="flex items-center justify-center gap-2 bg-orange-50 border border-orange-100 rounded-2xl py-3 px-5 mb-6">
            <Trophy className="text-orange-400" size={20} />
            <span className="font-black text-orange-500 text-xl">{streak}</span>
            <span className="text-orange-400 text-sm font-bold">
              {streak === 1 ? 'day — you started! 🌱' : 'day streak 🔥'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 active:scale-95 transition-all text-white font-black text-lg shadow-lg shadow-pink-200"
          >
            See my stats →
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
