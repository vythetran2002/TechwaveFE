const axios = require("axios");
import toast from "react-hot-toast";

export const EditVoucherVendor = async (voucherId, data, token) => {
  const url =
    process.env.NEXT_PUBLIC_API_URL + "/api/vendor/discount/edit/" + voucherId;
  // "http://localhost:3000/api/vendor/discount/edit/" + voucherId;
  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Updated");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
