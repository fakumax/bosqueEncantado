import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const PARTICLE_COUNT = 30

const COLORS = [
  '#FFD700',  // gold
  '#FFEC80',  // soft yellow
  '#A7F3D0',  // mint green
  '#93C5FD',  // soft blue
  '#C4B5FD',  // lavender
  '#FCA5A5',  // soft pink
  '#FFFFFF',  // white
  '#FDE68A',  // warm yellow
]

interface Spark {
  id: number
  x: number
  y: number
  size: number
  color: string
  blur: number
  glowSize: number
  delay: number
  wanderDuration: number
  pulseDuration: number
  dx: number[]
  dy: number[]
}

export function Butterflies() {
  const [sparks, setSparks] = useState<Spark[]>([])

  useEffect(() => {
    const newSparks: Spark[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const size = 2 + Math.random() * 5
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        blur: 0.3 + Math.random() * 0.8,
        glowSize: size * (1.5 + Math.random() * 2),
        delay: Math.random() * 4,
        wanderDuration: 8 + Math.random() * 10,
        pulseDuration: 1.5 + Math.random() * 3,
        // random waypoints as % offsets for smooth wander
        dx: Array.from({ length: 6 }, () => (Math.random() - 0.5) * 120),
        dy: Array.from({ length: 6 }, () => (Math.random() - 0.5) * 120),
      }
    })
    setSparks(newSparks)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {sparks.map((s) => (
        <motion.div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            backgroundColor: s.color,
            boxShadow: `0 0 ${s.glowSize}px ${s.glowSize * 0.5}px ${s.color}, 0 0 ${s.glowSize * 2.5}px ${s.glowSize}px ${s.color}40`,
            filter: `blur(${s.blur}px)`,
          }}
          animate={{
            x: [...s.dx, 0],
            y: [...s.dy, 0],
            opacity: [0.3, 0.9, 0.2, 0.8, 0.4, 0.7, 0.3],
            scale: [1, 1.5, 0.6, 1.3, 0.8, 1.4, 1],
          }}
          transition={{
            duration: s.wanderDuration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
