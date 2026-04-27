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
            src="/img/5-cuenta-regresiva/5.webp"
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
          src="/img/5-cuenta-regresiva/5.webp"
          alt="Cuenta Regresiva"
          className="book-message__img"
        />

        <div 
          className="absolute flex justify-center items-center z-10"
          style={{ top: '50%', left: '36%', transform: 'translate(-50%, -50%)' }}
        >
          <style>{`
            .compact-countdown { gap: 0 !important; }
            .compact-countdown .fcc__unit_time { 
              display: grid !important;
              grid-template-columns: auto auto !important;
              column-gap: 3px !important;
              row-gap: 0 !important;
              align-items: center !important;
              justify-content: center !important;
              margin-bottom: ${isMobile ? '-60px' : '-54px'} !important;
            }
            .compact-countdown .fcc__label { 
              position: static !important;
              transform: none !important;
              grid-column: 1 / -1 !important;
              grid-row: 2 !important;
              text-align: center !important;
              order: 2 !important;
              margin-top: 4px !important;
              line-height: 1 !important;
            }
            .compact-countdown .fcc__digit_block {
              grid-row: 1 !important;
              order: 1 !important;
            }
          `}</style>
          <FlipClockCountdown
            className="compact-countdown !flex-col"
            showSeparators={false}
            to={targetDate}
            labels={['Días', 'Horas', 'Minutos', 'Segundos']}
            labelStyle={{
              fontSize: isMobile ? 12 : 14,
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#091a12',
              fontFamily: '"Cormorant Garamond", serif',
              marginTop: '2px',
              textShadow: '0px 1px 2px rgba(255,255,255,0.5)'
            }}
            digitBlockStyle={{
              width: isMobile ? 38 : 68,
              height: isMobile ? 50 : 80,
              fontSize: isMobile ? 30 : 52,
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
