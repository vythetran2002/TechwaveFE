const axios = require("axios");
import toast from "react-hot-toast";
import { useRouter } from "next/router";
export const SendPaymentAmount = async (data, token) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/payment/create_payment_url",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Xử lý trường hợp status 400
      return { success: false, data: error.response.data };
    } else {
      // Xử lý các lỗi khác
      return { success: false, error: error.message };
    }
  }
};
