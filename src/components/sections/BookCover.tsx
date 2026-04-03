import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Sparkle, Heart } from '@phosphor-icons/react'
import { SparkleText } from '@/components/effects/SparkleText'

const forestVideo = '/videos/forestStart.mp4'

export function BookCover() {
  const img1Ref = useRef<HTMLImageElement>(null)
  const img2Ref = useRef<HTMLImageElement>(null)
  const img3Ref = useRef<HTMLImageElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Autoplay video
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.play().catch(() => {})
    }

    // "Érase una vez" entrance animation
    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

    gsap.set([img1Ref.current, img2Ref.current, img3Ref.current], { opacity: 0 })

    tl
      .to(img1Ref.current, { opacity: 1, duration: 2 })
      .fromTo(img2Ref.current,
        { opacity: 1, clipPath: 'inset(0% 100% 0% 0%)', filter: 'brightness(2) drop-shadow(0 0 10px rgba(255,215,0,0.8))' },
        { clipPath: 'inset(0% 0% 0% 0%)', filter: 'brightness(1) drop-shadow(0 0 0px rgba(255,215,0,0))', duration: 2, ease: 'power2.inOut' },
        '-=0.5'
      )
      .to(img3Ref.current, { opacity: 1, duration: 0.5 }, '+=1')

    return () => { tl.kill() }
  }, [])

  return (
    <div className="book-cover">
      {/* Forest video background */}
      <video
        ref={videoRef}
        className="book-cover__video"
        src={forestVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        disablePictureInPicture
      />

      {/* Dark overlay for readability */}
      <div className="book-cover__overlay" />

      {/* Érase una vez images */}
      <div className="book-cover__art">
        <img
          ref={img1Ref}
          src="/img/erase1.png"
          alt="Érase una vez"
          className="book-cover__img"
          style={{ opacity: 0 }}
        />
        <img
          ref={img2Ref}
          src="/img/erase2.png"
          alt="Destellos"
          className="book-cover__img"
          style={{ opacity: 0 }}
        />
        <img
          ref={img3Ref}
          src="/img/erase3.png"
          alt="Érase una vez completo"
          className="book-cover__img book-cover__img--top"
          style={{ opacity: 0 }}
        />
      </div>
    </div>
  )
}

/** Page 2: Princess message */
export function BookMessage() {
  return (
    <div className="book-message">
      <img
        src="/img/bosque.jpg"
        alt="Bosque"
        className="book-message__img"
      />
      <div className="book-message__content">
        <p className="book-message__line">
          En un reino envuelto por la bruma de los sueños, una joven que caminaba entre árboles milenarios y susurros de magia. Al llegar su primavera número quince, el bosque encantado ha decidido abrir sus puertas doradas para revelar su mayor tesoro.
        </p>
        <p className="book-message__line book-message__line--gold">
          ¡Bienvenidos a mis quince años!
        </p>
      </div>
    </div>
  )
}

/** Page 3: Sofía XV info */
export function BookSofia() {
  return (
    <div className="book-sofia">
      <div className="book-sofia__bg" />
      <div className="book-sofia__content">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkle size={28} weight="fill" className="text-accent animate-float" />
          <Heart size={20} weight="fill" className="text-primary/60" />
          <Sparkle size={28} weight="fill" className="text-accent animate-float" />
        </div>

        <div className="mb-4">
          <SparkleText text="Sofía" />
        </div>

        <div className="space-y-2 mb-8 max-w-md mx-auto px-4">
          <p className="text-lg md:text-xl text-foreground/90 font-medium leading-relaxed text-center">
            Sigue el rastro de polvo de hadas y acompáñame a celebrar el inicio de mi propia aventura en este bosque encantado
          </p>
        </div>

        <div className="inline-block bg-accent/15 border border-accent/40 rounded-full px-8 py-3 backdrop-blur-sm">
          <p className="text-accent font-semibold text-lg tracking-wide">
            6 de Junio, 2026
          </p>
        </div>
      </div>
    </div>
  )
}
