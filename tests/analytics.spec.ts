import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.skip(
  process.env.ANALYTICS_TEST !== '1',
  'Requires a production test build with the mock GA ID and localhost allowed.',
)
const key = 'nofar-analytics-consent-v1'
const id = 'G-TEST12345'

async function mockGoogle(page: Page) {
  const requests: string[] = []
  await page.route(
    /https:\/\/([^/]+\.)?(googletagmanager\.com|google-analytics\.com)\//,
    async (route) => {
      requests.push(route.request().url())
      if (route.request().url().includes('/gtag/js')) {
        await route.fulfill({
          contentType: 'application/javascript',
          body: 'document.cookie="_ga=mock;path=/";document.cookie="_ga_TEST12345=mock;path=/";',
        })
      } else await route.abort()
    },
  )
  return requests
}

async function commands(page: Page) {
  return page.evaluate(() =>
    ((window as unknown as { dataLayer?: ArrayLike<unknown>[] }).dataLayer ?? []).map((item) =>
      Array.from(item),
    ),
  )
}

test('no Google before consent; rejection persists and settings remain accessible', async ({
  page,
}) => {
  const requests = await mockGoogle(page)
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'מדידת שימוש באתר' })).toBeVisible()
  expect(requests).toEqual([])
  expect(await commands(page)).toEqual([])
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()).violations,
  ).toEqual([])
  await page.getByRole('button', { name: 'ללא מדידה', exact: true }).click()
  await page.reload()
  await expect(page.locator('.analytics-consent')).toHaveCount(0)
  expect(requests).toEqual([])
  const settings = page.getByRole('button', { name: 'העדפות מדידה' })
  await settings.click()
  await expect(page.locator('.analytics-consent')).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(settings).toBeFocused()
  expect(await page.context().cookies()).toEqual([])
})

test('consented events include placement but omit message text and unrelated query parameters', async ({
  page,
}) => {
  const requests = await mockGoogle(page)
  await page.goto(
    '/?utm_source=instagram&utm_medium=social&utm_campaign=profile&email=private@example.com#home',
  )
  await page.getByRole('button', { name: 'לאפשר מדידה', exact: true }).click()
  await expect.poll(() => requests.length).toBe(1)
  const setup = await commands(page)
  expect(
    setup.filter((command) => command[0] === 'event' && command[1] === 'page_view'),
  ).toHaveLength(1)
  expect(setup.find((command) => command[0] === 'config')).toEqual([
    'config',
    id,
    expect.objectContaining({
      send_page_view: false,
      page_location: 'http://127.0.0.1:4173/',
      campaign_source: 'instagram',
      campaign_medium: 'social',
      campaign_name: 'profile',
      allow_google_signals: false,
    }),
  ])
  // Prevent the external handoff; still exercise real mouse clicks and delegated tracking.
  await page.evaluate(() =>
    document.addEventListener('click', (event) => {
      if ((event.target as Element).closest('a[href^="https://wa.me"],a[href^="tel:"]'))
        event.preventDefault()
    }),
  )
  await page.locator('#home a[href*="wa.me"]').click()
  await page.locator('.floating-contact').click()
  await page.locator('#services .service-link').first().click()
  await page.locator('#contact a[href^="tel:"]').click()
  await page.locator('.inspiration-item').first().click()
  await page.keyboard.press('Escape')
  await page.locator('#reviews-title').scrollIntoViewIfNeeded()
  await expect
    .poll(
      async () =>
        (await commands(page)).filter(
          (c) =>
            c[1] === 'section_view' &&
            (c[2] as { section_id: string }).section_id === 'reviews-title',
        ).length,
    )
    .toBe(1)
  await page.locator('#contact-title').scrollIntoViewIfNeeded()
  await expect
    .poll(
      async () =>
        (await commands(page)).filter(
          (c) =>
            c[1] === 'section_view' &&
            (c[2] as { section_id: string }).section_id === 'contact-title',
        ).length,
    )
    .toBe(1)
  const events = (await commands(page)).filter((c) => c[0] === 'event')
  expect(events).toContainEqual(['event', 'whatsapp_click', { button_location: 'home' }])
  expect(events).toContainEqual(['event', 'whatsapp_click', { button_location: 'floating' }])
  expect(events).toContainEqual([
    'event',
    'whatsapp_click',
    { button_location: 'services', service_id: '01' },
  ])
  expect(events).toContainEqual(['event', 'phone_click', { button_location: 'contact' }])
  expect(events).toContainEqual(['event', 'gallery_open', { image_id: 'soft' }])
  expect(JSON.stringify(await commands(page))).not.toMatch(/private@example|wa\.me|972546|אשמח/)
  await page.reload()
  await expect.poll(() => requests.length).toBe(2)
  expect(
    (await commands(page)).filter((c) => c[0] === 'event' && c[1] === 'page_view'),
  ).toHaveLength(1)
})

test('withdrawal removes GA cookies and stops the tag across reloads', async ({ page }) => {
  const requests = await mockGoogle(page)
  await page.goto('/')
  await page.getByRole('button', { name: 'לאפשר מדידה', exact: true }).click()
  await expect
    .poll(async () => (await page.context().cookies()).some((c) => c.name === '_ga'))
    .toBe(true)
  await page.getByRole('button', { name: 'העדפות מדידה' }).click()
  await page.getByRole('button', { name: 'ללא מדידה', exact: true }).click()
  await expect
    .poll(() => page.evaluate(() => document.getElementById('google-analytics-tag') === null))
    .toBe(true)
  await expect(page.locator('.analytics-consent')).toHaveCount(0)
  expect((await page.context().cookies()).filter((c) => c.name.startsWith('_ga'))).toEqual([])
  await page.reload()
  expect(requests).toHaveLength(1)
  expect(await commands(page)).toEqual([])
})

test('expired or unavailable consent storage defaults to no measurement', async ({ page }) => {
  const requests = await mockGoogle(page)
  await page.addInitScript(
    (storageKey) =>
      localStorage.setItem(storageKey, JSON.stringify({ value: 'granted', expires: 1 })),
    key,
  )
  await page.goto('/')
  await expect(page.locator('.analytics-consent')).toBeVisible()
  expect(requests).toEqual([])
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new Error('Storage blocked')
    }
    Storage.prototype.setItem = () => {
      throw new Error('Storage blocked')
    }
  })
  await page.reload()
  await page.getByRole('button', { name: 'ללא מדידה', exact: true }).click()
  await expect(page.locator('.analytics-consent')).toHaveCount(0)
  expect(requests).toEqual([])
})

test('measurement excludes hosts outside the configured production allowlist', async ({ page }) => {
  const requests = await mockGoogle(page)
  await page.goto('http://localhost:4173/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('.analytics-consent')).toHaveCount(0)
  expect(requests).toEqual([])
})
