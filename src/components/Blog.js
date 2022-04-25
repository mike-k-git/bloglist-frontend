import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateBlog, removeBlog } from "../reducers";

const Blog = () => {
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!blog) {
    return null;
  }

  const handleLikeBlog = async () => {
    try {
      const blogToUpdate = {
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1,
      };
      await dispatch(updateBlog(blogToUpdate)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveBlog = async () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.user.name}`);

    if (ok) {
      try {
        await dispatch(removeBlog(blog.id)).unwrap();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLikeBlog}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {blog.user.username === currentUser.username && (
        <div>
          <button onClick={handleRemoveBlog}>remove</button>
        </div>
      )}
    </div>
  );
};
export default Blog;
