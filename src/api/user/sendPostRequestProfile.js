const axios = require("axios");
import toast from "react-hot-toast";

export const sendPostRequestWithToken = async (data, token) => {
  try {
    const response = await axios.put(
      "http://localhost:3000/api/user/account/edit",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Updated");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
