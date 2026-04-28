import { useEffect, useRef } from 'react'
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

  const mapsUrl = 'https://maps.google.com/' // Cambiar al link real

  return (
    <section ref={sectionRef} id="ceremonia" style={{ width: '100%', height: '100%' }}>
      <div className="book-message relative w-full h-full">
        <img
          src="/img/4-ceremonia/4.webp"
          alt="Ceremonia"
          className="book-message__img absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Contenido colocado sobre la imagen */}
        <div
          className="absolute z-10"
          style={{ bottom: '63%', left: '50%', transform: 'translate(-50%, 50%)' }}
        >
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Cómo llegar"
            className="group inline-block transition-transform duration-300 hover:scale-105"
          >
            <picture>
              <source srcSet="/img/botonComollegar.webp" type="image/webp" />
              <img
                src="/img/botonComollegar.png"
                alt=""
                className="block h-auto w-[210px] max-w-full drop-shadow-[0_4px_15px_rgba(0,0,0,0.35)] transition-[filter] duration-300 group-hover:drop-shadow-[0_0_18px_rgba(201,168,76,0.45)]"
              />
            </picture>
          </a>
        </div>
      </div>
    </section>
  )
}