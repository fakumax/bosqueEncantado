#!/usr/bin/env node
/**
 * Image optimizer / resizer / converter for /public/img.
 *
 * Uso:
 *   node scripts/optimize-images.mjs [opciones]
 *
 * Opciones (todas opcionales):
 *   --dir=<ruta>          Carpeta a procesar. Default: public/img
 *   --format=webp|jpeg|png|avif|keep
 *                         Formato de salida. Default: webp
 *   --quality=<1-100>     Calidad. Default: 75
 *   --max-width=<px>      Ancho máximo. Default: 1920 (mantiene aspect ratio)
 *   --max-height=<px>     Alto máximo. Default: 1920
 *   --suffix=<txt>        Sufijo del archivo de salida. Default: "" (sobrescribe)
 *   --out=<ruta>          Carpeta de salida (espeja la estructura). Default: igual a --dir
 *   --backup              Hace copia .orig antes de sobrescribir
 *   --skip-existing       No reprocesa si el archivo de salida ya existe
 *   --dry                 Solo muestra qué haría, no escribe
 *
 * Ejemplos:
 *   # Convertir todo a webp calidad 75, máx 1600px, sobrescribiendo (con backup):
 *   node scripts/optimize-images.mjs --format=webp --quality=75 --max-width=1600 --backup
 *
 *   # Solo redimensionar manteniendo formato:
 *   node scripts/optimize-images.mjs --format=keep --max-width=1280
 *
 *   # Salida a carpeta paralela sin tocar originales:
 *   node scripts/optimize-images.mjs --out=public/img-optimized --format=webp
 *
 * Requiere: sharp  (se instala con: pnpm add -D sharp)
 */

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

let sharp
try {
  sharp = (await import('sharp')).default
} catch {
  console.error('\n[optimize-images] Falta la dependencia "sharp".')
  console.error('Instalala con:  pnpm add -D sharp\n')
  process.exit(1)
}

// --- parse args ---
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? true]
  })
)

const SRC_DIR = path.resolve(projectRoot, args.dir ?? 'public/img')
const OUT_DIR = path.resolve(projectRoot, args.out ?? args.dir ?? 'public/img')
const FORMAT = (args.format ?? 'webp').toLowerCase()
const QUALITY = Number(args.quality ?? 75)
const MAX_W = Number(args['max-width'] ?? 1920)
const MAX_H = Number(args['max-height'] ?? 1920)
const SUFFIX = args.suffix ?? ''
const BACKUP = Boolean(args.backup)
const SKIP_EXISTING = Boolean(args['skip-existing'])
const DRY = Boolean(args.dry)

const VALID_FORMATS = ['webp', 'jpeg', 'jpg', 'png', 'avif', 'keep']
if (!VALID_FORMATS.includes(FORMAT)) {
  console.error(`Formato inválido: ${FORMAT}. Usá uno de: ${VALID_FORMATS.join(', ')}`)
  process.exit(1)
}

const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.tiff'])

/** @type {{file:string, beforeKB:number, afterKB:number, savedKB:number}[]} */
const report = []
let errors = 0

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) yield* walk(full)
    else yield full
  }
}

function targetExtFor(srcExt) {
  if (FORMAT === 'keep') return srcExt
  if (FORMAT === 'jpeg') return '.jpg'
  return '.' + FORMAT
}

function fmtPipeline(pipe, ext) {
  switch (ext) {
    case '.webp':
      return pipe.webp({ quality: QUALITY })
    case '.avif':
      return pipe.avif({ quality: QUALITY })
    case '.jpg':
    case '.jpeg':
      return pipe.jpeg({ quality: QUALITY, mozjpeg: true })
    case '.png':
      return pipe.png({ quality: QUALITY, compressionLevel: 9 })
    default:
      return pipe
  }
}

async function processFile(srcPath) {
  const ext = path.extname(srcPath).toLowerCase()
  if (!RASTER_EXT.has(ext)) return

  const rel = path.relative(SRC_DIR, srcPath)
  const targetExt = targetExtFor(ext)
  const baseNoExt = rel.slice(0, rel.length - ext.length)
  const outRel = baseNoExt + SUFFIX + targetExt
  const outPath = path.join(OUT_DIR, outRel)

  if (SKIP_EXISTING) {
    try {
      await fs.access(outPath)
      return
    } catch {
      /* not exists, continue */
    }
  }

  const beforeStat = await fs.stat(srcPath)

  if (DRY) {
    console.log(`[dry] ${rel}  ->  ${path.relative(projectRoot, outPath)}`)
    return
  }

  try {
    const buf = await sharp(srcPath, { failOn: 'none' })
      .rotate()
      .resize({
        width: MAX_W,
        height: MAX_H,
        fit: 'inside',
        withoutEnlargement: true,
      })
    const out = await fmtPipeline(buf, targetExt).toBuffer()

    await fs.mkdir(path.dirname(outPath), { recursive: true })

    if (BACKUP && path.resolve(srcPath) === path.resolve(outPath)) {
      await fs.copyFile(srcPath, srcPath + '.orig')
    }

    await fs.writeFile(outPath, out)

    const beforeKB = beforeStat.size / 1024
    const afterKB = out.length / 1024
    report.push({
      file: rel,
      beforeKB,
      afterKB,
      savedKB: beforeKB - afterKB,
    })
    console.log(
      `✓ ${rel}  ${beforeKB.toFixed(1)}KB -> ${afterKB.toFixed(1)}KB  (${(
        ((beforeKB - afterKB) / beforeKB) *
        100
      ).toFixed(1)}%)`
    )
  } catch (err) {
    errors++
    console.error(`✗ ${rel}: ${err.message}`)
  }
}

async function main() {
  console.log('--- optimize-images ---')
  console.log('src     :', path.relative(projectRoot, SRC_DIR))
  console.log('out     :', path.relative(projectRoot, OUT_DIR))
  console.log('format  :', FORMAT, '| quality:', QUALITY)
  console.log('max     :', MAX_W + 'x' + MAX_H)
  console.log('backup  :', BACKUP, '| skip-existing:', SKIP_EXISTING, '| dry:', DRY)
  console.log('-----------------------\n')

  try {
    await fs.access(SRC_DIR)
  } catch {
    console.error('No existe la carpeta:', SRC_DIR)
    process.exit(1)
  }

  for await (const file of walk(SRC_DIR)) {
    await processFile(file)
  }

  if (report.length) {
    const total = report.reduce(
      (acc, r) => {
        acc.before += r.beforeKB
        acc.after += r.afterKB
        return acc
      },
      { before: 0, after: 0 }
    )
    console.log('\n--- resumen ---')
    console.log(`procesados : ${report.length}`)
    console.log(`antes      : ${(total.before / 1024).toFixed(2)} MB`)
    console.log(`después    : ${(total.after / 1024).toFixed(2)} MB`)
    console.log(
      `ahorro     : ${((total.before - total.after) / 1024).toFixed(2)} MB  (${(
        ((total.before - total.after) / total.before) *
        100
      ).toFixed(1)}%)`
    )
  } else {
    console.log('No se procesó ningún archivo.')
  }
  if (errors) {
    console.log(`\nErrores: ${errors}`)
    process.exit(1)
  }
}

main()
