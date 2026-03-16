import axios from "axios";

export const createOrder = (items) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/order/create`,
    { items: items },
    {
      withCredentials: true,
    },
  );
};
