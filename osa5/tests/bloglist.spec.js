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
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('tester')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click() 
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'add blog' }).click()
      await page.getByPlaceholder('blog name').fill('automaatti testaus');
      await page.getByPlaceholder('blog author').fill('emt');
      await page.getByPlaceholder('url').fill('www.auto.fi');
      await page.getByRole('button', { name: 'add' }).click()
      await expect(page.getByText('automaatti testaus – emt')).toBeVisible()
    })
    describe('when a blog exists', () => {
      beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'add blog' }).click()
      await page.getByPlaceholder('blog name').fill('automaatti testaus');
      await page.getByPlaceholder('blog author').fill('emt');
      await page.getByPlaceholder('url').fill('www.auto.fi');
      await page.getByRole('button', { name: 'add' }).click()
    })
    test('a blog can be liked', async ({ page }) => {
        const blogelement = await page.getByText('automaatti testaus');
        await blogelement.getByRole('button', { name: 'show' }).click()
        const likeelement = await page.getByText('likes');
        await likeelement.getByRole('button', { name: 'like' }).click()
        await expect(likeelement.getByText('1 likes')).toBeVisible()
    })
    })
})
  })