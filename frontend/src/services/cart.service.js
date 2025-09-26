import axios from "axios";

export const createOrupdateCart = (cartData) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/cart/addCart`, cartData, {
        withCredentials: true,
    });
};

export const getCart = (userId) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/cart/getCart`, {
        params: { userId },
        withCredentials: true,
    });
};

export const getUserRating = (data) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/auth/data_list_rating`, {
        params: data,
        withCredentials: true,
    });
};
