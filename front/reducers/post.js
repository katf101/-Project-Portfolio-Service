import { createSlice } from "@reduxjs/toolkit";
import {
  addPost,
  uploadImage,
  addImage,
  loadPosts,
  loadStack,
  loadPost,
  updatePost,
  removeStack,
  removePost,
  addStack,
  removeCurrentImage,
} from "../actions/post";
import _concat from "lodash/concat";
import _remove from "lodash/remove";
import _find from "lodash/find";

export const initialState = {
  mainPosts: [],
  mainStacks: [],
  imagePaths: [],
  hasMorePosts: true,
  singlePost: null,
  singleStack: null,
  addStackLoading: false,
  addStackDone: false,
  addStackError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadStacksLoading: false,
  loadStacksDone: false,
  loadStacksError: null,
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  removeStackLoading: false,
  removeStackDone: false,
  removeStackError: null,
  removeCurrentImageLoading: false,
  removeCurrentImageDone: false,
  removeCurrentImageError: null,
  uploadImageLoading: false,
  uploadImageDone: false,
  uploadImageError: null,
  addImageLoading: false,
  addImageDone: false,
  addImageError: null,
};

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    removeImage(state, action) {
      state.imagePaths = state.imagePaths.filter(
        (v, i) => i !== action.payload
      );
    },
  },
  extraReducers: (builder) =>
    builder
      // addStack
      .addCase(addStack.pending, (state) => {
        state.addStackLoading = true;
        state.addStackDone = false;
        state.addStackError = null;
      })
      .addCase(addStack.fulfilled, (state, action) => {
        state.addStackLoading = false;
        state.addStackDone = true;
        state.mainStacks.unshift(action.payload);
      })
      .addCase(addStack.rejected, (state, action) => {
        state.addStackLoading = false;
        state.addStackError = action.error.message;
      })
      // removeStack
      .addCase(removeStack.pending, (state) => {
        state.removeStackLoading = true;
        state.removeStackDone = false;
        state.removeStackError = null;
      })
      .addCase(removeStack.fulfilled, (state, action) => {
        state.removeStackLoading = false;
        state.removeStackDone = true;
        _remove(state.mainStacks, { id: action.payload.StackId });
      })
      .addCase(removeStack.rejected, (state, action) => {
        state.removeStackLoading = false;
        state.removeStackError = action.error.message;
      })
      // removePost
      .addCase(removePost.pending, (state) => {
        state.removePostLoading = true;
        state.removePostDone = false;
        state.removePostError = null;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.removePostLoading = false;
        state.removePostDone = true;
        _remove(state.mainPosts, { id: action.payload.PostId });
      })
      .addCase(removePost.rejected, (state, action) => {
        state.removePostLoading = false;
        state.removePostError = action.error.message;
      })
      // updatePost
      .addCase(updatePost.pending, (state) => {
        state.updatePostLoading = true;
        state.updatePostDone = false;
        state.updatePostError = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        // const post = _.find(state.singlePost, { id: action.payload.PostId });
        state.updatePostLoading = false;
        state.updatePostDone = true;
        // post.introduce = action.payload.introduce;
        // post.position = action.payload.position;
        // post.job = action.payload.job;
        // post.career = action.payload.career;
        // post.portfolio = action.payload.portfolio;
        // post.github = action.payload.github;
        // post.blog = action.payload.blog;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.updatePostLoading = false;
        state.updatePostError = action.error.message;
      })
      // loadStack
      .addCase(loadStack.pending, (state) => {
        state.loadPostLoading = true;
        state.loadPostDone = false;
        state.loadPostError = null;
      })
      .addCase(loadStack.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loadPostLoading = false;
        state.loadPostDone = true;
        state.singleStack = action.payload;
      })
      .addCase(loadStack.rejected, (state, action) => {
        state.loadPostLoading = false;
        state.loadPostError = action.error.message;
      })
      // loadPost
      .addCase(loadPost.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadPost.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.singlePost = action.payload;
      })
      .addCase(loadPost.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })
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
      })
      .addCase(addPost.rejected, (state, action) => {
        state.addPostLoading = false;
        state.addPostError = action.error.message;
      })
      // loadPosts
      .addCase(loadPosts.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = _concat(state.mainPosts, action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })

      // // loadStacks
      // .addCase(loadStacks.pending, (state) => {
      //   state.loadStacksLoading = true;
      //   state.loadStacksDone = false;
      //   state.loadStacksError = null;
      // })
      // .addCase(loadStacks.fulfilled, (state, action) => {
      //   state.loadStacksLoading = false;
      //   state.loadStacksDone = true;
      //   state.allStacks = _concat(state.allStacks, action.payload);
      // })
      // .addCase(loadStacks.rejected, (state, action) => {
      //   state.loadStacksLoading = false;
      //   state.loadStacksError = action.error.message;
      // })

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
      // removeCurrentImage
      .addCase(removeCurrentImage.pending, (state) => {
        state.removeCurrentImageLoading = true;
        state.removeCurrentImageDone = false;
        state.removeCurrentImageError = null;
      })
      .addCase(removeCurrentImage.fulfilled, (state, action) => {
        state.removeCurrentImageLoading = false;
        state.removeCurrentImageDone = true;
      })
      .addCase(removeCurrentImage.rejected, (state, action) => {
        state.removeCurrentImageLoading = false;
        state.removeCurrentImageError = action.error.message;
      })
      .addDefaultCase((state) => state),
});

export default postSlice;
