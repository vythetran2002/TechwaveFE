const axios = require("axios");
import toast from "react-hot-toast";

export const HandleReceiveOrder = async (id, token) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/user/bill/received/" + id;
  try {
    const response = await axios.put(
      url,
      {
        status: 2,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Đã nhận đơn hàng");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
