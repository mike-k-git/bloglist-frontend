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
      })
      .addCase(updateBlog.fulfilled, (state, action) =>
        state.map((b) => (b.id !== action.payload.id ? b : action.payload))
      )
      .addCase(removeBlog.fulfilled, (state, action) =>
        state.filter((b) => b.id !== action.meta.arg)
      );
  },
});

export default blogSlice.reducer;

export const selectSortedBlogs = (state) =>
  state.blogs.slice().sort((a, b) => b.likes - a.likes);

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async () => await blogService.getAll()
);

export const createBlog = createAsyncThunk(
  "blogs/blogCreated",
  async (blog) => await blogService.create(blog)
);

export const updateBlog = createAsyncThunk(
  "blogs/blogUpdated",
  async (blogToUpdate) => await blogService.update(blogToUpdate)
);

export const removeBlog = createAsyncThunk(
  "blogs/blogRemoved",
  async (id) => await blogService.remove(id)
);
