import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "../config/config";
import userSlice from "../reducers/user";

axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true; // front, backend 간 쿠키공유

export const loadPosts = createAsyncThunk(
  "post/loadPosts",
  async (data) => {
    // const response = await axios.get("/posts");
    const response = await axios.get(`/posts?lastId=${data?.lastId || 0}`);
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

// addPost
export const addPost = createAsyncThunk(
  "post/addPost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/post", data);
      // thunkAPI.dispatch(userSlice.actions.addPostToMe(response.data.id));
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
