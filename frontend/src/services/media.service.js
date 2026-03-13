import axios from "axios";

export const uploadMultipleImages = (imgs) => {
  const formData = new FormData();

  imgs.forEach((item) => {
    formData.append("images", item.file);
  });

  return axios.post(
    `${process.env.REACT_APP_API_URL}/media/upload-multiple`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    },
  );
};
