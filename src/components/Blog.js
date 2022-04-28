import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateBlog, removeBlog, commentBlog } from "../reducers";
import { showNotificationWithTimeout } from "../reducers";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(
        commentBlog({ id: blog.id, text: event.target.comment.value })
      ).unwrap();
      event.target.comment.value = "";
    } catch (error) {
      dispatch(showNotificationWithTimeout(error.message, "error"));
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-orange-300 text-3xl sm:text-4xl lg:text-5xl font-semibold">
        {blog.title}{" "}
        <span className="text-orange-700 text-sm">{blog.author}</span>
      </h2>
      <div className="text-sm leading-6 space-y-2 pt-4">
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes === 1 ? "1 like" : `${blog.likes} likes`}
          <button
            className="m-2 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300"
            type="submit"
            data-cy="like-submit"
            onClick={handleLikeBlog}
          >
            Like
          </button>
        </div>
        <div>
          added by{" "}
          <span className="text-base text-slate-900 font-semibold">
            {blog.user.name}
          </span>
        </div>
        {blog.user.username === currentUser.username && (
          <div>
            <button
              className="mt-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300"
              type="submit"
              data-cy="blog-remove"
              onClick={handleRemoveBlog}
            >
              Remove
            </button>
          </div>
        )}
      </div>
      <div className="pt-6 lg:pt-8">
        <h2 className=" text-3xl sm:text-4xl lg:text-5xl font-semibold pb-4">
          comments
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            className="focus:ring-orange-300 focus:border-orange-300 flex-1 rounded-md sm:text-sm border-gray-300"
            type="text"
            name="comment"
          />
          <button
            type="submit"
            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300"
          >
            add comment
          </button>
        </form>
        <div className="prose">
          {blog.comments && (
            <ul>
              {blog.comments.map((comment) => (
                <li key={comment.id}>{comment.text}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export default Blog;
