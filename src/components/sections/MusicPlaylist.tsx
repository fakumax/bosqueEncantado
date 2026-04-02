import { useEffect, useRef } from 'react'
import { Sparkle } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function MusicPlaylist() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="despedida" className="presentation-slide px-4" style={{ justifyContent: 'center' }}>
      <div className="container mx-auto max-w-md w-full text-center">
        <div className="mb-6">
          <Sparkle size={40} weight="duotone" className="text-accent mx-auto mb-4" />
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-3">
            ¡Los espero!
          </h2>
        </div>

        <p className="text-foreground/80 text-sm leading-relaxed mb-6">
          Cada historia tiene un capítulo que marca para siempre.
          Este es el mío, y quiero que seas parte de él.
        </p>

        <p className="text-foreground/80 text-sm leading-relaxed mb-8">
          Preparate para una noche mágica donde los sueños
          se hacen realidad entre luces, risas y la magia
          de un bosque encantado.
        </p>

        <div className="flex items-center justify-center gap-2 text-accent">
          <Sparkle size={16} weight="fill" />
          <p className="font-playfair text-lg italic text-accent">
            Con todo mi cariño, Sofía
          </p>
          <Sparkle size={16} weight="fill" />
        </div>
      </div>
    </section>
  )
}
