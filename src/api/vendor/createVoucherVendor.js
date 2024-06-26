const axios = require("axios");
import toast from "react-hot-toast";

export const AddVoucherVendor = async (data, token) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/vendor/discount/create",
      // "http://localhost:3000/api/vendor/discount/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Added");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
