const axios = require("axios");
import toast from "react-hot-toast";

export const addFollowVendor = async (id, token) => {
  const data = {
    vender_id: id,
  };
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/folow/add",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    // toast.error(error.response.data.message);
    throw error;
  }
};
