import { createSlice } from "@reduxjs/toolkit";
import { authQuery } from "../api/authQuery";

const initialState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateEmail_Redux: (state, action) => {
      state.currentUser.email = action.payload;
    },
    updatePhone_Redux: (state, action) => {
      state.currentUser.phone = action.payload;
    },
    updateProfile_Redux: (state, action) => {
      state.currentUser.displayName = action.payload.displayName;
      state.currentUser.name = action.payload.name;
      state.currentUser.gender = action.payload.gender;
      state.currentUser.dateOfBirth = action.payload.dateOfBirth;
    },
    updateAvatar_Redux: (state, action) => {
      state.currentUser.avatarUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authQuery.endpoints.getCurrentUser.matchFulfilled,
        (state, { payload }) => {
          state.currentUser = payload;
        },
      )
      .addMatcher(authQuery.endpoints.logout.matchFulfilled, (state) => {
        state.currentUser = null;
      });
  },
});

export const {
  login,
  logout,
  updateEmail_Redux,
  updatePhone_Redux,
  updateProfile_Redux,
  updateAvatar_Redux,
  setLoggingOut,
} = authSlice.actions;
export default authSlice.reducer;
