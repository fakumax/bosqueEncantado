import { useEffect, useRef } from 'react'
import { Heart, Sparkle } from '@phosphor-icons/react'
import { SparkleText } from '@/components/effects/SparkleText'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })
ScrollTrigger.normalizeScroll(true)

const curtainVideo = '/videos/forestStart.mp4'

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const curtainLeftRef = useRef<HTMLDivElement>(null)
  const curtainRightRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const videoLeftRef = useRef<HTMLVideoElement>(null)
  const videoRightRef = useRef<HTMLVideoElement>(null)
  
  // Refs para las imágenes de 'Érase una vez'
  const img1Ref = useRef<HTMLImageElement>(null)
  const img2Ref = useRef<HTMLImageElement>(null)
  const img3Ref = useRef<HTMLImageElement>(null)

  // Sincronizar ambos videos para que se vean como uno solo
  useEffect(() => {
    const left = videoLeftRef.current
    const right = videoRightRef.current
    if (!left || !right) return

    // En móviles, sincronizar con exactitud mediante 'currentTime' causa que el video
    // entre en un bucle infinito de "cargando" y se congele. 
    // La mejor solución es obligarlos a arrancar al mismo tiempo y dejarlos sueltos.
    const playVideos = async () => {
      try {
        await Promise.all([
          left.play().catch(() => {}),
          right.play().catch(() => {})
        ])
      } catch (e) {
        // Ignorar errores de autoplay
      }
    }
    
    // Ejecutar con un pequeñísimo delay para asegurar que el navegador los registró
    setTimeout(playVideos, 50)

    left.addEventListener('play', playVideos)
    left.addEventListener('pause', () => right.pause())

    return () => {
      left.removeEventListener('play', playVideos)
      left.removeEventListener('pause', () => right.pause())
    }
  }, [])

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tlIntro = gsap.timeline({ defaults: { ease: 'power2.inOut' } })
      
      // Estado inicial (oculto por las dudas aunque empiece en opacity 0 en CSS/JSX)
      gsap.set([img1Ref.current, img2Ref.current, img3Ref.current], { opacity: 0 })
      
      tlIntro
        // 1. Aparece el texto lentamente
        .to(img1Ref.current, { opacity: 1, duration: 2 })
        // 2. Aparecen las figuras con un efecto de "barrido" (como chispas dibujándolas) usando clipPath
        .fromTo(img2Ref.current,
          { opacity: 1, clipPath: 'inset(0% 100% 0% 0%)', filter: 'brightness(2) drop-shadow(0 0 10px rgba(255,215,0,0.8))' },
          { clipPath: 'inset(0% 0% 0% 0%)', filter: 'brightness(1) drop-shadow(0 0 0px rgba(255,215,0,0))', duration: 2, ease: 'power2.inOut' },
          '-=0.5' // Empieza 0.5s antes de que termine el primer fade-in
        )
        // 3. Transición a la imagen completa por encima (sin desaparecer las de abajo para que no parpadee)
        .to(img3Ref.current, { opacity: 1, duration: 0.5 }, '+=1')

      // Pin the viewport for the entire intro sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=1500',
          pin: viewportRef.current,
          pinType: 'fixed',
          scrub: 0.5,
          anticipatePin: 1,
          snap: {
            snapTo: [0, 0.5, 1],
            duration: { min: 0.2, max: 0.45 },
            delay: 0.05,
            ease: 'power1.inOut',
          },
        },
      })

      // ── Phase 1: "Érase una vez..." fades out ──
      tl.to(introRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.08,
        ease: 'power2.in',
      }, 0.02)

      // ── Phase 2: Curtain opens ──
      tl.to(curtainLeftRef.current, {
        xPercent: -100,
        duration: 0.18,
        ease: 'power2.inOut',
      }, 0.06)
      tl.to(curtainRightRef.current, {
        xPercent: 100,
        duration: 0.18,
        ease: 'power2.inOut',
      }, 0.06)

      // ── Phase 3: Princess message appears ──
      tl.fromTo(messageRef.current, {
        opacity: 0, y: 30,
      }, {
        opacity: 1, y: 0,
        duration: 0.1,
        ease: 'power2.out',
      }, 0.2)

      // ── Phase 4: Princess message fades out ──
      tl.to(messageRef.current, {
        opacity: 0, y: -30,
        duration: 0.1,
        ease: 'power2.in',
      }, 0.42)

      // ── Phase 5: Sofía content appears ──
      tl.fromTo(contentRef.current, {
        opacity: 0, y: 40, scale: 0.95,
      }, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.12,
        ease: 'power3.out',
      }, 0.5)

      // Sofía stays visible from 0.5 to 1.0 — no fade out
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} id="inicio">
      <div ref={viewportRef} className="intro-viewport">
        {/* Background */}
        <div className="intro-viewport__bg" />

        {/* Curtain left - shows left half of video */}
        <div ref={curtainLeftRef} className="intro-curtain intro-curtain--left bg-black">
          <video ref={videoLeftRef} src={curtainVideo} autoPlay muted loop playsInline className="intro-curtain__vid" />
        </div>

        {/* Curtain right - shows right half of video */}
        <div ref={curtainRightRef} className="intro-curtain intro-curtain--right bg-black">
          <video ref={videoRightRef} src={curtainVideo} autoPlay muted loop playsInline className="intro-curtain__vid intro-curtain__vid--right" />
        </div>

        {/* Érase una vez... */}
        <div ref={introRef} className="intro-text intro-text--artwork-shadow flex items-center justify-center relative w-full h-full">
          <img 
            ref={img1Ref} 
            src="/img/erase1.webp" 
            alt="Érase una vez" 
            className="absolute shrink-0 w-[80%] max-w-[600px] object-contain opacity-0" 
          />
          <img 
            ref={img2Ref} 
            src="/img/erase2.webp" 
            alt="Figuras destellos" 
            className="absolute shrink-0 w-[80%] max-w-[600px] object-contain opacity-0" 
          />
          <img 
            ref={img3Ref} 
            src="/img/erase3.webp" 
            alt="Érase una vez completo" 
            className="absolute shrink-0 w-[80%] max-w-[600px] object-contain opacity-0 z-10" 
          />
        </div>

        {/* Princess message */}
        <div ref={messageRef} className="intro-message">
          <Sparkle size={32} weight="fill" className="intro-message__sparkle" />
          <p className="intro-message__line">En un reino de sueños y estrellas</p>
          <p className="intro-message__line">una princesa está por celebrar</p>
          <p className="intro-message__line intro-message__line--gold">
            el capítulo más hermoso de su historia...
          </p>
          <Sparkle size={32} weight="fill" className="intro-message__sparkle" />
        </div>

        {/* Sofía content */}
        <div ref={contentRef} className="intro-hero">
          <div className="intro-hero__inner">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkle size={28} weight="fill" className="text-accent animate-float" />
              <Heart size={20} weight="fill" className="text-primary/60" />
              <Sparkle size={28} weight="fill" className="text-accent animate-float" />
            </div>

            <div className="mb-4">
              <SparkleText text="Sofía" />
            </div>

            <div className="space-y-2 mb-8">
              <p className="text-xl md:text-2xl text-foreground/80 font-medium">
                Celebra conmigo mis XV años
              </p>
              <p className="text-lg md:text-xl text-muted-foreground italic">
                Un momento mágico para recordar
              </p>
            </div>

            <div className="inline-block bg-accent/15 border border-accent/40 rounded-full px-8 py-3 backdrop-blur-sm">
              <p className="text-accent font-semibold text-lg tracking-wide">
                6 de Junio, 2026
              </p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#rsvp" className="hero-cta hero-cta--primary">
                Confirmar Asistencia
              </a>
              <a href="#detalles" className="hero-cta hero-cta--secondary">
                Ver Detalles
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
