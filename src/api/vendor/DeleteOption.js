const axios = require("axios");
import toast from "react-hot-toast";

export const DeleteOption = async (productId, optionId, token) => {
  const url =
    process.env.NEXT_PUBLIC_API_URL +
    "/api/vendor/product/option/" +
    productId +
    "/remove/" +
    optionId;

  // "http://localhost:3000/api/vendor/product/option/" +
  //   productId +
  //   "/remove/" +
  //   optionId;
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
    toast.success("Item deleted successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
