import { useEffect, useRef } from 'react'
import { Heart, Sparkle } from '@phosphor-icons/react'
import { SparkleText } from '@/components/effects/SparkleText'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sofía content reveals as the curtain finishes opening
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '+=400',   // starts revealing after curtain begins opening
            end: '+=500',     // fully visible 500px later
            scrub: 1,
          },
        }
      )

      // Parallax gradient overlay
      gsap.to('.hero-gradient-overlay', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="hero-section"
    >
      {/* Deep forest gradient overlay */}
      <div className="hero-gradient-overlay" />

      {/* Ambient glow spots */}
      <div className="hero-glow hero-glow--left" />
      <div className="hero-glow hero-glow--right" />

      {/* ═══ CONTENT — revealed after curtain opens ═══ */}
      <div ref={contentRef} className="hero-content">
        <div className="hero-content__inner">
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

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="#rsvp"
              className="hero-cta hero-cta--primary"
            >
              Confirmar Asistencia
            </a>
            <a
              href="#detalles"
              className="hero-cta hero-cta--secondary"
            >
              Ver Detalles
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#091a12] to-transparent z-10" />
    </section>
  )
}
