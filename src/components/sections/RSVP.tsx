import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'sonner'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FORM_TEXT_COLOR = '#0c2218'
const FORM_FONT_FAMILY = "'Monotype Corsiva', 'Segoe Script', cursive"

export function RSVP() {
  const sectionRef = useRef<HTMLElement>(null)
  const [name, setName] = useState('')
  const [attending, setAttending] = useState('si')
  const [guests, setGuests] = useState('')
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

  const handleGuestsChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '')

    if (!digitsOnly) {
      setGuests('')
      return
    }

    const normalized = Math.min(Number(digitsOnly), 10)
    setGuests(String(normalized))
  }

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
      setGuests('')
      setMessage('')
    } catch {
      toast.error('Error al enviar. Intentá de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={sectionRef} id="rsvp" style={{ width: '100%', height: '100%' }}>
      <div className="book-message">
        <div
          className="absolute left-0 top-1/2 w-full -translate-y-1/2"
          style={{ aspectRatio: '1536 / 2754' }}
        >
          <img
            src="/img/7-confirmacion/7.webp"
            alt="Confirmación"
            className="absolute inset-0 z-0 h-full w-full object-contain"
          />

          {/* Contenido colocado sobre la imagen */}
          <div
            className="absolute z-10 w-full px-4 max-w-[340px]"
            style={{ top: '40.5%', left: '50%', transform: 'translateX(-50%)' }}
          >
          <Card className="px-5 pt-2 pb-1 bg-transparent border-0 rounded-2xl shadow-none !text-[#0c2218]" style={{ color: FORM_TEXT_COLOR, fontFamily: FORM_FONT_FAMILY }}>
            <form onSubmit={handleSubmit} className="space-y-2.5 !text-[#0c2218] [color-scheme:light]" autoComplete="off" style={{ color: FORM_TEXT_COLOR, fontFamily: FORM_FONT_FAMILY }}>
              <div>
                <Input
                  id="name"
                  type="text"
                  autoComplete="off"
                  placeholder="Nombre completo *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11 bg-transparent border-[#b8860b] text-[17px] !text-[#0c2218] placeholder:!text-[#0c2218]/70 focus-visible:border-[#b8860b] focus-visible:ring-0 focus-visible:ring-offset-0 md:text-[17px] [color-scheme:light]"
                  style={{ color: FORM_TEXT_COLOR, WebkitTextFillColor: FORM_TEXT_COLOR, fontFamily: FORM_FONT_FAMILY }}
                />
              </div>

              <div className="space-y-1">
                <Label className="text-base font-semibold !text-[#0c2218]" style={{ color: FORM_TEXT_COLOR, fontFamily: FORM_FONT_FAMILY }}>¿Podrás asistir? *</Label> 
                <RadioGroup value={attending} onValueChange={setAttending} className="flex gap-2">
                  <div className="flex items-center space-x-2 px-0 py-0.5 flex-1 bg-transparent">
                    <RadioGroupItem value="si" id="si" className="border-[#b8860b] text-[#b8860b] focus-visible:border-[#b8860b] focus-visible:ring-0 focus-visible:ring-offset-0 [&_svg]:fill-[#b8860b]" />
                    <Label htmlFor="si" className="cursor-pointer flex-1 text-base font-medium !text-[#0c2218]" style={{ color: FORM_TEXT_COLOR, fontFamily: FORM_FONT_FAMILY }}>
                      Sí, asistiré
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 px-0 py-0.5 flex-1 bg-transparent">
                    <RadioGroupItem value="no" id="no" className="border-[#b8860b] text-[#b8860b] focus-visible:border-[#b8860b] focus-visible:ring-0 focus-visible:ring-offset-0 [&_svg]:fill-[#b8860b]" />
                    <Label htmlFor="no" className="cursor-pointer flex-1 text-base font-medium !text-[#0c2218]" style={{ color: FORM_TEXT_COLOR, fontFamily: FORM_FONT_FAMILY }}>
                      No podré
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {attending === 'si' && (
                <div>
                  <Input
                    id="guests"
                    type="text"
                    autoComplete="off"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Nº de acompañantes (incluyéndote)"
                    value={guests}
                    onChange={(e) => handleGuestsChange(e.target.value)}
                    className="h-11 bg-transparent border-[#b8860b] text-[17px] !text-[#0c2218] placeholder:!text-[#0c2218]/70 focus-visible:border-[#b8860b] focus-visible:ring-0 focus-visible:ring-offset-0 md:text-[17px] [color-scheme:light]"
                    style={{ color: FORM_TEXT_COLOR, WebkitTextFillColor: FORM_TEXT_COLOR, fontFamily: FORM_FONT_FAMILY }}
                  />
                </div>
              )}

              {attending === 'no' && <div aria-hidden="true" className="h-2" />}

              <div>
                <Textarea
                  id="message"
                  autoComplete="off"
                  placeholder="Mensaje para Sofía (opcional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={attending === 'si' ? 1 : 2}
                  className={`resize-none overflow-hidden [field-sizing:fixed] bg-transparent border-[#b8860b] text-[17px] !text-[#0c2218] placeholder:!text-[#0c2218]/70 focus-visible:border-[#b8860b] focus-visible:ring-0 focus-visible:ring-offset-0 md:text-[17px] [color-scheme:light] ${
                    attending === 'si' ? 'h-11 min-h-11' : 'h-20 min-h-20'
                  }`}
                  style={{ color: FORM_TEXT_COLOR, WebkitTextFillColor: FORM_TEXT_COLOR, fontFamily: FORM_FONT_FAMILY }}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="ghost"
                aria-label={isSubmitting ? 'Enviando confirmación' : 'Confirmar asistencia'}
                className="!-mt-4 mx-auto flex h-auto w-[220px] max-w-[72%] bg-transparent p-0 shadow-none hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-60"
              >
                <img
                  src="/img/botonConfirmar.webp"
                  alt=""
                  className="block h-auto w-full object-contain"
                />
                <span className="sr-only">
                  {isSubmitting ? 'Enviando confirmación' : 'Confirmar asistencia'}
                </span>
              </Button>
            </form>
          </Card>


          </div>
        </div>
      </div>
    </section>
  )
}
