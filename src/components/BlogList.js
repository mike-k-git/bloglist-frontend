import React, { useEffect } from "react";
import {
  fetchBlogs,
  selectSortedBlogs,
  updateBlog,
  removeBlog,
} from "../reducers/blogSlice";
import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog";
import { showNotificationWithTimeout } from "../reducers/notificationSlice";

const BlogList = ({ currentUser }) => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectSortedBlogs);
  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(fetchBlogs()).unwrap();
      } catch (error) {
        dispatch(showNotificationWithTimeout(error.message, "error"));
      }
    };

    init();
  }, [dispatch]);

  const handleLikeBlog = async (blog) => {
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

  const handleRemoveBlog = async (blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.user.name}`);

    if (ok) {
      try {
        await dispatch(removeBlog(blog.id)).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onLikeBlog={() => handleLikeBlog(blog)}
          onRemoveBlog={() => handleRemoveBlog(blog)}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default BlogList;
