import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./components/notificationSlice";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});
