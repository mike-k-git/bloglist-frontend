import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import {
  fetchBlogs,
  selectSortedBlogs,
  showNotificationWithTimeout,
} from "../reducers";

const BlogList = () => {
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

  return (
    <div className="m-4">
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link
              to={`/blogs/${blog.id}`}
              className="text-lg tracking-wide hover:bg-orange-300"
              data-cy="blog-item"
            >
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
