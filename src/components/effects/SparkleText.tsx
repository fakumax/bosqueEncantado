import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Sparkle {
  id: number
  x: number
  y: number
  delay: number
  size: number
}

export function SparkleText({ text }: { text: string }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const newSparkles: Sparkle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 100,
      delay: Math.random() * 0.5,
      size: 4 + Math.random() * 6
    }))
    setSparkles(newSparkles)
  }, [])

  const letters = text.split('')

  return (
    <div className="relative inline-block">
      <div className="absolute inset-0 flex items-center justify-center">
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute"
            initial={{ 
              x: sparkle.x, 
              y: sparkle.y, 
              scale: 0,
              opacity: 0 
            }}
            animate={{ 
              x: 0, 
              y: 0, 
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              delay: sparkle.delay,
              ease: "easeOut",
            }}
          >
            <svg
              width={sparkle.size}
              height={sparkle.size}
              viewBox="0 0 24 24"
              fill="#d4c896"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </motion.div>
        ))}
      </div>

      <h1 className="font-playfair text-6xl md:text-7xl lg:text-8xl font-bold shimmer-text tracking-tight relative z-10">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ 
              opacity: 0, 
              y: 20,
              scale: 0.5,
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
              delay: 0.3 + i * 0.1,
              ease: "easeOut",
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </h1>

      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.3, 0],
          scale: [0.8, 1.2, 1],
        }}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-accent/30 via-accent/10 to-transparent blur-xl" />
      </motion.div>
    </div>
  )
}
