const axios = require("axios");
import toast from "react-hot-toast";

export const DeleteProduct = async (productId, token) => {
  const url =
    process.env.NEXT_PUBLIC_API_URL + "/api/vendor/product/remove/" + productId;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // data: {
    //   quantity: quantity,
    //   price: price,
    // },
  };

  try {
    const response = await axios.delete(url, config);
    toast.success(" deleted successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
