import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test("renders only blogs's title and author by default", () => {
  const blog = {
    title: 'TDD harms architecture',
    url: 'http://www.u.arizona.edu/',
    author: 'Michael Chan',
    id: '1293179231',
    likes: 0,
    user: {
      username: 'username',
      name: 'name',
      id: '123123976123',
    },
  }
  const likes = jest.fn()
  const removeBlog = jest.fn()
  const currentUser = 'username'

  const { container } = render(
    <Blog
      blog={blog}
      likes={likes}
      removeBlog={removeBlog}
      currentUser={currentUser}
    />
  )

  const titleSpan = container.querySelector('.blog-title')
  expect(titleSpan).toBeDefined()

  const authorSpan = container.querySelector('.blog-author')
  expect(authorSpan).toBeDefined()

  const urlSpan = container.querySelector('.blog-url')
  screen.debug(urlSpan)
  expect(urlSpan).toBeNull()

  const likesSpan = container.querySelector('.blog-likes')
  expect(likesSpan).toBeNull()
})
