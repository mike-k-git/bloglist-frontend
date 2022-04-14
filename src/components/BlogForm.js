const BlogForm = ({
  newBlog,
  onTitleChange,
  onAuthorChange,
  onUrlChange,
  handleSubmit,
}) => {
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title{' '}
          <input
            type="text"
            name="title"
            id="title"
            value={newBlog.title}
            onChange={onTitleChange}
          />
        </div>
        <div>
          author{' '}
          <input
            type="text"
            name="author"
            id="author"
            value={newBlog.author}
            onChange={onAuthorChange}
          />
        </div>
        <div>
          url{' '}
          <input
            type="text"
            name="url"
            id="url"
            value={newBlog.url}
            onChange={onUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
