import { useRef, useState, useEffect } from 'react'
import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react'
import gsap from 'gsap'

/**
 * Drops your audio file into public/music/ and set the filename here.
 * The file will be served from /music/<filename>.
 */
const MUSIC_SRC = '/music/NewForest.m4a'
const MUSIC_TYPE = 'audio/mp4'

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [muted, setMuted] = useState(false)
  const hasStarted = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Pre-buffer: force the browser to start downloading now
    audio.load()

    const tryPlay = () => {
      if (hasStarted.current) return

      audio.volume = 0.35
      audio.play().then(() => {
        hasStarted.current = true
        cleanup()
      }).catch(() => {
        // Browser still blocking — will retry on next gesture
      })
    }

    // If audio is already buffered enough, play on first gesture instantly
    // Otherwise wait until canplaythrough fires, then try again
    const onReady = () => tryPlay()

    const gestureEvents = ['click', 'touchstart', 'scroll', 'keydown'] as const
    const cleanup = () => {
      gestureEvents.forEach((e) => window.removeEventListener(e, tryPlay))
      audio.removeEventListener('canplaythrough', onReady)
    }

    gestureEvents.forEach((e) => window.addEventListener(e, tryPlay, { passive: true }))
    audio.addEventListener('canplaythrough', onReady)

    // Attempt immediately in case the browser allows it
    tryPlay()

    return cleanup
  }, [])

  // Button entrance animation
  useEffect(() => {
    if (btnRef.current) {
      gsap.from(btnRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        delay: 1.5,
        ease: 'back.out(2)',
      })
    }
  }, [])

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (!hasStarted.current) {
      audio.volume = 0.35
      audio.play().then(() => { hasStarted.current = true }).catch(() => {})
    }

    const next = !muted
    setMuted(next)
    audio.muted = next

    // Little bounce on the button
    gsap.fromTo(btnRef.current, { scale: 0.8 }, { scale: 1, duration: 0.3, ease: 'back.out(3)' })
  }

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src={MUSIC_SRC} type={MUSIC_TYPE} />
      </audio>

      <button
        ref={btnRef}
        onClick={toggleMute}
        aria-label={muted ? 'Activar sonido' : 'Silenciar'}
        className="fixed bottom-6 right-6 z-[200] w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border transition-colors duration-300"
        style={{
          background: 'rgba(9,26,18,0.65)',
          borderColor: 'rgba(143,212,176,0.3)',
          color: '#b8e8d0',
        }}
      >
        {muted ? (
          <SpeakerSlash size={22} weight="duotone" />
        ) : (
          <SpeakerHigh size={22} weight="duotone" />
        )}
      </button>
    </>
  )
}
