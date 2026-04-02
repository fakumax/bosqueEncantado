import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768

export function MagicParticles() {
  useEffect(() => {
    // Skip entirely on mobile — fullscreen video + mix-blend-screen is too heavy
    if (isMobile) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#inicio',
        start: 'top+=750 top',
        onEnter: () => gsap.to('#spark-overlay', { autoAlpha: 1, duration: 1.5, ease: 'power2.out' }),
        onLeaveBack: () => gsap.to('#spark-overlay', { autoAlpha: 0, duration: 1, ease: 'power2.inOut' }),
      })
    })

    return () => ctx.revert()
  }, [])

  // Don't render video on mobile at all
  if (isMobile) return null

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
