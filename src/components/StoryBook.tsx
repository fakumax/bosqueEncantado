import { useRef, useEffect, useCallback, type ReactElement } from 'react'
import { PageFlip } from 'page-flip'

interface StoryBookProps {
  children: ReactElement[]
}

export function StoryBook({ children }: StoryBookProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bookRef = useRef<HTMLDivElement>(null)
  const pageFlipRef = useRef<PageFlip | null>(null)

  const initPageFlip = useCallback(() => {
    if (!bookRef.current) return

    // Guardar la página actual antes de destruir
    const currentPage = pageFlipRef.current?.getCurrentPageIndex() ?? 0

    if (pageFlipRef.current) {
      pageFlipRef.current.destroy()
      pageFlipRef.current = null
    }

    // Usar dimensiones exactas del viewport → cada página = pantalla completa.
    // Con size:'fixed', la librería NO puede escalar y meter 2 páginas lado a lado
    // porque 2 × viewportWidth > viewportWidth → fuerza modo portrait siempre.
    const w = window.innerWidth
    const h = window.innerHeight

    pageFlipRef.current = new PageFlip(bookRef.current, {
      width: w,
      height: h,
      size: 'fixed',
      maxShadowOpacity: 0,
      showCover: true,
      mobileScrollSupport: false,
      usePortrait: true,
      flippingTime: 700,
      drawShadow: false,
      startZIndex: 0,
      autoSize: false,
    })

    const pages = bookRef.current.querySelectorAll('.story-page')
    if (pages.length > 0) {
      pageFlipRef.current.loadFromHTML(Array.from(pages) as HTMLElement[])
      if (currentPage > 0) {
        pageFlipRef.current.turnToPage(currentPage)
      }
    }
  }, [])

  useEffect(() => {
    initPageFlip()

    const handleResize = () => initPageFlip()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (pageFlipRef.current) {
        pageFlipRef.current.destroy()
        pageFlipRef.current = null
      }
    }
  }, [children, initPageFlip])

  return (
    // Contenedor principal fijado al viewport completo sin importar el browser chrome
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden touch-none"
      style={{ backgroundColor: '#091a12' }}
    >
      {/* Contenedor del libro estirado al 100% */}
      <div ref={bookRef} className="w-full h-full">
        {children.map((child, index) => {
          const isHard = index === 0 || index === children.length - 1
          
          return (
             <div 
               key={index} 
               className="story-page relative overflow-hidden"
               data-density={isHard ? 'hard' : 'soft'}
             >
               {/* Fondo dorado — visible como reverso de la página al dar vuelta */}
               <div 
                 className="absolute inset-0" 
                 style={{ 
                   background: 'linear-gradient(160deg, #8b6914 0%, #c9a84c 20%, #f5d98a 45%, #e8c860 55%, #c9a84c 75%, #8b6914 100%)',
                   zIndex: 0 
                 }} 
               />
               {/* Contenido de la página encima del dorado */}
               <div className="absolute inset-0" style={{ 
                  backgroundColor: '#091a12',
                  zIndex: 1,
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)' 
               }}>
                 {child}
               </div>
             </div>
          )
        })}
      </div>
    </div>
  )
}
