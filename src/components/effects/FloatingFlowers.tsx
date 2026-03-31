import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const curtainImage =
  'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1920&h=1080&fit=crop&crop=center'

export function FloatingFlowers() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#inicio',
          start: 'top top',
          end: '+=600',   // 600px of scroll opens the curtain — fast and snappy
          scrub: 1,
          pin: false,
        },
      })

      // Intro text fades out in the first half of the scroll
      tl.to(introRef.current, {
        opacity: 0,
        scale: 1.1,
        y: -60,
        ease: 'power2.in',
      }, 0)

      // Both curtain halves open simultaneously
      tl.to(leftRef.current, {
        xPercent: -100,
        ease: 'power2.inOut',
      }, 0.15)

      tl.to(rightRef.current, {
        xPercent: 100,
        ease: 'power2.inOut',
      }, 0.15)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="flower-curtain">
      {/* Left half of the curtain */}
      <div ref={leftRef} className="flower-curtain__half flower-curtain__half--left">
        <div
          className="flower-curtain__image"
          style={{ backgroundImage: `url(${curtainImage})` }}
        />
      </div>

      {/* Right half of the curtain */}
      <div ref={rightRef} className="flower-curtain__half flower-curtain__half--right">
        <div
          className="flower-curtain__image"
          style={{ backgroundImage: `url(${curtainImage})` }}
        />
      </div>

      {/* Dark overlay for depth */}
      <div className="flower-curtain__overlay" />

      {/* "Érase una vez..." — inside curtain so it's always above the flowers */}
      <div ref={introRef} className="flower-curtain__intro">
        <p className="flower-curtain__intro-text">
          Érase<br />una vez...
        </p>
      </div>
    </div>
  )
}
