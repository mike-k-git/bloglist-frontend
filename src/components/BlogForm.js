import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogSlice";
import { showNotificationWithTimeout } from "../reducers/notificationSlice";

const BlogForm = ({ onBlogCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await dispatch(
        createBlog({ title, author, url })
      ).unwrap();
      onBlogCreate();
      dispatch(
        showNotificationWithTimeout(
          `A new blog ${result.title} by ${result.author} added`,
          "success"
        )
      );
    } catch (error) {
      dispatch(showNotificationWithTimeout(error.message, "error"));
    }
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title{" "}
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            data-cy="blog-title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author{" "}
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            data-cy="blog-author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url{" "}
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            data-cy="blog-url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" data-cy="blog-create">
          create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  onBlogCreate: PropTypes.func.isRequired,
};

export default BlogForm;
