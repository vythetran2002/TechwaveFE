const axios = require("axios");
import toast from "react-hot-toast";

export const PostReport = async (data, token) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/user/report/create",
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
