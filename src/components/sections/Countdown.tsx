import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Clock } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isEventPassed, setIsEventPassed] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date('2026-06-06T21:00:00-03:00')
      const now = new Date()
      const difference = eventDate.getTime() - now.getTime()

      if (difference <= 0) {
        setIsEventPassed(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (isEventPassed) {
    return (
      <section id="countdown" className="py-16 px-4">
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
    <section ref={sectionRef} id="countdown" className="py-16 px-4">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: 'Días', value: timeLeft.days },
            { label: 'Horas', value: timeLeft.hours },
            { label: 'Minutos', value: timeLeft.minutes },
            { label: 'Segundos', value: timeLeft.seconds },
          ].map((item) => (
            <Card
              key={item.label}
              className="p-6 md:p-8 bg-card/80 backdrop-blur border-2 border-border hover:border-accent transition-all"
            >
              <div className="text-center">
                <div className="font-playfair text-4xl md:text-6xl font-bold text-accent mb-2">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wide">
                  {item.label}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
