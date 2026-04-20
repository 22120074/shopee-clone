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

export const createVnpayUrl = (payload) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/order/create-url`,
    payload,
    {
      withCredentials: true,
    },
  );
};

export const vnpayReturnUrl = (queryParams) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/order/vnpay-return${queryParams}`,
    {
      withCredentials: true,
    },
  );
};

export const getListOrderItemsWithDetails = (statusFilter, cursor) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/order/list?statusFilter=${statusFilter}&cursor=${cursor}`,
    {
      withCredentials: true,
    },
  );
};
