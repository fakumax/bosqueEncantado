import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, NavigationArrow } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Location() {
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
  const venueName = 'Salón de Eventos Jardín Mágico'
  const address = 'Av. Principal 1234, Ciudad de Buenos Aires'
  const mapsUrl = 'https://maps.google.com/?q=-34.6037,-58.3816'

  return (
    <section ref={sectionRef} id="ubicacion" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <MapPin size={40} weight="duotone" className="text-accent" />
          </div>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-4">
            Ubicación
          </h2>
          <p className="text-lg text-muted-foreground">
            Te esperamos en este mágico lugar
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <Card className="p-8 bg-card/90 backdrop-blur">
            <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
              {venueName}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={24} weight="fill" className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-1">Dirección</p>
                  <p className="text-muted-foreground">{address}</p>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  asChild
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                >
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2"
                  >
                    <NavigationArrow size={20} weight="bold" />
                    Abrir en Google Maps
                  </a>
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-2 bg-card/90 backdrop-blur overflow-hidden h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168881960983!2d-58.383659!3d-34.603722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM2JzEzLjQiUyA1OMKwMjMnMDEuMiJX!5e0!3m2!1sen!2sar!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
          </Card>
        </div>
      </div>
    </section>
  )
}
