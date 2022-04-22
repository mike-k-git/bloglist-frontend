import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, likes, currentUser, removeBlog }) => {
  const [fullInfo, setFullInfo] = useState(false);

  const toggleFullInfo = () => {
    setFullInfo(!fullInfo);
  };

  const style = {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    border: "solid",
    marginTop: 5,
    marginBottom: 5,
    lineHeight: "1.5em",
  };

  if (fullInfo) {
    return (
      <div style={style} className="blog-item" data-cy="blog-item">
        <div>
          <span className="blog-title">{blog.title}</span>{" "}
          <span className="blog-author">{blog.author}</span>{" "}
          <button onClick={toggleFullInfo}>hide</button>
        </div>
        <div className="blog-url">{blog.url}</div>
        <div className="blog-likes">
          <span>likes {blog.likes}</span>{" "}
          <button onClick={likes} data-cy="like-submit">
            like
          </button>
        </div>
        <div className="blog-user">{blog.user.name}</div>
        {currentUser === blog.user.name && (
          <button onClick={removeBlog} data-cy="blog-remove">
            remove
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={style} data-cy="blog-item">
      <span className="blog-title">{blog.title}</span>{" "}
      <span className="blog-author">{blog.author}</span>{" "}
      <button onClick={toggleFullInfo} data-cy="show-bloginfo">
        view
      </button>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    likes: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  likes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default Blog;
