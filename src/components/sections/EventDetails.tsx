import { useEffect, useRef } from 'react'
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
    <section ref={sectionRef} id="detalles" style={{ width: '100%', height: '100%' }}>
      <div className="book-message">
        <img
          src="/img/5-detalles/5.webp"
          alt="Detalles"
          className="book-message__img"
        />

        {/* Botón interactivo sobre la imagen, posicionado un poco más arriba de la mitad */}
        <div
          className="absolute z-10"
          style={{ top: '46%', left: '50%', transform: 'translate(-50%, -50%)' }}
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
