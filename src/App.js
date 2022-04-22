import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    if (user) {
      fetchBlogs();
    }
  }, [user]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setNotification({ text: `Hi ${user.name}!`, type: "success" });
      setTimeout(() => setNotification(null), 3000);
      setUser(user);
    } catch (error) {
      setNotification({ text: "Wrong username or password", type: "error" });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const createBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();
      const savedBlog = await blogService.create(newBlog);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      setNotification({
        text: `A new blog ${savedBlog.title} by ${savedBlog.author} added`,
        type: "success",
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({
        text: "an error occurred while adding the blog",
        type: "error",
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const increaseLikes = async ({ id, author, likes, title, url, user }) => {
    try {
      const draftBlog = {
        author,
        title,
        url,
        likes: likes + 1,
        user: user.id,
      };
      const updatedBlog = await blogService.update(draftBlog, id);
      setBlogs(
        blogs.map((b) => (b.id !== id ? b : { ...b, likes: updatedBlog.likes }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeBlog = async (blog) => {
    const ok = window.confirm(`Romove blog ${blog.title} by ${blog.user.name}`);

    if (ok) {
      await blogService.remove(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    }
  };

  if (user !== null) {
    return (
      <div>
        <Notification notification={notification} />
        <h2>blogs</h2>
        <p>
          {user.name} logged in{" "}
          <button type="submit" onClick={logout} data-cy="logout-submit">
            logout
          </button>
        </p>
        <Togglable ref={blogFormRef} buttonLabel="create new">
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <div>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                likes={() => increaseLikes(blog)}
                removeBlog={() => removeBlog(blog)}
                currentUser={user.name}
              />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Notification notification={notification} />
      <div>
        <LoginForm login={login} />
      </div>
    </div>
  );
};

export default App;
