const axios = require("axios");
import toast from "react-hot-toast";

export const PostReport = async (data, token) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/report/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Báo cáo tài khoản thành công");
    return response.data;
  } catch (error) {
    toast.error("Cần đăng nhập");
  }
};
