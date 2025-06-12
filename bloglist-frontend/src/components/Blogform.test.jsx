import { render, screen } from '@testing-library/react'
import BlogForm from './blogform'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

test('renders content and submits correct data', async () => {
  const handleSubmit = vi.fn()
  const handleTitleChange = vi.fn()
  const handleAuthorChange = vi.fn()
  const handleUrlChange = vi.fn()
  const user = userEvent.setup()
  render(
    <BlogForm
      handleSubmit={handleSubmit}
      handleTitleChange={handleTitleChange}
      handleAuthorChange={handleAuthorChange}
      handleUrlChange={handleUrlChange}
      title="a blogs tester name"
      author="by tester"
      url="www.test.com"
    />
  )
  const sendButton = screen.getByText('add')
  await user.click(sendButton)
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  const submittedData = handleSubmit.mock.calls[0][0]
  expect(submittedData).toEqual({
    title: 'a blogs tester name',
    author: 'by tester',
    url: 'www.test.com',
  })
})
