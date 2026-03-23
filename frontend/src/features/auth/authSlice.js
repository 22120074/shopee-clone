import { createSlice } from "@reduxjs/toolkit";
import { authQuery } from "../api/authQuery";
import { userQuery } from "../api/userQuery";

const initialState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
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
      })
      .addMatcher(
        userQuery.endpoints.updateEmail.matchFulfilled,
        (state, { payload }) => {
          console.log("Payload: ", payload);
          state.currentUser.email = payload;
        },
      )
      .addMatcher(
        userQuery.endpoints.updatePhone.matchFulfilled,
        (state, { payload }) => {
          console.log("Payload: ", payload);
          state.currentUser.phone = payload;
        },
      )
      .addMatcher(
        userQuery.endpoints.updateProfile.matchFulfilled,
        (state, { payload }) => {
          console.log("Payload: ", payload);
          state.currentUser.displayName = payload.displayName;
          state.currentUser.name = payload.name;
          state.currentUser.gender = payload.gender;
          state.currentUser.dateOfBirth = payload.date;
        },
      )
      .addMatcher(
        userQuery.endpoints.updateAvatar.matchFulfilled,
        (state, { payload }) => {
          state.currentUser.avatarUrl = payload.avatarUrl;
        },
      );
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
