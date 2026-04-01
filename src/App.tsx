import { BookCover, BookMessage, BookSofia } from '@/components/sections/BookCover'
import { StoryBook } from '@/components/StoryBook'
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

      <StoryBook>
        {[
          <BookCover key="cover" />,
          <BookMessage key="message" />,
          <BookSofia key="sofia" />,
          <Countdown key="countdown" />,
          <EventDetails key="details" />,
          <Location key="location" />,
          <RSVP key="rsvp" />,
          <PhotoGallery key="gallery" />,
          <GiftRegistry key="gifts" />,
          <MusicPlaylist key="music" />,
        ]}
      </StoryBook>
    </div>
  )
}

export default App