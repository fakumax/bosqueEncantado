import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Camera, Image as ImageIcon, X } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Photo {
  id: string
  url: string
  uploadedBy: string
  timestamp: number
}

export function PhotoGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [uploaderName, setUploaderName] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!uploaderName.trim()) {
      toast.error('Por favor ingresa tu nombre')
      return
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona una imagen')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen es muy grande (máx. 5MB)')
      return
    }

    setIsUploading(true)

    try {
      const reader = new FileReader()
      reader.onload = (event) => {
        const newPhoto: Photo = {
          id: Date.now().toString(),
          url: event.target?.result as string,
          uploadedBy: uploaderName.trim(),
          timestamp: Date.now(),
        }

        setPhotos(currentPhotos => [...currentPhotos, newPhoto])
        toast.success('¡Foto subida exitosamente!')
        setUploaderName('')
        setDialogOpen(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      toast.error('Error al subir la foto')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDeletePhoto = (photoId: string) => {
    setPhotos(currentPhotos => currentPhotos.filter(p => p.id !== photoId))
    toast.success('Foto eliminada')
  }

  return (
    <section ref={sectionRef} id="fotos" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <Camera size={40} weight="duotone" className="text-accent" />
          </div>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-4">
            Galería de Fotos
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Comparte tus mejores momentos de la celebración
          </p>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                <ImageIcon size={20} weight="bold" className="mr-2" />
                Subir Foto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-playfair text-2xl">Subir Foto</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="uploader-name" className="text-sm font-medium">
                    Tu nombre
                  </label>
                  <input
                    id="uploader-name"
                    type="text"
                    placeholder="Ingresa tu nombre"
                    value={uploaderName}
                    onChange={(e) => setUploaderName(e.target.value)}
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="photo-upload" className="text-sm font-medium">
                    Seleccionar foto
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent file:text-accent-foreground file:font-semibold hover:file:bg-accent/90"
                  />
                  <p className="text-xs text-muted-foreground">
                    Máximo 5MB, formatos: JPG, PNG, GIF
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {photos.length === 0 ? (
          <Card className="p-12 bg-card/80 backdrop-blur text-center">
            <Camera size={64} weight="duotone" className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              Aún no hay fotos. ¡Sé el primero en compartir!
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <Card key={photo.id} className="group relative overflow-hidden bg-card/90 backdrop-blur p-2">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <img
                    src={photo.url}
                    alt={`Foto de ${photo.uploadedBy}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                  >
                    <X size={16} weight="bold" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 truncate">
                  Por {photo.uploadedBy}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
