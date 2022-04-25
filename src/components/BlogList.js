import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
//import Blog from "./Blog";
import {
  fetchBlogs,
  selectSortedBlogs,
  // updateBlog,
  // removeBlog,
  showNotificationWithTimeout,
} from "../reducers";

const BlogList = () => {
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
    <div>
      {blogs.map((blog) => (
        <div style={style} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
