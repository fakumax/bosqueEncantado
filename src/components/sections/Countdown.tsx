import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'

gsap.registerPlugin(ScrollTrigger)

export function Countdown() {
  const [isEventPassed, setIsEventPassed] = useState(false)
  const targetDate = new Date('2026-06-06T21:00:00-03:00').getTime()
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  if (isEventPassed) {
    return (
      <section ref={sectionRef} id="countdown" style={{ width: '100%', height: '100%' }}>
        <div className="book-message">
          <img
            src="/img/5-cuenta-regresiva/5.png"
            alt="Cuenta Regresiva"
            className="book-message__img"
          />
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="countdown" style={{ width: '100%', height: '100%' }}>
      <div className="book-message">
        <img
          src="/img/5-cuenta-regresiva/5.png"
          alt="Cuenta Regresiva"
          className="book-message__img"
        />

        <div 
          className="absolute flex justify-center items-center w-full z-10"
          style={{ top: '38%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <FlipClockCountdown
            to={targetDate}
            labels={['Días', 'Horas', 'Minutos', 'Segundos']}
            labelStyle={{
              fontSize: isMobile ? 9 : 13,
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#091a12',
              fontFamily: '"Cormorant Garamond", serif',
              marginTop: isMobile ? '6px' : '12px',
              textShadow: '0px 1px 2px rgba(255,255,255,0.5)'
            }}
            digitBlockStyle={{
              width: isMobile ? 30 : 60,
              height: isMobile ? 45 : 85,
              fontSize: isMobile ? 24 : 45,
              backgroundColor: 'rgba(9, 26, 18, 0.85)',
              color: '#d4c896',
              boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
              fontFamily: '"Cinzel Decorative", serif',
              borderRadius: isMobile ? '4px' : '8px',
              border: '1px solid rgba(201, 168, 76, 0.3)'
            }}
            dividerStyle={{ color: 'rgba(201, 168, 76, 0.4)', height: 1 }}
            separatorStyle={{ color: '#d4c896', size: isMobile ? '3px' : '5px' }}
            duration={0.5}
            onComplete={() => setIsEventPassed(true)}
          />
        </div>
      </div>
    </section>
  )
}
