import { useEffect, useRef } from 'react'
import { Heart, Sparkle } from '@phosphor-icons/react'
import { SparkleText } from '@/components/effects/SparkleText'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })
ScrollTrigger.normalizeScroll(true)

const curtainVideo = '/videos/forestStart.mp4'

const videoVertexShader = `
varying vec2 vUv;
varying float vFold;
uniform float uProgress;

const float PI = 3.141592653589793;

void main() {
  vUv = uv;
  vec3 transformed = position;
  float progress = clamp(uProgress, 0.0, 1.0);
  float edge = smoothstep(0.0, 1.0, uv.x);
  float curve = sin(edge * PI) * pow(progress, 1.12);
  float freeEdgeLift = smoothstep(0.58, 1.0, edge) * progress;

  transformed.z += curve * 0.18 + freeEdgeLift * 0.06;
  transformed.x -= curve * 0.08 + freeEdgeLift * 0.035;
  transformed.y += sin(edge * PI) * progress * 0.018;

  vFold = curve + freeEdgeLift * 0.5;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`

const videoFragmentShader = `
varying vec2 vUv;
varying float vFold;
uniform sampler2D uTexture;
uniform float uProgress;
uniform vec2 uUvScale;
uniform vec2 uUvOffset;

void main() {
  vec2 coverUv = vUv * uUvScale + uUvOffset;
  coverUv = clamp(coverUv, vec2(0.001), vec2(0.999));

  vec4 texel = texture2D(uTexture, coverUv);

  float spineLight = (1.0 - smoothstep(0.0, 0.16, vUv.x)) * 0.10;
  float pageShade = 1.0 - clamp(abs(vFold) * 0.28, 0.0, 0.2);
  float freeEdgeGlow = smoothstep(0.74, 1.0, vUv.x) * 0.12 * uProgress;

  texel.rgb = texel.rgb * pageShade + spineLight + freeEdgeGlow;

  gl_FragColor = texel;
}
`

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)
  const coverCanvasRef = useRef<HTMLCanvasElement>(null)
  const coverVideoRef = useRef<HTMLVideoElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  // Refs para las imágenes de 'Érase una vez'
  const img1Ref = useRef<HTMLImageElement>(null)
  const img2Ref = useRef<HTMLImageElement>(null)
  const img3Ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const coverElement = coverRef.current
    const canvasElement = coverCanvasRef.current
    const videoElement = coverVideoRef.current

    if (!coverElement || !canvasElement || !videoElement) return

    const pageState = { progress: 0 }
    let renderer: THREE.WebGLRenderer | null = null
    let scene: THREE.Scene | null = null
    let camera: THREE.PerspectiveCamera | null = null
    let geometry: THREE.PlaneGeometry | null = null
    let material: THREE.ShaderMaterial | null = null
    let mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> | null = null
    let videoTexture: THREE.VideoTexture | null = null
    let resizeObserver: ResizeObserver | null = null

    const syncPageState = () => {
      const progress = THREE.MathUtils.clamp(pageState.progress, 0, 1)

      coverElement.style.setProperty('--page-shadow-opacity', `${0.18 + progress * 0.42}`)
      coverElement.style.setProperty('--page-edge-opacity', `${0.56 - progress * 0.28}`)
      coverElement.style.setProperty('--page-highlight-shift', `${progress * 18}%`)

      if (!mesh || !material) return

      mesh.rotation.y = -THREE.MathUtils.degToRad(74) * progress
      mesh.rotation.x = THREE.MathUtils.degToRad(5.5) * progress
      mesh.rotation.z = THREE.MathUtils.degToRad(-1.4) * progress
      mesh.position.y = -0.015 * progress
      material.uniforms.uProgress.value = progress
    }

    const resizeScene = () => {
      if (!renderer || !camera || !mesh) return

      const bounds = coverElement.getBoundingClientRect()

      if (!bounds.width || !bounds.height) return

      renderer.setSize(bounds.width, bounds.height, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))

      camera.aspect = bounds.width / bounds.height
      camera.updateProjectionMatrix()

      const viewHeight =
        2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z
      const viewWidth = viewHeight * camera.aspect

      mesh.scale.set(viewWidth, viewHeight, 1)
      mesh.position.x = -viewWidth / 2

      if (material) {
        const viewportAspect = bounds.width / bounds.height
        const mediaAspect =
          videoElement.videoWidth && videoElement.videoHeight
            ? videoElement.videoWidth / videoElement.videoHeight
            : 9 / 16

        const uvScale = material.uniforms.uUvScale.value as THREE.Vector2
        const uvOffset = material.uniforms.uUvOffset.value as THREE.Vector2

        uvScale.set(1, 1)
        uvOffset.set(0, 0)

        if (mediaAspect > viewportAspect) {
          uvScale.x = viewportAspect / mediaAspect
          uvOffset.x = (1 - uvScale.x) / 2
        } else {
          uvScale.y = mediaAspect / viewportAspect
          uvOffset.y = (1 - uvScale.y) / 2
        }
      }
    }

    const startVideo = () => {
      videoElement.muted = true
      const playPromise = videoElement.play()

      if (playPromise) {
        playPromise.catch(() => {
          coverElement.classList.add('intro-cover--fallback')
        })
      }
    }

    coverElement.classList.remove('intro-cover--fallback')
    coverElement.classList.remove('intro-cover--webgl-ready')

    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasElement,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      })
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.setClearColor(0x000000, 0)

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40)
      camera.position.z = 5

      geometry = new THREE.PlaneGeometry(1, 1, 96, 48)
      geometry.translate(0.5, 0, 0)

      videoTexture = new THREE.VideoTexture(videoElement)
      videoTexture.colorSpace = THREE.SRGBColorSpace
      videoTexture.minFilter = THREE.LinearFilter
      videoTexture.magFilter = THREE.LinearFilter
      videoTexture.generateMipmaps = false

      material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: videoTexture },
          uProgress: { value: 0 },
          uUvScale: { value: new THREE.Vector2(1, 1) },
          uUvOffset: { value: new THREE.Vector2(0, 0) },
        },
        vertexShader: videoVertexShader,
        fragmentShader: videoFragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
      })

      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      renderer.setAnimationLoop(() => {
        if (renderer && scene && camera) {
          renderer.render(scene, camera)
        }
      })

      coverElement.classList.add('intro-cover--webgl-ready')
      syncPageState()
      resizeScene()

      window.addEventListener('resize', resizeScene)
      videoElement.addEventListener('loadedmetadata', resizeScene)

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(resizeScene)
        resizeObserver.observe(coverElement)
      }
    } catch {
      coverElement.classList.add('intro-cover--fallback')
    }

    if (videoElement.readyState >= 2) {
      startVideo()
    } else {
      videoElement.addEventListener('canplay', startVideo, { once: true })
    }

    let ctx = gsap.context(() => {
      const tlIntro = gsap.timeline({ defaults: { ease: 'power2.inOut' } })
      
      // Estado inicial (oculto por las dudas aunque empiece en opacity 0 en CSS/JSX)
      gsap.set([img1Ref.current, img2Ref.current, img3Ref.current], { opacity: 0 })
      
      tlIntro
        // 1. Aparece el texto lentamente
        .to(img1Ref.current, { opacity: 1, duration: 2 })
        // 2. Aparecen las figuras con un efecto de "barrido" (como chispas dibujándolas) usando clipPath
        .fromTo(img2Ref.current,
          { opacity: 1, clipPath: 'inset(0% 100% 0% 0%)', filter: 'brightness(2) drop-shadow(0 0 10px rgba(255,215,0,0.8))' },
          { clipPath: 'inset(0% 0% 0% 0%)', filter: 'brightness(1) drop-shadow(0 0 0px rgba(255,215,0,0))', duration: 2, ease: 'power2.inOut' },
          '-=0.5' // Empieza 0.5s antes de que termine el primer fade-in
        )
        // 3. Transición a la imagen completa por encima (sin desaparecer las de abajo para que no parpadee)
        .to(img3Ref.current, { opacity: 1, duration: 0.5 }, '+=1')

      // Pin the viewport for the entire intro sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=1500',
          pin: viewportRef.current,
          pinType: 'fixed',
          scrub: 0.5,
          anticipatePin: 1,
          snap: {
            snapTo: [0, 0.5, 1],
            duration: { min: 0.2, max: 0.45 },
            delay: 0.05,
            ease: 'power1.inOut',
          },
        },
      })

      // ── Phase 1: "Érase una vez..." fades out ──
      tl.to(introRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.08,
        ease: 'power2.in',
      }, 0.02)

      // ── Phase 2: Cover opens like a storybook page ──
      tl.to(pageState, {
        progress: 1,
        duration: 0.18,
        ease: 'power2.inOut',
        onUpdate: syncPageState,
      }, 0.06)
      tl.to(coverElement, {
        autoAlpha: 0,
        duration: 0.04,
        ease: 'power1.out',
      }, 0.18)

      // ── Phase 3: Princess message appears ──
      tl.fromTo(messageRef.current, {
        opacity: 0, y: 30,
      }, {
        opacity: 1, y: 0,
        duration: 0.1,
        ease: 'power2.out',
      }, 0.2)

      // ── Phase 4: Princess message fades out ──
      tl.to(messageRef.current, {
        opacity: 0, y: -30,
        duration: 0.1,
        ease: 'power2.in',
      }, 0.42)

      // ── Phase 5: Sofía content appears ──
      tl.fromTo(contentRef.current, {
        opacity: 0, y: 40, scale: 0.95,
      }, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.12,
        ease: 'power3.out',
      }, 0.5)

      // Sofía stays visible from 0.5 to 1.0 — no fade out
    }, wrapperRef)

    return () => {
      ctx.revert()
      videoElement.removeEventListener('canplay', startVideo)
      videoElement.removeEventListener('loadedmetadata', resizeScene)
      window.removeEventListener('resize', resizeScene)
      resizeObserver?.disconnect()
      renderer?.setAnimationLoop(null)
      videoTexture?.dispose()
      material?.dispose()
      geometry?.dispose()
      renderer?.dispose()
      videoElement.pause()
      coverElement.classList.remove('intro-cover--webgl-ready')
      coverElement.style.removeProperty('--page-shadow-opacity')
      coverElement.style.removeProperty('--page-edge-opacity')
      coverElement.style.removeProperty('--page-highlight-shift')
    }
  }, [])

  return (
    <div ref={wrapperRef} id="inicio">
      <div ref={viewportRef} className="intro-viewport">
        {/* Background */}
        <div className="intro-viewport__bg" />

        {/* Full video cover that opens like a page */}
        <div ref={coverRef} className="intro-cover">
          <canvas ref={coverCanvasRef} className="intro-cover__canvas" />
          <video
            ref={coverVideoRef}
            src={curtainVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            disablePictureInPicture
            className="intro-cover__video-source"
          />
          <div className="intro-cover__shadow" />
          <div className="intro-cover__edge" />
        </div>

        {/* Érase una vez... */}
        <div ref={introRef} className="intro-text intro-text--artwork-shadow flex items-center justify-center relative w-full h-full">
          <img 
            ref={img1Ref} 
            src="/img/erase1.webp" 
            alt="Érase una vez" 
            className="absolute shrink-0 w-[80%] max-w-[600px] object-contain opacity-0" 
          />
          <img 
            ref={img2Ref} 
            src="/img/erase2.webp" 
            alt="Figuras destellos" 
            className="absolute shrink-0 w-[80%] max-w-[600px] object-contain opacity-0" 
          />
          <img 
            ref={img3Ref} 
            src="/img/erase3.webp" 
            alt="Érase una vez completo" 
            className="absolute shrink-0 w-[80%] max-w-[600px] object-contain opacity-0 z-10" 
          />
        </div>

        {/* Princess message */}
        <div ref={messageRef} className="intro-message">
          <Sparkle size={32} weight="fill" className="intro-message__sparkle" />
          <p className="intro-message__line">En un reino de sueños y estrellas</p>
          <p className="intro-message__line">una princesa está por celebrar</p>
          <p className="intro-message__line intro-message__line--gold">
            el capítulo más hermoso de su historia...
          </p>
          <Sparkle size={32} weight="fill" className="intro-message__sparkle" />
        </div>

        {/* Sofía content */}
        <div ref={contentRef} className="intro-hero">
          <div className="intro-hero__inner">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkle size={28} weight="fill" className="text-accent animate-float" />
              <Heart size={20} weight="fill" className="text-primary/60" />
              <Sparkle size={28} weight="fill" className="text-accent animate-float" />
            </div>

            <div className="mb-4">
              <SparkleText text="Sofía" />
            </div>

            <div className="space-y-2 mb-8">
              <p className="text-xl md:text-2xl text-foreground/80 font-medium">
                Celebra conmigo mis XV años
              </p>
              <p className="text-lg md:text-xl text-muted-foreground italic">
                Un momento mágico para recordar
              </p>
            </div>

            <div className="inline-block bg-accent/15 border border-accent/40 rounded-full px-8 py-3 backdrop-blur-sm">
              <p className="text-accent font-semibold text-lg tracking-wide">
                6 de Junio, 2026
              </p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#rsvp" className="hero-cta hero-cta--primary">
                Confirmar Asistencia
              </a>
              <a href="#detalles" className="hero-cta hero-cta--secondary">
                Ver Detalles
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
