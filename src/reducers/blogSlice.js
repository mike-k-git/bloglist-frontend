import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => action.payload)
      .addCase(createBlog.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export const { blogAdded } = blogSlice.actions;

export default blogSlice.reducer;

export const selectAllBlogs = (state) => state.blogs.blogs;

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async () => await blogService.getAll()
);

export const createBlog = createAsyncThunk(
  "blogs/blogCreated",
  async (blog) => await blogService.create(blog)
);
