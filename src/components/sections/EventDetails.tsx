import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Calendar, Clock, MapPin, NavigationArrow } from '@phosphor-icons/react'
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
  ]

  const venueName = 'Espacio Recreativo IPLyC'
  const address = 'Av. Jauretche esq. Av. Tambor de Tacuarí, Posadas, Misiones'
  const mapsUrl = 'https://www.google.com/maps/place/Espacio+Recreativo+IPLyC/@-27.3663442,-55.9393798,17z/data=!3m1!4b1!4m6!3m5!1s0x9457bdfef28b1ac5:0x3ac4b81af4a2672!8m2!3d-27.3663442!4d-55.9393798!16s%2Fg%2F11d_7sw5f4'

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

          <Card className="p-5 bg-card/90 backdrop-blur mt-2">
            <h3 className="font-playfair text-xl font-bold text-foreground mb-3 text-center">
              {venueName}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={24} weight="fill" className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-1 text-sm uppercase tracking-wide">Dirección</p>
                  <p className="text-muted-foreground text-sm">{address}</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-accent/90 hover:bg-accent text-accent-foreground font-bold py-3 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(212,200,150,0.3)] hover:shadow-[0_0_20px_rgba(212,200,150,0.5)] hover:scale-[1.02]"
                >
                  <NavigationArrow size={20} weight="bold" />
                  <span>Cómo llegar</span>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
