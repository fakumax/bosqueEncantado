import { useState, useRef, useCallback, useEffect, type ReactElement } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

interface StoryBookProps {
  children: ReactElement[]
}

export function StoryBook({ children }: StoryBookProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const bookRef = useRef<HTMLDivElement>(null)
  const pagesRef = useRef<(HTMLDivElement | null)[]>([])
  const isAnimating = useRef(false)
  const totalPages = children.length

  const setPageRef = useCallback((el: HTMLDivElement | null, index: number) => {
    pagesRef.current[index] = el
  }, [])

  // Kill all ScrollTrigger instances and reveal hidden content (book mode replaces scroll)
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.getAll().forEach(st => st.kill())

      // Reveal hidden content on all pages except the first (cover animates itself)
      pagesRef.current.forEach((page, i) => {
        if (!page || i === 0) return
        page.querySelectorAll<HTMLElement>('*').forEach(el => {
          if (el.style.opacity === '0' || el.style.visibility === 'hidden') {
            gsap.set(el, { opacity: 1, visibility: 'visible', y: 0, clearProps: 'transform' })
          }
        })
      })
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Animate page content entrance when page becomes active
  const revealPageContent = useCallback((pageIndex: number) => {
    const page = pagesRef.current[pageIndex]
    if (!page) return

    requestAnimationFrame(() => {
      const hiddenEls: HTMLElement[] = []
      page.querySelectorAll<HTMLElement>('*').forEach(el => {
        if (el.style.opacity === '0') hiddenEls.push(el)
      })

      if (hiddenEls.length > 0) {
        gsap.to(hiddenEls, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          delay: 0.2,
        })
      }
    })
  }, [])

  const flipTo = useCallback((targetPage: number) => {
    if (isAnimating.current) return
    if (targetPage < 0 || targetPage >= totalPages) return
    if (targetPage === currentPage) return

    isAnimating.current = true
    const forward = targetPage > currentPage

    if (forward) {
      const page = pagesRef.current[currentPage]
      if (!page) { isAnimating.current = false; return }

      // Bring flipping page to top during animation
      page.style.zIndex = String(totalPages + 10)

      // Create dynamic shadow element for fold effect
      const foldShadow = document.createElement('div')
      foldShadow.className = 'storybook__fold-shadow'
      page.querySelector('.storybook__page-front')?.appendChild(foldShadow)

      const tl = gsap.timeline({
        onUpdate() {
          const progress = this.progress()
          // Move fold shadow across page during flip
          const shadowX = progress * 100
          const shadowOpacity = Math.sin(progress * Math.PI) * 0.6
          foldShadow.style.opacity = String(shadowOpacity)
          foldShadow.style.left = `${100 - shadowX}%`
        },
        onComplete: () => {
          foldShadow.remove()
          page.classList.add('storybook__page--flipped')
          // Recalculate z-index
          recalcZIndices(targetPage)
          setCurrentPage(targetPage)
          isAnimating.current = false
          revealPageContent(targetPage)
        }
      })

      tl.to(page, {
        rotationY: -180,
        duration: 1.2,
        ease: 'power3.inOut',
      })
    } else {
      const page = pagesRef.current[targetPage]
      if (!page) { isAnimating.current = false; return }

      page.style.zIndex = String(totalPages + 10)

      const foldShadow = document.createElement('div')
      foldShadow.className = 'storybook__fold-shadow'
      page.querySelector('.storybook__page-front')?.appendChild(foldShadow)

      const tl = gsap.timeline({
        onUpdate() {
          const progress = 1 - this.progress()
          const shadowOpacity = Math.sin(progress * Math.PI) * 0.6
          const shadowX = progress * 100
          foldShadow.style.opacity = String(shadowOpacity)
          foldShadow.style.left = `${100 - shadowX}%`
        },
        onComplete: () => {
          foldShadow.remove()
          page.classList.remove('storybook__page--flipped')
          recalcZIndices(targetPage)
          setCurrentPage(targetPage)
          isAnimating.current = false
        }
      })

      tl.to(page, {
        rotationY: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      })
    }
  }, [currentPage, totalPages, revealPageContent])

  const recalcZIndices = useCallback((newCurrentPage: number) => {
    pagesRef.current.forEach((page, index) => {
      if (!page) return
      const isFlipped = index < newCurrentPage
      if (isFlipped) {
        page.style.zIndex = String(index + 1)
      } else {
        page.style.zIndex = String(totalPages - index)
      }
    })
  }, [totalPages])

  const flipForward = useCallback(() => flipTo(currentPage + 1), [flipTo, currentPage])
  const flipBackward = useCallback(() => flipTo(currentPage - 1), [flipTo, currentPage])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') flipForward()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') flipBackward()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [flipForward, flipBackward])

  // Touch swipe support
  useEffect(() => {
    const book = bookRef.current
    if (!book) return

    let startX = 0
    let startY = 0

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX
      const dy = e.changedTouches[0].clientY - startY

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) flipForward()
        else flipBackward()
      }
    }

    book.addEventListener('touchstart', onTouchStart, { passive: true })
    book.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      book.removeEventListener('touchstart', onTouchStart)
      book.removeEventListener('touchend', onTouchEnd)
    }
  }, [flipForward, flipBackward])

  // Mouse wheel navigation
  useEffect(() => {
    const book = bookRef.current
    if (!book) return

    let wheelCooldown = false

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (wheelCooldown) return
      wheelCooldown = true

      if (e.deltaY > 20) flipForward()
      else if (e.deltaY < -20) flipBackward()

      setTimeout(() => { wheelCooldown = false }, 800)
    }

    book.addEventListener('wheel', onWheel, { passive: false })
    return () => book.removeEventListener('wheel', onWheel)
  }, [flipForward, flipBackward])

  return (
    <div ref={bookRef} className="storybook" data-book-mode>
      {/* Spine/binding shadow */}
      <div className="storybook__spine" />

      {/* Pages container */}
      <div className="storybook__pages">
        {children.map((child, index) => {
          const isFlipped = index < currentPage
          const isCurrent = index === currentPage

          let zIndex: number
          if (isFlipped) {
            zIndex = index + 1
          } else {
            zIndex = totalPages - index
          }

          return (
            <div
              key={index}
              ref={(el) => setPageRef(el, index)}
              className={`storybook__page${isFlipped ? ' storybook__page--flipped' : ''}${isCurrent ? ' storybook__page--current' : ''}`}
              style={{
                zIndex,
                transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front face */}
              <div className="storybook__page-front">
                <div className="storybook__page-content">
                  {child}
                </div>
                {/* Spine shadow on front */}
                <div className="storybook__page-spine-shadow" />
              </div>

              {/* Back face (visible when flipped) */}
              <div className="storybook__page-back">
                <div className="storybook__page-back-pattern" />
                <div className="storybook__page-back-number">
                  {index + 1}
                </div>
              </div>
            </div>
          )
        })}
      </div>


    </div>
  )
}
