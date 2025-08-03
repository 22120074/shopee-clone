import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null, // hoặc lấy từ localStorage nếu muốn lưu lâu dài
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;