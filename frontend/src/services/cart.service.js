import axios from "axios";

export const createOrupdateCart = (cartData) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/cart/addCart`, cartData, {
    withCredentials: true,
  });
};

export const getCart = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/cart/getCart`, {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
};

export const getUserRating = (data) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/auth/data_list_rating`, {
    params: data,
    withCredentials: true,
  });
};
