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
import { FloatingFlowers } from '@/components/effects/FloatingFlowers'
import { MagicParticles } from '@/components/effects/MagicParticles'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth')
  }, [])

  return (
    <div className="min-h-screen bg-background forest-pattern">
      <Toaster position="top-center" />
      <MagicParticles />
      <Butterflies />
      <FloatingFlowers />
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

      <footer className="bg-primary/5 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Celebrando momentos mágicos • Sofía 2026
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App