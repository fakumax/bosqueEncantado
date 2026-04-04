import { useEffect, useRef } from 'react'
import { Sparkle } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ThankYou() {
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
    <section ref={sectionRef} id="despedida" style={{ width: '100%', height: '100vh' }}>
      <div className="book-message">
        <img
          src="/img/11-despedida/11.png"
          alt="Despedida"
          className="book-message__img"
        />
      
        </div>
    </section>
  )
}
