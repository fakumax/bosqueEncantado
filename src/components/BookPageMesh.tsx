import { useRef, useMemo } from 'react'
import * as THREE from 'three'

// ── Vertex Shader ────────────────────────────────────────
const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uProgress;
uniform float uHingeOffset;
uniform float uDeformStrength;

varying vec2 vUv;
varying float vFold;

const float PI = 3.141592653589793;

void main() {
  vUv = uv;
  vec3 pos = position;

  // Normalised distance from the spine (left edge = 0, right = 1)
  float xNorm = clamp((pos.x + uHingeOffset) / (2.0 * uHingeOffset), 0.0, 1.0);

  // Page rotation angle (0 → -PI)
  float angle = -uProgress * PI;

  // ── Curl deformation ──────────────────────────────────
  // Greatest at mid-flip, strongest away from the spine
  float flipMid  = sin(uProgress * PI);                // peaks at 0.5
  float curlWave = sin(xNorm * PI);                     // peaks in the middle of the page
  float curl     = curlWave * flipMid * uDeformStrength;

  // Additional subtle leading-edge lift (paper "peels" away)
  float edgeLift = smoothstep(0.55, 1.0, xNorm) * flipMid * uDeformStrength * 0.4;

  // Apply curl to Z before rotation
  pos.z += curl + edgeLift;

  // ── Hinge rotation around left edge (Y-axis) ─────────
  // Shift origin to the spine, rotate, shift back
  float xFromHinge = pos.x + uHingeOffset;
  pos.x = -uHingeOffset + xFromHinge * cos(angle);
  pos.z = pos.z + xFromHinge * sin(angle);

  // Tiny Y wiggle to sell the paper feel
  pos.y += sin(xNorm * PI * 2.0 + uTime * 0.5) * flipMid * 0.003;

  vFold = curl + edgeLift;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

// ── Fragment Shader ──────────────────────────────────────
const fragmentShader = /* glsl */ `
uniform sampler2D uFrontTexture;
uniform sampler2D uBackTexture;
uniform float uProgress;

varying vec2 vUv;
varying float vFold;

void main() {
  vec4 color;

  if (gl_FrontFacing) {
    color = texture2D(uFrontTexture, vUv);
  } else {
    // Mirror UVs horizontally so text reads correctly on the back
    vec2 backUv = vec2(1.0 - vUv.x, vUv.y);
    color = texture2D(uBackTexture, backUv);
  }

  // Subtle shadow near the spine during flip
  float spineShadow = (1.0 - smoothstep(0.0, 0.15, vUv.x)) * 0.12;
  // Fold darkening for depth
  float foldShade = 1.0 - clamp(abs(vFold) * 0.3, 0.0, 0.22);
  // Leading-edge glow (light catching the paper edge)
  float edgeGlow = smoothstep(0.78, 1.0, vUv.x) * sin(uProgress * 3.14159) * 0.10;

  color.rgb = color.rgb * foldShade + spineShadow + edgeGlow;

  gl_FragColor = color;
}
`

// ── Default textures (solid dark page colors) ────────────
function makeSolidTexture(color: string): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 4
  canvas.height = 4
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 4, 4)
  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

// ── Props ────────────────────────────────────────────────
export interface BookPageMeshProps {
  /** 0 = closed (flat right), 1 = fully flipped (flat left) */
  progress: number
  /** Width of the page plane in world units */
  width?: number
  /** Height of the page plane in world units */
  height?: number
  /** Geometry subdivisions for smooth curl */
  segments?: number
  /** Curl/deformation strength */
  deformStrength?: number
  /** Optional front texture */
  frontTexture?: THREE.Texture
  /** Optional back texture */
  backTexture?: THREE.Texture
  /** z-position to layer pages */
  zOffset?: number
  /** elapsed time (animated externally via useFrame if desired) */
  time?: number
}

export function BookPageMesh({
  progress,
  width = 2,
  height = 3,
  segments = 48,
  deformStrength = 0.25,
  frontTexture,
  backTexture,
  zOffset = 0,
  time = 0,
}: BookPageMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  const defaultFront = useMemo(() => makeSolidTexture('#0c2218'), [])
  const defaultBack = useMemo(() => makeSolidTexture('#091a12'), [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uHingeOffset: { value: width / 2 },
      uDeformStrength: { value: deformStrength },
      uFrontTexture: { value: frontTexture ?? defaultFront },
      uBackTexture: { value: backTexture ?? defaultBack },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  // Update uniforms each frame (driven by parent)
  uniforms.uProgress.value = progress
  uniforms.uTime.value = time
  uniforms.uDeformStrength.value = deformStrength
  if (frontTexture) uniforms.uFrontTexture.value = frontTexture
  if (backTexture) uniforms.uBackTexture.value = backTexture

  return (
    <mesh ref={meshRef} position={[0, 0, zOffset]}>
      <planeGeometry args={[width, height, segments, segments]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  )
}
