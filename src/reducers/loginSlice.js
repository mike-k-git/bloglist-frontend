import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSetted: (state, action) => action.payload,
  },
});

export const { userSetted } = loginSlice.actions;
export default loginSlice.reducer;
