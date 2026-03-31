import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Clock } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'

gsap.registerPlugin(ScrollTrigger)

export function Countdown() {
  const [isEventPassed, setIsEventPassed] = useState(false)
  const targetDate = new Date('2026-06-06T21:00:00-03:00').getTime()
  
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    handleResize() // check on mount
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (new Date().getTime() >= targetDate) {
      setIsEventPassed(true)
    }
  }, [targetDate])

  if (isEventPassed) {
    return (
      <section id="countdown" className="presentation-slide px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="p-8 bg-card/80 backdrop-blur">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">
              ¡La celebración ha llegado!
            </h2>
            <p className="text-muted-foreground">
              Es hora de celebrar este momento mágico
            </p>
          </Card>
        </div>
      </section>
    )
  }

  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="countdown" className="presentation-slide px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Clock size={32} weight="bold" className="text-accent" />
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-2">
            Cuenta Regresiva
          </h2>
          <p className="text-muted-foreground">
            Faltan solo...
          </p>
        </div>

        <div className="flex justify-center items-center w-full">
          <FlipClockCountdown 
            to={targetDate} 
            labels={['Días', 'Horas', 'Minutos', 'Segundos']}
            labelStyle={{ 
              fontSize: isMobile ? 9 : 13, 
              fontWeight: 500, 
              textTransform: 'uppercase', 
              color: '#a0b8a8', 
              fontFamily: '"Cormorant Garamond", serif',
              marginTop: isMobile ? '6px' : '12px'
            }}
            digitBlockStyle={{ 
              width: isMobile ? 30 : 60, 
              height: isMobile ? 45 : 85, 
              fontSize: isMobile ? 24 : 45, 
              backgroundColor: 'rgba(25, 65, 45, 0.7)', 
              color: '#d4c896', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.4)', 
              fontFamily: '"Cinzel Decorative", serif', 
              borderRadius: isMobile ? '4px' : '8px' 
            }}
            dividerStyle={{ color: 'rgba(143, 212, 176, 0.2)', height: 1 }}
            separatorStyle={{ color: '#d4c896', size: isMobile ? '3px' : '5px' }}
            duration={0.5}
            onComplete={() => setIsEventPassed(true)}
          />
        </div>

        <Card className="mt-12 p-8 bg-primary/5 border-2 border-primary/20 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="font-playfair text-2xl font-bold text-foreground mb-3">
              Una Celebración Especial
            </h3>
            <p className="text-foreground/80 max-w-3xl mx-auto">
              Únete a nosotros para celebrar la mayoría de edad de Sofía en una velada mágica 
              inspirada en los bosques encantados. Será una noche para recordar, llena de 
              sorpresas, alegría y momentos inolvidables junto a familia y amigos.
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}
