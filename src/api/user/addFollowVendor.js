const axios = require("axios");
import toast from "react-hot-toast";

export const addFollowVendor = (id, token) => {
  const data = {
    vender_id: id,
  };

  try {
    const response = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/folow/add",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Followed");
    // Xử lý kết quả response ở đây (nếu cần)
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
