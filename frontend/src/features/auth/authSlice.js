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
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;