import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { EnvelopeSimple, Check } from '@phosphor-icons/react'
import { toast } from 'sonner'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RSVPEntry {
  id: string
  name: string
  attending: string
  guests: string
  message: string
  timestamp: number
}

export function RSVP() {
  const sectionRef = useRef<HTMLElement>(null)
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([])
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      toast.error('Por favor ingresa tu nombre')
      return
    }

    setIsSubmitting(true)

    const newRsvp: RSVPEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      attending,
      guests,
      message: message.trim(),
      timestamp: Date.now(),
    }

    setRsvps(currentRsvps => [...currentRsvps, newRsvp])

    toast.success(attending === 'si' 
      ? '¡Gracias por confirmar tu asistencia!' 
      : 'Gracias por tu respuesta. ¡Te echaremos de menos!'
    )

    setName('')
    setAttending('si')
    setGuests('1')
    setMessage('')
    setIsSubmitting(false)
  }

  return (
    <section ref={sectionRef} id="rsvp" className="presentation-slide px-4" style={{ justifyContent: 'center' }}>
      <div className="container mx-auto max-w-md w-full">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center mb-2">
            <EnvelopeSimple size={28} weight="duotone" className="text-accent" />
          </div>
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-1">
            Confirma tu Asistencia
          </h2>
          <p className="text-sm text-muted-foreground">
            Completa el formulario para confirmar tu presencia
          </p>
          <p className="text-xs text-accent font-medium mt-1">
            Fecha límite para confirmación de asistencia 6/5/2026
          </p>
        </div>

        <Card className="px-4 py-4 bg-card/90 backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Input
                id="name"
                type="text"
                placeholder="Nombre completo *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-10"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium">¿Podrás asistir? *</Label>
              <RadioGroup value={attending} onValueChange={setAttending} className="flex gap-2">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border hover:border-accent transition-colors flex-1">
                  <RadioGroupItem value="si" id="si" />
                  <Label htmlFor="si" className="cursor-pointer flex-1 text-sm">
                    Sí, asistiré
                  </Label>
                </div>
                <div className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border hover:border-accent transition-colors flex-1">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="cursor-pointer flex-1 text-sm">
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
                  className="h-10"
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
                className="resize-none text-sm"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              {isSubmitting ? (
                'Enviando...'
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Check size={18} weight="bold" />
                  Confirmar Asistencia
                </span>
              )}
            </Button>
          </form>
        </Card>

        {rsvps.length > 0 && (
          <div className="mt-3 text-center text-muted-foreground">
            <p className="text-xs">
              {rsvps.filter(r => r.attending === 'si').length} persona(s) han confirmado su asistencia
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
