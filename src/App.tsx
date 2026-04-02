import { lazy, Suspense } from 'react'
import { BookCover, BookMessage, BookSofia } from '@/components/sections/BookCover'
import { StoryBook } from '@/components/StoryBook'
import { Toaster } from '@/components/ui/sonner'
import { BackgroundMusic } from '@/components/BackgroundMusic'

// Lazy load components that aren't visible on the first page
const Countdown = lazy(() => import('@/components/sections/Countdown').then(m => ({ default: m.Countdown })))
const EventDetails = lazy(() => import('@/components/sections/EventDetails').then(m => ({ default: m.EventDetails })))
const Location = lazy(() => import('@/components/sections/Location').then(m => ({ default: m.Location })))
const RSVP = lazy(() => import('@/components/sections/RSVP').then(m => ({ default: m.RSVP })))
const PhotoGallery = lazy(() => import('@/components/sections/PhotoGallery').then(m => ({ default: m.PhotoGallery })))
const GiftRegistry = lazy(() => import('@/components/sections/GiftRegistry').then(m => ({ default: m.GiftRegistry })))
const MusicPlaylist = lazy(() => import('@/components/sections/MusicPlaylist').then(m => ({ default: m.MusicPlaylist })))
const Butterflies = lazy(() => import('@/components/effects/Butterflies').then(m => ({ default: m.Butterflies })))
const MagicParticles = lazy(() => import('@/components/effects/MagicParticles').then(m => ({ default: m.MagicParticles })))
const MagicalFireflies = lazy(() => import('@/components/effects/MagicalFireflies').then(m => ({ default: m.MagicalFireflies })))

const LazyFallback = () => <div className="w-full h-full bg-[#091a12]" />

function App() {
  return (
    <div className="app-wrapper">
      <Toaster position="top-center" />
      <BackgroundMusic />
      <Suspense fallback={null}>
        <MagicParticles />
        <MagicalFireflies />
        <Butterflies />
      </Suspense>

      <StoryBook>
        {[
          <BookCover key="cover" />,
          <BookMessage key="message" />,
          <BookSofia key="sofia" />,
          <Suspense key="countdown" fallback={<LazyFallback />}><Countdown /></Suspense>,
          <Suspense key="details" fallback={<LazyFallback />}><EventDetails /></Suspense>,
          <Suspense key="location" fallback={<LazyFallback />}><Location /></Suspense>,
          <Suspense key="rsvp" fallback={<LazyFallback />}><RSVP /></Suspense>,
          <Suspense key="gallery" fallback={<LazyFallback />}><PhotoGallery /></Suspense>,
          <Suspense key="gifts" fallback={<LazyFallback />}><GiftRegistry /></Suspense>,
          <Suspense key="music" fallback={<LazyFallback />}><MusicPlaylist /></Suspense>,
        ]}
      </StoryBook>
    </div>
  )
}

export default App