import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import User from "./components/User";

import { blogService, loginService } from "./services";

import {
  showNotificationWithTimeout,
  createBlog,
  userSetted,
} from "./reducers";

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

  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>
      {user ? (
        <>
          <div>
            {user.name} logged in{" "}
            <button type="submit" onClick={logout} data-cy="logout-submit">
              logout
            </button>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <>
                  {" "}
                  <Togglable ref={blogFormRef} buttonLabel="create new">
                    <BlogForm onBlogCreate={handleBlogCreate} />
                  </Togglable>
                  <BlogList currentUser={user.name} />
                </>
              }
            />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </>
      ) : (
        <div>
          <LoginForm login={login} />
        </div>
      )}
    </div>
  );
};

export default App;
