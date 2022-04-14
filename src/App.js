import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

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

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setNotification({ text: `Hi ${user.name}!`, type: 'success' })
      setTimeout(() => setNotification(null), 3000)
      setUser(user)
    } catch (error) {
      setNotification({ text: `Wrong username or password`, type: 'error' })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.create(newBlog)
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
          <button type="submit" onClick={logout}>
            logout
          </button>
        </p>
        <Togglable ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
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
        <LoginForm login={login} />
      </div>
    </div>
  )
}

export default App
