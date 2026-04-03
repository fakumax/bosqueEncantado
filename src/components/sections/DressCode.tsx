import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Dress, Sparkle } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function DressCode() {
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
    <section ref={sectionRef} id="dresscode" className="h-full flex items-center justify-center p-6 relative z-10 w-full">
      <div className="container mx-auto max-w-lg w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-6 bg-accent/20 p-4 rounded-full border border-accent/30 shadow-lg">
            <Dress size={48} weight="duotone" className="text-accent" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-accent/90 mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Dress Code
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 font-medium">
            Código de Vestimenta
          </p>
        </div>

        <Card className="p-8 bg-[#091a12]/80 border-accent/20 backdrop-blur shadow-2xl relative overflow-hidden rounded-2xl w-full">
          <div className="absolute inset-0 bg-[url('/img/magic-dust.png')] opacity-10 mix-blend-screen pointer-events-none" />
          
          <div className="relative z-10 text-center flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkle size={20} weight="fill" className="text-accent" />
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white">
                Formal y Elegante
              </h3>
              <Sparkle size={20} weight="fill" className="text-accent" />
            </div>
            
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl my-4">
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Para mantener la magia de la noche, se reserva el <span className="font-bold text-[#c9a84c] tracking-wide">color verde</span> para la cumpleañera.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}