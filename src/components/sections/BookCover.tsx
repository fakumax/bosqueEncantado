import { useEffect, useRef } from 'react'
import gsap from 'gsap'

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
        src="/img/2-cuento/2.webp"
        alt="Bosque"
        className="book-message__img"
      />
    </div>
  )
}

/** Page 3: Sofía XV info */
export function BookSofia() {
  return (
    <div className="book-message">
      <img
        src="/img/3-invitacion/3.webp"
        alt="Invitación"
        className="book-message__img"
      />
    </div>
  )
}
