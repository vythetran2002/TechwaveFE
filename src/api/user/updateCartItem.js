const axios = require("axios");
import toast from "react-hot-toast";

export const UpdateCartItem = async (id, quantity, optionId, price, token) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/user/cart/update/" + id;
  // "http://localhost:3000/api/user/cart/update/" + id;
  try {
    const response = await axios.put(
      url,
      {
        quantity: quantity,
        option_id: optionId,
        price: price,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Cập nhật đơn hàng thành công");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
