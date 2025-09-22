import axios from "axios";

export const getCurrentUser = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, {
    withCredentials: true,
  });
};

export const login = (credentials) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/auth/login`,
    credentials,
    { withCredentials: true }
  );
};

export const logout = () => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/auth/logout`,
    {},
    { withCredentials: true }
  );
};

export const register = ({ phone, password }) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/auth/register`,
    { phone, password },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const refreshToken = () => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/auth/refresh`,
    {},
    { withCredentials: true }
  );
};

export const getUserRating = (data) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/auth/data_list_rating`, {
    params: data,
    withCredentials: true,
  });
};
