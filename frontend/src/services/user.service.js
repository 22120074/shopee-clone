import axios from "axios";

export const updateEmail = (userId, newEmail) => {
    return axios.patch(`${process.env.REACT_APP_API_URL}/user/update-email`, { 
        userId: userId, 
        email: newEmail
    }, { withCredentials: true });
}

export const updatePhone = (userId, newPhone) => {
    return axios.patch(`${process.env.REACT_APP_API_URL}/user/update-phone`, { 
        userId: userId, 
        phone: newPhone
    }, { withCredentials: true });
}

export const updateUserProfile = (userId, displayName, name, gender, date) => {
    return axios.patch(`${process.env.REACT_APP_API_URL}/user/update-profile`, { 
        userId: userId, 
        displayName: displayName,
        name: name,
        gender: gender,
        date: date
    }, { withCredentials: true });
}

export const updateUserAvatar = (userId, avatar, isUrl) => {
    if (!isUrl) {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("avatar", avatar);
        formData.append("isUrl", isUrl);

        return axios.patch(`${process.env.REACT_APP_API_URL}/user/update-avatar`,
            formData,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            }
        );
    }
    return axios.patch(`${process.env.REACT_APP_API_URL}/user/update-avatar`, { 
        userId: userId,
        avatar: avatar, 
        isUrl: isUrl
    }, { withCredentials: true });
}