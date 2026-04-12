import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    list: [],
    unreadCount: 0,
  },
  reducers: {
    setNotification: (state, action) => {
      state.list = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.isRead).length;
    },
    addNotification: (state, action) => {
      state.list.unshift(action.payload);
      state.unreadCount += 1;
    },
    markAllAsRead: (state) => {
      state.unreadCount = 0;
      state.list.forEach((n) => (n.isRead = true));
    },
  },
});

export const { setNotification, addNotification, markAllAsRead } =
  notificationSlice.actions;
export default notificationSlice.reducer;
