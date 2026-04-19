import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Check } from '@phosphor-icons/react'
import { toast } from 'sonner'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const mpFields = [
  { label: 'Alias', value: 'soffirobledo' },
  { label: 'Nombre', value: 'Sofía Denise Robledo' },
]

export function DressCode() {
  const sectionRef = useRef<HTMLElement>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(label)
      toast.success('¡Copiado al portapapeles!')
      setTimeout(() => setCopiedField(null), 2000)
    } catch {
      toast.error('Error al copiar')
    }
  }

  return (
    <section ref={sectionRef} id="dresscode" style={{ width: '100%', height: '100%' }}>
      <div className="book-message relative w-full h-full">
        <img
          src="/img/8-vestimentaRegalo/8.png"
          alt="Código de vestimenta y regalos"
          className="book-message__img absolute inset-0 w-full h-full object-cover z-0"
        />

      </div>
    </section>
  )
}
