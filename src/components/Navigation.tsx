import { useState, useEffect } from 'react'
import { List, X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface NavigationProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

export function Navigation({ isMenuOpen, setIsMenuOpen }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Cuenta Regresiva', href: '#countdown' },
    { label: 'Detalles', href: '#detalles' },
    { label: 'Ubicación', href: '#ubicacion' },
    { label: 'RSVP', href: '#rsvp' },
    { label: 'Fotos', href: '#fotos' },
    { label: 'Regalos', href: '#regalos' },
    { label: 'Música', href: '#musica' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#091a12]/95 backdrop-blur-lg shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a
              href="#inicio"
              onClick={(e) => handleNavClick(e, '#inicio')}
              className="font-playfair text-xl md:text-2xl font-bold text-accent"
            >
              Sofía
            </a>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X size={24} weight="bold" />
              ) : (
                <List size={24} weight="bold" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute top-20 left-0 right-0 bg-card border-b border-border shadow-xl">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-lg font-medium text-foreground hover:text-accent transition-colors py-2"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
