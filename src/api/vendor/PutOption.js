const axios = require("axios");
import toast from "react-hot-toast";

export const PutOption = async (productId, optionId, data, token) => {
  const url =
    "http://localhost:3000/api/vendor/product/option/" +
    productId +
    "/edit/" +
    optionId;

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
