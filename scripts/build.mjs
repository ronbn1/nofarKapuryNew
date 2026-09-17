import { build, loadEnv } from 'vite'
import { readFile, writeFile, readdir } from 'node:fs/promises'
import './optimize-images.mjs'

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env }
await build()
await build({ build: { ssr: 'src/entry-server.tsx', outDir: '.prerender', copyPublicDir: false, emptyOutDir: true } })
const { renderPage, createSeoArtifacts, resolveSiteUrl, seoConfig, legalDocuments } = await import('../.prerender/entry-server.js')
const siteUrl = resolveSiteUrl(env.SITE_URL ?? seoConfig.siteUrl)
if (env.SITE_INDEXABLE && !['true', 'false'].includes(env.SITE_INDEXABLE)) throw new Error('SITE_INDEXABLE must be true or false.')
const indexable = env.SITE_INDEXABLE !== 'false'
const seo = createSeoArtifacts(siteUrl, indexable)
const hebrewFont = (await readdir('dist/assets')).find(file => /^assistant-hebrew-.*\.woff2$/.test(file))
if (!hebrewFont) throw new Error('Hebrew font asset missing from the build.')
for (const page of [undefined, ...legalDocuments]) {
const path = page?.path ?? '/'
const file = page ? `dist${path}` : 'dist/index.html'
const template = await readFile(file, 'utf8')
const pageSeo = createSeoArtifacts(siteUrl, indexable, page)
if (!template.includes('<div id="root"></div>') || !template.includes('<!--seo:start-->')) throw new Error('HTML build placeholders missing.')
const html = template
  .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, pageSeo.head)
  .replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${renderPage(path)}</div>`)
  .replace('</head>', `<link rel="preload" href="/assets/${hebrewFont}" as="font" type="font/woff2" crossorigin />\n</head>`)
await writeFile(file, html)
}
await writeFile('dist/robots.txt', seo.robots)
if (seo.sitemap) await writeFile('dist/sitemap.xml', seo.sitemap)
await writeFile('dist/404.html', '<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, follow"><title>העמוד לא נמצא | נופר קפורי</title></head><body><main><h1>העמוד לא נמצא</h1><p>אפשר לחזור לאתר של נופר ולהמשיך משם.</p><a href="/">חזרה לעמוד הבית</a></main></body></html>')
console.log(`Static Hebrew HTML generated. Indexing: ${indexable ? 'enabled for ' + siteUrl : 'disabled (preview)'}.`)
if (!indexable) console.log('Before publishing: set SITE_URL to the public HTTPS origin and SITE_INDEXABLE=true, then rebuild.')
