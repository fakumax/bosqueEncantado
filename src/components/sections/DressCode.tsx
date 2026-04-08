import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Sparkle } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function DressCode() {
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
    <section ref={sectionRef} id="dresscode" style={{ width: '100%', height: '100vh' }}>
      <div className="book-message relative w-full h-full">
        <img
          src="/img/8-vestimenta/8.png"
          alt="Código de vestimenta"
          className="book-message__img absolute inset-0 w-full h-full object-cover z-0"
        />

        <div 
          className="absolute z-10 w-full px-4 max-w-[320px]"
          style={{ top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <Card className="px-5 py-6 bg-[#091a12]/85 border-[#c9a84c]/40 backdrop-blur-md shadow-2xl relative overflow-hidden rounded-2xl w-full">
            <div className="relative z-10 text-center flex flex-col items-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkle size={20} weight="fill" className="text-[#c9a84c]" />
                <h3 className="font-playfair text-2xl font-bold text-[#d4c896] uppercase tracking-wide">
                  Formal y Elegante
                </h3>
                <Sparkle size={20} weight="fill" className="text-[#c9a84c]" />
              </div>

              <div className="p-4 bg-[#133221]/40 border border-[#c9a84c]/20 rounded-xl">
                <p className="text-[#8BA995] text-sm md:text-base leading-relaxed">
                  Para mantener la magia de la noche, se reserva el <span className="font-bold text-[#c9a84c] tracking-wide uppercase">color verde</span> para la cumpleañera.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
