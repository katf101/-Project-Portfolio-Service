import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "../config/config";
import userSlice from "../reducers/user";

axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true; // front, backend 간 쿠키공유

// addStack
export const addStack = createAsyncThunk(
  "post/addStack",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/stack", data);
      // thunkAPI.dispatch(userSlice.actions.addPostToMe(response.data.id));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeStack = createAsyncThunk(
  "stack/removeStack",
  async (data) => {
    try {
      const response = await axios.delete(`/stack/${data.stackId}`); // DELETE /post/1/comment
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removePost = createAsyncThunk(
  "post/removePost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(`/post/${data.postId}`); // DELETE /post/1/comment
      // thunkAPI.dispatch(userSlice.actions.removePostToMe(response.data.id));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/post/${data.postId}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadPosts = createAsyncThunk(
  "post/loadPosts",
  async (data) => {
    // const response = await axios.get("/posts");
    // const response = await axios.get(`/posts?lastId=${data?.lastId || 0}`);
    const response = await axios.get(`/posts?page=${page}`);
    return response.data;
  },
  {
    condition: (data, { getState }) => {
      const { post } = getState();
      console.log("중복요청", post);
      console.log("중복요청", post.loadPostsLoading);
      if (post.loadPostsLoading) {
        // console.warn('중복 요청 취소');
        return false;
      }
      return true;
    },
  }
);

export const loadStacks = createAsyncThunk(
  "post/loadStacks",
  async (data) => {
    const response = await axios.get("/stacks");
    return response.data;
  },
  {
    condition: (data, { getState }) => {
      const { post } = getState();
      console.log("중복요청", post);
      console.log("중복요청", post.loadPostsLoading);
      if (post.loadPostsLoading) {
        // console.warn('중복 요청 취소');
        return false;
      }
      return true;
    },
  }
);

export const loadPost = createAsyncThunk(
  "post/loadPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/post/${data.postId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadStack = createAsyncThunk(
  "post/loadStack",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/stack/${data.userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// addPost
export const addPost = createAsyncThunk(
  "post/addPost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/post", data);
      thunkAPI.dispatch(userSlice.actions.addPostToMe(response.data.id));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// uploadImage
export const uploadImage = createAsyncThunk(
  "post/uploadImage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/post/image", data); // POST /post/images
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addImage = createAsyncThunk(
  "post/addImage",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/post/addImage", data);
      thunkAPI.dispatch(userSlice.actions.addPostToMe(response.data.id));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeCurrentImage = createAsyncThunk(
  "post/image",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(`/image/${data.UserId}`);
      thunkAPI.dispatch(userSlice.actions.addPostToMe(response.data.id));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
