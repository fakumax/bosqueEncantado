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
    <section ref={sectionRef} id="rsvp" className="presentation-slide px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <EnvelopeSimple size={40} weight="duotone" className="text-accent" />
          </div>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-4">
            Confirma tu Asistencia
          </h2>
          <p className="text-lg text-muted-foreground">
            Por favor completa el formulario para confirmar tu presencia
          </p>
        </div>

        <Card className="p-8 bg-card/90 backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-medium">
                Nombre Completo *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">¿Podrás asistir? *</Label>
              <RadioGroup value={attending} onValueChange={setAttending}>
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-accent transition-colors">
                  <RadioGroupItem value="si" id="si" />
                  <Label htmlFor="si" className="cursor-pointer flex-1">
                    Sí, asistiré
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-accent transition-colors">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="cursor-pointer flex-1">
                    No podré asistir
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {attending === 'si' && (
              <div className="space-y-2">
                <Label htmlFor="guests" className="text-base font-medium">
                  Número de acompañantes
                </Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="10"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="h-12"
                />
                <p className="text-sm text-muted-foreground">
                  Incluyéndote a ti
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="message" className="text-base font-medium">
                Mensaje (Opcional)
              </Label>
              <Textarea
                id="message"
                placeholder="Deja un mensaje especial para Sofía..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg"
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

        {rsvps.length > 0 && (
          <div className="mt-8 text-center text-muted-foreground">
            <p className="text-sm">
              {rsvps.filter(r => r.attending === 'si').length} persona(s) han confirmado su asistencia
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
