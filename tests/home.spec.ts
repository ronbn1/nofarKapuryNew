import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('Hebrew page, real portfolio, working navigation and accessible interactions', async ({
  page,
}, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.locator('html')).toHaveAttribute('lang', 'he')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  await expect(page.locator('form')).toHaveCount(0)
  await expect(page.locator('.hero-photo img')).toHaveAttribute(
    'src',
    '/images/optimized/hero-1280.webp',
  )
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'דילוג לתוכן הראשי' })).toBeFocused()

  const whatsappLinks = await page
    .locator('a[href*="wa.me"]')
    .evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href))
  expect(whatsappLinks.length).toBeGreaterThan(3)
  expect(whatsappLinks.every((href) => new URL(href).pathname === '/972546477885')).toBeTruthy()

  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), {
        message: `No horizontal overflow at ${width}px`,
      })
      .toBeTruthy()
  }
  await page.setViewportSize(testInfo.project.use.viewport!)

  await page.locator('#portfolio').scrollIntoViewIfNeeded()
  await expect(page.locator('.inspiration-item')).toHaveCount(6)

  await expect(page.getByRole('heading', { name: 'הן מספרות על החוויה שלהן.' })).toBeVisible()
  await expect(page.locator('.review-card')).toHaveCount(3)
  await expect(page.getByRole('link', { name: /לביקורת של ירדן/ })).toHaveAttribute(
    'href',
    'https://www.mit4mit.co.il/reviews/67bd79fceeee0d2b55381093',
  )
  await page.getByRole('button', { name: 'שיער אסוף', exact: true }).click()
  await expect(page.locator('.inspiration-item')).toHaveCount(2)
  await expect(page.getByRole('button', { name: 'שיער אסוף', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  const imageButton = page.getByRole('button', { name: 'הגדלת תמונה: בדיוק כמו שאת' })
  await imageButton.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('dialog')).toHaveAttribute('dir', 'rtl')
  await expect(page.getByRole('link', { name: /לפוסט המקורי/ })).toHaveAttribute(
    'href',
    'https://www.instagram.com/nofar_kapury/p/Dc9E5txDCwK/',
  )
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([])
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(imageButton).toBeFocused()
  await page.getByRole('button', { name: 'הכול', exact: true }).click()
  await expect(page.locator('.inspiration-item')).toHaveCount(6)

  const question = page.getByRole('button', { name: 'את מגיעה למקום ההתארגנות?' })
  await question.click()
  await expect(question).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByText('כן. אני יוצאת מאשדוד', { exact: false })).toBeVisible()
  await question.click()

  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'פתיחת תפריט ניווט' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze()
      ).violations,
    ).toEqual([])
    await page
      .getByRole('navigation', { name: 'ניווט בנייד' })
      .getByRole('link', { name: 'איפור ושיער' })
      .click()
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(page).toHaveURL(/#services$/)
  }

  const anchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')!.slice(1)))
  for (const id of anchors) await expect(page.locator(`[id="${id}"]`)).toHaveCount(1)
  await page.locator('#portfolio').scrollIntoViewIfNeeded()
  await expect
    .poll(() =>
      page
        .locator('#portfolio img')
        .evaluateAll((images) =>
          images.every(
            (image) =>
              (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBeTruthy()
  await page.evaluate(() => window.scrollTo(0, 0))
  const audit = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()
  expect(audit.violations).toEqual([])
  expect(errors).toEqual([])
  await page.screenshot({ path: `artifacts/${testInfo.project.name}-full.png`, fullPage: true })
  await page.screenshot({ path: `artifacts/${testInfo.project.name}-hero.png` })
})
