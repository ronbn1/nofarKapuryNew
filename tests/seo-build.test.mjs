import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { createSeoArtifacts, resolveSiteUrl } from '../.prerender/entry-server.js'

test('generated HTML contains real content and only one canonical, title, and H1', async () => {
  const html = await readFile('dist/index.html', 'utf8')
  for (const expression of [/<title>/g, /rel="canonical"/g, /<h1\b/g, /application\/ld\+json/g])
    assert.equal([...html.matchAll(expression)].length, 1)
  assert.match(html, /data-prerendered="true"/)
  assert.match(html, /פגישת היכרות על קפה/)
  assert.match(html, /זו פגישת שיחה ותכנון/)
  assert.match(html, /אשדוד/)
  assert.doesNotMatch(html, /noindex|פגישת ניסיון|aggregateRating|streetAddress|priceRange/)
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])
  assert.equal(schema['@graph'][0].url, 'https://www.nofarkapury.co.il/')
})

test('public origin validation prevents accidental local canonical URLs', () => {
  assert.equal(resolveSiteUrl('https://www.nofarkapury.co.il'), 'https://www.nofarkapury.co.il/')
  assert.equal(resolveSiteUrl(''), null)
  for (const value of [
    'http://www.nofarkapury.co.il/',
    'https://localhost/',
    'https://192.168.1.1/',
    'https://www.nofarkapury.co.il/page',
    'https://www.nofarkapury.co.il/?a=1',
    'https://name:pass@www.nofarkapury.co.il/',
  ])
    assert.throws(() => resolveSiteUrl(value))
  assert.throws(() => createSeoArtifacts(null, true))
  const preview = createSeoArtifacts('https://www.nofarkapury.co.il/', false)
  assert.match(preview.head, /noindex, follow/)
  assert.equal(preview.sitemap, null)
  assert.doesNotMatch(preview.robots, /Disallow|Sitemap/)
})

test('sitemap lists real pages only and optimized hero is substantially smaller', async () => {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8')
  assert.equal([...sitemap.matchAll(/<loc>/g)].length, 3)
  assert.match(sitemap, /<loc>https:\/\/www.nofarkapury.co.il\/<\/loc>/)
  assert.ok(
    (await stat('dist/images/optimized/hero-1280.webp')).size <
      (await stat('public/images/nofar-hero-slide-3.jpg')).size / 3,
  )
})
