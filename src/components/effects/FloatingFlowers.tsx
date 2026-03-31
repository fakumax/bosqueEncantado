import { motion, useScroll, useTransform } from 'framer-motion'

interface Flower {
  id: number
  left: string
  top: string
  size: number
  rotation: number
}

const flowers: Flower[] = [
  { id: 1, left: '10%', top: '20%', size: 60, rotation: 0 },
  { id: 2, left: '85%', top: '15%', size: 50, rotation: 45 },
  { id: 3, left: '15%', top: '45%', size: 55, rotation: 90 },
  { id: 4, left: '88%', top: '50%', size: 65, rotation: 135 },
  { id: 5, left: '5%', top: '70%', size: 45, rotation: 180 },
  { id: 6, left: '92%', top: '75%', size: 58, rotation: 225 },
  { id: 7, left: '50%', top: '30%', size: 52, rotation: 270 },
  { id: 8, left: '25%', top: '85%', size: 48, rotation: 315 },
]

function FlowerSVG({ size }: { size: number }) {
  const { scrollYProgress } = useScroll()
  
  const petalScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.1])
  const petalOpacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 0.2])

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <g transform="translate(50, 50)">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <motion.ellipse
            key={i}
            cx="0"
            cy="-25"
            rx="15"
            ry="25"
            fill={`oklch(${0.80 - i * 0.02} 0.10 ${145 + i * 5})`}
            transform={`rotate(${angle})`}
            style={{
              scale: petalScale,
              opacity: petalOpacity,
              transformOrigin: 'center',
            }}
          />
        ))}
        <circle cx="0" cy="0" r="8" fill="oklch(0.75 0.12 85)" opacity="0.9" />
      </g>
    </svg>
  )
}

export function FloatingFlowers() {
  const { scrollYProgress } = useScroll()
  
  const flowersOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
      style={{ opacity: flowersOpacity }}
    >
      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          className="absolute"
          style={{
            left: flower.left,
            top: flower.top,
            rotate: flower.rotation,
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [flower.rotation, flower.rotation + 5, flower.rotation],
          }}
          transition={{
            duration: 4 + flower.id * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FlowerSVG size={flower.size} />
        </motion.div>
      ))}
    </motion.div>
  )
}
