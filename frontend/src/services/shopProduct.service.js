import axios from "axios";

export const createProduct = (payload) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/shop/product`, payload, {
    withCredentials: true,
  });
};
