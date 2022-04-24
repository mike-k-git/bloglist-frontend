import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { showNotificationWithTimeout } from "./reducers/notificationSlice";
import BlogList from "./components/BlogList";
import { createBlog } from "./reducers/blogSlice";
import { userSetted } from "./reducers/userSlice";

const App = () => {
  const { notification, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(userSetted(user));
      blogService.setToken(user.token);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(showNotificationWithTimeout(`Hi ${user.name}!`, "success"));
      dispatch(userSetted(user));
    } catch (error) {
      dispatch(
        showNotificationWithTimeout(`Wrong username or password`, "error")
      );
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedUser");
    dispatch(userSetted(null));
  };

  const handleBlogCreate = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility();
    try {
      const result = await dispatch(
        createBlog({ title, author, url })
      ).unwrap();
      dispatch(
        showNotificationWithTimeout(
          `A new blog ${result.title} by ${result.author} added`,
          "success"
        )
      );
    } catch (error) {
      dispatch(showNotificationWithTimeout(error.message, "error"));
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
          <BlogForm onBlogCreate={handleBlogCreate} />
        </Togglable>
        <BlogList currentUser={user.name} />
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
