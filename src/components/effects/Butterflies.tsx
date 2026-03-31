import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Butterfly {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  size: number
}

export function Butterflies() {
  const [butterflies, setButterflies] = useState<Butterfly[]>([])

  useEffect(() => {
    const newButterflies: Butterfly[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 8 + Math.random() * 4,
      size: 12 + Math.random() * 8
    }))
    setButterflies(newButterflies)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {butterflies.map((butterfly) => (
        <motion.div
          key={butterfly.id}
          className="absolute"
          style={{
            left: `${butterfly.x}%`,
            top: `${butterfly.y}%`,
          }}
          animate={{
            x: [0, 50, -30, 60, -20, 0],
            y: [0, -60, -30, -80, -40, 0],
            rotate: [0, 15, -15, 20, -10, 0],
          }}
          transition={{
            duration: butterfly.duration,
            repeat: Infinity,
            delay: butterfly.delay,
            ease: "easeInOut",
          }}
        >
          <motion.svg
            width={butterfly.size}
            height={butterfly.size}
            viewBox="0 0 24 24"
            fill="none"
            animate={{
              scale: [1, 1.2, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M12 3C12 3 10 5 10 8C10 11 12 12 12 12C12 12 14 11 14 8C14 5 12 3 12 3Z"
              fill="oklch(0.75 0.12 85)"
              opacity="0.6"
            />
            <ellipse cx="8" cy="10" rx="3.5" ry="5" fill="oklch(0.70 0.10 145)" opacity="0.7" />
            <ellipse cx="16" cy="10" rx="3.5" ry="5" fill="oklch(0.70 0.10 145)" opacity="0.7" />
            <ellipse cx="7" cy="16" rx="3" ry="4.5" fill="oklch(0.65 0.08 155)" opacity="0.6" />
            <ellipse cx="17" cy="16" rx="3" ry="4.5" fill="oklch(0.65 0.08 155)" opacity="0.6" />
          </motion.svg>
        </motion.div>
      ))}
    </div>
  )
}
