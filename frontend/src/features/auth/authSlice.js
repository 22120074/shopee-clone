import { createSlice } from '@reduxjs/toolkit';

const savedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  currentUser: savedUser || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
    },
    updateEmail_Redux: (state, action) => {
      state.currentUser.email = action.payload;
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
  },
});

export const { login, logout, updateEmail_Redux } = authSlice.actions;
export default authSlice.reducer;