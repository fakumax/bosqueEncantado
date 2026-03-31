import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { MusicNotes } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function MusicPlaylist() {
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
  const spotifyPlaylistId = '37i9dQZF1DXcBWIGoYBM5M'

  return (
    <section ref={sectionRef} id="musica" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <MusicNotes size={40} weight="duotone" className="text-accent" />
          </div>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-4">
            Lista de Reproducción
          </h2>
          <p className="text-lg text-muted-foreground">
            Escucha la música que sonará en la fiesta
          </p>
        </div>

        <Card className="p-4 bg-card/90 backdrop-blur">
          <div className="aspect-[4/5] md:aspect-video w-full">
            <iframe
              style={{ borderRadius: '12px' }}
              src={`https://open.spotify.com/embed/playlist/${spotifyPlaylistId}?utm_source=generator&theme=0`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            ¿Tienes alguna sugerencia de canción?
          </p>
          <a
            href={`https://open.spotify.com/playlist/${spotifyPlaylistId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors"
          >
            <MusicNotes size={20} weight="bold" />
            Abrir en Spotify
          </a>
        </div>
      </div>
    </section>
  )
}
