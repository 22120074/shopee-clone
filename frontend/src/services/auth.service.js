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

export const loginGG = ({ codeResponse }) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/auth/google`, {
        code: codeResponse.code,
    });
};

export const sendOtpEmail = (email) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/auth/send-otp-email`,
        { email },
        { withCredentials: true }
    );
};

export const veritfyOtpEmail = (email, otp) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/auth/vertify-otp-email`,
        { email, otp },
        { withCredentials: true }
    );
};