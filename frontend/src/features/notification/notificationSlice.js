import { createSlice } from "@reduxjs/toolkit";
import { notificationQuery } from "../api/notificationQuery";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    list: [],
    unreadCount: 0,
    nextCursor: null,
    hasNextPage: false,
  },
  reducers: {
    addNotification: (state, action) => {
      state.list.unshift(action.payload);
      state.unreadCount += 1;
    },
    addNotifications: (state, action) => {
      // action.payload là mảng các thông báo mới: [noti_a, noti_b, ...]
      state.list.push(...action.payload);
      state.unreadCount += action.payload.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        notificationQuery.endpoints.getFirstTimeNotifications.matchFulfilled,
        (state, { payload }) => {
          state.list = payload?.rows || [];
          state.unreadCount = (payload?.rows || []).filter(
            (n) => !n.isRead,
          ).length;
          state.nextCursor = payload?.nextCursor;
          state.hasNextPage = payload?.hasNextPage;
        },
      )
      .addMatcher(
        notificationQuery.endpoints.getNotifications.matchFulfilled,
        (state, { payload }) => {
          const newRows = payload?.rows || [];
          state.list.push(...newRows);
          const newUnreadCount = newRows.filter((n) => !n.isRead).length;
          state.unreadCount += newUnreadCount;
          state.nextCursor = payload?.nextCursor;
          state.hasNextPage = payload?.hasNextPage;
        },
      )
      .addMatcher(
        notificationQuery.endpoints.markAsRead.matchFulfilled,
        (state, action) => {
          const id = action.meta.arg;
          const notification = state.list.find((n) => n.id === id);
          if (notification && !notification.isRead) {
            notification.isRead = true;
            state.unreadCount = Math.max(0, state.unreadCount - 1);
          }
        },
      )
      .addMatcher(
        notificationQuery.endpoints.markAllAsRead.matchFulfilled,
        (state) => {
          state.list.forEach((n) => {
            n.isRead = true;
          });
          state.unreadCount = 0;
        },
      );
  },
});

export const { addNotification, addNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
