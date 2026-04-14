import { useEffect, useRef } from 'react'
import { MapPin } from '@phosphor-icons/react'
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

  const mapsUrl = 'https://www.google.com/maps/place/Espacio+Recreativo+IPLyC/@-27.3663442,-55.9393798,17z/data=!3m1!4b1!4m6!3m5!1s0x9457bdfef28b1ac5:0x3ac4b81af4a2672!8m2!3d-27.3663442!4d-55.9393798!16s%2Fg%2F11d_7sw5f4'

  return (
    <section ref={sectionRef} id="detalles" style={{ width: '100%', height: '100vh' }}>
      <div className="book-message">
        <img
          src="/img/6-detalles/6.png"
          alt="Detalles"
          className="book-message__img"
        />

        {/* Botón interactivo sobre la imagen, posicionado un poco más arriba de la mitad */}
        <div
          className="absolute flex items-center justify-center w-full z-10"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#091a12] text-white shadow-[0_4px_15px_rgba(0,0,0,0.6)] border-2 border-[#c9a84c] px-7 py-2.5 rounded-full font-bold hover:bg-[#133221] transition-all uppercase tracking-widest text-xs flex items-center gap-2 hover:scale-105 hover:shadow-[0_0_20px_rgba(201,168,76,0.5)]"
          >
            <MapPin size={18} weight="fill" color="#c9a84c" />
            CÓMO LLEGAR
          </a>
        </div>
        </div>
    </section>
  )
}
