import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { MapPin, NavigationArrow, Clock } from '@phosphor-icons/react'
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
    <section ref={sectionRef} id="ceremonia" style={{ width: '100%', height: '100%' }}>
      <div className="book-message relative w-full h-full">
        <img
          src="/img/4-ceremonia/4.png"
          alt="Ceremonia"
          className="book-message__img absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Contenido colocado sobre la imagen */}
        <div 
          className="absolute z-10 w-full px-4 max-w-[340px]"
          style={{ bottom: '30%', left: '50%', transform: 'translateX(-50%)' }}
        >
          <Card className="p-6 bg-[#091a12]/95 border-accent/20 shadow-2xl relative overflow-hidden rounded-2xl w-full">
            <div className="absolute inset-0 bg-[url('/img/magic-dust.png')] opacity-10 mix-blend-screen pointer-events-none" />
            
            <div className="relative z-10 text-center flex flex-col items-center">
              <h3 className="font-playfair text-xl font-bold text-accent mb-4 uppercase tracking-wider">
                {churchName}
              </h3>
              
              <div className="flex flex-col gap-4 w-full mb-6">
                <div className="flex items-center gap-3 text-left">
                  <div className="bg-accent/10 p-2 rounded-full flex-shrink-0 border border-accent/20">
                    <Clock size={20} weight="fill" className="text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Horario</p>
                    <p className="text-accent/90 text-sm">{time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-left">
                  <div className="bg-accent/10 p-2 rounded-full flex-shrink-0 border border-accent/20">
                    <MapPin size={20} weight="fill" className="text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Ubicación</p>
                    <p className="text-accent/90 text-sm">{address}</p>
                  </div>
                </div>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#091a12] text-white shadow-[0_4px_15px_rgba(0,0,0,0.6)] border-2 border-[#c9a84c] px-6 py-2 rounded-full font-bold hover:bg-[#133221] transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-105 hover:shadow-[0_0_20px_rgba(201,168,76,0.5)] w-full"
              >
                <MapPin size={18} weight="fill" color="#c9a84c" />
                CÓMO LLEGAR
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}