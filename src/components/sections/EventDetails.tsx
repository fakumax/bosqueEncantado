import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Calendar, Clock, Sparkle, Dress } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function EventDetails() {
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
  const details = [
    {
      icon: Calendar,
      title: 'Fecha',
      value: 'Sábado, 6 de Junio de 2026',
    },
    {
      icon: Clock,
      title: 'Hora',
      value: '21:00 hs',
    },
    {
      icon: Dress,
      title: 'Código de Vestimenta',
      value: 'Elegante Formal',
    },
    {
      icon: Sparkle,
      title: 'Tema',
      value: 'Bosque Encantado',
    },
  ]

  return (
    <section ref={sectionRef} id="detalles" className="presentation-slide px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-4">
            Detalles del Evento
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prepárate para una noche mágica llena de alegría, música y momentos inolvidables
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {details.map((detail) => {
            const Icon = detail.icon
            return (
              <Card
                key={detail.title}
                className="p-6 bg-card/90 backdrop-blur hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/20 rounded-lg">
                    <Icon size={32} weight="duotone" className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      {detail.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {detail.value}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
