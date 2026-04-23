import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import * as NotificationService from '../../services/notification.service';
import { handleAxiosRequest } from '../../utils/axiosHandle';

export const notificationQuery = createApi({
  reducerPath: 'notificationQuery',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Notification', 'UnreadCount'],
  endpoints: (builder) => ({
    getFirstTimeNotifications: builder.query({
      queryFn: ({ limit }) =>
        handleAxiosRequest(() =>
          NotificationService.getFirstTimeNotifications(limit)
        ),
      providesTags: ['Notification'],
    }),
    getNotifications: builder.query({
      queryFn: ({ limit, cursor }) =>
        handleAxiosRequest(() =>
          NotificationService.getNotifications(limit, cursor)
        ),
      providesTags: ['Notification'],
    }),
    markAsRead: builder.mutation({
      queryFn: (notificationId) =>
        handleAxiosRequest(() =>
          NotificationService.markAsRead(notificationId)
        ),
      invalidatesTags: ['UnreadCount'],
    }),
    markAllAsRead: builder.mutation({
      queryFn: () =>
        handleAxiosRequest(() => NotificationService.markAllAsRead()),
      invalidatesTags: ['UnreadCount'],
    }),
    getUnreadCount: builder.query({
      queryFn: () =>
        handleAxiosRequest(() => NotificationService.getUnreadCount()),
      providesTags: ['UnreadCount'],
    }),
  }),
});

export const {
  useGetFirstTimeNotificationsQuery,
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useGetUnreadCountQuery,
} = notificationQuery;
