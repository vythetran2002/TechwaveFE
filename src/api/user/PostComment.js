const axios = require("axios");
import toast from "react-hot-toast";

export const PostComment = async (data, token) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/review/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
