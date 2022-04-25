import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../services";

const initialState = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => action.payload);
  },
});

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => await userService.getAll()
);

export default userSlice.reducer;
