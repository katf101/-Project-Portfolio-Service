import { createSlice } from "@reduxjs/toolkit";
import { addPost, uploadImage, addImage } from "../actions/post";
import _concat from "lodash/concat";

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  uploadImageLoading: false,
  uploadImageDone: false,
  uploadImageError: null,
  addImageLoading: false,
  addImageDone: false,
  addImageError: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    removeImage(state, action) {
      state.imagePaths = state.imagePaths.filter(
        (v, i) => i !== action.payload
      );
    },
  },
  extraReducers: (builder) =>
    builder
      // addPost
      .addCase(addPost.pending, (state) => {
        state.addPostLoading = true;
        state.addPostDone = false;
        state.addPostError = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.addPostLoading = false;
        state.addPostDone = true;
        state.mainPosts.unshift(action.payload);
        state.imagePaths = [];
      })
      .addCase(addPost.rejected, (state, action) => {
        state.addPostLoading = false;
        state.addPostError = action.error.message;
      })
      // uploadImage
      .addCase(uploadImage.pending, (state) => {
        state.uploadImageLoading = true;
        state.uploadImageDone = false;
        state.uploadImageError = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploadImageLoading = false;
        state.uploadImageDone = true;
        state.imagePaths = _concat(state.imagePaths, action.payload);
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploadImageLoading = false;
        state.uploadImageError = action.error.message;
      })
      // addImage
      .addCase(addImage.pending, (state) => {
        state.addImageLoading = true;
        state.addImageDone = false;
        state.addImageError = null;
      })
      .addCase(addImage.fulfilled, (state) => {
        state.addImageLoading = false;
        state.addImageDone = true;
        state.imagePaths = [];
      })
      .addCase(addImage.rejected, (state, action) => {
        state.addImageLoading = false;
        state.addImageError = action.error.message;
      })
      .addDefaultCase((state) => state),
});

export default postSlice;
