import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'

interface StoryBookProps {
  children: ReactElement[]
}

const FLIP_DURATION_S = 0.75
const COOLDOWN_MS = 850
const SWIPE_MIN_PX = 50
const WHEEL_MIN_PX = 15

type FlipState = {
  flippingIndex: number
  underneathIndex: number
  targetIndex: number
  dir: 'next' | 'prev'
}

export function StoryBook({ children }: StoryBookProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [flipping, setFlipping] = useState<FlipState | null>(null)
  const flipAngle = useMotionValue(0)
  const isAnimatingRef = useRef(false)
  const lastFlipTime = useRef(0)

  const tryFlip = useCallback(
    (dir: 'next' | 'prev') => {
      if (isAnimatingRef.current) return
      const now = Date.now()
      if (now - lastFlipTime.current < COOLDOWN_MS) return

      const target = dir === 'next' ? displayIndex + 1 : displayIndex - 1
      if (target < 0 || target >= children.length) return

      lastFlipTime.current = now
      isAnimatingRef.current = true

      const flippingIndex = dir === 'next' ? displayIndex : target
      const underneathIndex = dir === 'next' ? target : displayIndex
      const fromAngle = dir === 'next' ? 0 : -180
      const toAngle = dir === 'next' ? -180 : 0

      flipAngle.set(fromAngle)
      setFlipping({ flippingIndex, underneathIndex, targetIndex: target, dir })

      animate(flipAngle, toAngle, {
        duration: FLIP_DURATION_S,
        ease: [0.42, 0, 0.4, 1],
        onComplete: () => {
          setDisplayIndex(target)
          setFlipping(null)
          isAnimatingRef.current = false
        },
      })
    },
    [children.length, displayIndex, flipAngle],
  )

  useEffect(() => {
    const c = containerRef.current
    if (!c) return

    let touchStartY = 0
    let touchStartX = 0

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (Math.abs(e.deltaY) < WHEEL_MIN_PX) return
      tryFlip(e.deltaY > 0 ? 'next' : 'prev')
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartX = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY - e.changedTouches[0].clientY
      const dx = Math.abs(touchStartX - e.changedTouches[0].clientX)
      if (Math.abs(dy) > SWIPE_MIN_PX && Math.abs(dy) > dx) {
        tryFlip(dy > 0 ? 'next' : 'prev')
      }
    }

    c.addEventListener('wheel', handleWheel, { passive: false })
    c.addEventListener('touchstart', handleTouchStart, { passive: true })
    c.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      c.removeEventListener('wheel', handleWheel)
      c.removeEventListener('touchstart', handleTouchStart)
      c.removeEventListener('touchend', handleTouchEnd)
    }
  }, [tryFlip])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden touch-none"
      style={{
        backgroundColor: '#091a12',
        perspective: '2200px',
      }}
    >
      {children.map((child, i) => {
        const isCurrent = !flipping && i === displayIndex
        const isFlipping = flipping?.flippingIndex === i
        const isUnderneath = flipping?.underneathIndex === i
        const visible = isCurrent || isFlipping || isUnderneath

        return (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              visibility: visible ? 'visible' : 'hidden',
              zIndex: isFlipping ? 10 : 1,
              transformStyle: 'preserve-3d',
              transformOrigin: 'left center',
              backfaceVisibility: 'visible',
              rotateY: isFlipping ? flipAngle : 0,
              willChange: isFlipping ? 'transform' : undefined,
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                backgroundColor: '#091a12',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)',
              }}
            >
              {child}
            </div>

            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background:
                  'linear-gradient(160deg, #8b6914 0%, #c9a84c 20%, #f5d98a 45%, #e8c860 55%, #c9a84c 75%, #8b6914 100%)',
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}