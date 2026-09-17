import sharp from 'sharp'
import { mkdir, stat } from 'node:fs/promises'

await mkdir('public/images/optimized', { recursive: true })
const source = 'public/images/nofar-hero-slide-3.jpg'
for (const width of [640, 960, 1280]) {
  await sharp(source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/images/optimized/hero-${width}.webp`)
}
for (const number of ['05', '06', '07', '08', '09', '12']) {
  await sharp(`public/images/nofar-${number}.jpg`).rotate().resize({ width: 480 }).webp({ quality: 84 }).toFile(`public/images/optimized/nofar-${number}.webp`)
  await sharp(`public/images/nofar-${number}.jpg`).rotate().resize({ width: 320 }).webp({ quality: 82 }).toFile(`public/images/optimized/nofar-${number}-320.webp`)
}
await sharp('Symbol.png').resize(1200, 630, { fit: 'contain', background: '#ffffff' }).jpeg({ quality: 88 }).toFile('public/images/optimized/social.jpg')
const original = (await stat(source)).size
const optimized = (await stat('public/images/optimized/hero-1280.webp')).size
console.log(`Hero: ${original} → ${optimized} bytes (${Math.round((1 - optimized / original) * 100)}% smaller). Originals preserved.`)
