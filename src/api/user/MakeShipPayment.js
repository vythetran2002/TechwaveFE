const axios = require("axios");
import toast from "react-hot-toast";

export const MakeShipPayment = async (data, token) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/user/createBill",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Đặt hàng thành công");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
