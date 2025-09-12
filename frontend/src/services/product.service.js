import axios from "axios";

export const getAllProducts = () => {
  return axios.get(
        `${process.env.REACT_APP_API_URL}/product/getAll?limit=48`,
        {
        headers: { 'Content-Type': 'application/json' }
        }
    );
};

export const getOneProduct = (productID) => {
  return axios.get(
        `${process.env.REACT_APP_API_URL}/product/getDataProduct?productID=${productID}`,
        {
        headers: { 'Content-Type': 'application/json' }
        }
    );
};

export const isLikedProduct = (productID) => {
  return axios.get(
        `${process.env.REACT_APP_API_URL}/product/isLiked?productID=${productID}`,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
    );
};

export const likeProduct = (productID, userID, token) => {
  return axios.post(
        `${process.env.REACT_APP_API_URL}/product/like`,
        { productID, userID },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
    );
};

export const unlikeProduct = (productID, userID, token) => {
  return axios.delete(
        `${process.env.REACT_APP_API_URL}/product/unlike`,
        {
          data: { productID, userID },
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
    );
}

export const getProductReviews = (productID, limit = 6, page = 1) => {
  return axios.get(
        `${process.env.REACT_APP_API_URL}/product/reviews?productID=${productID}&limit=${limit}&page=${page}`,
        {
          headers: { 'Content-Type': 'application/json' }
        }
    );
}