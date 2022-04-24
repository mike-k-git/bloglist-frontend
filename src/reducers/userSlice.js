import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSetted: (state, action) => action.payload,
  },
});

export const { userSetted } = userSlice.actions;
export default userSlice.reducer;
