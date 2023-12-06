const axios = require("axios");
import toast from "react-hot-toast";

export const DeleteCartItem = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(
      `http://localhost:3000/api/user/cart/remove/${id}`,
      config
    );

    toast.success("Item deleted successfully!");

    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
