const axios = require("axios");
import toast from "react-hot-toast";

export const PostComment = async (data, token) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/user/review/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Comment posted");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
