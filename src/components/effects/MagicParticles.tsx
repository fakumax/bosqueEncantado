import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function MagicParticles() {
  useEffect(() => {
    // Show spark particles when scrolling past the intro threshold (approx 750px)
    // and keep them visible indefinitely for the rest of the site (todo mas abajo)
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#inicio',
        // 'top+=750 top' matches Phase 5 (50% of the 1500px intro) in Hero.tsx
        start: 'top+=750 top',
        onEnter: () => gsap.to('#spark-overlay', { autoAlpha: 1, duration: 1.5, ease: 'power2.out' }),
        onLeaveBack: () => gsap.to('#spark-overlay', { autoAlpha: 0, duration: 1, ease: 'power2.inOut' }),
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      id="spark-overlay"
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden mix-blend-screen"
      style={{ opacity: 0, visibility: 'hidden' }}
    >
      <video
        src="/videos/spark1.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  )
}
