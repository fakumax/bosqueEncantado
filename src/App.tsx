import { useState, useEffect } from 'react'
import { Hero } from '@/components/sections/Hero'
import { Countdown } from '@/components/sections/Countdown'
import { EventDetails } from '@/components/sections/EventDetails'
import { Location } from '@/components/sections/Location'
import { RSVP } from '@/components/sections/RSVP'
import { PhotoGallery } from '@/components/sections/PhotoGallery'
import { GiftRegistry } from '@/components/sections/GiftRegistry'
import { MusicPlaylist } from '@/components/sections/MusicPlaylist'
import { Navigation } from '@/components/Navigation'
import { Toaster } from '@/components/ui/sonner'
import { Butterflies } from '@/components/effects/Butterflies'
import { MagicParticles } from '@/components/effects/MagicParticles'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.8,
      touchMultiplier: 2.5,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <div className="app-wrapper">
      <Toaster position="top-center" />
      <MagicParticles />
      <Butterflies />
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main>
        <Hero />
        <Countdown />
        <EventDetails />
        <Location />
        <RSVP />
        <PhotoGallery />
        <GiftRegistry />
        <MusicPlaylist />
      </main>

      <footer className="site-footer pb-8 pt-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#7aaa90] text-sm tracking-widest font-playfair flex items-center justify-center gap-1.5 flex-wrap">
            Hecho con <span className="text-red-500">❤️</span> por{' '}
            <a 
              href="https://github.com/fakumax/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-white transition-colors"
            >
              Facundo Vergara
            </a>{' '}
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App