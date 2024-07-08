const axios = require("axios");
import toast from "react-hot-toast";

export const PutVendorProfile = async (data, token) => {
  try {
    const response = await axios.put(
      process.env.NEXT_PUBLIC_API_URL + "/api/vendor/account/edit",

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
