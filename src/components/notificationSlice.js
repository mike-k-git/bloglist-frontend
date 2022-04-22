import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  type: "",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification: (state, action) => action.payload,
    removeNotification: () => initialState,
  },
});

export const { createNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
