const axios = require("axios");
import toast from "react-hot-toast";

export const LogOutAccount = async (token) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/logout",
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
