import { createSlice } from "@reduxjs/toolkit";
import { authQuery } from "../api/authQuery";

const savedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  currentUser: savedUser || null,
  isLoggingOut: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggingOut: (state, action) => {
      state.isLoggingOut = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggingOut = false;
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
    },
    updateEmail_Redux: (state, action) => {
      state.currentUser.email = action.payload;
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
    updatePhone_Redux: (state, action) => {
      state.currentUser.phone = action.payload;
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
    updateProfile_Redux: (state, action) => {
      state.currentUser.displayName = action.payload.displayName;
      state.currentUser.name = action.payload.name;
      state.currentUser.gender = action.payload.gender;
      state.currentUser.dateOfBirth = action.payload.dateOfBirth;
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
    updateAvatar_Redux: (state, action) => {
      state.currentUser.avatarUrl = action.payload;
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authQuery.endpoints.getCurrentUser.matchFulfilled,
        (state, { payload }) => {
          state.currentUser = payload;
          localStorage.setItem("user", JSON.stringify(payload));
        },
      )
      .addMatcher(authQuery.endpoints.logout.matchFulfilled, (state) => {
        state.currentUser = null;
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
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
