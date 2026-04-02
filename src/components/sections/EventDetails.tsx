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
    <section ref={sectionRef} id="detalles" className="presentation-slide px-4" style={{ justifyContent: 'center' }}>
      <div className="container mx-auto max-w-md w-full">
        <div className="text-center mb-4">
          <h2 className="font-playfair text-2xl md:text-4xl font-bold text-foreground mb-2">
            Detalles del Evento
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-snug">
            Prepárate para una noche mágica llena de alegría, música y momentos inolvidables
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {details.map((detail) => {
            const Icon = detail.icon
            return (
              <Card
                key={detail.title}
                className="px-4 py-3 bg-card/90 backdrop-blur"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/20 rounded-lg shrink-0">
                    <Icon size={24} weight="duotone" className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                      {detail.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-tight">
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
