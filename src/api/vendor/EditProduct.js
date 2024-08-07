const axios = require("axios");
import toast from "react-hot-toast";

export const EditProduct = async (productId, data, token) => {
  const url =
    process.env.NEXT_PUBLIC_API_URL + "/api/vendor/product/edit/" + productId;
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
