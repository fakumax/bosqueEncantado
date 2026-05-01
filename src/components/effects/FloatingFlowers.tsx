import { useEffect, useRef } from 'react'
import { Sparkle } from '@phosphor-icons/react'
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
  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Master timeline for the full intro sequence ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#inicio',
          start: 'top top',
          end: '+=900',
          scrub: 0.8,
          pin: false,
        },
      })

      // 1) "Érase una vez..." fades out (0 → 0.15)
      tl.to(introRef.current, {
        opacity: 0,
        scale: 1.1,
        y: -60,
        ease: 'power2.in',
        duration: 0.15,
      }, 0)

      // 2) Curtain halves open (0.08 → 0.45)
      tl.to(leftRef.current, {
        xPercent: -100,
        ease: 'power2.inOut',
        duration: 0.37,
      }, 0.08)
      tl.to(rightRef.current, {
        xPercent: 100,
        ease: 'power2.inOut',
        duration: 0.37,
      }, 0.08)

      // 3) Story message fades in (0.35 → 0.55)
      tl.fromTo(messageRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.95,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: 'power2.out',
        duration: 0.2,
      }, 0.35)

      // 4) Story message fades out (0.7 → 0.9)
      tl.to(messageRef.current, {
        opacity: 0,
        y: -50,
        scale: 1.05,
        ease: 'power2.in',
        duration: 0.2,
      }, 0.7)

      // 5) Show navigation after intro finishes
      ScrollTrigger.create({
        trigger: '#inicio',
        start: '+=850',
        onEnter: () => {
          gsap.to('#main-nav', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        },
        onLeaveBack: () => {
          gsap.to('#main-nav', { autoAlpha: 0, y: -20, duration: 0.3 })
        },
      })
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

      {/* "Érase una vez..." — visible on page load */}
      <div ref={introRef} className="flower-curtain__intro">
        <p className="flower-curtain__intro-text">
          Érase<br />una vez...
        </p>
      </div>

      {/* Story message — revealed after curtain opens */}
      <div ref={messageRef} className="flower-curtain__message">
        <Sparkle size={32} weight="fill" className="flower-curtain__message-sparkle" />
        <p className="flower-curtain__message-line1">
          En un reino de sueños y estrellas
        </p>
        <p className="flower-curtain__message-line2">
          una princesa está por celebrar
        </p>
        <p className="flower-curtain__message-line3">
          el capítulo más hermoso de su historia...
        </p>
        <Sparkle size={32} weight="fill" className="flower-curtain__message-sparkle" />
      </div>
    </div>
  )
}
