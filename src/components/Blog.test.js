import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event/'
import Blog from './Blog'

describe('<Blog />', () => {
  let container, likes, removeBlog, currentUser

  beforeEach(() => {
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
    likes = jest.fn()
    removeBlog = jest.fn()
    currentUser = 'username'

    container = render(
      <Blog
        blog={blog}
        likes={likes}
        removeBlog={removeBlog}
        currentUser={currentUser}
      />
    ).container
  })

  test("renders only blogs's title and author by default", () => {
    const titleSpan = container.querySelector('.blog-title')
    expect(titleSpan).toBeDefined()

    const authorSpan = container.querySelector('.blog-author')
    expect(authorSpan).toBeDefined()

    const urlSpan = container.querySelector('.blog-url')
    expect(urlSpan).toBeNull()

    const likesSpan = container.querySelector('.blog-likes')
    expect(likesSpan).toBeNull()
  })

  test("blog's url and number of likes are shown wthen the button clicked", async () => {
    const button = screen.getByText('view')
    await userEvent.click(button)

    const urlSpan = container.querySelector('.blog-url')
    expect(urlSpan).toBeDefined()

    const likesSpan = container.querySelector('.blog-likes')
    expect(likesSpan).toBeDefined()
  })
})