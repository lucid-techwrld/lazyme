import { motion, AnimatePresence } from 'framer-motion'
import { Exercise } from '@/data/exercises'

interface ExerciseDisplayProps {
  exercise: Exercise
  isWork: boolean
}

export function ExerciseDisplay({ exercise, isWork }: ExerciseDisplayProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={exercise.id + (isWork ? '-work' : '-rest')}
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0  }}
        exit={{    opacity: 0, x: -28 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex flex-col items-center gap-3 w-full"
      >
        {/*
          ── Media area ───────────────────────────────────────────────────
          To upgrade from placeholder:
          • GIF/image:  change <img src=...> and update mediaUrl in exercises.ts
          • Video:      replace <img> with <video autoPlay loop muted playsInline src={exercise.mediaUrl} className="w-full h-full object-cover" />
          • Lottie:     npm i @lottiefiles/react-lottie-player, then:
                        <Player autoplay loop src={exercise.mediaUrl} style={{height:'100%'}} />
        */}
        <div className="relative w-72 h-44 rounded-2xl overflow-hidden border-2 border-pink-200 bg-pink-50 shadow-sm">
          <img
            src={exercise.mediaUrl}
            alt={`${exercise.name} demonstration`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <span className="absolute top-2 right-2 text-2xl drop-shadow-sm">
            {exercise.emoji}
          </span>
          {exercise.repCount && isWork && (
            <div className="absolute bottom-2 left-2 bg-white/85 backdrop-blur-sm rounded-xl px-3 py-1">
              <span className="text-xs font-black text-pink-600">× {exercise.repCount} reps</span>
            </div>
          )}
        </div>

        <div className="text-center px-2">
          <h2 className="text-2xl font-black text-pink-700 leading-tight font-display tracking-wide">
            {exercise.name}
          </h2>
          <AnimatePresence>
            {isWork && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{    opacity: 0, height: 0 }}
                className="mt-1 text-sm text-pink-400 italic leading-snug"
              >
                {exercise.cue}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
