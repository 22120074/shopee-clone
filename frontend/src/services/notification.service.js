import axios from "axios";

export const getFirstTimeNotifications = (limit) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/notification/get-notifications`,
    {
      params: {
        limit: limit,
      },
      withCredentials: true,
    },
  );
};

export const getNotifications = (limit, cursor) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/notification/get-notifications`,
    {
      params: {
        limit: limit,
        cursor: cursor,
      },
      withCredentials: true,
    },
  );
};

export const markAsRead = (notificationId) => {
  return axios.patch(
    `${process.env.REACT_APP_API_URL}/notification/mark-as-read/${notificationId}`,
    {
      withCredentials: true,
    },
  );
};

export const markAllAsRead = () => {
  return axios.patch(
    `${process.env.REACT_APP_API_URL}/notification/mark-all-as-read`,
    {
      withCredentials: true,
    },
  );
};
