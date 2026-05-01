import { lazy, Suspense } from 'react'
import { BookCover, BookMessage, BookStoryContinuation } from '@/components/sections/BookCover'
import { StoryBook } from '@/components/StoryBook'
import { Toaster } from '@/components/ui/sonner'
import { BackgroundMusic } from '@/components/BackgroundMusic'
import { GlobalSparklesVideo } from '@/components/effects/GlobalSparklesVideo'

// Lazy load components that aren't visible on the first page
const Ceremony = lazy(() => import('@/components/sections/Ceremony').then(m => ({ default: m.Ceremony })))
const EventDetails = lazy(() => import('@/components/sections/EventDetails').then(m => ({ default: m.EventDetails })))
const Countdown = lazy(() => import('@/components/sections/Countdown').then(m => ({ default: m.Countdown })))
const DressCode = lazy(() => import('@/components/sections/DressCode').then(m => ({ default: m.DressCode })))
const GiftRegistry = lazy(() => import('@/components/sections/GiftRegistry').then(m => ({ default: m.GiftRegistry })))
const RSVP = lazy(() => import('@/components/sections/RSVP').then(m => ({ default: m.RSVP })))
const ThankYou = lazy(() => import('@/components/sections/ThankYou').then(m => ({ default: m.ThankYou })))
const FinalPage = lazy(() => import('@/components/sections/FinalPage').then(m => ({ default: m.FinalPage })))
const Butterflies = lazy(() => import('@/components/effects/Butterflies').then(m => ({ default: m.Butterflies })))
const MagicalFireflies = lazy(() => import('@/components/effects/MagicalFireflies').then(m => ({ default: m.MagicalFireflies })))

const LazyFallback = () => <div className="w-full h-full bg-[#091a12]" />

function App() {
  return (
    <div className="app-wrapper">
      <Toaster position="top-center" />
      <BackgroundMusic />
      <Suspense fallback={null}>
        <MagicalFireflies />
        <Butterflies />
      </Suspense>

      <StoryBook>
        {[
          <BookCover key="cover" />,
          <BookMessage key="message" />,
          <BookStoryContinuation key="story-continuation" />,
          <Suspense key="ceremony" fallback={<LazyFallback />}><Ceremony /></Suspense>,
          <Suspense key="details" fallback={<LazyFallback />}><EventDetails /></Suspense>,
          <Suspense key="countdown" fallback={<LazyFallback />}><Countdown /></Suspense>,
          <Suspense key="dresscode" fallback={<LazyFallback />}><DressCode /></Suspense>,
          <Suspense key="gift" fallback={<LazyFallback />}><GiftRegistry /></Suspense>,
          <Suspense key="rsvp" fallback={<LazyFallback />}><RSVP /></Suspense>,
          <Suspense key="thankyou" fallback={<LazyFallback />}><ThankYou /></Suspense>,
          <Suspense key="final" fallback={<LazyFallback />}><FinalPage /></Suspense>,
        ]}
      </StoryBook>
      <GlobalSparklesVideo />
    </div>
  )
}

export default App