import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


test('renders content', () => {
  const blog = {
    title: 'testi',
    author: 'testaaja',
    url: 'www.testi.fi',
    likes: 0
  }

  render(<Blog blog={blog}/>)

  const element = screen.getByText('testi – testaaja')
  expect(element).toBeDefined()
})

test('likes rendered when opened', async () => {
  const blog = {
    title: 'testi',
    author: 'testaaja',
    url: 'www.testi.fi',
    likes: 0
  }


  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)
  const element = screen.getByText('0 likes')
  expect(element).toBeDefined()
})

test('like clicked twise', async () => {
  const blog = {
    title: 'testi',
    author: 'testaaja',
    url: 'www.testi.fi',
    likes: 0
  }
  const mockHandler = vi.fn()

  render(<Blog blog={blog} handlelike={mockHandler}/>)

  const user = userEvent.setup()
  const showbutton = screen.getByText('show')
  await user.click(showbutton)
  const likebutton = screen.getByText('like')
  await user.click(likebutton)
  await user.click(likebutton)
  
  expect(mockHandler.mock.calls).toHaveLength(2)
})

