import { Hero } from '@/components/sections/Hero'
import { Countdown } from '@/components/sections/Countdown'
import { EventDetails } from '@/components/sections/EventDetails'
import { Location } from '@/components/sections/Location'
import { RSVP } from '@/components/sections/RSVP'
import { PhotoGallery } from '@/components/sections/PhotoGallery'
import { GiftRegistry } from '@/components/sections/GiftRegistry'
import { MusicPlaylist } from '@/components/sections/MusicPlaylist'
import { Toaster } from '@/components/ui/sonner'
import { Butterflies } from '@/components/effects/Butterflies'
import { MagicParticles } from '@/components/effects/MagicParticles'
import { MagicalFireflies } from '@/components/effects/MagicalFireflies'
import { BackgroundMusic } from '@/components/BackgroundMusic'

function App() {
  return (
    <div className="app-wrapper">
      <Toaster position="top-center" />
      <BackgroundMusic />
      <MagicParticles />
      <MagicalFireflies />
      <Butterflies />

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
            Hecho por{' '}
            <a 
              href="https://github.com/fakumax/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-white transition-colors"
            >
              Facundo Vergara
            </a> &  <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-white transition-colors"
            >
              Nina
            </a>{' '}
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App