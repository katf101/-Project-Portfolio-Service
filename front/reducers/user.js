import { createSlice } from "@reduxjs/toolkit";

import { signup } from "../actions/user";

export const initialState = {
  me: null,
  signupLoading: false, // 회원가입 시도중
  signupDone: false,
  signupError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addPostToMe(state, action) {
      state.me.Posts.unshift({ id: action.payload });
    },
    removePostToMe(state, action) {
      _remove(state.me.Posts, (v) => v.id === action.payload);
    },
  },
  extraReducers: (builder) =>
    builder
      // signup
      .addCase(signup.pending, (state) => {
        state.signupLoading = true;
        state.signupDone = false;
        state.signupError = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.signupLoading = false;
        state.signupDone = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.signupLoading = false;
        state.signupError = action.payload;
      })
      .addDefaultCase((state) => state),
});

export default userSlice;
