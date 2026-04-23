import { lazy, Suspense } from 'react'
import { BookCover, BookMessage, BookSofia } from '@/components/sections/BookCover'
import { StoryBook } from '@/components/StoryBook'
import { Toaster } from '@/components/ui/sonner'
import { BackgroundMusic } from '@/components/BackgroundMusic'

// Lazy load components that aren't visible on the first page
const Countdown = lazy(() => import('@/components/sections/Countdown').then(m => ({ default: m.Countdown })))
const Ceremony = lazy(() => import('@/components/sections/Ceremony').then(m => ({ default: m.Ceremony })))
const EventDetails = lazy(() => import('@/components/sections/EventDetails').then(m => ({ default: m.EventDetails })))
const RSVP = lazy(() => import('@/components/sections/RSVP').then(m => ({ default: m.RSVP })))
const DressCode = lazy(() => import('@/components/sections/DressCode').then(m => ({ default: m.DressCode })))
const ThankYou = lazy(() => import('@/components/sections/ThankYou').then(m => ({ default: m.ThankYou })))
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
          <Suspense key="ceremony" fallback={<LazyFallback />}><Ceremony /></Suspense>,
          <Suspense key="countdown" fallback={<LazyFallback />}><Countdown /></Suspense>,
          <Suspense key="details" fallback={<LazyFallback />}><EventDetails /></Suspense>,
          <Suspense key="rsvp" fallback={<LazyFallback />}><RSVP /></Suspense>,
          <Suspense key="dresscode" fallback={<LazyFallback />}><DressCode /></Suspense>,
          <section key="regalo" style={{ width: '100%', height: '100%' }}>
            <div className="book-message">
              <img
                src="/img/9-regalo/9.webp"
                alt="Mesa de regalos"
                className="book-message__img"
              />
            </div>
          </section>,
          <Suspense key="thankyou" fallback={<LazyFallback />}><ThankYou /></Suspense>,
          <section key="final" style={{ width: '100%', height: '100%' }}>
            <div className="book-message">
              <img
                src="/img/11-final/11.webp"
                alt="Final"
                className="book-message__img"
              />
            </div>
          </section>,
        ]}
      </StoryBook>
    </div>
  )
}

export default App