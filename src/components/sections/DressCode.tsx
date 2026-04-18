import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gift, Copy, Check } from '@phosphor-icons/react'
import { toast } from 'sonner'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const mpFields = [
  { label: 'Alias', value: 'sofia.robledo' },
  { label: 'Nombre', value: 'Sofía Robledo' },
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

        {/* Título Formal y Elegante — entre los iconos */}
        <div
          className="absolute z-10 w-full text-center"
          style={{ top: '32%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <span className="font-playfair text-xs font-bold text-[#3b2a0e] uppercase tracking-widest drop-shadow-md">
            Formal y Elegante
          </span>
        </div>

        {/* Dress code — texto */}
        <div
          className="absolute z-10 w-full px-4 max-w-[320px]"
          style={{ top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <div className="p-3 bg-[#091a12]/95 border border-[#c9a84c]/30 rounded-xl">
            <p className="text-[#8BA995] text-sm leading-relaxed text-center">
              Para mantener la magia de la noche, se reserva el{' '}
              <span className="font-bold text-[#c9a84c] tracking-wide uppercase">color verde</span> para la cumpleañera.
            </p>
          </div>
        </div>

        {/* Regalos — mitad inferior */}
        <div
          className="absolute z-10 w-full px-4 max-w-[320px]"
          style={{ top: '74%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <div className="flex flex-col gap-2">
            <p className="text-center text-xs text-[#3b2a0e] leading-snug mb-1">
              Tu presencia es el mejor regalo, pero si deseas hacernos llegar un obsequio,
              aquí te compartimos nuestros datos
            </p>
            <Card className="px-4 pt-3 pb-2 bg-[#091a12]/95 border-[#c9a84c]/40 rounded-xl">
              <div className="flex items-center gap-1.5 mb-0">
                <div className="p-1 bg-[#c9a84c]/20 rounded-full shrink-0">
                  <Gift size={14} weight="duotone" className="text-[#c9a84c]" />
                </div>
                <h3 className="font-semibold text-[#d4c896] text-[11px]">Mercado Pago</h3>
              </div>
              <div className="flex flex-col gap-1">
                {mpFields.map((field) => {
                  const isCopied = copiedField === field.label
                  return (
                    <div key={field.label} className="flex items-center justify-between gap-1">
                      <div className="min-w-0">
                        <span className="text-[9px] text-[#c9a84c] uppercase tracking-wide font-semibold mr-1">{field.label}:</span>
                        <span className="text-[11px] text-[#8BA995] font-mono">{field.value}</span>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(field.value, field.label)}
                        className="bg-[#c9a84c] hover:bg-[#c9a84c]/80 text-[#091a12] shrink-0 h-6 px-1.5 text-[10px]"
                        size="sm"
                      >
                        {isCopied ? (
                          <><Check size={10} weight="bold" className="mr-0.5" />Copiado</>
                        ) : (
                          <><Copy size={10} weight="bold" className="mr-0.5" />Copiar</>
                        )}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
