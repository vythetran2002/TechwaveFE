const axios = require("axios");
import toast from "react-hot-toast";

export const UpdateCartItem = async (id, quantity, token, isPaymentUpdate) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/user/cart/update/" + id;
  try {
    const response = await axios.put(
      url,
      {
        quantity: quantity,
      },
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
