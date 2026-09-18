import { test, expect } from '@playwright/test'

test('mobile menu positions and focuses each destination after closing', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  for (const [label, id] of [['נעים להכיר','about'],['הכלות שלי','portfolio'],['כלות מספרות','reviews'],['איפור ושיער','services'],['החוויה שלך','experience'],['בואי נדבר','contact']]) {
    await page.getByRole('button', { name: 'פתיחת תפריט ניווט' }).click()
    await page.getByRole('navigation', { name: 'ניווט בנייד' }).getByRole('link', { name: label, exact: true }).click()
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(page.locator(`#${id}`)).toBeFocused()
    await expect.poll(() => page.locator(`#${id}`).evaluate(el => Math.abs(el.getBoundingClientRect().top - 85))).toBeLessThan(4)
  }
  await page.getByRole('button', { name: 'פתיחת תפריט ניווט' }).click()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'פתיחת תפריט ניווט' })).toBeFocused()
})
