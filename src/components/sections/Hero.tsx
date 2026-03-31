import { Heart, Sparkle } from '@phosphor-icons/react'
import { SparkleText } from '@/components/effects/SparkleText'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background/50 to-background z-0" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: 1, 
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.2 },
                y: { 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <Sparkle size={32} weight="fill" className="text-accent" />
              <Heart size={24} weight="fill" className="text-accent/70" />
              <Sparkle size={32} weight="fill" className="text-accent" />
            </motion.div>
            
            <div className="mb-4">
              <SparkleText text="Sofía" />
            </div>
            
            <div className="space-y-2 mb-8">
              <p className="text-xl md:text-2xl text-foreground/80 font-medium">
                Celebrando la mayoría de edad
              </p>
              <p className="text-lg md:text-xl text-muted-foreground">
                Un momento mágico para recordar
              </p>
            </div>
            
            <div className="inline-block bg-accent/20 border-2 border-accent rounded-full px-8 py-3">
              <p className="text-accent-foreground font-semibold text-lg">
                6 de Junio, 2026
              </p>
            </div>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="#rsvp"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 rounded-lg transition-all hover:scale-105 hover:shadow-lg glow-accent"
            >
              Confirmar Asistencia
            </a>
            <a
              href="#detalles"
              className="bg-card hover:bg-card/80 text-card-foreground font-semibold px-8 py-4 rounded-lg border-2 border-border transition-all hover:scale-105"
            >
              Ver Detalles
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}
