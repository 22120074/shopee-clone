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