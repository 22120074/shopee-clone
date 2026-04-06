import axios from "axios";

export const checkShop = (userId) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/shop/check/${userId}`, {
    withCredentials: true,
  });
};

export const registerShop = (userId, nameShop, address) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/shop/register`,
    {
      userId: userId,
      nameShop: nameShop,
      address: address,
    },
    { withCredentials: true },
  );
};

export const getShop = (shopId) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/shop/${shopId}`, {
    withCredentials: true,
  });
};

export const isFollowShop = (shopId) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/shop/is-follow/${shopId}`,
    {
      withCredentials: true,
    },
  );
};

export const followShop = (shopId) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/shop/follow/${shopId}`, {
    withCredentials: true,
  });
};

export const unfollowShop = (shopId) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/shop/unfollow/${shopId}`,
    {
      withCredentials: true,
    },
  );
};
