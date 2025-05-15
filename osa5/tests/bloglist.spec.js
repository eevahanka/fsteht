const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'tester',
        password: 'salainen'
       }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  })
  describe('Login', () => {
    beforeEach(async ({ page, request }) => {
    await page.getByRole('button', { name: 'log in' }).click()
  })
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('tester')
      await page.getByTestId('password').fill('salainen')
  
      await page.getByRole('button', { name: 'login' }).click() 
  
      await expect(page.getByText('tester logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('tester')
      await page.getByTestId('password').fill('vaara')
  
      await page.getByRole('button', { name: 'login' }).click() 
  
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })
  })