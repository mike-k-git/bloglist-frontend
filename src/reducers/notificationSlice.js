import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  type: "",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationCreated: (state, action) => action.payload,
    notificationRemoved: () => initialState,
  },
});

export const { notificationCreated, notificationRemoved } =
  notificationSlice.actions;

let timeoutId = null;
export const showNotificationWithTimeout = (text, type) => (dispatch) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  dispatch(notificationCreated({ text, type }));

  timeoutId = setTimeout(() => {
    dispatch(notificationRemoved());
  }, 3000);
};
export default notificationSlice.reducer;
