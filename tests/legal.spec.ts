import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('accessibility controls change display, restore defaults and return focus', async ({ page }) => {
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'נגישות — התאמות תצוגה' })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'התאמות נגישות' })
  await dialog.getByRole('button', { name: 'הגדלת טקסט', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('data-large-text', '')
  await dialog.getByRole('button', { name: 'ניגודיות מוגברת', exact: true }).click()
  await dialog.getByRole('button', { name: 'הפחתת תנועה', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('data-high-contrast', '')
  await expect(page.locator('html')).toHaveAttribute('data-reduce-motion', '')
  await expect(dialog.getByRole('button', { name: 'הגדלת טקסט', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await page.keyboard.press('Escape')
  await expect(trigger).toBeFocused()
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  }
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()).violations).toEqual([])
  await trigger.click()
  await dialog.getByRole('button', { name: 'איפוס התאמות' }).click()
  await expect(page.locator('html')).not.toHaveAttribute('data-large-text')
  await expect(page.locator('html')).not.toHaveAttribute('data-high-contrast')
  await expect(page.locator('html')).not.toHaveAttribute('data-reduce-motion')
})

test('legal pages are linked, accessible, and do not contact third parties', async ({
  page,
  context,
}) => {
  const externalRequests: string[] = []
  const errors: string[] = []
  page.on('request', (request) => {
    if (!['127.0.0.1', 'localhost'].includes(new URL(request.url()).hostname))
      externalRequests.push(request.url())
  })
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  for (const [path, title] of [
    ['/privacy.html', 'מדיניות פרטיות'],
    ['/accessibility.html', 'הצהרת נגישות'],
  ]) {
    await page
      .getByRole('navigation', { name: 'מידע משפטי' })
      .getByRole('link', { name: title, exact: true })
      .click()
    await expect(page).toHaveURL(new RegExp(`${path.replace('.', '\\.')}$$`))
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title)
    await expect(page.locator('a[href="mailto:nofarkapury@gmail.com"]')).toBeVisible()
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'דילוג לתוכן הראשי' })).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page.locator('main')).toBeFocused()
    await page
      .getByRole('navigation', { name: 'תוכן העמוד' })
      .getByRole('link', { name: 'פרטי קשר', exact: true })
      .click()
    await expect(page.locator('#legal-contact')).toBeInViewport()
    for (const width of [320, 390, 768]) {
      await page.setViewportSize({ width, height: 900 })
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true)
    }
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    expect(results.violations).toEqual([])
    expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0, 0])
  }
  expect(await context.cookies()).toEqual([])
  expect(externalRequests).toEqual([])
  expect(errors).toEqual([])
  await page.getByRole('link', { name: 'חזרה לעמוד הבית', exact: true }).click()
  await expect(page.locator('#home')).toBeVisible()
})
