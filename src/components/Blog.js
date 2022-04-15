import { useState } from 'react'
const Blog = ({ blog, likes }) => {
  const [fullInfo, setFullInfo] = useState(false)

  const toggleFullInfo = () => {
    setFullInfo(!fullInfo)
  }

  const style = {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    border: 'solid',
    marginTop: 5,
    marginBottom: 5,
    lineHeight: '1.5em',
  }

  if (fullInfo) {
    return (
      <div style={style}>
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={toggleFullInfo}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={likes}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    )
  }

  return (
    <div style={style}>
      {blog.title} {blog.author} <button onClick={toggleFullInfo}>view</button>
    </div>
  )
}

export default Blog
