import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gift, Copy, Check } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface PaymentMethod {
  name: string
  info: string
  icon: typeof Gift
}

export function GiftRegistry() {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const paymentMethods: PaymentMethod[] = [
    {
      name: 'Mercado Pago',
      info: 'sofia.cumple@email.com',
      icon: Gift,
    },
    {
      name: 'Transferencia Bancaria',
      info: 'CBU: 0000003100010000000001',
      icon: Gift,
    },
    {
      name: 'Alias',
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
    <section id="regalos" className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <Gift size={40} weight="duotone" className="text-accent" />
          </div>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-primary mb-4">
            Mesa de Regalos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tu presencia es el mejor regalo, pero si deseas hacernos llegar un obsequio, 
            aquí te compartimos nuestros datos para regalos digitales
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {paymentMethods.map((method) => {
            const Icon = method.icon
            const isCopied = copiedField === method.name
            
            return (
              <Card
                key={method.name}
                className="p-6 bg-card/90 backdrop-blur hover:scale-105 transition-transform"
              >
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 bg-accent/20 rounded-full">
                      <Icon size={32} weight="duotone" className="text-accent" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">
                      {method.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-mono break-all">
                      {method.info}
                    </p>
                  </div>

                  <Button
                    onClick={() => copyToClipboard(method.info, method.name)}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    size="sm"
                  >
                    {isCopied ? (
                      <>
                        <Check size={16} weight="bold" className="mr-2" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy size={16} weight="bold" className="mr-2" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        <Card className="p-6 bg-primary/5 border-2 border-primary/20 text-center">
          <p className="text-foreground/80">
            Para cualquier consulta o coordinar el envío de regalos físicos, 
            puedes contactarnos al <span className="font-semibold">+54 9 11 1234-5678</span>
          </p>
        </Card>
      </div>
    </section>
  )
}
