import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gift, Copy, Check } from '@phosphor-icons/react'
import { toast } from 'sonner'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface PaymentMethod {
  name: string
  info: string
  icon: typeof Gift
}

export function GiftRegistry() {
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

  const paymentMethods: PaymentMethod[] = [
    {
      name: 'Mercado Pago',
      info: 'sofia.cumple@email.com',
      icon: Gift,
    },
    {
      name: 'Transferencia Bancaria',
      info: 'SOFIA.REGALO',
      icon: Gift,
    },
  ]

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(label)
      toast.success('¡Copiado al portapapeles!')
      setTimeout(() => setCopiedField(null), 2000)
    } catch (error) {
      toast.error('Error al copiar')
    }
  }

  return (
    <section ref={sectionRef} id="regalos" className="presentation-slide px-4" style={{ justifyContent: 'center' }}>
      <div className="container mx-auto max-w-md w-full">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center mb-2">
            <Gift size={28} weight="duotone" className="text-accent" />
          </div>
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-1">
            Mesa de Regalos
          </h2>
          <p className="text-sm text-muted-foreground leading-snug">
            Tu presencia es el mejor regalo, pero si deseas hacernos llegar un obsequio, 
            aquí te compartimos nuestros datos
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon
            const isCopied = copiedField === method.name
            
            return (
              <Card
                key={method.name}
                className="px-4 py-4 bg-card/90 backdrop-blur"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/20 rounded-full shrink-0">
                    <Icon size={24} weight="duotone" className="text-accent" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm">
                      {method.name}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono break-all leading-tight">
                      {method.info}
                    </p>
                  </div>

                  <Button
                    onClick={() => copyToClipboard(method.info, method.name)}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground shrink-0"
                    size="sm"
                  >
                    {isCopied ? (
                      <>
                        <Check size={14} weight="bold" className="mr-1" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy size={14} weight="bold" className="mr-1" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
