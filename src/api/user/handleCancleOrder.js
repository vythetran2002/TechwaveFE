const axios = require("axios");
import toast from "react-hot-toast";

export const HandleCancleOrder = async (id, token) => {
  const url = "http://localhost:3000/api/user/bill/cancel/" + id;
  try {
    const response = await axios.put(
      url,
      {
        status: 4,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Đã huỷ đơn hàng");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
