import { useEffect, useRef } from 'react'
import { Heart, Sparkle } from '@phosphor-icons/react'
import { SparkleText } from '@/components/effects/SparkleText'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const curtainImage =
  'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1920&h=1080&fit=crop&crop=center'

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const curtainLeftRef = useRef<HTMLDivElement>(null)
  const curtainRightRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the viewport for the entire intro sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=1500',
          pin: viewportRef.current,
          scrub: 0.3,
          anticipatePin: 1,
          snap: {
            snapTo: [0, 0.5, 1],
            duration: { min: 0.2, max: 0.45 },
            delay: 0.05,
            ease: 'power1.inOut',
          },
        },
      })

      // ── Phase 1: "Érase una vez..." fades out ──
      tl.to(introRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.08,
        ease: 'power2.in',
      }, 0.02)

      // ── Phase 2: Curtain opens ──
      tl.to(curtainLeftRef.current, {
        xPercent: -100,
        duration: 0.18,
        ease: 'power2.inOut',
      }, 0.06)
      tl.to(curtainRightRef.current, {
        xPercent: 100,
        duration: 0.18,
        ease: 'power2.inOut',
      }, 0.06)

      // ── Phase 3: Princess message appears ──
      tl.fromTo(messageRef.current, {
        opacity: 0, y: 30,
      }, {
        opacity: 1, y: 0,
        duration: 0.1,
        ease: 'power2.out',
      }, 0.2)

      // ── Phase 4: Princess message fades out ──
      tl.to(messageRef.current, {
        opacity: 0, y: -30,
        duration: 0.1,
        ease: 'power2.in',
      }, 0.42)

      // ── Phase 5: Sofía content appears ──
      tl.fromTo(contentRef.current, {
        opacity: 0, y: 40, scale: 0.95,
      }, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.12,
        ease: 'power3.out',
      }, 0.5)

      // Sofía stays visible from 0.5 to 1.0 — no fade out
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} id="inicio">
      <div ref={viewportRef} className="intro-viewport">
        {/* Background */}
        <div className="intro-viewport__bg" />

        {/* Curtain */}
        <div ref={curtainLeftRef} className="intro-curtain intro-curtain--left">
          <div className="intro-curtain__img" style={{ backgroundImage: `url(${curtainImage})` }} />
        </div>
        <div ref={curtainRightRef} className="intro-curtain intro-curtain--right">
          <div className="intro-curtain__img" style={{ backgroundImage: `url(${curtainImage})` }} />
        </div>

        {/* Érase una vez... */}
        <div ref={introRef} className="intro-text">
          <p className="intro-text__title">Érase<br />una vez...</p>
        </div>

        {/* Princess message */}
        <div ref={messageRef} className="intro-message">
          <Sparkle size={32} weight="fill" className="intro-message__sparkle" />
          <p className="intro-message__line">En un reino de sueños y estrellas</p>
          <p className="intro-message__line">una princesa está por celebrar</p>
          <p className="intro-message__line intro-message__line--gold">
            el capítulo más hermoso de su historia...
          </p>
          <Sparkle size={32} weight="fill" className="intro-message__sparkle" />
        </div>

        {/* Sofía content */}
        <div ref={contentRef} className="intro-hero">
          <div className="intro-hero__inner">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkle size={28} weight="fill" className="text-accent animate-float" />
              <Heart size={20} weight="fill" className="text-primary/60" />
              <Sparkle size={28} weight="fill" className="text-accent animate-float" />
            </div>

            <div className="mb-4">
              <SparkleText text="Sofía" />
            </div>

            <div className="space-y-2 mb-8">
              <p className="text-xl md:text-2xl text-foreground/80 font-medium">
                Celebra conmigo mis XV años
              </p>
              <p className="text-lg md:text-xl text-muted-foreground italic">
                Un momento mágico para recordar
              </p>
            </div>

            <div className="inline-block bg-accent/15 border border-accent/40 rounded-full px-8 py-3 backdrop-blur-sm">
              <p className="text-accent font-semibold text-lg tracking-wide">
                6 de Junio, 2026
              </p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#rsvp" className="hero-cta hero-cta--primary">
                Confirmar Asistencia
              </a>
              <a href="#detalles" className="hero-cta hero-cta--secondary">
                Ver Detalles
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
