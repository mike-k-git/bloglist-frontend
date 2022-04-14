import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const newBlog = { title, author, url }

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    if (user) {
      fetchBlogs()
    }
  }, [user])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setNotification({ text: `Hi ${user.name}!`, type: 'success' })
      setTimeout(() => setNotification(null), 3000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({ text: `Wrong username or password`, type: 'error' })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleBlogCreate = async (event) => {
    event.preventDefault()
    try {
      const savedBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(savedBlog))
      setNotification({
        text: `A new blog ${savedBlog.title} by ${savedBlog.author} added`,
        type: 'success',
      })
      setTimeout(() => setNotification(null), 3000)
    } catch (error) {
      setNotification({
        text: `an error occurred while adding the blog`,
        type: 'error',
      })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  if (user !== null) {
    return (
      <div>
        <Notification notification={notification} />
        <h2>blogs</h2>
        <p>
          {user.name} logged in{' '}
          <button type="submit" onClick={handleLogout}>
            logout
          </button>
        </p>
        <BlogForm
          newBlog={newBlog}
          handleSubmit={handleBlogCreate}
          onTitleChange={({ target }) => {
            setTitle(target.value)
          }}
          onAuthorChange={({ target }) => {
            setAuthor(target.value)
          }}
          onUrlChange={({ target }) => {
            setUrl(target.value)
          }}
        />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification} />
      <div>
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
          onUsernameChange={({ target }) => setUsername(target.value)}
          onPasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    </div>
  )
}

export default App
