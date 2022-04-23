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

let timeoutId = null;
export const showNotificationWithTimeout = (text, type) => (dispatch) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  dispatch(createNotification({ text, type }));

  timeoutId = setTimeout(() => {
    dispatch(removeNotification());
  }, 3000);
};
export default notificationSlice.reducer;
