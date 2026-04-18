import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Check } from '@phosphor-icons/react'
import { toast } from 'sonner'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function RSVP() {
  const sectionRef = useRef<HTMLElement>(null)
  const [name, setName] = useState('')
  const [attending, setAttending] = useState('si')
  const [guests, setGuests] = useState('1')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdscPpHPmaqIU2xejar9qZsT93EysXlDKwEGXfHm79UadDGnQ/formResponse'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error('Por favor ingresa tu nombre')
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new URLSearchParams()
      formData.append('entry.1490533021', name.trim())
      formData.append('entry.2045038163', attending === 'si' ? 'Si' : 'No')
      formData.append('entry.452084798', attending === 'si' ? guests : '0')
      formData.append('entry.1196307146', message.trim())

      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      })

      toast.success(attending === 'si'
        ? '¡Gracias por confirmar tu asistencia!'
        : 'Gracias por tu respuesta. ¡Te echaremos de menos!'
      )

      setName('')
      setAttending('si')
      setGuests('1')
      setMessage('')
    } catch {
      toast.error('Error al enviar. Intentá de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={sectionRef} id="rsvp" style={{ width: '100%', height: '100%' }}>
      <div className="book-message relative w-full h-full">
        <img
          src="/img/7-confirmacion/7.png"
          alt="Confirmación"
          className="book-message__img absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Contenido colocado sobre la imagen */}
        <div 
          className="absolute z-10 w-full px-4 max-w-[340px]"
          style={{ top: '30%', left: '50%', transform: 'translateX(-50%)' }}
        >
          <div className="text-center mb-3">
            <p className="text-sm text-[#133221] font-bold drop-shadow-sm leading-tight">
              Completa el formulario para confirmar tu presencia
            </p>
            <p className="text-xs text-[#8b6914] font-bold mt-1 drop-shadow-sm">
              Fecha límite para confirmación de asistencia 6/5/2026
            </p>
          </div>

          <Card className="px-5 py-5 bg-[#091a12]/95 border border-[#c9a84c]/40 rounded-2xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nombre completo *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11 bg-[#133221]/60 border-[#c9a84c]/30 text-[#d4c896] placeholder:text-[#8BA995] focus:border-[#c9a84c] focus:ring-[#c9a84c]/20"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#d4c896]">¿Podrás asistir? *</Label> 
                <RadioGroup value={attending} onValueChange={setAttending} className="flex gap-2">
                  <div className="flex items-center space-x-2 px-3 py-2.5 rounded-lg border border-[#c9a84c]/30 hover:border-[#c9a84c] transition-colors flex-1 bg-[#133221]/40">
                    <RadioGroupItem value="si" id="si" className="border-[#c9a84c] text-[#c9a84c]" />
                    <Label htmlFor="si" className="cursor-pointer flex-1 text-sm font-medium text-[#d4c896]">
                      Sí, asistiré
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-2.5 rounded-lg border border-[#c9a84c]/30 hover:border-[#c9a84c] transition-colors flex-1 bg-[#133221]/40">
                    <RadioGroupItem value="no" id="no" className="border-[#c9a84c] text-[#c9a84c]" />
                    <Label htmlFor="no" className="cursor-pointer flex-1 text-sm font-medium text-[#d4c896]">
                      No podré
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {attending === 'si' && (
                <div>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="10"
                    placeholder="Nº de acompañantes (incluyéndote)"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="h-11 bg-[#133221]/60 border-[#c9a84c]/30 text-[#d4c896] placeholder:text-[#8BA995] focus:border-[#c9a84c] focus:ring-[#c9a84c]/20"
                  />
                </div>
              )}

              <div>
                <Textarea
                  id="message"
                  placeholder="Mensaje para Sofía (opcional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  className="resize-none text-sm bg-[#133221]/60 border-[#c9a84c]/30 text-[#d4c896] placeholder:text-[#8BA995] focus:border-[#c9a84c] focus:ring-[#c9a84c]/20"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-[#c9a84c] hover:bg-[#ebd594] text-[#091a12] font-bold uppercase tracking-wider text-sm transition-all"
              >
                {isSubmitting ? (
                  'Enviando...'
                ) : (
                  <span className="flex items-center justify-center gap-2">       
                    <Check size={20} weight="bold" />
                    Confirmar Asistencia
                  </span>
                )}
              </Button>
            </form>
          </Card>


        </div>
      </div>
    </section>
  )
}
