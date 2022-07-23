import { createSlice } from "@reduxjs/toolkit";
import { addPost } from "../actions/post";

export const initialState = {
  mePost: false,
  mainPosts: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createPost(state) {
      state.mePost = !mePost;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(addPost.pending, (state) => {
        state.addPostLoading = true;
        state.addPostDone = false;
        state.addPostError = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.addPostLoading = false;
        state.addPostDone = true;
        state.mainPosts.unshift(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.addPostLoading = false;
        state.addPostError = action.error.message;
      })
      .addDefaultCase((state) => state),
});

export default postSlice;
