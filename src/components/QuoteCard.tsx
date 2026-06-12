import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getRandomQuote } from '@/data/quotes'

interface QuoteCardProps {
  visible: boolean
}

export function QuoteCard({ visible }: QuoteCardProps) {
  const [quote, setQuote] = useState(getRandomQuote)

  useEffect(() => {
    if (visible) setQuote(getRandomQuote())
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={quote}
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{    opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.3 }}
          className="mx-4 mt-3 rounded-2xl bg-violet-100 border border-violet-200 px-5 py-3 max-w-xs w-full text-center"
        >
          <p className="text-sm font-semibold text-violet-700 leading-snug">
            💬 {quote}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
