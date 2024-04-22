const axios = require("axios");
import toast from "react-hot-toast";

export const addCartItem = (data, token) => {
  // const data = {
  //   option_id: optionId,
  //   quantity: quantity,
  //   price: price,
  //   product_id: id,
  // };

  try {
    const response = axios.post(
      "http://localhost:3000/api/user/cart/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Xử lý kết quả response ở đây (nếu cần)
    return response;
  } catch (error) {
    console.log(error);
  }
};
