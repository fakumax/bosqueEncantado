import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { MapPin, NavigationArrow, Clock, Church } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Ceremony() {
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

  const churchName = 'Parroquia San Miguel Arcángel' // Cambiar al nombre de la iglesia real
  const address = 'Dirección de la iglesia, Ciudad, Provincia' // Cambiar a dirección real
  const time = '20:00 hs' // Cambiar al horario real
  const mapsUrl = 'https://maps.google.com/' // Cambiar al link real

  return (
    <section ref={sectionRef} id="ceremonia" className="h-full flex items-center justify-center p-6 relative z-10 w-full">
      <div className="container mx-auto max-w-lg w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-6 bg-accent/20 p-4 rounded-full border border-accent/30 shadow-lg">
            <Church size={48} weight="duotone" className="text-accent" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-accent/90 mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Ceremonia
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 font-medium">
            Bendición de mis XV años
          </p>
        </div>

        <Card className="p-8 bg-[#091a12]/80 border-accent/20 backdrop-blur shadow-2xl relative overflow-hidden rounded-2xl w-full">
          <div className="absolute inset-0 bg-[url('/img/magic-dust.png')] opacity-10 mix-blend-screen pointer-events-none" />
          
          <div className="relative z-10 text-center flex flex-col items-center">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-accent mb-6">
              {churchName}
            </h3>
            
            <div className="flex flex-col gap-6 w-full mb-8">
              <div className="flex items-center gap-4 text-left">
                <div className="bg-accent/10 p-3 rounded-full flex-shrink-0 border border-accent/20">
                  <Clock size={28} weight="fill" className="text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground/90 text-lg">Horario</p>
                  <p className="text-muted-foreground">{time}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-left">
                <div className="bg-accent/10 p-3 rounded-full flex-shrink-0 border border-accent/20">
                  <MapPin size={28} weight="fill" className="text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground/90 text-lg">Ubicación</p>
                  <p className="text-muted-foreground">{address}</p>
                </div>
              </div>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-accent/90 hover:bg-accent text-accent-foreground font-bold py-4 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(212,200,150,0.3)] hover:shadow-[0_0_20px_rgba(212,200,150,0.5)] hover:scale-[1.02]"
            >
              <NavigationArrow size={24} weight="bold" />
              <span className="text-lg">Cómo llegar</span>
            </a>
          </div>
        </Card>
      </div>
    </section>
  )
}