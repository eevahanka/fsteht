const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    // await expect(page.getByText('Login')).toBeVisible()
  })
})