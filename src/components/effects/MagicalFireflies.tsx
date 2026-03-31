import { useEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'

const FIREFLY_COUNT = 25

// Palette ranging from warm gold to cool white
const COLORS = [
  { bg: '#FFD700', glow: 'rgba(255,215,0,0.6)' },   // gold
  { bg: '#FFEC80', glow: 'rgba(255,236,128,0.5)' },  // soft yellow
  { bg: '#FDE047', glow: 'rgba(253,224,71,0.5)' },   // yellow
  { bg: '#FEF3C7', glow: 'rgba(254,243,199,0.5)' },  // cream
  { bg: '#FFF8DC', glow: 'rgba(255,248,220,0.45)' }, // cornsilk
  { bg: '#FFFDE4', glow: 'rgba(255,253,228,0.4)' },  // pale yellow
  { bg: '#FFFFFF', glow: 'rgba(255,255,255,0.45)' },  // white
]

interface Firefly {
  size: number
  color: typeof COLORS[number]
  blur: number
  glowSize: number
}

export function MagicalFireflies() {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<(HTMLDivElement | null)[]>([])

  // Pre-compute random traits per firefly so they stay stable across renders
  const traits = useMemo<Firefly[]>(() =>
    Array.from({ length: FIREFLY_COUNT }, () => {
      const size = gsap.utils.random(2, 7, 1)
      return {
        size,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        blur: gsap.utils.random(0.3, 1.2),
        glowSize: size * gsap.utils.random(1.5, 3),
      }
    }), [])

  useEffect(() => {
    const particles = particlesRef.current.filter(Boolean) as HTMLDivElement[]
    if (particles.length === 0) return

    // Scatter randomly on mount
    particles.forEach((p) => {
      gsap.set(p, {
        x: gsap.utils.random(0, window.innerWidth),
        y: gsap.utils.random(0, window.innerHeight),
        scale: gsap.utils.random(0.5, 1.3),
        opacity: gsap.utils.random(0.3, 0.9),
      })
    })

    // Each firefly gets its own shimmer cycle — varying speed, opacity, scale
    const pulseTweens = particles.map((p) =>
      gsap.to(p, {
        opacity: gsap.utils.random(0.15, 1),
        scale: gsap.utils.random(0.4, 1.8),
        duration: gsap.utils.random(0.8, 3),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: gsap.utils.random(0, 2),
      })
    )

    const getPointer = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
      if ('clientX' in e) {
        return { x: e.clientX, y: e.clientY }
      }
      return null
    }

    const onMove = (e: MouseEvent | TouchEvent) => {
      const pos = getPointer(e)
      if (!pos) return

      particles.forEach((p, i) => {
        // Wide spread so they don't clump — spread grows with index too
        const base = 35 + traits[i].size * 8
        const extra = i * 4 // outer fireflies drift further away
        const spread = base + extra
        // Random angle so they scatter in a circle, not a square
        const angle = Math.random() * Math.PI * 2
        const radius = gsap.utils.random(spread * 0.3, spread)
        gsap.to(p, {
          x: pos.x + Math.cos(angle) * radius,
          y: pos.y + Math.sin(angle) * radius,
          duration: 0.4 + i * 0.04,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchstart', onMove, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchstart', onMove)
      window.removeEventListener('touchmove', onMove)
      pulseTweens.forEach((t) => t.kill())
      gsap.killTweensOf(particles)
    }
  }, [traits])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {traits.map((f, i) => (
        <div
          key={i}
          ref={(el) => { particlesRef.current[i] = el }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: f.size,
            height: f.size,
            borderRadius: '50%',
            backgroundColor: f.color.bg,
            boxShadow: `0 0 ${f.glowSize}px ${f.glowSize * 0.5}px ${f.color.bg}, 0 0 ${f.glowSize * 2.5}px ${f.glowSize}px ${f.color.glow}`,
            filter: `blur(${f.blur}px)`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  )
}
