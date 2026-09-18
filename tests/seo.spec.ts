import { test, expect } from '@playwright/test'

test('production HTML works without JavaScript and exposes indexable metadata', async ({
  browser,
  baseURL,
  request,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto(baseURL!)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'איפור ועיצוב שיער לכלות באשדוד ובכל הארץ',
  )
  await expect(page.getByText('פגישת היכרות על קפה', { exact: true })).toBeVisible()
  await expect(page.locator('#portfolio img')).toHaveCount(6)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://www.nofarkapury.co.il/',
  )
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'index, follow, max-image-preview:large',
  )
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://www.nofarkapury.co.il/images/optimized/social.jpg',
  )
  const data = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!)
  expect(
    data['@graph'].find((node: { '@type': string }) => node['@type'] === 'Organization').telephone,
  ).toBe('+972546477885')
  expect((await request.get('/sitemap.xml')).status()).toBe(200)
  expect(await (await request.get('/robots.txt')).text()).toContain(
    'Sitemap: https://www.nofarkapury.co.il/sitemap.xml',
  )
  expect((await request.get('/this-page-does-not-exist')).status()).toBe(404)
  for (const [path, title] of [
    ['privacy', 'מדיניות פרטיות'],
    ['accessibility', 'הצהרת נגישות'],
  ]) {
    const response = await page.goto(new URL(path, baseURL!).href)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://www.nofarkapury.co.il/${path}`,
    )
    await expect(page).toHaveTitle(`${title} | נופר קפורי`)
    await expect(page.getByRole('link', { name: /nofarkapury@gmail.com/ })).toBeVisible()
  }
  await context.close()
})

test('prerendered page hydrates without replacing the document or losing interactions', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  await page.goto('/')
  await expect(page.locator('#root')).toHaveAttribute('data-prerendered', 'true')
  await page.getByRole('button', { name: 'מה כוללת פגישת ההיכרות ואיפה נפגשים?' }).click()
  await expect(page.getByText('זו פגישת שיחה ותכנון', { exact: false })).toBeVisible()
  await page.getByRole('button', { name: 'שיער אסוף', exact: true }).click()
  await expect(page.locator('.inspiration-item')).toHaveCount(2)
  expect(errors).toEqual([])
})
