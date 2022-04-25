import { configureStore } from "@reduxjs/toolkit";
import {
  blogReducer,
  loginReducer,
  notificationReducer,
  userReducer,
} from "./reducers";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: loginReducer,
    users: userReducer,
  },
});
