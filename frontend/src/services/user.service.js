import axios from "axios";

export const updateEmail = (userId, newEmail) => {
    return axios.put(`${process.env.REACT_APP_API_URL}/user/update-email`, { 
        userId: userId, 
        email: newEmail
    }, { withCredentials: true });
}

export const updatePhone = (userId, newPhone) => {
    return axios.put(`${process.env.REACT_APP_API_URL}/user/update-phone`, { 
        userId: userId, 
        phone: newPhone
    }, { withCredentials: true });
}