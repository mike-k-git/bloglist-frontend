import React, { useEffect } from "react";
import { fetchBlogs } from "../reducers/blogSlice";
import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog";
import blogService from "../services/blogs";
import { showNotificationWithTimeout } from "../reducers/notificationSlice";

const BlogList = ({ currentUser }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

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

  const increaseLikes = async (blog) => {
    console.log(blog);
    try {
      const draftBlog = {
        ...blog,
      };
      const updatedBlog = await blogService.update(draftBlog, blog.id);

      blogs.map((b) =>
        b.id !== blog.id ? b : { ...b, likes: updatedBlog.likes }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeBlog = async (blog) => {
    const ok = window.confirm(`Romove blog ${blog.title} by ${blog.user.name}`);

    if (ok) {
      await blogService.remove(blog.id);
    }
  };

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likes={() => increaseLikes(blog)}
          removeBlog={() => removeBlog(blog)}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default BlogList;
