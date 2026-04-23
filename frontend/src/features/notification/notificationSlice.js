import { createSlice } from '@reduxjs/toolkit';
import { notificationQuery } from '../api/notificationQuery';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    list: [],
    unreadCount: 0,
    nextCursor: null,
    hasNextPage: false,
  },
  reducers: {
    addNotification: (state, action) => {
      state.list.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        notificationQuery.endpoints.getFirstTimeNotifications.matchFulfilled,
        (state, { payload }) => {
          state.list = payload?.rows || [];
          state.nextCursor = payload?.nextCursor;
          state.hasNextPage = payload?.hasNextPage;
        }
      )
      .addMatcher(
        notificationQuery.endpoints.getNotifications.matchFulfilled,
        (state, { payload }) => {
          const newRows = payload?.rows || [];
          state.list.push(...newRows);
          state.nextCursor = payload?.nextCursor;
          state.hasNextPage = payload?.hasNextPage;
        }
      )
      .addMatcher(
        notificationQuery.endpoints.markAsRead.matchFulfilled,
        (state, action) => {
          const id = action.meta.arg.originalArgs;

          const notification = state.list.find((n) => n.id === id);
          if (notification && !notification.isRead) {
            notification.isRead = true;
            state.unreadCount = Math.max(0, state.unreadCount - 1);
          }
        }
      )
      .addMatcher(
        notificationQuery.endpoints.markAllAsRead.matchFulfilled,
        (state) => {
          state.list.forEach((n) => {
            n.isRead = true;
          });
          state.unreadCount = 0;
        }
      )
      .addMatcher(
        notificationQuery.endpoints.getUnreadCount.matchFulfilled,
        (state, { payload }) => {
          state.unreadCount = payload;
        }
      );
  },
});

export const { addNotification, addNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
